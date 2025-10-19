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

const SecurityHighlights = () => {
  const securityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardsElement = document.querySelector(
      ".security-cards"
    ) as HTMLElement;
    if (cardsElement) {
      cardsElement.style.opacity = "0";
      cardsElement.style.transform = "translateY(300px)";
    }

    const securityScrollTimeline = createTimeline({
      autoplay: onScroll({
        container: "body",
        sync: 0.35,
        target: ".security-scroll-wrapper",
        // 👇 Start 20px earlier than top of viewport
        enter: "top+=20px center",
        leave: "bottom bottom",
      }),
    });

    // --- Step 1: Cards rise + header fade in perfect sync ---
    securityScrollTimeline
      .add(".security-cards", {
        translateY: [{ from: "300px", to: "-20px" }],
        opacity: [{ from: 0, to: 1 }],
        duration: 3500,
        ease: "outExpo",
      })
      .add(".section-header", {
        translateY: [{ from: "0px", to: "-160px" }],
        opacity: [{ from: 1, to: 0 }],
        scale: [{ from: 1, to: 0.8 }],
        duration: 5500,
        ease: "easeOutCubic",
        offset: "-=3500", // run together
      });

    // --- Step 2: Pause briefly at center before slide ---
    securityScrollTimeline.add(".security-cards", {
      translateX: [{ from: "0px", to: "0px" }],
      duration: 1000,
      ease: "linear",
    });

    // --- Step 3: Slide left smoothly after fade ---
    securityScrollTimeline.add(".security-cards", {
      translateX: [{ from: "0px", to: "-180px" }],
      duration: 2500,
      ease: "inOutQuad",
    });

    return () => {
      securityScrollTimeline.pause();
    };
  }, []);

  return (
    <div
      ref={securityRef}
      className="security-scroll-wrapper w-full flex flex-col py-28 justify-center bg-[#F4F4F4] min-h-[400vh]"
    >
      <div className="px-32 sticky top-0">
        <div className="section-header">
          {/* Header */}
          <div className="flex justify-end">
            <span className="text-5xl mr-96 rounded-full font-semibold">
              <span className="text-green-600">. </span>
              <span className="text-black">Secure and private</span>
            </span>
          </div>

          {/* Main Title */}
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

        {/* Info Cards Section */}
        <div className="flex p-10 justify-end gap-x-4 mt-32 h-[41rem] security-cards">
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
    </div>
  );
};

export default SecurityHighlights;
