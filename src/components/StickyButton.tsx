"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import ChromeIcon from "@/components/icons/ChromeIcon";

export default function StickyButton() {
  const [isCompact, setIsCompact] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Compact when scrolled past hero section
      setIsCompact(scrollY > 200);

      // Detect if near bottom of page
      const nearBottom = scrollY + windowHeight >= documentHeight - 100;
      setIsAtBottom(nearBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        fixed left-1/2 z-50 transition-all duration-500 ease-out
        ${isCompact ? "bottom-4" : "top-1/2 -translate-y-1/2"}
        ${isAtBottom && isCompact ? "bottom-16" : ""}
        transform -translate-x-1/2
      `}
      style={{
        transitionProperty: "bottom, top, width, transform",
      }}
    >
      <div
        className={`
          transition-all duration-300 ease-out overflow-hidden
          ${isCompact ? "w-14 h-14" : "w-auto h-auto"}
        `}
        style={{
          transitionProperty: "width, height",
        }}
      >
        <Button
          icon={<ChromeIcon size={40} />}
          className={`
            relative transition-all duration-300 ease-out
            ${isCompact ? "px-2 min-w-0" : "px-6"}
          `}
        >
          <span
            className={`
              inline-block transition-all duration-300 ease-out whitespace-nowrap
              ${isCompact ? "opacity-0 w-0 ml-0" : "opacity-100 w-auto ml-2"}
            `}
            style={{
              transitionProperty: "opacity, width, margin",
            }}
          >
            Download for Chrome
          </span>
        </Button>
      </div>
    </div>
  );
}
