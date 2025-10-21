"use client";
import React, { useEffect, useRef } from "react";
import { createTimeline } from "animejs";
import OverviewHorizontalFeatureCard from "../ui/OverviewHorizontalFeatureCard";
import { RightCard3Svg } from "../icons/RightCard3Svg";

// Feature data
const overviewFeatures = [
  {
    title: "10M+ assets at your fingertips",
    description:
      "Ctrl supports all the newest memecoins and testnets on every EVM chain, Bitcoin, Ethereum, Cardano, Solana, THORChain, Midnight and more.",
    videoSrc: "/videos/overview-video-1.mp4",
  },
  {
    title: "All Chains. One Wallet.",
    description:
      "Experience seamless transactions across multiple chains in one place — no more switching apps or networks.",
    videoSrc: "/videos/overview-video-2.mp4",
  },
  {
    title: "Security Meets Speed",
    description:
      "Non-custodial and lightning-fast. You're always in control of your assets with enterprise-grade security.",
    videoSrc: "/videos/overview-video-3.mp4",
  },
];

// Main Overview Component
const Overview: React.FC = () => {
  const overviewRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !overviewRef.current ||
      !cardsContainerRef.current ||
      !heroTextRef.current
    )
      return;

    // Initialize all elements with starting positions
    const levelUpElement = heroTextRef.current.querySelector(
      ".level-up-text"
    ) as HTMLElement;
    const heroTextLines = heroTextRef.current.querySelectorAll(
      ".hero-text-line"
    ) as NodeListOf<HTMLElement>;
    const heroIcon = heroTextRef.current.querySelector(
      ".hero-icon"
    ) as HTMLElement;

    // Set initial states
    if (levelUpElement) {
      levelUpElement.style.opacity = "0";
      levelUpElement.style.transform = "translateX(200px)";
    }

    heroTextLines.forEach((line) => {
      line.style.opacity = "0";
      line.style.transform = "translateY(80px)";
    });

    if (heroIcon) {
      heroIcon.style.opacity = "0";
      heroIcon.style.transform = "translateY(80px) scale(0.8)";
    }

    // Initialize card states
    overviewFeatures.forEach((_, index) => {
      const cardElement = overviewRef.current?.querySelector(
        `.overview-card-${index}`
      ) as HTMLElement;

      if (cardElement) {
        cardElement.style.opacity = "0";
        cardElement.style.transform =
          "translateZ(-200px) translateY(100px) scale(0.8)";
      }
    });

    // Hero entrance animation observer
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timeline = createTimeline({ autoplay: true });

            // Level up text slides in from right
            timeline.add(".level-up-text", {
              translateX: [{ from: "200px", to: "0px" }],
              opacity: [{ from: 0, to: 1 }],
              duration: 1000,
              ease: "outExpo",
            });

            // Main hero text lines stagger up (like a typewriter effect)
            timeline.add(
              ".hero-text-line",
              {
                translateY: [{ from: "80px", to: "0px" }],
                opacity: [{ from: 0, to: 1 }],
                duration: 1200,
                ease: "outExpo",
                delay: (_, index) => index * 200, // Stagger each line
              },
              "-=600"
            ); // Start while level up is still animating

            // Hero icon animates in with the second line
            timeline.add(
              ".hero-icon",
              {
                translateY: [{ from: "80px", to: "0px" }],
                opacity: [{ from: 0, to: 1 }],
                scale: [{ from: 0.8, to: 1 }],
                duration: 1000,
                ease: "outExpo",
              },
              "-=800"
            ); // Sync with the second hero text line

            heroObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    // Card scroll animation observer
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const cardIndex = target.getAttribute("data-card-index");

            if (cardIndex !== null) {
              const timeline = createTimeline({ autoplay: true });

              timeline.add(target, {
                translateZ: [{ from: "-200px", to: "0px" }],
                translateY: [{ from: "100px", to: "0px" }],
                opacity: [{ from: 0, to: 1 }],
                scale: [{ from: 0.8, to: 1 }],
                rotateX: [{ from: "15deg", to: "0deg" }],
                duration: 2000,
                ease: "outExpo",
              });

              cardObserver.unobserve(target);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    // Observe hero section for entrance animations
    if (heroTextRef.current) {
      heroObserver.observe(heroTextRef.current);
    }

    // Observe card elements
    overviewFeatures.forEach((_, index) => {
      const cardElement = overviewRef.current?.querySelector(
        `.overview-card-${index}`
      );
      if (cardElement) {
        cardObserver.observe(cardElement);
      }
    });

    // Cleanup
    return () => {
      cardObserver.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={overviewRef}
      className="min-h-screen bg-white"
      style={{ perspective: "1000px" }}
    >
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="w-full max-w-screen-2xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20"
          ref={heroTextRef}
        >
          {/* Level up text */}
          <div className="flex justify-end mr-60 mb-4 sm:mb-6 md:mb-8">
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl level-up-text">
              <span className="text-green-600">. </span>
              <span className="text-black">Level up</span>
            </span>
          </div>

          {/* Main hero text */}
          <div className="font-medium font-serif space-y-1 sm:space-y-2 md:space-y-3 flex flex-col items-center">
            {/* All text lines in a left-aligned container that's centered */}
            <div className="text-left">
              {/* Capture every */}
              <h1 className="leading-[0.9] text-4xl sm:text-5xl md:text-6xl lg:text-7xl  xl:text-[11rem] hero-text-line">
                Capture every
              </h1>

              {/* opportunity + icon */}
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                <h1 className="leading-[0.9] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[11rem] tracking-tight hero-text-line">
                  opportunity
                </h1>
                <div className="hero-icon flex-shrink-0">
                  <RightCard3Svg size="clamp(48px, 9vw, 160px)" />
                </div>
              </div>

              {/* on every chain */}
              <h1 className="leading-[1.2] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[11rem] hero-text-line">
                on every chain.
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div
        ref={cardsContainerRef}
        className="flex flex-col space-y-16 pb-16"
        style={{ transformStyle: "preserve-3d" }}
      >
        {overviewFeatures.map((feature, index) => (
          <div
            key={index}
            className={`overview-card-${index}`}
            data-card-index={index}
            style={{
              transformStyle: "preserve-3d",
              opacity: 0,
              transform: "translateZ(-200px) translateY(100px) scale(0.8)",
            }}
          >
            <OverviewHorizontalFeatureCard
              title={feature.title}
              description={feature.description}
              videoSrc={feature.videoSrc}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;
