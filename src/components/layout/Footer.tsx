"use client";

import React, { useEffect, useRef } from "react";
import { Send, Globe, Github, MessageCircle } from "lucide-react";
import { createTimeline } from "animejs";

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = footerRef.current;
    if (!element) return;

    // Observe when footer comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const timeline = createTimeline({
            autoplay: true,
          });

          // Dot slide animation
          timeline
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
                left: [{ to: "calc(100% + 60px)", duration: 600 }],
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
      className="w-full bg-white text-black flex flex-col items-center py-32 px-8 md:px-52 font-sans border-t border-gray-200 overflow-hidden"
    >
      {/* Newsletter Section */}
      <div className="text-center mb-24">
        <h2 className="text-2xl font-semibold">Newsletter</h2>
        <p className="text-gray-500 mt-2">
          Subscribe to our amazing newsletter to receive all the latest news &
          updates.
        </p>

        <div className="flex items-center justify-center mt-8">
          <input
            type="email"
            placeholder="Your email address"
            className="w-[30rem] max-w-full px-8 py-4 rounded-full border border-black text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button className="mt-6 bg-black text-white px-10 py-3 rounded-full text-lg font-medium hover:opacity-90 transition flex items-center gap-2 mx-auto">
          <Send size={18} />
          Subscribe
        </button>
      </div>

      {/* Animated Take Ctrl */}
      <div className="relative float-left">
        {/* Dot animation element */}
        <div
          className="footer-dot opacity-0 absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[50px] h-[50px] rounded-full bg-black"
          style={{ opacity: 0 }}
        />
        <div
          className="footer-textReveal font-medium leading-[100%] text-[10rem] md:text-[14rem] text-black w-full flex justify-center align-middle"
          style={{ clipPath: "inset(0% 100% 0% 0%)" }}
        >
          Take&nbsp;Ctrl
        </div>
      </div>

      {/* Social Links */}
      <div className="flex gap-6 mb-20">
        <a
          href="#"
          className="border border-black rounded-full p-4 hover:bg-black hover:text-white transition"
        >
          <Globe size={22} />
        </a>
        <a
          href="#"
          className="border border-black rounded-full p-4 hover:bg-black hover:text-white transition"
        >
          <MessageCircle size={22} />
        </a>
        <a
          href="#"
          className="border border-black rounded-full p-4 hover:bg-black hover:text-white transition"
        >
          <Github size={22} />
        </a>
      </div>

      {/* Footer Links */}
      <div className="w-full flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left gap-y-10">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">Product</h3>
          <a href="#" className="text-gray-700 hover:text-black">
            Security
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Support
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">Company</h3>
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
          <h3 className="font-semibold text-lg">Resources</h3>
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

        <div className="flex flex-col items-center md:items-end gap-2">
          <h3 className="font-semibold text-lg flex items-center gap-1">
            <Globe size={18} /> English
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
