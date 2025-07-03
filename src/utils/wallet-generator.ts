import { mnemonicToSeedSync, mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { Wallet, HDNodeWallet } from "ethers";
import bs58 from "bs58";
import type {
  Blockchain,
  WalletKey,
  WalletGenerationResult,
} from "@/types/wallet";

export class WalletGenerator {
  static async generateWallet(
    blockchain: Blockchain,
    mnemonic: string,
    index: number
  ): Promise<WalletGenerationResult> {
    try {
      const path = this.getDerivationPath(blockchain, index);

      if (blockchain === "solana") {
        return this.generateSolanaWallet(mnemonic, path);
      } else {
        return await this.generateEthereumWallet(mnemonic, path);
      }
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  static async regenerateWallets(
    blockchain: Blockchain,
    mnemonic: string,
    paths: string[]
  ): Promise<WalletKey[]> {
    const wallets: WalletKey[] = [];

    for (const path of paths) {
      if (blockchain === "solana") {
        const result = this.generateSolanaWallet(mnemonic, path);
        if (result.success && result.wallet) {
          wallets.push(result.wallet);
        }
      } else {
        const result = await this.generateEthereumWallet(mnemonic, path);
        if (result.success && result.wallet) {
          wallets.push(result.wallet);
        }
      }
    }

    return wallets;
  }

  private static getDerivationPath(
    blockchain: Blockchain,
    index: number
  ): string {
    return blockchain === "solana"
      ? `m/44'/501'/${index}'/0'`
      : `m/44'/60'/${index}'/0'`;
  }

  private static generateSolanaWallet(
    mnemonic: string,
    path: string
  ): WalletGenerationResult {
    try {
      const seed = mnemonicToSeedSync(mnemonic);
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keyPair = Keypair.fromSecretKey(secret);

      return {
        success: true,
        wallet: {
          path,
          public: keyPair.publicKey.toBase58(),
          secret: bs58.encode(secret),
        },
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate Solana wallet",
      };
    }
  }

  private static async generateEthereumWallet(
    mnemonic: string,
    path: string
  ): Promise<WalletGenerationResult> {
    try {
      const seed = await mnemonicToSeed(mnemonic);
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(path);
      const wallet = new Wallet(child.privateKey);

      return {
        success: true,
        wallet: {
          path,
          public: wallet.address,
          secret: wallet.privateKey,
        },
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate Ethereum wallet",
      };
    }
  }
}
