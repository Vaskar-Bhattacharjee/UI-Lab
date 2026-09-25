"use client";

import { useId } from "react";
import type { ReactNode, SVGProps } from "react";
import { motion } from "motion/react";

type EnvelopeProps = Omit<SVGProps<SVGSVGElement>, "opacity" | "children"> & {
  opacity?: number;
  open?: boolean;
  layer?: "all" | "back" | "front";
  children?: ReactNode;
};

const FLAP =
  "M64 40 H496 A24 24 0 0 1 512.56 46.6 L315.8 222.1 Q280 254 244.2 222.1 L47.44 46.6 A24 24 0 0 1 64 40 Z";

const LEFT = "M40 40 L280 200 L40 360 Z";
const RIGHT = "M520 40 L280 200 L520 360 Z";
const BOTTOM = "M40 360 L280 200 L520 360 Z";

const HINGE = { originX: 0.5, originY: 0 } as const;
const HALF = 0.25;
const CARDS_OUT = 0.5;

export default function Envelope({
  opacity = 1,
  open = false,
  layer = "all",
  children,
  style,
  ...props
}: EnvelopeProps) {
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `${uid}-${name}`;
  const url = (name: string) => `url(#${id(name)})`;

  const showBack = layer !== "front";
  const showFront = layer !== "back";

  return (
    <svg
      viewBox="0 0 560 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible", ...style }}
      {...props}
    >
      <defs>
        <clipPath id={id("body")}>
          <rect x="40" y="40" width="480" height="320" rx="24" />
        </clipPath>

        <filter id={id("blur-lg")} x="-25%" y="-25%" width="150%" height="160%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <filter id={id("blur-md")} x="-20%" y="-20%" width="140%" height="150%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id={id("blur-sm")} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>

        <linearGradient id={id("back")} gradientUnits="userSpaceOnUse" x1="0" y1="40" x2="0" y2="360">
          <stop offset="0" stopColor="#d7d7de" />
          <stop offset="1" stopColor="#e9e9ee" />
        </linearGradient>
        <linearGradient id={id("left")} gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="250" y2="0">
          <stop offset="0" stopColor="#fdfdfe" />
          <stop offset="0.55" stopColor="#f2f2f5" />
          <stop offset="1" stopColor="#e3e3e8" />
        </linearGradient>
        <linearGradient id={id("right")} gradientUnits="userSpaceOnUse" x1="520" y1="0" x2="310" y2="0">
          <stop offset="0" stopColor="#fdfdfe" />
          <stop offset="0.55" stopColor="#f2f2f5" />
          <stop offset="1" stopColor="#e3e3e8" />
        </linearGradient>
        <linearGradient id={id("bottom")} gradientUnits="userSpaceOnUse" x1="0" y1="200" x2="0" y2="360">
          <stop offset="0" stopColor="#e4e4e9" />
          <stop offset="0.5" stopColor="#f2f2f5" />
          <stop offset="1" stopColor="#fafafb" />
        </linearGradient>
        <linearGradient id={id("flap")} gradientUnits="userSpaceOnUse" x1="0" y1="40" x2="0" y2="254">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f1f1f4" />
        </linearGradient>
        <linearGradient id={id("flap-inner")} gradientUnits="userSpaceOnUse" x1="0" y1="40" x2="0" y2="254">
          <stop offset="0" stopColor="#d3d3db" />
          <stop offset="1" stopColor="#e6e6eb" />
        </linearGradient>
      </defs>

      <g opacity={opacity}>
        {showBack && (
          <>
            {/* Shadow: a wide soft one plus a tight one for contact */}
            <g data-part="shadow">
              <rect x="52" y="64" width="456" height="312" rx="28" fill="#1b1d2e" opacity="0.2" filter={url("blur-lg")} />
              <rect x="44" y="46" width="472" height="316" rx="24" fill="#1b1d2e" opacity="0.1" filter={url("blur-sm")} />
            </g>

            {/* Back: only visible when the flap is open */}
            <g data-part="back">
              <rect x="40" y="40" width="480" height="320" rx="24" fill={url("back")} />
            </g>

            {/* Flap, open state: unfolds above the body */}
            <motion.g
              data-part="flap-open"
              style={HINGE}
              initial={false}
              animate={{ scaleY: open ? -1 : 0 }}
              transition={{
                duration: HALF,
                ease: open ? "easeOut" : "easeIn",
                delay: open ? HALF : CARDS_OUT,
              }}
            >
              <path d={FLAP} fill={url("flap-inner")} stroke="#000000" strokeOpacity="0.05" strokeWidth="0.75" strokeLinejoin="round" />
            </motion.g>
          </>
        )}

        {children}

        {showFront && (
          <>
            {/* Front pocket: left, right and bottom panels */}
            <g data-part="front" clipPath={url("body")}>
              <path d={LEFT} fill={url("left")} />
              <path d={RIGHT} fill={url("right")} />
              <path d={BOTTOM} fill="#1b1d2e" opacity="0.16" filter={url("blur-sm")} transform="translate(0 -2)" />
              <path d={BOTTOM} fill={url("bottom")} />
              <path d="M40 360 L280 200 L520 360" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="1.25" strokeLinejoin="round" />
            </g>

            {/* Thin rim so the edge holds up on white backgrounds */}
            <g data-part="rim">
              <path d="M40.5 64 V336 A23.5 23.5 0 0 0 64 359.5 H496 A23.5 23.5 0 0 0 519.5 336 V64" stroke="#000000" strokeOpacity="0.08" />
              <path d="M41.5 64 V336 A22.5 22.5 0 0 0 64 358.5 H496 A22.5 22.5 0 0 0 518.5 336 V64" stroke="#ffffff" strokeOpacity="0.8" />
            </g>

            {/* Flap, closed state: flattens onto the top edge first */}
            <motion.g
              data-part="flap"
              style={HINGE}
              initial={false}
              animate={{ scaleY: open ? 0 : 1 }}
              transition={{
                duration: HALF,
                ease: open ? "easeIn" : "easeOut",
                delay: open ? 0 : CARDS_OUT + HALF,
              }}
            >
              <g clipPath={url("body")}>
                <path data-part="flap-shadow" d={FLAP} transform="translate(0 8)" fill="#1b1d2e" opacity="0.24" filter={url("blur-md")} />
              </g>
              <path d={FLAP} fill={url("flap")} stroke="#000000" strokeOpacity="0.05" strokeWidth="0.75" strokeLinejoin="round" />
            </motion.g>
          </>
        )}
      </g>
    </svg>
  );
}