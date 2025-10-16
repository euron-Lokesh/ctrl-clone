"use client";
import { useEffect } from "react";
import { createTimeline } from "animejs";
import ChromeIcon from "../icons/ChromeIcon";
import CtrlBadgeIcon from "../icons/ctrlBadgeIcon";
import Button from "../ui/Button";

export default function AnimatedHero() {
  useEffect(() => {
    const tl = createTimeline({
      autoplay: true,
    });

    tl.add(
      ".top-text",
      {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        ease: "outQuad",
      },
      500
    )

      .add(".dot-char", {
        opacity: [0, 1],
        left: ["20%", "20%"],
        duration: 0,
      })

      .add(".take-char", {
        clipPath: ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
        duration: 50,
        delay: (el, i) => i * 80,
        ease: "outQuad",
      })
      .add(
        ".dot-char",
        {
          left: ["18%", "35%"],
          duration: 320,
          ease: "linear",
        },
        "-=320"
      )

      .add(".dot-char", {
        left: ["35%", "65%"],
        duration: 150,
        ease: "linear",
      })

      .add(".ctrl-char", {
        clipPath: ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
        duration: 50,
        delay: (el, i) => i * 80,
        ease: "outQuad",
      })
      .add(
        ".dot-char",
        {
          left: ["65%", "87%"],
          duration: 320,
          ease: "linear",
        },
        "-=320"
      )

      .add(
        ".badge-icon",
        {
          opacity: [0, 1],
          scale: [0, 1],
          duration: 600,
          ease: "outBack",
        },
        "+=150"
      )
      .add(
        ".take-text",
        {
          translateX: [0, -40],
          duration: 100,
          ease: "outQuad",
        },
        "-=400"
      )
      .add(
        ".ctrl-text",
        {
          translateX: [0, 40],
          duration: 100,
          ease: "outQuad",
        },
        "-=500"
      )

      .add(
        ".hero-button",
        {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 600,
          ease: "outQuad",
        },
        "-=200"
      );
  }, []);

  return (
    <section className="min-h-screen bg-[#FAFAFA] pt-72 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8 top-text" style={{ opacity: 0 }}>
          <p className="text-xl md:text-2xl lg:text-[28px]">One wallet</p>
          <p className="text-xl md:text-2xl lg:text-[28px]">
            for all your crypto
          </p>
        </div>

        <div className="text-4xl md:text-6xl lg:text-8xl xl:text-[10rem] font-bold font-[Tomato Grotesk,Arial,sans-serif] mb-16 flex items-center justify-center gap-4 md:gap-6 lg:gap-8 flex-wrap tracking-tight relative">
          <span
            className="dot-char absolute"
            style={{
              opacity: 0,
              left: "0%",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            .
          </span>

          <span className="take-text flex">
            <span
              className="take-char"
              style={{ clipPath: "inset(0% 100% 0% 0%)" }}
            >
              T
            </span>
            <span
              className="take-char"
              style={{ clipPath: "inset(0% 100% 0% 0%)" }}
            >
              a
            </span>
            <span
              className="take-char"
              style={{ clipPath: "inset(0% 100% 0% 0%)" }}
            >
              k
            </span>
            <span
              className="take-char"
              style={{ clipPath: "inset(0% 100% 0% 0%)" }}
            >
              e
            </span>
          </span>

          <div className="badge-icon" style={{ opacity: 0 }}>
            <CtrlBadgeIcon
              size={80}
              className="md:w-24 md:h-24 lg:w-32 lg:h-32"
            />
          </div>

          <span className="ctrl-text flex">
            <span
              className="ctrl-char"
              style={{ clipPath: "inset(0% 100% 0% 0%)" }}
            >
              C
            </span>
            <span
              className="ctrl-char"
              style={{ clipPath: "inset(0% 100% 0% 0%)" }}
            >
              t
            </span>
            <span
              className="ctrl-char"
              style={{ clipPath: "inset(0% 100% 0% 0%)" }}
            >
              r
            </span>
            <span
              className="ctrl-char"
              style={{ clipPath: "inset(0% 100% 0% 0%)" }}
            >
              l
            </span>
          </span>
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
}
