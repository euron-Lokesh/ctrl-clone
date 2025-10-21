import { useState, useEffect, useRef } from "react";
import {
  Search,
  Triangle,
  Bitcoin,
  Zap,
  Star,
  Atom,
  Hexagon,
  Link,
  DollarSign,
  Sun,
  Layers,
  Circle,
} from "lucide-react";
import { Blockchain, ItemStyle } from "@/types/ChainWallet";

const ChainWallet = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");

  const lastScrollY = useRef<number>(0);
  const wheelPosition = useRef<number>(0);
  const autoDirection = useRef<number>(1);
  const scrollInfluence = useRef<number>(0);

  const blockchains: Blockchain[] = [
    { name: "Avalanche", color: "rgb(255, 90, 77)", icon: Triangle },
    { name: "Bitcoin", color: "rgb(251, 231, 78)", icon: Bitcoin },
    { name: "THORChain", color: "rgb(57, 92, 61)", icon: Zap },
    { name: "Tron", color: "rgb(255, 90, 77)", icon: Triangle },
    { name: "Cardano", color: "rgb(36, 163, 227)", icon: Star },
    { name: "BNB Smart Chain", color: "rgb(251, 231, 78)", icon: Hexagon },
    { name: "Cosmos", color: "rgb(156, 166, 158)", icon: Atom },
    { name: "Ethereum", color: "rgb(157, 196, 245)", icon: Hexagon },
    { name: "Polygon", color: "rgb(255, 202, 220)", icon: Link },
    { name: "Doge", color: "rgb(251, 231, 78)", icon: DollarSign },
    { name: "Solana", color: "rgb(226, 242, 229)", icon: Sun },
    { name: "Arbitrum", color: "rgb(157, 196, 245)", icon: Layers },
    { name: "Base", color: "rgb(157, 196, 245)", icon: Circle },
    { name: "Optimism", color: "rgb(255, 90, 77)", icon: Circle },
  ];

  const extendedBlockchains: Blockchain[] = [
    ...blockchains,
    ...blockchains,
    ...blockchains,
  ];

  useEffect(() => {
    let animationId: number;
    const baseAutoSpeed = 0.7;

    const animate = (): void => {
      scrollInfluence.current *= 0.95;

      const totalSpeed =
        autoDirection.current * baseAutoSpeed + scrollInfluence.current;
      wheelPosition.current += totalSpeed;
      setScrollY(wheelPosition.current);

      animationId = requestAnimationFrame(animate);
    };

    const handleScroll = (): void => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
          const currentScrollY = window.pageYOffset;
          const scrollDelta = currentScrollY - lastScrollY.current;

          if (Math.abs(scrollDelta) > 0.5) {
            if (scrollDelta > 0) {
              autoDirection.current = 1;
            } else {
              autoDirection.current = -1;
            }

            scrollInfluence.current = scrollDelta * 1.2;
          }

          lastScrollY.current = currentScrollY;
        }
      }
    };

    animate();

    let ticking = false;
    const scrollListener = (): void => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    lastScrollY.current = window.pageYOffset;

    window.addEventListener("scroll", scrollListener, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  const getItemStyle = (index: number): ItemStyle => {
    const itemHeight = 100;
    const centerOffset = scrollY % (blockchains.length * itemHeight);

    let yPosition = index * itemHeight - centerOffset;

    const wrapHeight = blockchains.length * itemHeight;
    if (yPosition > wrapHeight / 2) {
      yPosition -= wrapHeight;
    } else if (yPosition < -wrapHeight / 2) {
      yPosition += wrapHeight;
    }

    const distanceFromCenter = Math.abs(yPosition);
    const maxDistance = 250;
    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

    const frontLimit = 620;
    if (Math.abs(yPosition) > frontLimit) {
      return {
        transform: `translate3d(0, ${yPosition}px, 0) scale(0.6)`,
        opacity: 0,
        zIndex: 0,
      };
    }

    let opacity: number;
    if (distanceFromCenter < 120) {
      opacity = 1;
    } else if (distanceFromCenter < 300) {
      const fadeFactor = (distanceFromCenter - 120) / 180;
      opacity = Math.max(0.2, 1 - fadeFactor * 0.8);
    } else {
      opacity = 0.1;
    }

    let scale: number;
    if (distanceFromCenter < 20) {
      scale = 1;
    } else {
      scale = Math.max(0.6, 1 - normalizedDistance * 0.4);
    }

    const zIndex = Math.round(20 - normalizedDistance * 20);

    const curveIntensity = 60;
    const normalizedY = yPosition / maxDistance;
    const xOffset = curveIntensity * (normalizedY * normalizedY - 1.3);

    return {
      transform: `translate3d(${xOffset}px, ${yPosition}px, 0) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#F9FAF9] flex items-center justify-center gap-10 px-60 overflow-hidden relative"
    >
      <div className="w-2/2 max-w-2xl">
        <div className="space-y-8">
          <h1 className="text-[4.5rem] lg:text-[5.5rem]  font-sans text-black leading-[1] tracking-[-0.02em]">
            2,500+ chains.
            <br />
            <span className="block">One wallet.</span>
          </h1>

          <p className="text-gray-500 text-[1.1rem] lg:text-2xl leading-[1.5] max-w-[28rem] font-medium">
            Ctrl Wallet supports millions of assets and NFTs on 2,500+
            blockchains.
          </p>

          <div className="relative max-w-[30rem]">
            <div className="flex items-center bg-[#EEEEEE] rounded-full px-6 py-[1.3rem] border-2 border-gray-900 hover:border-gray-300 focus-within:border-gray-400 transition-all duration-200">
              <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500 text-2xl font-normal"
              />
              <Search size={30} className="text-gray-600 ml-3" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 relative h-screen flex items-center justify-start">
        <div className="relative w-full h-full flex flex-col items-start justify-center">
          {extendedBlockchains.map((blockchain, index) => (
            <div
              key={`${blockchain.name}-${index}`}
              className="absolute left-0 flex items-center space-x-[1.5rem] cursor-pointer group transition-all duration-200 ease-out"
              style={getItemStyle(index)}
            >
              <div
                className="w-[5rem] h-[5rem] border-2 border-black rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 flex-shrink-0"
                style={{ backgroundColor: blockchain.color }}
              >
                <blockchain.icon size={30} className="text-black" />
              </div>

              <span className="text-[2.5rem] font-sans lg:text-[4rem] font-[400] text-gray-700 whitespace-nowrap group-hover:text-gray-600 transition-colors duration-300">
                {blockchain.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChainWallet;
