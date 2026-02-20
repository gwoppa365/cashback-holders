import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Leaderboard from "@/components/Leaderboard";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import WelcomeModal from "@/components/WelcomeModal";

export default function Home() {
  return (
    <main>
      <WelcomeModal />
      <Navbar />
      <Hero />
      <Leaderboard />
      <HowItWorks />
      <Footer />
    </main>
  );
}
