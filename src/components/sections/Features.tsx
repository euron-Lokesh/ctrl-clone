"use client";
import { useEffect } from "react";
import { createTimeline, onScroll } from "animejs";
import { Zap, Smile, Settings } from "lucide-react";
import { ColoredCard } from "../ui/ColoredCard";
import { InfoCard } from "../ui/InfoCard";
// import RightCard1Svg from "../icons/RightCard1Svg";
// import RightCard2Svg from "../icons/RightCard2Svg";
import RightCard3Svg from "../icons/RightCard3Svg";
import { useAnimation } from "@/context/AnimationContext";

const leftCards = [
  {
    color: "blue",
    text: "Create your wallet in seconds.",
    pillText: "Simple",
    icon: <Zap className="w-8 h-8 text-black" />,
  },
  {
    color: "yellow",
    text: "Focus on opportunities, not fees.",
    pillText: "Convenient",
    icon: <Smile className="w-8 h-8 text-black" />,
  },
  {
    color: "pink",
    text: "One wallet for all your crypto.",
    pillText: "Multichain",
    icon: <Settings className="w-8 h-8 text-black" />,
  },
];

const rightCards = [
  {
    title: "Using your social account or Google.",
    svgComponent: <RightCard3Svg />,
  },
  {
    title: "Focus on opportunities, not fees.",
    svgComponent: <RightCard3Svg />,
  },
  {
    title: "Pay gas fees with $USDC or $CTRL on all supported blockchains.",
    svgComponent: <RightCard3Svg />,
  },
];

