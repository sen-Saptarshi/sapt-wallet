import type { Blockchain } from "@/types/wallet";

export class WalletStorage {
  static getStorageKeys(blockchain: Blockchain) {
    return {
      paths: `walletPaths-${blockchain}`,
      data: `walletData-${blockchain}`,
    };
  }

  static getStoredPaths(blockchain: Blockchain): string[] {
    const { paths } = this.getStorageKeys(blockchain);
    try {
      return JSON.parse(localStorage.getItem(paths) || "[]");
    } catch {
      return [];
    }
  }

  static savePaths(blockchain: Blockchain, paths: string[]) {
    const { paths: pathKey } = this.getStorageKeys(blockchain);
    localStorage.setItem(pathKey, JSON.stringify(paths));
  }

  static getMnemonic(): string {
    return localStorage.getItem("mnemonic") || "";
  }
}
