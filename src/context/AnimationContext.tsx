"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";

// Animation phases for the loading sequence
export type AnimationPhase =
  | "initial" // Page loads, everything hidden
  | "hero-text" // "One wallet for all your crypto" appears
  | "take-ctrl" // "Take Ctrl" animation starts
  | "header-loading" // Header slides in (during Take Ctrl)
  | "header-complete" // Header fully loaded
  | "download-button" // Download button appears
  | "complete"; // All animations finished

interface AnimationContextType {
  currentPhase: AnimationPhase;
  setPhase: (phase: AnimationPhase) => void;
  triggerNextPhase: () => void;
  isPhaseActive: (phase: AnimationPhase) => boolean;
  isPhaseComplete: (phase: AnimationPhase) => boolean;
  registerPhaseCallback: (phase: AnimationPhase, callback: () => void) => void;
}

const AnimationContext = createContext<AnimationContextType | null>(null);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within AnimationProvider");
  }
  return context;
};

interface AnimationProviderProps {
  children: React.ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({
  children,
}) => {
  const [currentPhase, setCurrentPhase] = useState<AnimationPhase>("initial");
  const callbacksRef = useRef<Map<AnimationPhase, (() => void)[]>>(new Map());

  // Define the sequence order
  const phaseSequence: AnimationPhase[] = [
    "initial",
    "hero-text",
    "take-ctrl",
    "header-loading",
    "header-complete",
    "download-button",
    "complete",
  ];

  const setPhase = useCallback((phase: AnimationPhase) => {
    setCurrentPhase(phase);

    // Trigger any registered callbacks for this phase
    const callbacks = callbacksRef.current.get(phase) || [];
    callbacks.forEach((callback) => callback());

    // Dispatch custom event for additional coordination
    window.dispatchEvent(
      new CustomEvent(`animation-phase-${phase}`, {
        detail: { phase },
      })
    );
  }, []);

  const triggerNextPhase = useCallback(() => {
    const currentIndex = phaseSequence.indexOf(currentPhase);
    if (currentIndex < phaseSequence.length - 1) {
      const nextPhase = phaseSequence[currentIndex + 1];
      setPhase(nextPhase);
    }
  }, [currentPhase, setPhase]);

  const isPhaseActive = useCallback(
    (phase: AnimationPhase) => {
      return currentPhase === phase;
    },
    [currentPhase]
  );

  const isPhaseComplete = useCallback(
    (phase: AnimationPhase) => {
      const currentIndex = phaseSequence.indexOf(currentPhase);
      const phaseIndex = phaseSequence.indexOf(phase);
      return currentIndex > phaseIndex;
    },
    [currentPhase]
  );

  const registerPhaseCallback = useCallback(
    (phase: AnimationPhase, callback: () => void) => {
      const callbacks = callbacksRef.current.get(phase) || [];
      callbacks.push(callback);
      callbacksRef.current.set(phase, callbacks);
    },
    []
  );

  const contextValue: AnimationContextType = {
    currentPhase,
    setPhase,
    triggerNextPhase,
    isPhaseActive,
    isPhaseComplete,
    registerPhaseCallback,
  };

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
};

// Custom hook for phase-specific animations
export const usePhaseAnimation = (
  targetPhase: AnimationPhase,
  animationCallback: () => void,
  dependencies: React.DependencyList = []
) => {
  const { currentPhase } = useAnimation();
  const hasTriggeredRef = useRef(false);

  React.useEffect(() => {
    if (currentPhase === targetPhase && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      animationCallback();
    }
    // Reset when moving away from this phase
    if (currentPhase !== targetPhase) {
      hasTriggeredRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPhase, targetPhase, ...dependencies]);
};
