// ColoredCard.tsx
interface ColoredCardProps {
  color: string;
  text: string;
  icon: React.ReactNode;
  pillText: string;
}

export function ColoredCard({ color, text, icon, pillText }: ColoredCardProps) {
  const colorClasses = {
    blue: "#9DC4F5",
    yellow: "#FBE74E",
    pink: "#FFCADC",
  };

  const pillColors = {
    blue: "#CEE1FA",
    yellow: "#FEF3AD",
    pink: "#FFE5EE",
  };

  return (
    <div
      style={{
        backgroundColor: colorClasses[color as keyof typeof colorClasses],
      }}
      className="w-full h-full rounded-2xl p-6 relative"
    >
      {/* Icon and text at top */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-3xl font-bold text-black leading-tight flex-1 pr-4">
          {text}
        </h3>
        <div className="text-black flex-shrink-0">{icon}</div>
      </div>

      {/* Pill at bottom - absolute positioned */}
      <div className="absolute bottom-6 left-6">
        <span
          style={{
            backgroundColor: pillColors[color as keyof typeof pillColors],
          }}
          className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-black"
        >
          {pillText}
        </span>
      </div>
    </div>
  );
}
