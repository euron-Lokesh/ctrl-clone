"use client";

import React, { useEffect, useRef } from "react";
import { createTimeline } from "animejs";
import HandFinger from "../icons/HandFinger";
import { ColoredCard } from "../ui/ColoredCard";
import { CommunityDetail } from "@/types/CommunityDetail";

const CommunityDetails: CommunityDetail[] = [
  {
    color: "blue",
    text: "Founded in 2020, Ctrl (formerly XDEFI) was the world's first multichain wallet.",
    videoSrc: "/videos/community-video-1.mp4",
  },
  {
    color: "pink",
    text: "24/7 live customer support. Our global team is here to help you.",
    videoSrc: "/videos/community-video-2.mp4",
  },
  {
    color: "yellow",
    text: "4.8 star rating in the Google Chrome Store after 650+ reviews.",
    videoSrc: "/videos/community-video-3.mp4",
  },
];

const Community = () => {
  const communityRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!communityRef.current || !mainContentRef.current) return;

    const levelUpElement = communityRef.current.querySelector(
      ".level-up-text"
    ) as HTMLElement;
    const joinTheElement = mainContentRef.current.querySelector(
      ".join-the-text"
    ) as HTMLElement;
    const numberElement = mainContentRef.current.querySelector(
      ".number-text"
    ) as HTMLElement;
    const handElement = mainContentRef.current.querySelector(
      ".hand-finger"
    ) as HTMLElement;
    const trustTextElement = mainContentRef.current.querySelector(
      ".trust-text"
    ) as HTMLElement;

    const setInitial = (el: HTMLElement | null, transform: string) => {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = transform;
      }
    };

    setInitial(levelUpElement, "translateX(200px)");
    setInitial(joinTheElement, "translateY(60px)");
    setInitial(numberElement, "translateY(60px)");
    setInitial(trustTextElement, "translateY(60px)");
    if (handElement) {
      handElement.style.opacity = "0";
      handElement.style.transform = "scale(0) translateZ(-100px)";
      handElement.style.transformOrigin = "center center";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timeline = createTimeline({ autoplay: true });

            timeline.add(".level-up-text", {
              translateX: [{ from: "400px", to: "0px" }],
              opacity: [{ from: 0, to: 1 }],
              duration: 1200,
              ease: "outExpo",
            });

            timeline.add(
              [".join-the-text", ".number-text"],
              {
                translateY: [{ from: "60px", to: "0px" }],
                opacity: [{ from: 0, to: 1 }],
                duration: 800,
                ease: "outExpo",
              },
              "-=900"
            );

            timeline.add(
              ".trust-text",
              {
                translateY: [{ from: "60px", to: "0px" }],
                opacity: [{ from: 0, to: 1 }],
                duration: 800,
                ease: "outExpo",
              },
              "-=600"
            );

            timeline.add(
              ".hand-finger",
              {
                scale: [{ from: 0, to: 1 }],
                opacity: [{ from: 0, to: 1 }],
                translateZ: [{ from: "-100px", to: "0px" }],
                duration: 1200,
                ease: "outBack",
              },
              "-=600"
            );

            timeline.add(
              ".join-the-text",
              {
                translateX: [{ from: "0px", to: "-20px" }],
                duration: 600,
                ease: "outQuad",
              },
              "-=800"
            );

            timeline.add(
              ".number-text",
              {
                translateX: [{ from: "0px", to: "20px" }],
                duration: 600,
                ease: "outQuad",
              },
              "-=600"
            );

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(communityRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={communityRef} className="w-full mt-32 px-52 py-20 bg-[#F9FAF9]">
      <div className="flex justify-end">
        <span className="text-5xl font-semibold mr-96 rounded-full level-up-text">
          <span className="text-red-600">. </span>
          <span className="text-black">Level up</span>
        </span>
      </div>

      <div ref={mainContentRef} className="text-center w-full mt-10">
        <div className="flex items-center justify-center text-[6rem] leading-[0.3]">
          <span className="join-the-text">Join the</span>

          <span className="hand-finger mx-7 flex items-center">
            <HandFinger size={90} />
          </span>

          <span className="number-text">600,000+</span>
        </div>

        <p className="text-[6rem] text-black trust-text">
          people who trust Ctrl.
        </p>
      </div>

      <div className="flex justify-center gap-x-10 mt-20 h-[36rem]">
        {CommunityDetails.map((card, index) => (
          <ColoredCard
            key={index}
            color={card.color}
            text={card.text}
            videoSrc={card.videoSrc}
            className="community-card w-[23rem] rounded-4xl py-16 px-12 text-3xl transform transition-transform duration-700 hover:-translate-y-8"
          />
        ))}
      </div>
    </div>
  );
};

export default Community;
