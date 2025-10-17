"use client";
import { createScope, createTimeline } from "animejs";
import { useEffect, useRef } from "react";
import ChromeIcon from "../icons/ChromeIcon";
import Button from "../ui/Button";

const HeroSection = ({
  text,
  dotColor = "black",
  className = "",
  BadgeIcon,
}: {
  text: string;
  dotColor?: string;
  className?: string;
  BadgeIcon?: React.ReactNode;
}) => {
  const root = useRef(null);

  useEffect(() => {
    const scope = createScope({ root }).add(() => {
      const timeline = createTimeline({ autoplay: true });

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

        // Your existing Take Ctrl animation
        .add(".dot", {
          left: [{ from: "50%", to: "0%" }],
          ease: "inOut",
          duration: 400,
          opacity: 1,
        })
        .add(".dot", {
          left: [{ to: "calc(100% + 120px)", duration: 900 }],
          ease: "outBack(1.2)",
        })
        .add(
          ".textReveal",
          {
            clipPath: ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
            duration: 900,
          },
          "<<"
        );

      // Add badge animation if BadgeIcon is provided
      if (BadgeIcon) {
        timeline
          .add(".wordTake", {
            x: [{ to: -40, duration: 400 }],
            ease: "outQuad",
          })
          .add(
            ".wordCtrl",
            {
              x: [{ to: 40, duration: 400 }],
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

      // Button animation
      timeline.add(
        ".hero-button",
        {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 600,
          ease: "outQuad",
        },
        "-=700"
      );
    });

    return () => scope.revert();
  }, [dotColor, BadgeIcon]);

  // Split the text into "Take" and "Ctrl" if it contains both words
  const renderText = () => {
    if (BadgeIcon && text.includes("Take") && text.includes("Ctrl")) {
      return (
        <div className="flex items-center justify-center gap-1 md:gap-2 lg:gap-4 whitespace-nowrap">
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
        <div className="text-center mb-8 top-text" style={{ opacity: 0 }}>
          <p className="text-xl md:text-2xl lg:text-[28px]">One wallet</p>
          <p className="text-xl md:text-2xl lg:text-[28px]">
            for all your crypto
          </p>
        </div>

        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative text-center overflow-visible">
            <div
              style={{ backgroundColor: dotColor }}
              className="dot opacity-0 absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[50px] h-[50px] rounded-full"
            />
            <div
              className="textReveal font-medium leading-[100%] text-[200px] text-black w-[106%] flex justify-center align-middle"
              style={{ clipPath: "inset(0% 100% 0% 0%)" }}
            >
              {renderText()}
            </div>
          </div>
        </div>

        <div
          className="flex justify-center mb-20 hero-button"
          style={{ opacity: 0 }}
        >
          <Button icon={<ChromeIcon size={40} />}>Download for Chrome</Button>
        </div>

        <div className="h-40"></div>
      </div>
    </section>
  );
};

export default HeroSection;
