import React from "react";
import HandFinger from "../icons/HandFinger";
import { ColoredCard } from "../ui/ColoredCard";

const CommunityDetails = [
  {
    color: "blue",
    text: "Founded in 2020, Ctrl (formerly XDEFI) was the world's first multichain wallet.",
    videoSrc: "/videos/community-video-1.mp4",
  },
  {
    color: "pink",
    text: "24/7 live customer support. Our global team is here to help you.",
    videoSrc: "/videos/community-video-2.mp4",
  },
  {
    color: "yellow",
    text: "4.8 star rating in the Google Chrome Store after 650+ reviews.",
    videoSrc: "/videos/community-video-3.mp4",
  },
];

const Community = () => {
  return (
    <div className="w-full mt-32 px-52 py-20 bg-[#F9FAF9]">
      {/* Header */}
      <div className="flex justify-end">
        <span className="text-5xl font-semibold mr-96 rounded-full">
          <span className="text-red-600">. </span>
          <span className="text-black ">Level up</span>
        </span>
      </div>

      {/* Main Content */}
      <div className="text-center w-full mt-10">
        <div className="flex items-center justify-center text-[6rem] leading-[0.3]">
          Join the
          <span className="mx-7 flex items-center">
            <HandFinger size={90} />
          </span>
          600,000+
        </div>

        <p className="text-[6rem] text-black">people who trust Ctrl.</p>
      </div>

      <div className="flex justify-center gap-x-10  mt-20 h-[36rem]">
        {CommunityDetails.map((card, index) => (
          <ColoredCard
            key={index}
            color={card.color}
            text={card.text}
            videoSrc={card.videoSrc}
            className="w-[23rem] rounded-4xl py-16 px-12 text-3xl transform transition-transform duration-700 hover:-translate-y-8"
          />
        ))}
      </div>
    </div>
  );
};

export default Community;
