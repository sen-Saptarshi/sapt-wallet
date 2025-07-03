import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { generateMnemonic, validateMnemonic } from "bip39";
import { toast } from "sonner";

interface MnemonicContextType {
  mnemonic: string;
  hasMnemonic: boolean;
  isLoading: boolean;
  generateNewMnemonic: () => Promise<void>;
  importMnemonic: (mnemonicPhrase: string) => boolean;
  clearMnemonic: () => void;
}

const MnemonicContext = createContext<MnemonicContextType | undefined>(
  undefined
);

export function MnemonicProvider({ children }: { children: ReactNode }) {
  const [mnemonic, setMnemonic] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load mnemonic from localStorage on mount
  useEffect(() => {
    const storedMnemonic = localStorage.getItem("mnemonic");
    if (storedMnemonic) {
      setMnemonic(storedMnemonic);
    }
    setIsLoading(false);
  }, []);

  const generateNewMnemonic = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Add a small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newMnemonic = generateMnemonic();
      setMnemonic(newMnemonic);
      localStorage.setItem("mnemonic", newMnemonic);
      toast.success("New seed phrase generated successfully!");
    } catch (error) {
      toast.error("Failed to generate seed phrase");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const importMnemonic = (mnemonicPhrase: string): boolean => {
    const trimmedValue = mnemonicPhrase.trim();

    if (!trimmedValue) {
      toast.error("Please enter a seed phrase");
      return false;
    }

    if (!validateMnemonic(trimmedValue)) {
      toast.error("Invalid seed phrase. Please check and try again.");
      return false;
    }

    setMnemonic(trimmedValue);
    localStorage.setItem("mnemonic", trimmedValue);
    toast.success("Seed phrase imported successfully!");
    return true;
  };

  const clearMnemonic = (): void => {
    setMnemonic("");
    localStorage.removeItem("mnemonic");

    // Clear all wallet data
    const keys = Object.keys(localStorage).filter(
      (key) => key.startsWith("walletPaths-") || key.startsWith("walletData-")
    );
    keys.forEach((key) => localStorage.removeItem(key));

    toast.success("Seed phrase and all wallets cleared");
  };

  const value: MnemonicContextType = {
    mnemonic,
    hasMnemonic: Boolean(mnemonic),
    isLoading,
    generateNewMnemonic,
    importMnemonic,
    clearMnemonic,
  };

  return (
    <MnemonicContext.Provider value={value}>
      {children}
    </MnemonicContext.Provider>
  );
}

export function useMnemonic() {
  const context = useContext(MnemonicContext);
  if (context === undefined) {
    throw new Error("useMnemonic must be used within a MnemonicProvider");
  }
  return context;
}
