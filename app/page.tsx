import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CaseStudy from "@/components/CaseStudy";
import WhyVault from "@/components/WhyVault";
import FundingMenu from "@/components/FundingMenu";
import HowWeWork from "@/components/HowWeWork";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Stats />
        <CaseStudy />
        <WhyVault />
        <FundingMenu />
        <HowWeWork />
        <FAQ />
        <LeadForm />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
