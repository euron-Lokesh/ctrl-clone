"use client";
import { createTimeline } from "animejs";
import { useEffect, useRef } from "react";
import ChromeIcon from "../icons/ChromeIcon";
import Button from "../ui/Button";
import { useAnimation } from "@/context/AnimationContext";

interface HeroSectionProps {
  text: string;
  dotColor?: string;
  className?: string;
  BadgeIcon?: React.ReactNode;
}

export default function HeroSection({
  text,
  dotColor = "black",
  className = "",
  BadgeIcon,
}: HeroSectionProps) {
  const root = useRef(null);
  const { phase, setPhase } = useAnimation();

  // Auto-start animation when component mounts
  useEffect(() => {
    if (phase === "idle") {
      // Small delay to ensure everything is rendered
      setTimeout(() => setPhase("hero"), 100);
    }
  }, [phase, setPhase]);

  // Run hero animation when phase changes to 'hero'
  useEffect(() => {
    if (phase === "hero") {
      const timeline = createTimeline({
        autoplay: true,
        onComplete: () => {
          // Move to header phase when hero content completes (without button)
          setPhase("header");
        },
      });

      // Top text animation
      timeline
        .add(
          ".top-text",
          {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            ease: "outQuad",
          },
          500
        )
        .add(".dot", {
          left: [{ from: "50%", to: "0%" }],
          ease: "inOut",
          duration: 300, // Changed from 400 to 200 (2x faster)
          opacity: 1,
        })
        .add(".dot", {
          left: [{ to: "calc(100% + 80px)", duration: 600 }], // Changed from 900 to 400 (2.25x faster)
          ease: "outBack(1.2)",
        })
        .add(
          ".textReveal",
          {
            clipPath: ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
            duration: 600, // Changed from 900 to 400 (2.25x faster)
          },
          "<<"
        );

      // Badge animation if provided
      if (BadgeIcon) {
        timeline
          .add(".wordTake", {
            x: [{ to: -40, duration: 400 }],
            ease: "outQuad",
          })
          .add(
            ".wordCtrl",
            {
              x: [{ to: 10, duration: 400 }],
              ease: "outQuad",
            },
            "<<"
          )
          .add(
            ".badgeIcon",
            {
              scale: [{ from: 0, to: 1, duration: 500 }],
              opacity: [{ from: 0, to: 1, duration: 500 }],
              ease: "outBack(1.5)",
            },
            "<<+200"
          );
      }

      // Button animation removed from here - will be handled in separate phase
    }
  }, [phase, BadgeIcon, setPhase]);

  // Handle button animation separately when header is done
  useEffect(() => {
    if (phase === "button") {
      const timeline = createTimeline({
        autoplay: true,
      });

      // Button expansion animation - width grows from icon size to full size
      timeline
        .add(".hero-button", {
          scaleX: [0.2, 1], // Start narrow (icon width), expand to full width
          opacity: [0, 1],
          duration: 600,
          ease: "outCubic",
        })
        // Text slides up from bottom to center simultaneously
        .add(
          ".button-text",
          {
            translateY: [20, 0], // Slide up from below
            opacity: [0, 1],
            duration: 400,
            ease: "outQuad",
          },
          "-=400" // Start 200ms before button expansion finishes
        );
    }
  }, [phase]);

  // Split text logic
  const renderText = () => {
    if (BadgeIcon && text.includes("Take") && text.includes("Ctrl")) {
      return (
        <div className="flex items-center justify-center gap-1 whitespace-nowrap">
          <span className="wordTake inline-block">{text.split(" ")[0]}</span>
          <span
            className="badgeIcon inline-block"
            style={{ opacity: 0, transform: "scale(0)" }}
          >
            <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] xl:w-[120px] xl:h-[120px]">
              {BadgeIcon}
            </div>
          </span>
          <span className="wordCtrl inline-block">{text.split(" ")[1]}</span>
        </div>
      );
    }
    return text;
  };

  return (
    <section className={`min-h-screen bg-[#FAFAFA] pt-72 pb-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-6" ref={root}>
        <div className="text-center mb-2 top-text" style={{ opacity: 0 }}>
          <p className="text-xl md:text-2xl lg:text-[28px]">One wallet</p>
          <p className="text-xl md:text-2xl lg:text-[28px]">
            for all your crypto
          </p>
        </div>

        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative text-center overflow-visible">
            <div
              style={{ backgroundColor: dotColor }}
              className="dot opacity-0 absolute bottom-[10%] left-1/2 font-[Tomato Grotesk,Arial,sans-serif] -translate-x-1/2 w-[50px] h-[50px] rounded-full"
            />
            <div
              className="textReveal font-medium leading-[100%] text-[160px] text-black w-[111%] flex justify-center align-middle"
              style={{ clipPath: "inset(0% 100% 0% 0%)" }}
            >
              {renderText()}
            </div>
          </div>
        </div>

        {/* Download button with special animation structure */}
        <div
          className="flex justify-center mt-16 hero-button"
          style={{
            opacity: 0,
            transformOrigin: "center",
            transform: "scaleX(0.2)", // Start narrow (icon width only)
          }}
        >
          <Button
            icon={<ChromeIcon size={40} />}
            className="relative overflow-hidden"
          >
            <span
              className="button-text inline-block"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
              }}
            >
              Download for Chrome
            </span>
          </Button>
        </div>

        <div className="h-40"></div>
      </div>
    </section>
  );
}
