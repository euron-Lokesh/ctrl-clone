"use client";

import React, { useEffect, useRef } from "react";
import { Globe, MessageCircle, Github, Send } from "lucide-react";
import { createTimeline } from "animejs";
import Link from "next/link";

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = footerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const dot = element.querySelector(".footer-dot") as HTMLElement;
          const textElement = element.querySelector(
            ".footer-textReveal"
          ) as HTMLElement;
          if (dot) {
            dot.style.opacity = "1";
            dot.style.left = "0%";
          }

          let isLevelUp = true;

          const createCycle = () => {
            if (textElement) {
              textElement.textContent = isLevelUp ? "Level up" : "Take Ctrl";
            }

            const timeline = createTimeline({
              autoplay: true,
              onComplete: () => {
                isLevelUp = !isLevelUp;
                setTimeout(() => createCycle(), 0);
              },
            });

            timeline
              .add(
                ".footer-dot",
                {
                  left: [{ from: "0%", to: "calc(100% + 40px)" }],
                  ease: "outBack(1.2)",
                  duration: 600,
                },
                0
              )
              .add(
                ".footer-textReveal",
                {
                  clipPath: ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
                  duration: 600,
                },
                0
              )
              .add({}, { duration: 3000 }, 600)
              .add(
                ".footer-textReveal",
                {
                  clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 100% 0% 0%)"],
                  duration: 600,
                },
                3600
              )
              .add(
                ".footer-dot",
                {
                  left: [{ from: "calc(100% + 40px)", to: "0%" }],
                  ease: "inOut",
                  duration: 600,
                },
                3600
              )
              .add({}, { duration: 2000 });
          };

          createCycle();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full bg-white text-black flex flex-col items-center pt-28 pb-20 px-6 md:px-24 font-sans overflow-hidden"
    >
      <div className="w-full max-w-5xl px-40 text-start mb-16">
        <h2 className="text-3xl font-medium text-gray-800">Newsletter</h2>
        <p className="text-gray-500 mb-8">
          Subscribe to our amazing newsletter to receive all the latest news &
          updates.
        </p>

        <div className="flex flex-col items-center gap-6">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full md:w-[49rem] text-xl px-8 py-6 rounded-full border-2 border-black text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button className="bg-black text-white px-10 py-3 rounded-full text-lg font-medium hover:opacity-90 transition flex items-center gap-2 justify-center">
            Subscribe <Send size={18} />
          </button>
        </div>
      </div>

      <div className="w-full px-20">
        <div className="relative w-full h-full flex items-center justify-start mb-24">
          <div className="relative text-center overflow-visible">
            <div className="footer-dot opacity-0 absolute bottom-[10%] left-1/2 font-[Tomato Grotesk,Arial,sans-serif] -translate-x-1/2 w-[25px] h-[25px] rounded-full bg-black" />
            <div
              className="footer-textReveal font-medium leading-[100%] text-[160px] text-black w-full flex justify-center align-middle"
              style={{ clipPath: "inset(0% 100% 0% 0%)" }}
            >
              Level&nbsp;up
            </div>
          </div>
        </div>

        <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center md:items-start gap-16 md:gap-0 text-center md:text-left">
          <div className="flex gap-5 md:gap-6">
            <Link
              href="#"
              className="border border-black rounded-full p-3 hover:bg-black hover:text-white transition"
            >
              <Globe size={22} />
            </Link>
            <Link
              href="#"
              className="border border-black rounded-full p-3 hover:bg-black hover:text-white transition"
            >
              <MessageCircle size={22} />
            </Link>
            <Link
              href="#"
              className="border border-black rounded-full p-3 hover:bg-black hover:text-white transition"
            >
              <MessageCircle size={22} />
            </Link>
            <Link
              href="#"
              className="border border-black rounded-full p-3 hover:bg-black hover:text-white transition"
            >
              <Github size={22} />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-12">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-lg mb-1">Product</h3>
              <a href="#" className="text-gray-700 hover:text-black">
                Security
              </a>
              <a href="#" className="text-gray-700 hover:text-black">
                Support
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-lg mb-1">Company</h3>
              <a href="#" className="text-gray-700 hover:text-black">
                Introducing Ctrl
              </a>
              <a href="#" className="text-gray-700 hover:text-black">
                $CTRL
              </a>
              <a href="#" className="text-gray-700 hover:text-black">
                About
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-lg mb-1">Resources</h3>
              <a href="#" className="text-gray-700 hover:text-black">
                News
              </a>
              <a href="#" className="text-gray-700 hover:text-black">
                Docs
              </a>
              <a href="#" className="text-gray-700 hover:text-black">
                Media Kit
              </a>
              <a href="#" className="text-gray-700 hover:text-black">
                Shortcuts
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <h3 className="font-semibold text-lg flex items-center gap-1">
              <Globe size={18} /> English
            </h3>
          </div>
        </div>
      </div>
      <div className="flex text-xs text-center mt-60 mb-5 items-center gap-x-3">
        <p>Terms of use</p>
        <p>Terms of use</p>
        <p>Terms of use</p>
      </div>
    </footer>
  );
};

export default Footer;
