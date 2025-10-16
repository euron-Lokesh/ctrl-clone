"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";
import Button from "@/components/ui/Button";
import CtrlLogoIcon from "../icons/CtrlLogo";
import Link from "next/link";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const lastScroll = useRef(0);

  useEffect(() => {
    if (headerRef.current) {
      animate(headerRef.current, {
        translateY: { from: -100, to: 0 },
        opacity: { from: 0, to: 1 },
        duration: 800,
        ease: "outCubic",
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const down = scroll > lastScroll.current;

      if (down && scroll > 100 && logoRef.current && btnRef.current) {
        animate([logoRef.current, btnRef.current], {
          translateY: -50,
          opacity: 0,
          duration: 300,
        });
      }

      if (down && scroll > 450 && navRef.current) {
        animate(navRef.current, {
          translateY: -50,
          opacity: 0,
          duration: 300,
        });
      }

      if (!down && scroll >= 100 && navRef.current) {
        animate(navRef.current, {
          translateY: 0,
          opacity: 1,
          duration: 400,
        });
      }

      if (scroll < 50 && logoRef.current && btnRef.current && navRef.current) {
        animate([logoRef.current, btnRef.current, navRef.current], {
          translateY: 0,
          opacity: 1,
          duration: 400,
        });
      }

      lastScroll.current = scroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]"
    >
      <nav className="max-w-[90rem] mx-auto px-6 md:px-8 py-8 flex items-center justify-between">
        <div ref={logoRef} className="flex items-center gap-2">
          <CtrlLogoIcon size={120} />
        </div>

        <div
          ref={navRef}
          className="hidden md:flex items-center gap-1 bg-[#ECEFEC] rounded-lg px-4 py-2"
        >
          <Link
            href="#ctrl"
            className="group relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#D1D6D1]"
          >
            $CTRL
          </Link>
          <span className="text-gray-400">|</span>

          <Link
            href="#support"
            className="group relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#D1D6D1]"
          >
            Support
          </Link>
          <span className="text-gray-400">|</span>

          <Link
            href="#security"
            className="group relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#D1D6D1]"
          >
            Security
          </Link>
          <span className="text-gray-400">|</span>

          <Link
            href="#resources"
            className="group relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#D1D6D1]"
          >
            Resources
          </Link>
        </div>

        <div ref={btnRef}>
          <Button variant="black">Download</Button>
        </div>
      </nav>
    </header>
  );
}

// import { useEffect, useRef, useState } from "react";
// import { animate } from "animejs";
// import Button from "@/components/ui/Button";
// import CtrlLogoIcon from "../icons/CtrlLogo";
// import Link from "next/link";

// export default function Header() {
//   const headerRef = useRef<HTMLElement>(null);
//   const logoRef = useRef<HTMLDivElement>(null);
//   const navRef = useRef<HTMLDivElement>(null);
//   const btnRef = useRef<HTMLDivElement>(null);
//   const highlightRef = useRef<HTMLDivElement>(null);
//   const lastScroll = useRef(0);

//   const [activeLink, setActiveLink] = useState<number | null>(null);

//   // Slide in on load
//   useEffect(() => {
//     if (headerRef.current) {
//       animate(headerRef.current, {
//         translateY: { from: -100, to: 0 },
//         opacity: { from: 0, to: 1 },
//         duration: 800,
//         ease: "outCubic",
//       });
//     }
//   }, []);

//   // Handle scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const scroll = window.scrollY;
//       const down = scroll > lastScroll.current;

//       // Hide logo + button at 100px down
//       if (down && scroll > 100 && logoRef.current && btnRef.current) {
//         animate([logoRef.current, btnRef.current], {
//           translateY: -50,
//           opacity: 0,
//           duration: 300,
//         });
//       }

//       // Hide nav at 250px down
//       if (down && scroll > 450 && navRef.current) {
//         animate(navRef.current, {
//           translateY: -50,
//           opacity: 0,
//           duration: 300,
//         });
//       }

//       // Show nav when scrolling up (but not logo/button yet)
//       if (!down && scroll >= 100 && navRef.current) {
//         animate(navRef.current, {
//           translateY: 0,
//           opacity: 1,
//           duration: 400,
//         });
//       }

//       // Show everything when at top
//       if (scroll < 50 && logoRef.current && btnRef.current && navRef.current) {
//         animate([logoRef.current, btnRef.current, navRef.current], {
//           translateY: 0,
//           opacity: 1,
//           duration: 400,
//         });
//       }

//       lastScroll.current = scroll;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Handle nav link hover - move highlight
//   const handleLinkHover = (
//     index: number,
//     event: React.MouseEvent<HTMLAnchorElement>
//   ) => {
//     const link = event.currentTarget;
//     const parent = link.parentElement;

//     if (!highlightRef.current || !parent) return;

//     const linkRect = link.getBoundingClientRect();
//     const parentRect = parent.getBoundingClientRect();

//     const left = linkRect.left - parentRect.left;
//     const width = linkRect.width;

//     if (activeLink === null) {
//       // First hover - appear instantly
//       highlightRef.current.style.opacity = "1";
//       highlightRef.current.style.left = `${left}px`;
//       highlightRef.current.style.width = `${width}px`;
//     } else {
//       // Slide to new position
//       animate(highlightRef.current, {
//         left: left,
//         width: width,
//         duration: 300,
//         ease: "outCubic",
//       });
//     }

//     setActiveLink(index);
//   };

//   // Hide highlight when mouse leaves nav
//   const handleNavLeave = () => {
//     if (highlightRef.current) {
//       animate(highlightRef.current, {
//         opacity: 0,
//         duration: 200,
//       });
//     }
//     setActiveLink(null);
//   };

//   return (
//     <header
//       ref={headerRef}
//       className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]"
//     >
//       <nav className="max-w-[90rem] mx-auto px-6 md:px-8 py-8 flex items-center justify-between">
//         {/* Logo */}
//         <div ref={logoRef} className="flex items-center gap-2">
//           <CtrlLogoIcon size={120} />
//         </div>

//         {/* Nav Links with sliding highlight */}
//         <div
//           ref={navRef}
//           className="hidden md:flex items-center gap-1 bg-[#ECEFEC] rounded-lg px-4 py-2 relative"
//           onMouseLeave={handleNavLeave}
//         >
//           {/* Sliding highlight background */}
//           <div
//             ref={highlightRef}
//             className="absolute bg-[#D1D6D1] rounded-full h-[calc(100%-30%)] top-2 opacity-0 pointer-events-none"
//             style={{ transition: "none" }}
//           />

//           <Link
//             href="#ctrl"
//             className="px-6 py-2 rounded-full text-sm font-medium relative z-10 transition-none"
//             onMouseEnter={(e) => handleLinkHover(0, e)}
//           >
//             $CTRL
//           </Link>
//           <span className="text-gray-400">|</span>
//           <Link
//             href="#support"
//             className="px-6 py-2 rounded-full text-sm font-medium relative z-10 transition-none"
//             onMouseEnter={(e) => handleLinkHover(1, e)}
//           >
//             Support
//           </Link>
//           <span className="text-gray-400">|</span>
//           <Link
//             href="#security"
//             className="px-6 py-2 rounded-full text-sm font-medium relative z-10 transition-none"
//             onMouseEnter={(e) => handleLinkHover(2, e)}
//           >
//             Security
//           </Link>
//           <span className="text-gray-400">|</span>
//           <Link
//             href="#resources"
//             className="px-6 py-2 rounded-full text-sm font-medium relative z-10 transition-none"
//             onMouseEnter={(e) => handleLinkHover(3, e)}
//           >
//             Resources
//           </Link>
//         </div>

//         {/* Download Button */}
//         <div ref={btnRef}>
//           <Button variant="black">Download</Button>
//         </div>
//       </nav>
//     </header>
//   );
// }
