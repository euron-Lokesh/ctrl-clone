import React from "react";

interface SecurityHeadingIconProps {
  size?: number | string;
  className?: string;
}

const SecurityHeadingIcon = ({
  size = 80,
  className,
}: SecurityHeadingIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 280 200"
    width={size}
    height={size}
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <defs>
      <clipPath id="clip0">
        <rect width="280" height="200" x="0" y="0" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip0)">
      <g
        transform="matrix(1.32999,0,0,1.32999,-488.821,330.488)"
        opacity="1"
        style={{ display: "block" }}
      >
        <g opacity="1">
          <path
            fill="#9DC4F5"
            d="M472.8-102.2c55.9 0 101.3-31.8 101.3-71.1 0-39.3-45.3-71.1-101.3-71.1-56 0-101.3 31.8-101.3 71.1 0 39.3 45.3 71.1 101.3 71.1z"
          />
          <path
            stroke="#001405"
            strokeWidth="2"
            fill="none"
            d="M472.8-102.2c55.9 0 101.3-31.8 101.3-71.1 0-39.3-45.3-71.1-101.3-71.1-56 0-101.3 31.8-101.3 71.1 0 39.3 45.3 71.1 101.3 71.1z"
          />
        </g>

        {/* Center Red Circle */}
        <g opacity="1">
          <path
            fill="#FF5A4D"
            d="M472.9-148.5c13.8 0 25.1-11.2 25.1-25 0-13.8-11.2-25-25.1-25-13.8 0-25 11.2-25 25 0 13.8 11.2 25 25 25z"
          />
          <path
            stroke="#001405"
            strokeWidth="2"
            fill="none"
            d="M472.9-148.5c13.8 0 25.1-11.2 25.1-25 0-13.8-11.2-25-25.1-25-13.8 0-25 11.2-25 25 0 13.8 11.2 25 25 25z"
          />
        </g>

        {/* Inner Black Dot */}
        <path
          fill="#001405"
          d="M472.9-163.5c5.5 0 10-4.5 10-10s-4.5-10-10-10-10 4.5-10 10 4.5 10 10 10z"
        />

        {/* Yellow Decorative Segments */}
        <g opacity="1">
          <path
            fill="#FBE74E"
            d="M447.5-198.6h50.8c0-14-11.4-25.4-25.4-25.4-14 0-25.4 11.4-25.4 25.4z"
          />
          <path
            stroke="#001405"
            strokeWidth="2"
            fill="none"
            d="M447.5-198.6h50.8c0-14-11.4-25.4-25.4-25.4-14 0-25.4 11.4-25.4 25.4z"
          />
        </g>

        {/* Bottom Yellow Arc */}
        <g opacity="1">
          <path
            fill="#FBE74E"
            d="M498.3-147.8h-50.8c0 14 11.4 25.4 25.4 25.4 14 0 25.4-11.4 25.4-25.4z"
          />
          <path
            stroke="#001405"
            strokeWidth="2"
            fill="none"
            d="M498.3-147.8h-50.8c0 14 11.4 25.4 25.4 25.4 14 0 25.4-11.4 25.4-25.4z"
          />
        </g>

        {/* Right Segment */}
        <g opacity="1">
          <path
            fill="#FBE74E"
            d="M498.3-198.6v50.8c14 0 25.4-11.4 25.4-25.4 0-14-11.4-25.4-25.4-25.4z"
          />
          <path
            stroke="#001405"
            strokeWidth="2"
            fill="none"
            d="M498.3-198.6v50.8c14 0 25.4-11.4 25.4-25.4 0-14-11.4-25.4-25.4-25.4z"
          />
        </g>

        {/* Left Segment */}
        <g opacity="1">
          <path
            fill="#FBE74E"
            d="M447.5-147.8v-50.8c-14 0-25.4 11.4-25.4 25.4 0 14 11.4 25.4 25.4 25.4z"
          />
          <path
            stroke="#001405"
            strokeWidth="2"
            fill="none"
            d="M447.5-147.8v-50.8c-14 0-25.4 11.4-25.4 25.4 0 14 11.4 25.4 25.4 25.4z"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default SecurityHeadingIcon;
