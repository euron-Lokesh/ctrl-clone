"use client";
import { useEffect } from "react";
import { createTimeline, onScroll } from "animejs";
import { Zap, Smile, Settings } from "lucide-react";
import { ColoredCard } from "../ui/ColoredCard";
import { InfoCard } from "../ui/InfoCard";
// import RightCard1Svg from "../icons/RightCard1Svg";
// import RightCard2Svg from "../icons/RightCard2Svg";
import RightCard3Svg from "../icons/RightCard3Svg";

const leftCards = [
  {
    color: "blue",
    text: "Create your wallet in seconds.",
    pillText: "Simple",
    icon: <Zap className="w-8 h-8 text-black" />,
  },
  {
    color: "yellow",
    text: "One wallet for all your crypto.",
    pillText: "Convenient",
    icon: <Smile className="w-8 h-8 text-black" />,
  },
  {
    color: "pink",
    text: "Using your social account or Google.",
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
  useEffect(() => {
    const featuresScrollTimeline = createTimeline({
      autoplay: onScroll({
        container: "body",
        sync: 0.5,
        target: ".features-scroll-wrapper",
        enter: "top top",
        leave: "bottom bottom",
      }),
    });

    // Stage 1: Video appears and centers
    featuresScrollTimeline.add(".video-container", {
      translateY: [{ from: "100vh", to: "0vh" }],
      opacity: [{ from: 0, to: 1 }],
      scale: [{ from: 0.8, to: 1 }],
      duration: 1500,
      ease: "outExpo",
    });

    // Stage 1.5: Hold video at center (user needs to scroll to trigger cards)
    featuresScrollTimeline.add(".video-container", {
      translateY: [{ from: "0vh", to: "0vh" }],
      duration: 1200,
      ease: "linear",
    });

    // Stage 2: Cards appear and animate in sequence (LEFT and RIGHT in sync)
    leftCards.forEach((card, index) => {
      const leftClass = `.left-card-${index}`;
      const leftInnerClass = `.left-card-${index}-inner`;
      const rightClass = `.right-card-${index}`;
      const videoClass = `.video-${index + 2}`; // video-2, video-3, video-4

      const baseDelay = index === 0 ? "+=100" : "+=900";

      // 1. LEFT card appears
      featuresScrollTimeline.add(
        leftClass,
        {
          translateY: [{ from: "100vh", to: "0vh" }],
          opacity: [{ from: 0, to: 1 }],
          scale: [{ from: 0.8, to: 1 }],
          duration: 1100,
          ease: "outExpo",
        },
        baseDelay
      );

      // 1b. RIGHT card appears at the same time (in sync with left card)
      if (index === 0) {
        // First right card appears
        featuresScrollTimeline.add(
          rightClass,
          {
            translateY: [{ from: "100vh", to: "0vh" }],
            opacity: [{ from: 0, to: 1 }],
            scale: [{ from: 0.95, to: 1 }],
            duration: 1100,
            ease: "outExpo",
          },
          "<<" // Same time as left card
        );

        // Video 2 slides up and fades in (exact sync with cards)
        featuresScrollTimeline.add(
          videoClass,
          {
            translateY: [{ from: "100%", to: "0%" }],
            opacity: [{ from: 0, to: 1 }],
            duration: 1100,
            ease: "outExpo",
          },
          "<<" // Same time as cards
        );
      } else {
        // Previous right card moves up and fades simultaneously
        const prevRightClass = `.right-card-${index - 1}`;
        featuresScrollTimeline.add(
          prevRightClass,
          {
            translateY: [{ from: "0vh", to: "-50vh" }],
            opacity: [{ from: 1, to: 0 }],
            duration: 1000,
            ease: "inOutQuad",
          },
          "<<" // Same time as new left card appears
        );

        // Current right card appears from bottom
        featuresScrollTimeline.add(
          rightClass,
          {
            translateY: [{ from: "100vh", to: "0vh" }],
            opacity: [{ from: 0, to: 1 }],
            scale: [{ from: 0.95, to: 1 }],
            duration: 1100,
            ease: "outExpo",
          },
          "-=600" // Overlap with previous card exit
        );

        // Previous video moves up and fades (exact sync)
        const prevVideoClass = `.video-${index + 1}`;
        featuresScrollTimeline.add(
          prevVideoClass,
          {
            translateY: [{ from: "0%", to: "-100%" }],
            opacity: [{ from: 1, to: 0 }],
            duration: 1100,
            ease: "inOutQuad",
          },
          "<<" // Same time as cards transition
        );

        // Current video slides up and fades in (exact sync with cards)
        featuresScrollTimeline.add(
          videoClass,
          {
            translateY: [{ from: "100%", to: "0%" }],
            opacity: [{ from: 0, to: 1 }],
            duration: 1100,
            ease: "outExpo",
          },
          "-=600" // Match card overlap timing
        );
      }

      // 2. Left card height reduces from bottom only
      featuresScrollTimeline
        .add(
          leftInnerClass,
          {
            height: [{ from: "280px", to: "84px" }],
            duration: 1000,
            ease: "inOutQuad",
          },
          "+=800"
        )
        // Animate left card text upward to hide it during collapse
        .add(
          `${leftClass} h3`,
          {
            translateY: [{ from: 0, to: -60 }],
            opacity: [{ from: 1, to: 0 }],
            duration: 800,
            ease: "inOutQuad",
          },
          "-=800"
        );
    });

    // Final right card exits
    featuresScrollTimeline.add(
      `.right-card-${rightCards.length - 1}`,
      {
        translateY: [{ from: "0vh", to: "-50vh" }],
        opacity: [{ from: 1, to: 0 }],
        duration: 1000,
        ease: "inOutQuad",
      },
      "+=800"
    );

    // Stage 3: Final exit
    featuresScrollTimeline.add(".features-layout", {
      translateY: [{ from: 0, to: "-100vh" }],
      opacity: [{ from: 1, to: 0 }],
      duration: 1000,
      ease: "inExpo",
    });

    return () => {
      featuresScrollTimeline.pause();
    };
  }, []);

  return (
    <section className="features-scroll-wrapper relative w-full h-[2000px] bg-white z-40">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-40">
        <div className="features-layout w-full h-full flex items-center justify-center">
          {/* Main container - all elements positioned relative to this center */}
          <div className="relative">
            {/* Center Video - Primary anchor point */}
            <div
              className="video-container w-[416px] h-[638px] border-3 bg-gray-100 rounded-3xl overflow-hidden opacity-0 z-20 absolute"
              style={{
                transform: "translateY(100vh)",
                top: "-322px",
                left: "50%",
                marginLeft: "-192px",
              }}
            >
              {/* Video 1 - Default/Background */}
              <video
                className="video-1 w-full h-full object-cover absolute top-0 left-0"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/boxVideo-1.mp4" type="video/mp4" />
              </video>

              {/* Video 2 - First card appearance */}
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

              {/* Video 3 - Second card appearance */}
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

              {/* Video 4 - Third card appearance */}
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

            {/* Left Cards - Close to video */}
            {leftCards.map((card, index) => (
              <div
                key={index}
                className={`left-card-${index} opacity-0 z-10 w-[21.5rem] absolute`}
                style={{
                  transform: "translateY(100vh)",
                  left: "-600px",
                  top: `${-322 + index * 120}px`,
                }}
              >
                <div
                  className={`left-card-${index}-inner overflow-hidden rounded-2xl`}
                  style={{
                    height: "280px",
                  }}
                >
                  <ColoredCard
                    color={card.color}
                    text={card.text}
                    icon={card.icon}
                    pillText={card.pillText}
                    className="p-6 text-3xl font-bold"
                  />
                </div>
              </div>
            ))}

            {/* Right Cards - One at a time in center */}
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
                  style={{
                    height: "350px",
                  }}
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
