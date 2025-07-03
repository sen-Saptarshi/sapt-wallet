"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash, Copy, Eye, EyeOff, Check } from "lucide-react";
import { toast } from "sonner";
import type { WalletKey, Blockchain } from "@/types/wallet";

interface WalletCardProps {
  wallet: WalletKey;
  index: number;
  blockchain: Blockchain;
  onDelete: (index: number) => void;
  layout: "grid" | "list";
}

export function WalletCard({
  wallet,
  index,
  blockchain,
  onDelete,
  layout,
}: WalletCardProps) {
  const [showSecret, setShowSecret] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(`${field} copied to clipboard!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const truncateAddress = (address: string, start = 6, end = 4) => {
    if (address.length <= start + end) return address;
    return `${address.slice(0, start)}...${address.slice(-end)}`;
  };

  return (
    <Card className="relative group hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Wallet #{index + 1}</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {blockchain.charAt(0).toUpperCase() + blockchain.slice(1)}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(index)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Public Key */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              Public Address
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(wallet.public, "Public address")}
              className="h-6 px-2"
            >
              {copiedField === "Public address" ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </Button>
          </div>
          <div className="bg-muted/50 rounded-md p-3 font-mono text-sm break-all">
            {layout === "list" ? wallet.public : truncateAddress(wallet.public)}
          </div>
        </div>

        {/* Private Key */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              Private Key
            </label>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSecret(!showSecret)}
                className="h-6 px-2"
              >
                {showSecret ? (
                  <EyeOff className="w-3 h-3" />
                ) : (
                  <Eye className="w-3 h-3" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(wallet.secret, "Private key")}
                className="h-6 px-2"
                disabled={!showSecret}
              >
                {copiedField === "Private key" ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </Button>
            </div>
          </div>
          <div className="bg-muted/50 rounded-md p-3 font-mono text-sm break-all">
            {showSecret
              ? layout === "list"
                ? wallet.secret
                : truncateAddress(wallet.secret, 8, 8)
              : "••••••••••••••••••••••••••••••••"}
          </div>
        </div>

        {/* Derivation Path */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Derivation Path
          </label>
          <div className="bg-muted/50 rounded-md p-2 font-mono text-xs text-muted-foreground">
            {wallet.path}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
