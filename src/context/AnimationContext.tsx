import { createContext, useContext, useState } from "react";

type AnimationPhase = "idle" | "hero" | "header" | "button" | "complete";

interface AnimationContextType {
  phase: AnimationPhase;
  setPhase: (phase: AnimationPhase) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within AnimationProvider");
  }
  return context;
};

export const AnimationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [phase, setPhase] = useState<AnimationPhase>("idle");

  return (
    <AnimationContext.Provider value={{ phase, setPhase }}>
      {children}
    </AnimationContext.Provider>
  );
};
