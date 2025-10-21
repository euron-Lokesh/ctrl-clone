interface InfoCardProps {
  title: string;
  svgComponent?: React.ReactNode;
  subtext?: string;
  videoSrc?: string;
  className?: string;
  titleClassName?: string;
  subtextClassName?: string;
}

export function InfoCard({
  title,
  svgComponent,
  subtext,
  videoSrc,
  className = "",
  titleClassName = "text-3xl font-medium text-black pr-16",
  subtextClassName = "text-gray-700 text-base mt-2 pr-10 leading-snug",
}: InfoCardProps) {
  return (
    <div
      className={`bg-[#F1F2EF] h-full rounded-2xl p-6 relative overflow-hidden ${className}`}
    >
      <h3 className={titleClassName}>{title}</h3>

      {subtext && <p className={subtextClassName}>{subtext}</p>}

      {svgComponent && (
        <div className="absolute bottom-6 left-6 z-10">{svgComponent}</div>
      )}

      {videoSrc && (
        <video
          className="absolute bottom-0 left-0 right-0 w-full m-auto h-[65%] object-cover z-0"
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
