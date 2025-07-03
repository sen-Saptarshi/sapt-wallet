export type Blockchain = "solana" | "ethereum";

export interface WalletKey {
  public: string;
  secret: string;
  path: string;
}

export interface WalletGenerationResult {
  success: boolean;
  wallet?: WalletKey;
  error?: string;
}
