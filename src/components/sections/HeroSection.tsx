"use client";
import { createTimeline } from "animejs";
import { useEffect, useRef } from "react";
import { useAnimation } from "@/context/AnimationContext";
import { HeroSectionProps } from "@/types/HeroSection";

export default function HeroSection({
  text,
  dotColor = "black",
  className = "",
  BadgeIcon,
}: HeroSectionProps) {
  const root = useRef(null);
  const { phase, setPhase } = useAnimation();

  useEffect(() => {
    if (phase === "idle") {
      setTimeout(() => setPhase("hero"), 100);
    }
  }, [phase, setPhase]);

  useEffect(() => {
    if (phase === "hero") {
      const timeline = createTimeline({
        autoplay: true,
        onComplete: () => {
          setPhase("header");
        },
      });

      timeline
        .add(
          ".top-text",
          {
            opacity: [0, 1],
            translateY: [140, 0],
            duration: 400,
            ease: "outQuad",
          },
          300
        )
        .add(
          ".dot",
          {
            left: [{ from: "50%", to: "0%" }],
            ease: "inOut",
            duration: 300,
            opacity: 1,
          },
          "-=100"
        )
        .add(".dot", {
          left: [{ to: "calc(100% + 80px)", duration: 600 }],
          ease: "outBack(1.2)",
        })
        .add(
          ".textReveal",
          {
            clipPath: ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
            duration: 600,
          },
          "<<"
        );

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
    }
  }, [phase, BadgeIcon, setPhase]);

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
    <section className={` pt-72 ${className}`}>
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
      </div>
    </section>
  );
}
