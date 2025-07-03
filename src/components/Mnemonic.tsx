"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import {
  Copy,
  Trash,
  Eye,
  EyeOff,
  Key,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { useMnemonic } from "@/contexts/mnemonic-context";
import { toast } from "sonner";

export default function MnemonicSection() {
  const {
    mnemonic,
    hasMnemonic,
    isLoading,
    generateNewMnemonic,
    importMnemonic,
    clearMnemonic,
  } = useMnemonic();
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importValue, setImportValue] = useState("");

  const copyMnemonic = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic);
      toast.success("Seed phrase copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy seed phrase");
    }
  };

  const handleImport = () => {
    const success = importMnemonic(importValue);
    if (success) {
      setIsImporting(false);
      setImportValue("");
      setShowMnemonic(true);
    }
  };

  const handleClear = () => {
    clearMnemonic();
    setShowMnemonic(false);
  };

  const renderMnemonicWords = () => {
    if (!mnemonic) return null;

    const words = mnemonic.split(" ");

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {words.map((word, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 bg-muted/50 hover:bg-muted/70 border rounded-lg transition-colors"
            >
              <span className="text-xs text-muted-foreground font-mono w-6">
                {index + 1}.
              </span>
              <span className="font-mono font-medium select-all">
                {showMnemonic ? word : "••••••"}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMnemonic(!showMnemonic)}
          >
            {showMnemonic ? (
              <EyeOff className="w-4 h-4 mr-2" />
            ) : (
              <Eye className="w-4 h-4 mr-2" />
            )}
            {showMnemonic ? "Hide" : "Show"} Seed Phrase
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyMnemonic}
            disabled={!showMnemonic}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            <CardTitle>Seed Phrase Management</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Warning Alert */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Your seed phrase is the master key to
              all your wallets. Store it securely and never share it with
              anyone. Anyone with access to your seed phrase can control your
              funds.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={generateNewMnemonic} disabled={isLoading}>
              {isLoading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Key className="w-4 h-4 mr-2" />
              )}
              {hasMnemonic ? "Generate New" : "Generate Seed Phrase"}
            </Button>

            <Button
              variant="outline"
              onClick={() => setIsImporting(!isImporting)}
            >
              Import Existing
            </Button>

            {hasMnemonic && (
              <Button variant="destructive" onClick={handleClear}>
                <Trash className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {/* Import Section */}
          {isImporting && (
            <div className="space-y-3 p-4 border rounded-lg bg-muted/20">
              <h4 className="font-medium">Import Seed Phrase</h4>
              <Textarea
                placeholder="Enter your 12 or 24 word seed phrase..."
                value={importValue}
                onChange={(e) => setImportValue(e.target.value)}
                className="min-h-20"
              />
              <div className="flex gap-2">
                <Button onClick={handleImport} size="sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Import
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsImporting(false);
                    setImportValue("");
                  }}
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Mnemonic Display */}
          {hasMnemonic ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Seed Phrase Ready</span>
              </div>
              {renderMnemonicWords()}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Key className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>
                No seed phrase found. Generate a new one or import an existing
                seed phrase to get started.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
