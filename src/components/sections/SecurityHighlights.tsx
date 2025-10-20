"use client";
import React, { useEffect, useRef } from "react";
import { createTimeline, onScroll } from "animejs";
import SecurityHeadingIcon from "../icons/SecurityHeadingIcon";
import { InfoCard } from "../ui/InfoCard";

const SecurityDetails = [
  {
    title: "Portfolio overview",
    subtext: "Track your entire portfolio in one place.",
    videoSrc: "/videos/security-video-1.mp4",
  },
  {
    title: "Hardware wallet support",
    subtext: "Keeps funds safe on your Ledger / Trezor.",
    videoSrc: "/videos/security-video-2.mp4",
  },
  {
    title: "Malicious address alerts",
    subtext: "We flag malicious and suspicious addresses for you.",
    videoSrc: "/videos/security-video-3.mp4",
  },
  {
    title: "No IP tracking",
    subtext: "We do not record any user IP addresses.",
    videoSrc: "/videos/security-video-4.mp4",
  },
];

const SecurityHighlights: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = document.querySelector(
      ".section-header"
    ) as HTMLElement | null;
    const cards = document.querySelector(
      ".security-cards"
    ) as HTMLElement | null;
    if (!header || !cards) return;

    // --- Initial states ---
    header.style.opacity = "1";
    header.style.transform = "translateY(0px) scale(1)";
    cards.style.opacity = "1";
    cards.style.transform = "translateY(0px) translateX(0px)";

    const tl = createTimeline({
      autoplay: onScroll({
        container: "body",
        target: ".security-scroll-wrapper",
        sync: 0.01, // slower scroll sync (was 0.5)
        enter: "top top",
        leave: "bottom bottom",
      }),
      defaults: {
        duration: 5500, // increased base duration
      },
    });

    // === Phase 1: Lift cards + fade header ===
    tl.add(".security-cards", {
      translateY: [{ from: "0px", to: "-220px" }],
      opacity: [{ from: 0.85, to: 1 }],
      duration: 6000, // increased from 2400
      easing: "easeOutExpo",
    }).add(
      ".section-header",
      {
        translateY: [{ from: "0px", to: "-120px" }],
        opacity: [{ from: 1, to: 0 }],
        scale: [{ from: 1, to: 0.85 }],
        duration: 6000, // increased from 2600
        easing: "easeInOutSine",
      },
      "-=3000" // adjusted overlap
    );

    // === Phase 2: Hold at center ===
    tl.add(".security-cards", {
      translateY: [{ from: "-220px", to: "-230px" }],
      duration: 5000, // increased from 1000
      easing: "linear",
    });

    // === Phase 3: Slide left (stop at viewport edge) ===
    tl.add(".security-cards", {
      translateX: [{ from: "0px", to: "-280px" }],
      duration: 4500, // increased from 2600
      easing: "easeInOutCubic",
    });

    // === Phase 4: Exit fade ===
    tl.add(".security-cards", {
      translateY: [{ from: "-230px", to: "-380px" }],
      opacity: [{ from: 1, to: 0.6 }],
      duration: 2500, // increased from 1400
      easing: "easeInOutSine",
    });

    // ✅ Cleanup
    return () => {
      tl.pause();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="security-scroll-wrapper pt-38 relative bg-[#F4F4F4] w-full flex flex-col"
    >
      <div className="sticky top-30 min-h-screen flex flex-col justify-center">
        {/* === Header === */}
        <div className="px-28 section-header  mb-20 text-center">
          <div className="flex justify-end">
            <span className="text-5xl mr-96 rounded-full font-semibold">
              <span className="text-green-600">. </span>
              <span className="text-black">Secure and private</span>
            </span>
          </div>

          <div className="font-sans text-center mt-10">
            <h1 className="text-[13rem] leading-[1]">The Secure way</h1>
            <div className="flex justify-start gap-x-10 ml-20 items-baseline text-[12rem]">
              <span className="relative top-[0.1em] hero-icon">
                <SecurityHeadingIcon size={155} />
              </span>
              <h1 className="leading-[0.5]">to Web3</h1>
            </div>
          </div>
        </div>

        {/* === Cards (flush right) === */}
        <div className="security-cards px-6 flex justify-end gap-x-4 h-[36rem]">
          {SecurityDetails.map((card, index) => (
            <InfoCard
              key={index}
              title={card.title}
              subtext={card.subtext}
              videoSrc={card.videoSrc}
              svgComponent={null}
              className="w-[21rem] rounded-4xl transform transition-transform duration-700 hover:-translate-y-8"
              titleClassName="text-[28px] font-medium text-black"
              subtextClassName="text-lg text-gray-800 mt-4"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityHighlights;
