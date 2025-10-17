"use client";
import { useRef, forwardRef, useImperativeHandle } from "react";
import { animate } from "animejs";
import Button from "@/components/ui/Button";
import ChromeIcon from "@/components/icons/ChromeIcon";

// Define the ref interface for TypeScript
export interface AnimatedButtonRef {
  animate: () => Promise<void>;
}

const AnimatedButton = forwardRef<AnimatedButtonRef>((props, ref) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  // Expose the animate method via ref
  useImperativeHandle(ref, () => ({
    animate: () => {
      return new Promise<void>((resolve) => {
        if (buttonRef.current) {
          animate(buttonRef.current, {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            ease: "outQuad",
            complete: () => resolve(),
          });
        } else {
          resolve();
        }
      });
    },
  }));

  return (
    <div
      ref={buttonRef}
      className="flex justify-center -mt-72 relative z-10"
      style={{ opacity: 0, transform: "translateY(30px)" }}
    >
      <Button icon={<ChromeIcon size={40} />}>Download for Chrome</Button>
    </div>
  );
});

AnimatedButton.displayName = "AnimatedButton";

export default AnimatedButton;
