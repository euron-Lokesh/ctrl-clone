"use client";

import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
  className?: string;
}

export default function FAQItem({
  question,
  answer,
  className = "",
}: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`bg-[#ECEFEC] w-[50%] border-2 border-black rounded-[2rem] overflow-hidden ${className}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
      >
        <span className="text-lg md:text-xl lg:text-2xl  pr-4 text-black">
          {question}
        </span>

        {/* Icon Circle with fill animation */}
        <div className="relative flex-shrink-0 w-12 h-12 md:w-14 md:h-14">
          {/* Background circle that fills on hover */}
          <div className="absolute inset-0 rounded-full border-[3px] border-black bg-transparent group-hover:bg-black transition-all duration-500 ease-out" />

          {/* Plus/Minus Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={`
                transition-all duration-300 ease-linear
                ${isOpen ? "rotate-180" : "rotate-0"}
                group-hover:text-white text-black
              `}
            >
              {/* Horizontal line (always visible) */}
              <line
                x1="6"
                y1="12"
                x2="18"
                y2="12"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Vertical line (hidden when open) */}
              <line
                x1="12"
                y1="6"
                x2="12"
                y2="18"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className={`
                  transition-opacity duration-300
                  ${isOpen ? "opacity-0" : "opacity-100"}
                `}
              />
            </svg>
          </div>
        </div>
      </button>

      {/* Answer content with smooth expand/collapse */}
      <div
        className={`
          grid transition-all duration-300 ease-in-out
          ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <div className="px-6 md:px-8 pb-6 md:pb-8">
            <p className="text-base md:text-lg text-black/80 leading-relaxed">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
