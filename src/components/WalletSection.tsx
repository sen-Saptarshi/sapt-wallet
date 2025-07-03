"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LayoutGrid, List, Plus, Wallet, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { WalletCard } from "./WalletCard";
import { WalletGenerator } from "@/utils/wallet-generator";
import { WalletStorage } from "@/utils/storage";
import { useMnemonic } from "@/contexts/mnemonic-context";
import type { Blockchain, WalletKey } from "@/types/wallet";

export default function WalletSection() {
  const { mnemonic, hasMnemonic } = useMnemonic();
  const [wallets, setWallets] = useState<WalletKey[]>([]);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [blockchain, setBlockchain] = useState<Blockchain>("solana");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing wallets when mnemonic or blockchain changes
  useEffect(() => {
    if (hasMnemonic) {
      loadExistingWallets();
    } else {
      // Clear wallets when no mnemonic
      setWallets([]);
      setError(null);
    }
  }, [mnemonic, blockchain, hasMnemonic]);

  const loadExistingWallets = async () => {
    if (!mnemonic) {
      setWallets([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const storedPaths = WalletStorage.getStoredPaths(blockchain);
      if (storedPaths.length === 0) {
        setWallets([]);
        return;
      }

      const regeneratedWallets = await WalletGenerator.regenerateWallets(
        blockchain,
        mnemonic,
        storedPaths
      );
      setWallets(regeneratedWallets);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load wallets";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const addWallet = async () => {
    if (!mnemonic) {
      toast.error("No mnemonic found. Please generate a seed phrase first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await WalletGenerator.generateWallet(
        blockchain,
        mnemonic,
        wallets.length
      );

      if (!result.success || !result.wallet) {
        throw new Error(result.error || "Failed to generate wallet");
      }

      const updatedWallets = [...wallets, result.wallet];
      setWallets(updatedWallets);

      // Save paths to localStorage
      WalletStorage.savePaths(
        blockchain,
        updatedWallets.map((w) => w.path)
      );

      toast.success(
        `${
          blockchain.charAt(0).toUpperCase() + blockchain.slice(1)
        } wallet created successfully!`
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create wallet";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWallet = (indexToDelete: number) => {
    const updatedWallets = wallets.filter(
      (_, index) => index !== indexToDelete
    );
    setWallets(updatedWallets);

    // Update localStorage
    WalletStorage.savePaths(
      blockchain,
      updatedWallets.map((w) => w.path)
    );

    toast.success("Wallet deleted successfully");
  };

  const toggleLayout = () => {
    setLayout((prev) => (prev === "grid" ? "list" : "grid"));
  };

  if (!hasMnemonic) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No seed phrase found. Please generate or import a seed phrase first
            to create wallets.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Wallet Generator</h2>
        </div>

        <div className="flex items-center gap-3">
          <Select
            value={blockchain}
            onValueChange={(value: Blockchain) => setBlockchain(value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solana">Solana</SelectItem>
              <SelectItem value="ethereum">Ethereum</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={toggleLayout}>
            {layout === "grid" ? (
              <List className="w-4 h-4" />
            ) : (
              <LayoutGrid className="w-4 h-4" />
            )}
          </Button>

          <Button onClick={addWallet} disabled={isLoading}>
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Add Wallet</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Wallets Grid/List */}
      {!isLoading && wallets.length === 0 ? (
        <div className="text-center py-12">
          <Wallet className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No wallets yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first {blockchain} wallet to get started
          </p>
          <Button onClick={addWallet} disabled={isLoading}>
            <Plus className="w-4 h-4 mr-2" />
            Create Wallet
          </Button>
        </div>
      ) : (
        <div
          className={
            layout === "grid"
              ? "grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              : "flex flex-col gap-4"
          }
        >
          {wallets.map((wallet, index) => (
            <WalletCard
              key={`${blockchain}-${index}`}
              wallet={wallet}
              index={index}
              blockchain={blockchain}
              onDelete={deleteWallet}
              layout={layout}
            />
          ))}
        </div>
      )}
    </div>
  );
}
