"use client";
import { useEffect, useRef } from "react";
import { animate } from "animejs";
import Button from "@/components/ui/Button";
import CtrlLogoIcon from "../icons/CtrlLogo";
import Link from "next/link";
import { useAnimation } from "@/context/AnimationContext";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const lastScroll = useRef(0);
  const { phase, setPhase } = useAnimation();

  useEffect(() => {
    if (phase === "header" && headerRef.current) {
      animate(headerRef.current, {
        translateY: { from: -100, to: 0 },
        opacity: { from: 0, to: 1 },
        duration: 500,
        ease: "outCubic",
        complete: () => setPhase("button"),
      });
    }
  }, [phase, setPhase]);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const down = scroll > lastScroll.current;

      if (down) {
        if (scroll > 100 && logoRef.current && btnRef.current) {
          animate([logoRef.current, btnRef.current], {
            translateY: -60,
            opacity: 0,
            duration: 300,
            easing: "easeOutCubic",
          });
        }

        if (scroll > 450 && navRef.current) {
          animate(navRef.current, {
            translateY: -60,
            opacity: 0,
            duration: 300,
            easing: "easeOutCubic",
          });
        }

        if (scroll > 500 && headerRef.current) {
          animate(headerRef.current, {
            translateY: "-100%",
            opacity: 0,
            duration: 400,
            easing: "easeInOutCubic",
          });
          headerRef.current.style.pointerEvents = "none";
        }
      } else {
        if (headerRef.current) {
          animate(headerRef.current, {
            translateY: "0%",
            opacity: 1,
            duration: 400,
            easing: "easeOutCubic",
          });
          headerRef.current.style.pointerEvents = "auto";
        }

        if (scroll >= 100 && navRef.current) {
          animate(navRef.current, {
            translateY: 0,
            opacity: 1,
            duration: 400,
            easing: "easeOutCubic",
          });
        }

        if (
          scroll < 50 &&
          logoRef.current &&
          btnRef.current &&
          navRef.current
        ) {
          animate([logoRef.current, btnRef.current, navRef.current], {
            translateY: 0,
            opacity: 1,
            duration: 400,
            easing: "easeOutCubic",
          });
        }
      }

      lastScroll.current = scroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ opacity: 0, transform: "translateY(-100px)" }}
    >
      <nav className="max-w-[90rem] mx-auto px-6 md:px-8 py-8 flex items-center justify-between">
        <div ref={logoRef} className="flex items-center gap-2">
          <CtrlLogoIcon size={120} />
        </div>

        <div
          ref={navRef}
          className="hidden md:flex items-center gap-1 bg-[#ECEFEC] rounded-lg px-4 py-2"
        >
          <Link
            href="#ctrl"
            className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#D1D6D1]"
          >
            $CTRL
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            href="#support"
            className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#D1D6D1]"
          >
            Support
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            href="#security"
            className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#D1D6D1]"
          >
            Security
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            href="#resources"
            className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#D1D6D1]"
          >
            Resources
          </Link>
        </div>

        <div ref={btnRef}>
          <Button variant="black">Download</Button>
        </div>
      </nav>
    </header>
  );
}
