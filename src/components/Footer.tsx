import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container p-4 mx-auto max-w-6xl space-y-6">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>by Sapt</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap justify-center">
            <a
              href="https://github.com/sen-Saptarshi/sapt-wallet"
              target="_blank"
              className="hover:text-foreground transition-colors"
            >
              Codebase
            </a>
            <a
              href="https://blog.saptarshi.online/#/blog/how-web3-wallet-works"
              className="hover:text-foreground transition-colors"
              target="_blank"
            >
              Documentation
            </a>
          </div>
        </div>

        {/* Security Notice */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
            <strong>Security Notice:</strong> This wallet generator runs
            entirely in your browser. Your seed phrases and private keys are
            never transmitted to any server. Always verify the authenticity of
            this application and use it on a secure, offline device for maximum
            security.
          </p>
        </div>
      </div>
    </footer>
  );
}
