import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsMarquee from "@/components/StatsMarquee";
import Leaderboard from "@/components/Leaderboard";
import FeeTracker from "@/components/FeeTracker";
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
      <Leaderboard />
      <FeeTracker />
      <HowItWorks />
      <Footer />
    </main>
  );
}
