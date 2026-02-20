import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsMarquee from "@/components/StatsMarquee";
import WhaleFeed from "@/components/WhaleFeed";
import WalletTracker from "@/components/WalletTracker";
import ProGate from "@/components/ProGate";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import WelcomeModal from "@/components/WelcomeModal";

export default function Home() {
  return (
    <main>
      <WelcomeModal />
      <Navbar />
      <Hero />
      <StatsMarquee />
      <WhaleFeed />
      <WalletTracker />
      <ProGate />
      <HowItWorks />
      <Footer />
    </main>
  );
}
