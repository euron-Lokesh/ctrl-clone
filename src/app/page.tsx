"use client";
import CtrlBadgeIcon from "@/components/icons/ctrlBadgeIcon";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import { AnimationProvider } from "@/context/AnimationContext";

export default function Home() {
  return (
    <AnimationProvider>
      <Header />
      <HeroSection BadgeIcon={<CtrlBadgeIcon size={120} />} text="Take Ctrl" />

      {/* Temporary sections for testing scroll */}
      <section className="min-h-screen flex items-center justify-center bg-white">
        <h2 className="text-4xl font-bold">Section 2</h2>
      </section>
      <section className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <h2 className="text-4xl font-bold">Section 3</h2>
      </section>
    </AnimationProvider>
  );
}
