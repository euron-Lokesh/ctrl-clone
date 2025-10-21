// RightCard3Svg Component
interface RightCard3SvgProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const RightCard3Svg: React.FC<RightCard3SvgProps> = ({
  size = 100,
  width,
  height,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 180 100"
    width={width ?? size}
    height={height ?? size}
    preserveAspectRatio="xMidYMid meet"
    style={{
      width: width ?? size,
      height: height ?? size,
      transform: "translate3d(0px, 0px, 0px)",
      contentVisibility: "visible",
    }}
    {...props}
  >
    <defs>
      <clipPath id="__lottie_element_7">
        <rect width="180" height="100" x="0" y="0" />
      </clipPath>
    </defs>
    <g clipPath="url(#__lottie_element_7)">
      <g
        transform="matrix(0.74796,0,0,0.74796,-20.4743,-278.3187)"
        opacity="1"
        style={{ display: "block" }}
      >
        <path
          fill="rgb(255,90,77)"
          d="M265.716,438.488C265.716,473.508,237.226,502,202.208,502H93.768C58.756,502,30.266,473.508,30.266,438.488c0-35.02,28.49-63.507,63.502-63.507h108.44c35.018,0,63.508,28.487,63.508,63.507z"
        />
        <path
          fill="none"
          stroke="rgb(0,20,5)"
          strokeWidth="2"
          d="M265.716,438.488C265.716,473.508,237.226,502,202.208,502H93.768C58.756,502,30.266,473.508,30.266,438.488c0-35.02,28.49-63.507,63.502-63.507h108.44c35.018,0,63.508,28.487,63.508,63.507z"
        />
      </g>

      {/* Yellow Circles */}
      <g transform="matrix(0.7521,0,0,0.7521,-22.5894,-279.4508)">
        <path
          fill="rgb(251,231,78)"
          d="M102.2,399.5c21.54,0,39,17.461,39,39s-17.46,39-39,39s-39-17.461-39-39s17.46-39,39-39z"
        />
      </g>
      <g transform="matrix(0.7521,0,0,0.7521,-21.3935,-279.4508)">
        <path
          fill="rgb(251,231,78)"
          d="M148,399.5c21.539,0,39,17.461,39,39s-17.461,39-39,39s-39-17.461-39-39s17.461-39,39-39z"
        />
      </g>
      <g transform="matrix(0.7521,0,0,0.7521,-20.7205,-279.4508)">
        <path
          fill="rgb(251,231,78)"
          d="M192.4,399.5c21.539,0,39,17.461,39,39s-17.461,39-39,39s-39-17.461-39-39s17.461-39,39-39z"
        />
      </g>

      {/* Green Circle with Outline */}
      <g transform="matrix(0.7521,0,0,0.7521,-22.5939,-279.4508)">
        <path
          fill="rgb(5,201,47)"
          d="M210.7,450.6c6.7,0,12.1-5.4,12.1-12.1c0-6.7-5.4-12.1-12.1-12.1s-12.2,5.4-12.2,12.1c0,6.7,5.4,12.1,12.2,12.1z"
        />
        <path
          fill="none"
          stroke="rgb(0,20,5)"
          strokeWidth="2"
          d="M210.7,450.6c6.7,0,12.1-5.4,12.1-12.1c0-6.7-5.4-12.1-12.1-12.1s-12.2,5.4-12.2,12.1c0,6.7,5.4,12.1,12.2,12.1z"
        />
      </g>

      {/* Outlines for Yellow Circles */}
      <g transform="matrix(0.7521,0,0,0.7521,-24.1786,-279.4508)">
        <path
          fill="none"
          stroke="rgb(0,20,5)"
          strokeWidth="2"
          d="M102.2,399.5c21.54,0,39,17.461,39,39s-17.46,39-39,39s-39-17.461-39-39s17.46-39,39-39z"
        />
      </g>
      <g transform="matrix(0.7521,0,0,0.7521,-22.047,-279.4508)">
        <path
          fill="none"
          stroke="rgb(0,20,5)"
          strokeWidth="2"
          d="M148,399.5c21.539,0,39,17.461,39,39s-17.461,39-39,39s-39-17.461-39-39s17.461-39,39-39z"
        />
      </g>
      <g transform="matrix(0.7521,0,0,0.7521,-20.8694,-279.4508)">
        <path
          fill="none"
          stroke="rgb(0,20,5)"
          strokeWidth="2"
          d="M192.4,399.5c21.539,0,39,17.461,39,39s-17.461,39-39,39s-39-17.461-39-39s17.461-39,39-39z"
        />
      </g>
    </g>
  </svg>
);
