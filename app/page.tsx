"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import PortfolioSkeleton from "@/components/skeletons/PortfolioSkeleton";
import SectionSkeleton from "@/components/skeletons/SectionSkeleton";

const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => <SectionSkeleton />,
});
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"), {
  loading: () => <SectionSkeleton />,
});
const Portfolio = dynamic(() => import("@/components/sections/Portfolio"), {
  loading: () => <PortfolioSkeleton />,
  ssr: false,
});
const Pricing = dynamic(() => import("@/components/sections/Pricing"), {
  loading: () => <SectionSkeleton />,
});
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <SectionSkeleton />,
});
const Footer = dynamic(() => import("@/components/layout/Footer"));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <Portfolio />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
