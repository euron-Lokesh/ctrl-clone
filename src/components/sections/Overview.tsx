"use client";
import React, { useEffect, useRef } from "react";
import { createTimeline } from "animejs";
import RightCard3Svg from "../icons/RightCard3Svg";
import OverviewHorizontalFeatureCard from "../ui/OverviewHorizontalFeatureCard";

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

const Overview: React.FC = () => {
  const overviewRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overviewRef.current || !cardsContainerRef.current) return;

    // Set initial states for cards (hidden and translated back)
    overviewFeatures.forEach((_, index) => {
      const cardElement = overviewRef.current?.querySelector(
        `.overview-card-${index}`
      );
      if (cardElement) {
        (cardElement as HTMLElement).style.opacity = "0";
        (cardElement as HTMLElement).style.transform =
          "translateZ(-200px) translateY(100px) scale(0.8)";
      }
    });

    // Create intersection observer for scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -20% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const cardIndex = target.getAttribute("data-card-index");

          if (cardIndex !== null) {
            // Create timeline for this specific card
            const timeline = createTimeline({
              autoplay: true,
            });

            timeline.add(target, {
              translateZ: [{ from: "-200px", to: "0px" }],
              translateY: [{ from: "100px", to: "0px" }],
              opacity: [{ from: 0, to: 1 }],
              scale: [{ from: 0.8, to: 1 }],
              rotateX: [{ from: "15deg", to: "0deg" }],
              duration: 2000,
              ease: "outExpo",
            });

            // Unobserve after animation triggers
            observer.unobserve(target);
          }
        }
      });
    }, observerOptions);

    // Observe all card elements
    overviewFeatures.forEach((_, index) => {
      const cardElement = overviewRef.current?.querySelector(
        `.overview-card-${index}`
      );
      if (cardElement) {
        observer.observe(cardElement);
      }
    });

    // Hero text animation observer
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timeline = createTimeline({
              autoplay: true,
            });

            timeline
              .add(".hero-text-line", {
                translateY: [{ from: "50px", to: "0px" }],
                opacity: [{ from: 0.7, to: 1 }],
                duration: 800,
                ease: "outQuad",
              })
              .add(
                ".hero-icon",
                {
                  rotate: [{ from: "0deg", to: "360deg" }],
                  scale: [{ from: 1, to: 1.1 }],
                  duration: 1000,
                  ease: "inOutQuad",
                },
                "-=600"
              );

            heroObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (heroTextRef.current) {
      heroObserver.observe(heroTextRef.current);
    }

    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={overviewRef}
      className="min-h-screen bg-[#FFFFFF]"
      style={{ perspective: "1000px" }}
    >
      {/* First Section - Capture every opportunity */}
      <div className="min-h-screen flex items-center justify-center">
        {/* Left Side - Text */}
        <div className="w-full px-52" ref={heroTextRef}>
          <div className="flex justify-self-end mr-50">
            <span className="text-5xl rounded-full hero-text-line">
              <span className="text-green-600">. </span>
              <span className="text-black">Level up</span>
            </span>
          </div>
          <div className="py-20 w-full font-medium font-serif">
            <h1 className="leading-[0.5] text-[12rem] hero-text-line">
              Capture every
            </h1>
            <div className="flex items-baseline gap-4 text-[12rem] hero-text-line">
              <h1 className="tracking-tight">opportunity</h1>
              <span className="relative top-[0.2em] hero-icon">
                <RightCard3Svg size={155} />
              </span>
            </div>
            <h1 className="leading-[0.8] text-[12rem] hero-text-line">
              {" "}
              on every chain.
            </h1>
          </div>
        </div>
      </div>

      {/* Features Cards Container */}
      <div
        ref={cardsContainerRef}
        className="flex flex-col space-y-16"
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
