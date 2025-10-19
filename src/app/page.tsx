"use client";
import CtrlBadgeIcon from "@/components/icons/ctrlBadgeIcon";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ChainWallet from "@/components/sections/ChainWallet";
import Community from "@/components/sections/Community";
import FAQSection from "@/components/sections/Faq";
import FeaturesSection from "@/components/sections/Features";
import FloatingDownloadBtn from "@/components/sections/FloatingDownloadBtn";
import HeroSection from "@/components/sections/HeroSection";
import Overview from "@/components/sections/Overview";
import SecurityHighlights from "@/components/sections/SecurityHighlights";
import { AnimationProvider } from "@/context/AnimationContext";

export default function Home() {
  return (
    <AnimationProvider>
      <Header />
      <HeroSection BadgeIcon={<CtrlBadgeIcon size={120} />} text="Take Ctrl" />
      <FloatingDownloadBtn />
      <FeaturesSection />
      <ChainWallet />
      <Overview />
      <Community />
      <SecurityHighlights />
      <FAQSection />
      <Footer />
    </AnimationProvider>
  );
}
