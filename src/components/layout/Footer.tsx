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
          const timeline = createTimeline({ autoplay: true, });

          timeline
            // Dot slide
            .add(
              ".footer-dot",
              {
                left: [{ from: "50%", to: "0%" }],
                opacity: [0, 1],
                duration: 300,
                easing: "easeInOutQuad",
              },
              200
            )
            .add(
              ".footer-dot",
              {
                left: [{ to: "calc(45% + 10px)", duration: 600 }],
                easing: "easeOutBack(1.2)",
              },
              "-=100"
            )
            // Text reveal
            .add(
              ".footer-textReveal",
              {
                clipPath: ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
                duration: 600,
                easing: "easeOutQuad",
              },
              "<<"
            );

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full  bg-white text-black flex flex-col items-center pt-28 pb-20 px-6 md:px-24 font-sans overflow-hidden"
    >
      {/* === Newsletter Section === */}
      <div className="w-full max-w-5xl px-40 text-start  mb-16">
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
        {/* === Take Ctrl Animation === */}
        <div className="relative mb-24">
          <div
            className="footer-dot absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[50px] h-[50px] rounded-full bg-black opacity-0"
            style={{ opacity: 0 }}
          />
          <div
            className="footer-textReveal font-medium leading-[90%] text-[10rem] text-black w-full flex  items-center"
            style={{ clipPath: "inset(0% 100% 0% 0%)" }}
          >
            Level&nbsp;up
          </div>
        </div>

        {/* === Footer Navigation === */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center md:items-start gap-16 md:gap-0 text-center md:text-left">
          {/* Left - Social Icons */}
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

          {/* Middle - Links Grid */}
          <div className="grid grid-cols-3 gap-12">
            {/* Product */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-lg mb-1">Product</h3>
              <a href="#" className="text-gray-700 hover:text-black">
                Security
              </a>
              <a href="#" className="text-gray-700 hover:text-black">
                Support
              </a>
            </div>

            {/* Company */}
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

            {/* Resources */}
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

          {/* Right - Language */}
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
