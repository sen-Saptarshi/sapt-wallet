import Description from "./components/Description";
import Footer from "./components/Footer";
import MnemonicSection from "./components/Mnemonic";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/sonner";
import WalletSection from "./components/WalletSection";

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-screen">
        <Description />
        <MnemonicSection />
        <WalletSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
