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

  // 🟢 Initial hero animation (button appears)
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

  // 🧠 Scroll-based animation
  useEffect(() => {
    const handleScroll = () => {
      const btn = wrapperRef.current;
      const text = textRef.current;
      if (!btn || !text) return;

      const scrollY = window.scrollY;
      const maxScroll = 600;
      const progress = Math.min(scrollY / maxScroll, 1);

      // ✅ Detect when reaching bottom
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;

      // ✅ Adjusted motion for new starting position (lower on screen)
      const topStart = window.innerHeight - 400; // same as calc(100% - 400px)
      const topEnd = window.innerHeight - 120; // where it settles at bottom
      const currentTop = topStart + (topEnd - topStart) * progress;

      btn.style.position = "fixed";
      btn.style.left = "50%";
      btn.style.transform = "translateX(-50%)";
      btn.style.top = `${currentTop}px`;
      btn.style.zIndex = "50";

      // 🔽 Hide text and shrink width (scroll down)
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

      // 🔼 Expand and show text when scrolled to top
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

      // 📌 Fix to bottom after scroll progress 1
      if (progress === 1 && !isAtBottom) {
        btn.style.top = "auto";
        btn.style.bottom = "40px";
        setIsAtBottom(true);
      }

      // ✅ Smooth upward lift + expand when reaching bottom
      if (atBottom && isCompact && !hasExpandedAtBottom) {
        setIsCompact(false);
        setHasExpandedAtBottom(true);
        text.style.display = "inline-block";

        // 1️⃣ Move upward slightly
        animate(btn, {
          translateY: { from: 0, to: -120 },
          duration: 1000,
          ease: "outCubic",
        });

        // 2️⃣ Expand smoothly
        animate(btn, {
          width: { from: 90, to: 320 },
          duration: 1000,
          delay: 300,
          ease: "outBack(1.2)",
        });

        // 3️⃣ Fade text in
        animate(text, {
          translateY: { from: 10, to: 0 },
          opacity: { from: 0, to: 1 },
          duration: 400,
          delay: 450,
          ease: "outCubic",
        });
      }

      // 🔁 Smooth reverse when scrolling up from bottom
      if (!atBottom && isAtBottom && hasExpandedAtBottom) {
        setHasExpandedAtBottom(false);
        setIsAtBottom(false);
        btn.style.bottom = "auto";

        // 🟢 Smooth shrink and fade out text
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAtBottom, isCompact, hasExpandedAtBottom]);

  return (
    <div
      ref={wrapperRef}
      className="hero-button flex justify-center items-center"
      style={{
        opacity: 0,
        position: "fixed",
        top: "calc(100% - 400px)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: "300px",
        height: "64px",
      }}
    >
      {/* 🌿 Pure Button UI */}
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
