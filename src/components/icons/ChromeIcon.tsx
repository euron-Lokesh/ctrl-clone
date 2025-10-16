interface ChromeIconProps {
  className?: string;
  size?: number;
}

export default function ChromeIcon({
  className = "",
  size = 24,
}: ChromeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g>
        <path
          d="M14.4718 27.9453C21.9121 27.9453 27.9437 21.9134 27.9437 14.4726C27.9437 7.0319 21.9121 1 14.4718 1C7.03155 1 1 7.0319 1 14.4726C1 21.9134 7.03155 27.9453 14.4718 27.9453Z"
          fill="#FBE74E"
          stroke="#001405"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </g>
      <g>
        <path
          d="M27.4719 27.9453C34.9121 27.9453 40.9437 21.9134 40.9437 14.4726C40.9437 7.0319 34.9121 1 27.4719 1C20.0316 1 14 7.0319 14 14.4726C14 21.9134 20.0316 27.9453 27.4719 27.9453Z"
          fill="#FFCADC"
          stroke="#001405"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </g>
      <g>
        <path
          d="M41.4719 27.9453C48.9121 27.9453 54.9437 21.9134 54.9437 14.4726C54.9437 7.0319 48.9121 1 41.4719 1C34.0316 1 28 7.0319 28 14.4726C28 21.9134 34.0316 27.9453 41.4719 27.9453Z"
          fill="#9DC4F5"
          stroke="#001405"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </g>
    </svg>
  );
}
