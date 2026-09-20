"use client";

import { motion } from "motion/react";

interface CardSkeletonTwoProps {
  className?: string;
  strokeWidth?: number;
  showGrid?: boolean;
}

const hoverColor = "#5e887679";

export function CardSkeletonTwo({
  className,
  strokeWidth = 2,
  showGrid = true,
}: CardSkeletonTwoProps) {
  return (
    <motion.svg
      viewBox="0 0 660 590"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial="rest"
      whileHover="hover"
    >
      <defs>
        {showGrid && (
          <pattern
            id="cube-dot-grid"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="1"
              cy="1"
              r="0.325"
              className="fill-current"
            />
          </pattern>
        )}

        <radialGradient
          id="cube-hover-bg"
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop
            offset="0%"
            stopColor="currentColor"
            stopOpacity="0.055"
          />
          <stop
            offset="55%"
            stopColor="currentColor"
            stopOpacity="0.018"
          />
          <stop
            offset="100%"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      {/* GRID */}

      {showGrid && (
        <>
          <rect
            width="660"
            height="590"
            className="fill-current opacity-[0.025]"
          />

          <rect
            width="660"
            height="590"
            fill="url(#cube-dot-grid)"
            className="opacity-60"
          />
        </>
      )}

      {/* SUBTLE HOVER BACKGROUND */}

      <motion.ellipse
        cx="465"
        cy="340"
        rx="190"
        ry="180"
        fill="url(#cube-hover-bg)"
        variants={{
          rest: {
            opacity: 0,
            scale: 0.8,
          },
          hover: {
            opacity: 1,
            scale: 1,
          },
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
        }}
      />


      <motion.g
        variants={{
          rest: {
            y: 0,
            opacity: 0.62,
          },
          hover: {
            y: -12,
            opacity: 1,
          },
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        <motion.path
          d="M334 49L445 114L334 179L222 114Z"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          variants={{
            rest: {
              stroke: "currentColor",
            },
            hover: {
              stroke: hoverColor,
            },
          }}
          transition={{
            duration: 0.4,
          }}
        />

        <motion.path
          d="M222 114V249M334 179V314M445 114V249"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          variants={{
            rest: {
              stroke: "currentColor",
            },
            hover: {
              stroke: hoverColor,
            },
          }}
          transition={{
            duration: 0.4,
          }}
        />
      </motion.g>


      <motion.g
        variants={{
          rest: {
            x: 0,
            rotateZ: 0,
            opacity: 0.62,
          },
          hover: {
            x: -30,
            rotateZ: -5,
            opacity: 1,
          },
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.path
          d="M222 249L334 314L222 379L109 313Z"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          variants={{
            rest: {
              stroke: "currentColor",
            },
            hover: {
              stroke: hoverColor,
            },
          }}
          transition={{
            duration: 0.4,
          }}
        />

        <motion.path
          d="M109 313V450M222 379V515M334 314V450"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          variants={{
            rest: {
              stroke: "currentColor",
            },
            hover: {
              stroke: hoverColor,
            },
          }}
          transition={{
            duration: 0.4,
          }}
        />

        <motion.path
          d="M109 450L222 515L334 450"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          variants={{
            rest: {
              stroke: "currentColor",
            },
            hover: {
              stroke: hoverColor,
            },
          }}
          transition={{
            duration: 0.4,
          }}
        />
      </motion.g>


      <motion.g
        variants={{
          rest: {
            x: 0,
            rotateZ: 0,
            opacity: 0.62,
          },
          hover: {
            x: 30,
            rotateZ: 5,
  
            opacity: 1,
          },
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.path
          d="M334 314L445 249L558 313L445 379Z"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          variants={{
            rest: {
              stroke: "currentColor",
            },
            hover: {
              stroke: hoverColor,
            },
          }}
          transition={{
            duration: 0.4,
          }}
        />

        <motion.path
          d="M558 313V450M445 379V515"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          variants={{
            rest: {
              stroke: "currentColor",
            },
            hover: {
              stroke: hoverColor,
            },
          }}
          transition={{
            duration: 0.4,
          }}
        />

        <motion.path
          d="M334 450L445 515L558 450"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          variants={{
            rest: {
              stroke: "currentColor",
            },
            hover: {
              stroke: hoverColor,
            },
          }}
          transition={{
            duration: 0.4,
          }}
        />
      </motion.g>


      <motion.rect
        x="330"
        y="220"
        width="250"
        height="330"
        fill="transparent"
        pointerEvents="all"
        variants={{
          rest: {
            opacity: 0,
          },
          hover: {
            opacity: 0,
          },
        }}
      />


      <motion.g
        initial={{
          opacity: 0.62,
        }}
        whileHover={{
          opacity: 1,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        <rect
          x="330"
          y="220"
          width="250"
          height="330"
          fill="transparent"
        />
      </motion.g>
    </motion.svg>
  );
}





// export const CardSkeletonTwo = () => {
//   return (
//     <div className="flex h-full w-full items-center justify-center">
//       <svg
//         viewBox="0 0 300 290"
//         preserveAspectRatio="xMidYMid meet"
//         className="h-full w-full"
//         fill="none"
//       >
//         {/* top cube */}
//         <g id="cube-top">
//           <path d="M150 17 L210.5 52.8 L150 88.5 L89.5 52.8 Z" stroke="#a3a3a3" strokeWidth="1.25" strokeLinejoin="round" />
//           <path d="M210.5 52.8 L210.5 124.3 L150 160 L150 88.5 Z" stroke="#a3a3a3" strokeWidth="1.25" strokeLinejoin="round" />
//           <path d="M89.5 52.8 L150 88.5 L150 160 L89.5 124.3 Z" stroke="#a3a3a3" strokeWidth="1.25" strokeLinejoin="round" />
//         </g>

//         {/* bottom right cube */}
//         <g id="cube-bottom-right">
//           <path d="M273.8 231.5 L212.6 266 L211.9 195.8 L273.1 161.2 Z" stroke="#a3a3a3" strokeWidth="1.25" strokeLinejoin="round" />
//           <path d="M212.6 266 L150.7 230.3 L150 160 L211.9 195.8 Z" stroke="#a3a3a3" strokeWidth="1.25" strokeLinejoin="round" />
//           <path d="M273.1 161.2 L211.9 195.8 L150 160 L211.2 125.5 Z" stroke="#a3a3a3" strokeWidth="1.25" strokeLinejoin="round" />
//         </g>

//         {/* bottom left cube */}
//         <g id="cube-bottom-left">
//           <path d="M26.2 231.5 L26.9 161.2 L88.1 195.8 L87.4 266 Z" stroke="#a3a3a3" strokeWidth="1.25" strokeLinejoin="round" />
//           <path d="M26.9 161.2 L88.8 125.5 L150 160 L88.1 195.8 Z" stroke="#a3a3a3" strokeWidth="1.25" strokeLinejoin="round" />
//           <path d="M87.4 266 L88.1 195.8 L150 160 L149.3 230.3 Z" stroke="#a3a3a3" strokeWidth="1.25" strokeLinejoin="round" />
//         </g>
//       </svg>
//     </div>
//   );
// };