export default function FeaturesSection() {
  const { phase } = useAnimation();

  // Video box animation triggered by button phase from animation context
  useEffect(() => {
    if (phase === "button") {
      // Animate the video box from bottom to center when button phase is triggered
      const videoBoxTimeline = createTimeline({
        autoplay: true,
        defaults: {
          duration: 800,
          ease: "outCubic",
        },
      });

      videoBoxTimeline.add(".video-container", {
        translateY: [{ from: "100vh", to: "0vh" }],
        opacity: [{ from: 0, to: 1 }],
        scale: [{ from: 0.85, to: 1 }],
      });
    }
  }, [phase]);

  // Scroll-based animations
  useEffect(() => {
    const featuresScrollTimeline = createTimeline({
      autoplay: onScroll({
        container: "body",
        target: ".features-scroll-wrapper",
        axis: "y",
        sync: true,
      }),
      defaults: {
        duration: 1800,
        ease: "outQuart",
      },
    });

    // --- Stage 1: Video container is already positioned (no animation needed) ---
    featuresScrollTimeline.add(".video-container", {
      translateY: [{ from: "0vh", to: "0vh" }], // Hold position
      duration: 200,
      ease: "linear",
    });

    // --- Stage 1.5: Hold video ---
    featuresScrollTimeline.add(".video-container", {
      translateY: [{ from: "0vh", to: "0vh" }],
      duration: 1600,
      ease: "linear",
    });

    // --- Stage 2: Cards & videos in sequence ---
    leftCards.forEach((card, index) => {
      const leftClass = `.left-card-${index}`;
      const leftInnerClass = `.left-card-${index}-inner`;
      const rightClass = `.right-card-${index}`;
      const videoClass = `.video-${index + 2}`; // video-2, video-3, video-4

      const baseDelay = index === 0 ? "+=0" : "+=1200";

      // --- LEFT card appears ---
      featuresScrollTimeline.add(
        leftClass,
        {
          translateY: [{ from: "100vh", to: "0vh" }],
          opacity: [{ from: 0, to: 1 }],
          scale: [{ from: 0.9, to: 1 }],
          duration: 1800,
          ease: "outQuart",
        },
        baseDelay
      );

      // --- RIGHT card appears in sync ---
      featuresScrollTimeline.add(
        rightClass,
        {
          translateY: [{ from: "100vh", to: "0vh" }],
          opacity: [{ from: 0, to: 1 }],
          scale: [{ from: 0.95, to: 1 }],
          duration: 1800,
          ease: "outQuart",
        },
        "<<"
      );

      // --- VIDEO TRANSITION LOGIC (from your GitHub version) ---
      if (index === 0) {
        // First transition: video-1 → video-2
        featuresScrollTimeline.add(
          ".video-1",
          {
            translateY: [{ from: "0%", to: "-100%" }],
            opacity: [{ from: 1, to: 0 }],
            duration: 1100,
            ease: "inOutQuad",
          },
          "<<" // same time as first card appears
        );

        featuresScrollTimeline.add(
          ".video-2",
          {
            translateY: [{ from: "100%", to: "0%" }],
            opacity: [{ from: 0, to: 1 }],
            duration: 1100,
            ease: "outExpo",
          },
          "<<" // same time as video-1 fades
        );
      } else {
        // Subsequent transitions: video-(n+1) fades in, video-n fades out
        const prevVideoClass = `.video-${index + 1}`;

        featuresScrollTimeline.add(
          prevVideoClass,
          {
            translateY: [{ from: "0%", to: "-100%" }],
            opacity: [{ from: 1, to: 0 }],
            duration: 1100,
            ease: "inOutQuad",
          },
          "<<" // with card transition
        );

        featuresScrollTimeline.add(
          videoClass,
          {
            translateY: [{ from: "100%", to: "0%" }],
            opacity: [{ from: 0, to: 1 }],
            duration: 1100,
            ease: "outExpo",
          },
          "-=600" // overlap fade timing (smooth crossfade)
        );
      }

      // --- Collapse left card height & hide text (paired with right card fade) ---
      featuresScrollTimeline
        .add(
          leftInnerClass,
          {
            height: [{ from: "280px", to: "84px" }],
            duration: 1600,
            ease: "inOutCubic",
          },
          "+=1000"
        )
        .add(
          `${leftClass} h3`,
          {
            translateY: [{ from: 0, to: -60 }],
            opacity: [{ from: 1, to: 0 }],
            duration: 1200,
            ease: "inOutCubic",
          },
          "-=1800"
        )
        // Right card fades/moves up at the same time
        .add(
          rightClass,
          {
            translateY: [{ from: "0vh", to: "-60vh" }],
            opacity: [{ from: 1, to: 0 }],
            duration: 1600,
            ease: "inOutCubic",
          },
          "-=1400"
        );
    });

    // --- Final hold after last card collapse ---
    featuresScrollTimeline.add(
      `.left-card-${leftCards.length - 1}`,
      {
        translateY: [{ from: "0vh", to: "0vh" }],
        duration: 1400,
        ease: "linear",
      },
      "+=600"
    );

    // --- Let the last video persist (no fade-out) ---

    // --- Final layout exit ---
    featuresScrollTimeline.add(
      ".features-layout",
      {
        translateY: [{ from: 0, to: "-100vh" }],
        opacity: [{ from: 1, to: 0 }],
        duration: 1800,
        ease: "inOutCubic",
      },
      "+=1000"
    );

    return () => {
      featuresScrollTimeline.pause();
    };
  }, []);

  return (
    <section className="features-scroll-wrapper pt-20 relative w-full h-[800vh] bg-[#FFFFFF] z-40">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-40">
        <div className="features-layout w-full h-full flex items-center justify-center">
          <div className="relative">
            {/* --- Video Container --- */}
            <div
              className="video-container w-[416px] h-[638px] border-3 bg-gray-100 rounded-3xl overflow-hidden opacity-0 z-20 absolute"
              style={{
                transform: "translateY(100vh)",
                top: "-322px",
                left: "50%",
                marginLeft: "-192px",
              }}
            >
              <video
                className="video-1 w-full h-full object-cover absolute top-0 left-0"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/boxVideo-1.mp4" type="video/mp4" />
              </video>
              <video
                className="video-2 w-full h-full object-cover absolute top-0 left-0 opacity-0"
                autoPlay
                loop
                muted
                playsInline
                style={{ transform: "translateY(100%)" }}
              >
                <source src="/videos/boxVideo-2.mp4" type="video/mp4" />
              </video>
              <video
                className="video-3 w-full h-full object-cover absolute top-0 left-0 opacity-0"
                autoPlay
                loop
                muted
                playsInline
                style={{ transform: "translateY(100%)" }}
              >
                <source src="/videos/boxVideo-3.mp4" type="video/mp4" />
              </video>
              <video
                className="video-4 w-full h-full object-cover absolute top-0 left-0 opacity-0"
                autoPlay
                loop
                muted
                playsInline
                style={{ transform: "translateY(100%)" }}
              >
                <source src="/videos/boxVideo-4.mp4" type="video/mp4" />
              </video>
            </div>

            {/* --- Left Cards --- */}
            {leftCards.map((card, index) => (
              <div
                key={index}
                className={`left-card-${index} opacity-0 z-10 w-[22rem] absolute`}
                style={{
                  transform: "translateY(100vh)",
                  left: "-600px",
                  top: `${-322 + index * 120}px`,
                }}
              >
                <div
                  className={`left-card-${index}-inner overflow-hidden rounded-2xl`}
                  style={{ height: "280px" }}
                >
                  <ColoredCard
                    color={card.color}
                    text={card.text}
                    icon={card.icon}
                    pillText={card.pillText}
                    className="p-6 text-4xl"
                  />
                </div>
              </div>
            ))}

            {/* --- Right Cards --- */}
            {rightCards.map((card, index) => (
              <div
                key={index}
                className={`right-card-${index} opacity-0 z-10 w-[22rem] absolute`}
                style={{
                  transform: "translateY(100vh)",
                  right: "-620px",
                  top: "-180px",
                }}
              >
                <div
                  className={`right-card-${index}-inner overflow-hidden rounded-2xl`}
                  style={{ height: "350px" }}
                >
                  <InfoCard
                    title={card.title}
                    svgComponent={card.svgComponent}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
