"use client";

import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Globe, Key } from "lucide-react";

export default function Description() {
  const features = [
    { name: "Multiple Wallets", icon: Key },
    { name: "Multi-Chain", icon: Globe },
    { name: "Secure", icon: Shield },
    { name: "Fast", icon: Zap },
  ];

  const supportedNetworks = ["Solana", "Ethereum"];

  return (
    <div className="relative overflow-hidden">
      {/* Abstract gradient aura with color transitions from top right */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-500/25 via-purple-500/20 to-cyan-500/15 rounded-full blur-3xl -translate-y-40 translate-x-40 pointer-events-none animate-pulse" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-400/30 via-blue-400/25 to-teal-400/20 rounded-full blur-2xl -translate-y-20 translate-x-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-bl from-violet-300/20 via-blue-300/15 to-emerald-300/10 rounded-full blur-xl -translate-y-10 translate-x-10 pointer-events-none" />

      <div className="relative space-y-12 py-16 px-6 max-w-6xl mx-auto text-center">
        {/* Hero Content */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl mt-8 sm:mt-18 font-bold tracking-tight bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            Generate secure wallets for multiple blockchain networks
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Create and manage cryptocurrency wallets with industry-standard
            security. Generate seed phrases and derive multiple wallet addresses
            for different blockchain networks.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 group-hover:scale-105">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground/80">
                {feature.name}
              </span>
            </div>
          ))}
        </div>

        {/* Supported Networks */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-medium text-muted-foreground">
            Supported Networks
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            {supportedNetworks.map((network) => (
              <Badge
                key={network}
                variant="outline"
                className="text-sm px-4 py-1 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 transition-all duration-300 hover:scale-105"
              >
                {network}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
