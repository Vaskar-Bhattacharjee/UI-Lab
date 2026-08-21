export const MilestoneDiamond = ({ color = "#5B5C5A" }: { color?: string }) => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <path
      d="M7.3406 2.32C7.68741 1.89333 8.31259 1.89333 8.6594 2.32L12.7903 7.402C13.0699 7.74597 13.0699 8.25403 12.7903 8.598L8.6594 13.68C8.31259 14.1067 7.68741 14.1067 7.3406 13.68L3.2097 8.598C2.9301 8.25403 2.9301 7.74597 3.2097 7.402L7.3406 2.32Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

interface ElectricProps {
  className?: string;
  color?: string;
  bgColor?: string; 
}

export const Electric = ({
  className = "",
  color = "currentColor",
  bgColor = "currentColor",
}: ElectricProps) => (
  <div className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
      className={className}
    >
      <g clipPath="url(#clip0_2237_10003)">
        <rect
          width="14"
          height="14"
          x="14"
          y="14"
          fill={bgColor}
          opacity="0.2"
          rx="7"
          transform="rotate(180 14 14)"
        />
        <path
          fill={color}
          fillRule="evenodd"
          d="M5.578 10.648a.66.66 0 0 1-.558-.186L2.999 8.441a.656.656 0 0 1 .928-.928l1.4 1.4L7.94 4.126a.656.656 0 0 1 1.04-.15L11 5.997a.656.656 0 0 1-.928.928l-1.4-1.401-2.612 4.788a.66.66 0 0 1-.482.336"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="clip0_2237_10003">
          <path fill="#fff" d="M14 0H0v14h14z" />
        </clipPath>
      </defs>
    </svg>
  </div>
);

export const CurvedLine = ({className}:{className?: string}) =>(
    <div className={className}>
    <svg 
        xmlns="http://www.w3.org/2000/svg"
        width="153" 
        height="109" 
        fill="none" 
        viewBox="0 0 153 109" 
    >
        <path stroke="url(#paint0_linear_2237_10241)" d="M153 .5a84.21 84.21 0 0 0-70.032 37.443L55.754 78.691A67.05 67.05 0 0 1 0 108.5"></path>
        <defs>
            <linearGradient id="paint0_linear_2237_10241" x1="0" x2="153" y1="54.5" y2="54.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#fff" stop-opacity="0.1"></stop>
                <stop offset="1" stop-color="#fff" stop-opacity="0.3"></stop>
            </linearGradient>
        </defs>
    </svg>
    </div>
)

export const CurvedLine2 = ({className}:{className?: string}) =>(
    <div className={className}>
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="88" 
        height="111" 
        fill="none" 
        viewBox="0 0 88 111" 
        className="_9Zs8oG_connectorTwo"
    >
        <path 
            stroke="url(#paint0_linear_2237_10465)" 
            d="M88 110.5a37.445 37.445 0 0 1-35.036-24.231L27.893 19.79A29.81 29.81 0 0 0 0 .5">
        </path>
        <defs>
            <linearGradient 
                id="paint0_linear_2237_10465" 
                x1="0" 
                x2="88" 
                y1="55.5" 
                y2="55.5" 
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#fff" stop-opacity="0.1"></stop>
                <stop offset="1" stop-color="#fff" stop-opacity="0.3"></stop>
            </linearGradient>
        </defs>
    </svg>

    </div>
)

