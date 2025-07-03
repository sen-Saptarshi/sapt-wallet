import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { MnemonicProvider } from "./contexts/mnemonic-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MnemonicProvider>
        <App />
      </MnemonicProvider>
    </ThemeProvider>
  </StrictMode>
);
