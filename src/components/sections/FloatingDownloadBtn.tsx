"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, createTimeline } from "animejs";
import ChromeIcon from "../icons/ChromeIcon";
import { useAnimation } from "@/context/AnimationContext";

export default function FloatingDownloadBtn() {
  const { phase } = useAnimation();
  const btnRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [hasExpandedAtBottom, setHasExpandedAtBottom] = useState(false);

  const getResponsiveTopPosition = () => {
    const screenHeight = window.innerHeight;

    if (screenHeight <= 768) {
      return screenHeight - 200;
    } else if (screenHeight <= 900) {
      return screenHeight - 300;
    } else {
      return screenHeight - 350;
    }
  };

  useEffect(() => {
    if (phase === "button" && wrapperRef.current && textRef.current) {
      const tl = createTimeline({ autoplay: true });

      tl.add(wrapperRef.current, {
        opacity: { from: 0, to: 1 },
        scaleX: { from: 0.2, to: 1 },
        duration: 600,
        ease: "outCubic",
      }).add(
        textRef.current,
        {
          opacity: { from: 0, to: 1 },
          translateY: { from: 20, to: 0 },
          duration: 400,
          ease: "outQuad",
        },
        "-=400"
      );
    }
  }, [phase]);

  useEffect(() => {
    const handleScroll = () => {
      const btn = wrapperRef.current;
      const text = textRef.current;
      if (!btn || !text) return;

      const scrollY = window.scrollY;
      const maxScroll = 600;
      const progress = Math.min(scrollY / maxScroll, 1);

      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;

      const topStart = getResponsiveTopPosition();
      const topEnd = window.innerHeight - 120;
      const currentTop = topStart + (topEnd - topStart) * progress;

      btn.style.position = "fixed";
      btn.style.left = "50%";
      btn.style.transform = "translateX(-50%)";
      btn.style.top = `${currentTop}px`;
      btn.style.zIndex = "50";

      if (scrollY > 0 && !isCompact && !atBottom) {
        setIsCompact(true);

        animate(text, {
          translateY: { from: 0, to: -10 },
          opacity: { from: 1, to: 0 },
          duration: 200,
          ease: "inCubic",
          complete: () => {
            text.style.display = "none";
          },
        });

        animate(btn, {
          width: { from: 300, to: 90 },
          duration: 400,
          ease: "outCubic",
        });

        setHasExpandedAtBottom(false);
      }

      if (scrollY === 0 && isCompact) {
        setIsCompact(false);
        text.style.display = "inline-block";

        animate(text, {
          translateY: { from: 10, to: 0 },
          opacity: { from: 0, to: 1 },
          duration: 300,
          ease: "outCubic",
        });

        animate(btn, {
          width: { from: 90, to: 300 },
          duration: 400,
          ease: "outBack",
        });
      }

      if (progress === 1 && !isAtBottom) {
        btn.style.top = "auto";
        setIsAtBottom(true);
      }

      if (atBottom && isCompact && !hasExpandedAtBottom) {
        setIsCompact(false);
        setHasExpandedAtBottom(true);
        text.style.display = "inline-block";

        animate(btn, {
          translateY: { from: 0, to: -120 },
          duration: 1000,
          ease: "outCubic",
        });

        animate(btn, {
          width: { from: 90, to: 320 },
          duration: 1000,
          delay: 300,
          ease: "outBack(1.2)",
        });

        animate(text, {
          translateY: { from: 10, to: 0 },
          opacity: { from: 0, to: 1 },
          duration: 400,
          delay: 450,
          ease: "outCubic",
        });
      }

      if (!atBottom && isAtBottom && hasExpandedAtBottom) {
        setHasExpandedAtBottom(false);
        setIsAtBottom(false);
        btn.style.bottom = "auto";

        animate(btn, {
          width: { from: 320, to: 90 },
          duration: 600,
          ease: "outCubic",
        });

        animate(text, {
          translateY: { from: 0, to: -10 },
          opacity: { from: 1, to: 0 },
          duration: 300,
          delay: 100,
          ease: "inCubic",
          complete: () => {
            text.style.display = "none";
          },
        });
      }
    };

    const handleResize = () => {
      const btn = wrapperRef.current;
      if (!btn) return;

      if (window.scrollY === 0) {
        const newTop = getResponsiveTopPosition();
        btn.style.top = `${newTop}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isAtBottom, isCompact, hasExpandedAtBottom]);

  const [initialPosition, setInitialPosition] = useState("calc(100vh - 350px)");

  useEffect(() => {
    const updatePosition = () => {
      const screenHeight = window.innerHeight;

      if (screenHeight <= 768) {
        setInitialPosition("calc(100vh - 200px)");
      } else if (screenHeight <= 900) {
        setInitialPosition("calc(100vh - 300px)");
      } else {
        setInitialPosition("calc(100vh - 350px)");
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="hero-button flex justify-center items-center"
      style={{
        opacity: 0,
        position: "fixed",
        top: initialPosition,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: "300px",
        height: "64px",
      }}
    >
      <button
        ref={btnRef}
        className="w-full h-full flex items-center justify-center gap-3 bg-[#02C92F] border-2 border-black rounded-full font-medium text-black relative overflow-hidden"
        style={{
          transition: "background 0.3s ease, transform 0.3s ease",
        }}
      >
        <span className="flex items-center justify-center">
          <ChromeIcon size={40} />
        </span>

        <span
          ref={textRef}
          className="whitespace-nowrap text-lg"
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            transition: "all 0.3s ease",
          }}
        >
          Download for Chrome
        </span>
      </button>
    </div>
  );
}
