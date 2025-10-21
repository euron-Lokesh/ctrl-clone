interface ButtonProps {
  children: React.ReactNode;
  variant?: "green" | "black" | "outline";
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  variant = "green",
  onClick,
  className = "",
  icon,
}: ButtonProps) {
  const baseStyles =
    "relative  py-3 border-2 border-black rounded-full font-medium overflow-hidden inline-flex items-center justify-center gap-2";

  const variants = {
    green: "px-12 bg-[#02C92F] text-black ",
    black: "px-8 bg-black text-white",
    outline:
      "border-2 px-8 border-black text-black hover:bg-black hover:text-white transition-all duration-300",
  };

  const needsSlideEffect = variant === "green" || variant === "black";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className} group`}
    >
      {needsSlideEffect && (
        <>
          <span
            className={`absolute inset-0 ${
              variant === "green" ? "bg-black" : "bg-[#02C92F]"
            } translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out`}
          />

          <span className="relative transition-transform duration-300 group-hover:-translate-y-[150%] flex items-center gap-2">
            {icon && <span className="inline-block">{icon}</span>}
            {children}
          </span>
          <span
            className={`absolute inset-0 flex items-center justify-center gap-2 ${
              variant === "green" ? "text-white" : "text-black"
            } translate-y-[150%] group-hover:translate-y-0 transition-transform duration-300`}
          >
            {icon && <span className="inline-block">{icon}</span>}
            {children}
          </span>
        </>
      )}

      {!needsSlideEffect && children}
    </button>
  );
}
