// InfoCard.tsx
interface InfoCardProps {
  title: string;
  svgComponent: React.ReactNode;
}

export function InfoCard({ title, svgComponent }: InfoCardProps) {
  return (
    <div className="bg-[#ECEFEC] border-2 border-gray-200 w-full h-full rounded-2xl p-6 relative">
      {/* Text at top */}
      <h3 className="text-3xl font-medium text-black pr-16">{title}</h3>

      {/* SVG at bottom left - absolute positioned */}
      <div className="absolute bottom-6 left-6">{svgComponent}</div>
    </div>
  );
}
