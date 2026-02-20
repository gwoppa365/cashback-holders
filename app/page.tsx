import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsMarquee from "@/components/StatsMarquee";
import Leaderboard from "@/components/Leaderboard";
import YieldCalculator from "@/components/YieldCalculator";
import HowItWorks from "@/components/HowItWorks";
import FeeTracker from "@/components/FeeTracker";
import Footer from "@/components/Footer";
import WelcomeModal from "@/components/WelcomeModal";

export default function Home() {
  return (
    <main>
      <WelcomeModal />
      <Navbar />
      <Hero />
      <StatsMarquee />
      <Leaderboard />
      <YieldCalculator />
      <HowItWorks />
      <FeeTracker />
      <Footer />
    </main>
  );
}
