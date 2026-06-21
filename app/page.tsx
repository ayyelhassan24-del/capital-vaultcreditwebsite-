import Header from "@/components/Header";
import VideoUnlockHero from "@/components/VideoUnlockHero";
import StatsBar from "@/components/StatsBar";
import FounderStory from "@/components/FounderStory";
import ProblemSection from "@/components/ProblemSection";
import CreditQuiz from "@/components/CreditQuiz";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Guarantee from "@/components/Guarantee";
import Testimonials from "@/components/Testimonials";
import FounderMessage from "@/components/FounderMessage";
import Urgency from "@/components/Urgency";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <VideoUnlockHero />
        <StatsBar />
        <FounderStory />
        <ProblemSection />
        <CreditQuiz />
        <div id="process">
          <Process />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <Guarantee />
        <div id="testimonials">
          <Testimonials />
        </div>
        <FounderMessage />
        <Urgency />
        <div id="faq">
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  );
}
