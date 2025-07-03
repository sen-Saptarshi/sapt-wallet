import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";
import { Wallet2, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 xl:max-w-6xl xl:mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
              <Wallet2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight">
                  Sapt Wallet
                </h1>
                <Badge
                  variant="secondary"
                  className="text-xs font-mono hidden sm:inline-flex"
                >
                  v1.0
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Secure Web3 wallet generator
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden sm:inline-flex"
          >
            <a
              href="https://github.com/sen-Saptarshi/sapt-wallet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
