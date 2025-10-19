import React from "react";

interface OverviewHorizontalFeatureCardProps {
  title: string;
  description: string;
  videoSrc: string;
}

const OverviewHorizontalFeatureCard: React.FC<
  OverviewHorizontalFeatureCardProps
> = ({ title, description, videoSrc }) => {
  return (
    <div className="bg-[#F9FAF9] flex justify-center items-center gap-x-24 mx-64 p-28 rounded-2xl">
      {/* Left Side - Text */}
      <div>
        <div className="space-y-8">
          <h1 className="text-[4.5rem] lg:text-[4.5rem] text-black leading-[0.85] tracking-[-0.02em]">
            {title}
          </h1>

          <p className="text-gray-600 text-[1.1rem] lg:text-[1.4rem] leading-[1.5] max-w-[32rem] font-medium">
            {description}
          </p>
        </div>
      </div>

      {/* Right Side - Video */}
      <video className="w-60 h-60 object-cover" autoPlay loop muted playsInline>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
};

export default OverviewHorizontalFeatureCard;
