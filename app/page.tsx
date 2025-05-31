import type { Metadata } from "next";
import { Navbar } from "./components/home/Navbar";
import { HeroSection } from "./components/home/HeroSection";
import { AboutSection } from "./components/home/AboutSection";
import { ServicesSection } from "./components/home/ServicesSection";
import { PortfolioSection } from "./components/home/PortfolioSection";
import { motion } from "framer-motion";
import { Footer } from "./components/home/Footer";
import VideoSection from "@/app/components/home/VideoSection";
import ExperienceSection from "@/app/components/home/ExperienceSection";
import TestimonialsSection from "@/app/components/home/TestimonialsSection";
import { FeaturedWorks } from "./components/home/FeaturedWorks";

export const metadata: Metadata = {
  title: "John Image",
  description:
    "LensCraft Studios provides premium photography and videography services for your special moments. We specialize in weddings, celebrations, and corporate events.",
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Navbar showNav={true} />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        {/* <ExperienceSection /> */}
        <PortfolioSection />
        <VideoSection />
        <TestimonialsSection />
        {/* <FeaturedWorks /> */}
      </main>
      <Footer />
    </div>
  );
}
