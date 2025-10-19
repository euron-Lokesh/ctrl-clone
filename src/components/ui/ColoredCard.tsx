// ColoredCard.tsx
interface ColoredCardProps {
  color: string;
  text: string;
  icon?: React.ReactNode;
  pillText?: string;
  videoSrc?: string;
  className?: string;
}

export function ColoredCard({
  color,
  text,
  icon,
  pillText,
  videoSrc,
  className = "",
}: ColoredCardProps) {
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
      className={`h-full rounded-2xl relative ${className}`}
    >
      {/* Icon and text at top */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-black leading-tight flex-1 pr-4">{text}</h3>
        <div className="text-black flex-shrink-0">{icon}</div>
      </div>

      {/* Pill at bottom - absolute positioned */}
      {pillText && (
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
      )}

      {videoSrc && (
        <video
          className="absolute bottom-5 left-0 right-0 w-full h-[45%] object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
