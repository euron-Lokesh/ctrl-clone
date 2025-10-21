"use client";
import React, { useEffect, useRef } from "react";
import { createTimeline, onScroll } from "animejs";
import SecurityHeadingIcon from "../icons/SecurityHeadingIcon";
import { InfoCard } from "../ui/InfoCard";

const SecurityDetails = [
  {
    title: "Portfolio overview",
    subtext: "Track your entire portfolio in one place.",
    videoSrc: "/videos/security-video-1.mp4",
  },
  {
    title: "Hardware wallet support",
    subtext: "Keeps funds safe on your Ledger / Trezor.",
    videoSrc: "/videos/security-video-2.mp4",
  },
  {
    title: "Malicious address alerts",
    subtext: "We flag malicious and suspicious addresses for you.",
    videoSrc: "/videos/security-video-3.mp4",
  },
  {
    title: "No IP tracking",
    subtext: "We do not record any user IP addresses.",
    videoSrc: "/videos/security-video-4.mp4",
  },
];

const SecurityHighlights: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const headerEl = headerRef.current;
    const greenDot = headerEl.querySelector(".green-dot") as HTMLElement;
    const headingText = headerEl.querySelector(".secure-text") as HTMLElement;
    const mainLine = headerEl.querySelector(".main-line") as HTMLElement;
    const iconEl = headerEl.querySelector(".hero-icon") as HTMLElement;
    const secondLine = headerEl.querySelector(".second-line") as HTMLElement;

    [greenDot, headingText, mainLine, iconEl, secondLine].forEach((el) => {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(50px)";
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = createTimeline({
              autoplay: true,
            });

            tl.add(".secure-text", {
              translateX: [{ from: "300px", to: "0px" }],
              opacity: [{ from: 0, to: 1 }],
              duration: 1200,
              ease: "outExpo",
            });

            tl.add(
              ".main-line",
              {
                translateY: [{ from: "50px", to: "0px" }],
                opacity: [{ from: 0, to: 1 }],
                duration: 900,
                ease: "outExpo",
              },
              "-=1000"
            );

            tl.add(
              ".hero-icon",
              {
                translateY: [{ from: "40px", to: "0px" }],
                opacity: [{ from: 0, to: 1 }],
                duration: 800,
                ease: "outBack",
              },
              "-=800"
            );

            tl.add(
              ".second-line",
              {
                translateY: [{ from: "50px", to: "0px" }],
                opacity: [{ from: 0, to: 1 }],
                duration: 800,
                ease: "outExpo",
              },
              "-=800"
            );

            tl.add(
              [".hero-icon", ".second-line"],
              {
                translateX: [{ from: "0px", to: "100px" }],
                duration: 800,
                easing: "easeInOutSine",
              },
              "-=400"
            );

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(headerEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const header = document.querySelector(
      ".section-header"
    ) as HTMLElement | null;
    const cards = document.querySelector(
      ".security-cards"
    ) as HTMLElement | null;
    if (!header || !cards) return;

    header.style.opacity = "1";
    header.style.transform = "translateY(0px) scale(1)";
    cards.style.opacity = "1";
    cards.style.transform = "translateY(0px) translateX(0px)";

    const tl = createTimeline({
      autoplay: onScroll({
        container: "body",
        target: ".security-scroll-wrapper",
        sync: true,
        enter: "top top",
        leave: "bottom bottom",
      }),
      defaults: { duration: 1800 },
    });

    tl.add(".security-cards", {
      translateY: [{ from: "0px", to: "0px" }],
      duration: 1000,
      ease: "linear",
    });

    tl.add(".security-cards", {
      translateY: [{ from: "0px", to: "-420px" }],
      opacity: [{ from: 0.85, to: 1 }],
      duration: 4400,
      easing: "easeOutExpo",
    }).add(
      ".section-header",
      {
        translateY: [{ from: "0px", to: "-120px" }],
        opacity: [{ from: 1, to: 0 }],
        scale: [{ from: 1, to: 0.85 }],
        duration: 1000,
        easing: "easeInOutSine",
      },
      "-=3500"
    );

    tl.add(".security-cards", {
      translateY: [{ from: "-420px", to: "-430px" }],
      duration: 1800,
      easing: "linear",
    });

    tl.add(
      ".security-cards",
      {
        translateX: [{ from: "0px", to: "-280px" }],
        duration: 4600,
        easing: "easeInOutCubic",
      },
      "+=300"
    );

    tl.add(".security-cards", {
      translateY: [{ from: "-430px", to: "-430px" }],
      duration: 1200,
      easing: "linear",
    });

    tl.add(".security-cards", {
      translateY: [{ from: "-440px", to: "-580px" }],
      opacity: [{ from: 1, to: 0.9 }],
      duration: 1800,
      easing: "easeInOutSine",
    });

    tl.add(".security-scroll-wrapper", {
      translateY: [{ from: "0px", to: "0px" }],
      duration: 800,
      easing: "linear",
    });

    return () => {
      tl.pause();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="security-scroll-wrapper pt-38 relative bg-[#F4F4F4] w-full h-[400vh] z-40"
    >
      <div className="sticky top-30 min-h-screen flex flex-col justify-center">
        <div ref={headerRef} className="px-28 section-header mb-20 text-center">
          <div className="flex justify-end">
            <span className="text-4xl mr-96 rounded-full font-semibold secure-text">
              <span className="text-green-600">. </span>
              <span className="text-black"> Secure and private</span>
            </span>
          </div>

          <div className="font-sans text-center mt-5">
            <h1 className="text-[10rem] leading-[1] main-line">
              The Secure way
            </h1>
            <div className="flex justify-start gap-x-10 ml-20 items-baseline text-[10rem]">
              <span className="relative top-[0.1em] hero-icon">
                <SecurityHeadingIcon size={155} />
              </span>
              <h1 className="leading-[0.5] second-line">to Web3</h1>
            </div>
          </div>
        </div>

        <div className="security-cards pt-20 px-6 flex justify-end gap-x-4 h-[42rem]">
          {SecurityDetails.map((card, index) => (
            <InfoCard
              key={index}
              title={card.title}
              subtext={card.subtext}
              videoSrc={card.videoSrc}
              svgComponent={null}
              className="w-[21rem] rounded-4xl transform transition-transform duration-700 hover:-translate-y-8"
              titleClassName="text-[28px] font-medium text-black"
              subtextClassName="text-lg text-gray-800 mt-4"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityHighlights;
