"use client";

import { motion, useAnimation } from "motion/react";
import { useId } from "react";

export type ConnectorVariant = "top" | "middle" | "bottom" | "all";

interface AdaptiveWorkflowConnectorProps extends React.SVGProps<SVGSVGElement> {
  variant?: ConnectorVariant;
  strokeColor?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  pathControls?: ReturnType<typeof useAnimation>;
}

export function AdaptiveWorkflowConnector({
  variant = "middle",
  strokeColor = "#737373",
  strokeWidth = 1.25,
  strokeOpacity = 0.5,
  pathControls,
  className,
  ...props
}: AdaptiveWorkflowConnectorProps) {
  const gradientId = useId().replace(/:/g, "");

  const paths = {
    top: `
      M 20 180 
      C 110 180, 110 60, 200 60
      M 320 60 
      C 400 60, 390 180, 460 180
    `,
    middle: `
      M 20 180 
      C 160 180, 175 245, 275 235 
      C 370 225, 385 180, 460 180
    `,
    bottom: `
      M 20 180 
      C 110 180, 110 300, 200 300
    `,
  };

  const viewBoxes = {
    top: "0 0 480 360",
    middle: "0 0 480 360",
    bottom: "0 0 480 360",
    all: "0 0 480 360",
  };

  const commonPathProps = {
    animate: pathControls,
    initial: { pathLength: 0, opacity: 0 },
    stroke: `url(#adaptive-gradient-${gradientId})`,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke",
  };

  return (
    <svg
      viewBox={viewBoxes[variant]}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient
          id={`adaptive-gradient-${gradientId}`}
          x1="20"
          y1="180"
          x2="460"
          y2="180"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={strokeColor} stopOpacity={strokeOpacity * 0.2} />
          <stop offset="20%" stopColor={strokeColor} stopOpacity={strokeOpacity * 0.8} />
          <stop offset="50%" stopColor={strokeColor} stopOpacity={strokeOpacity} />
          <stop offset="80%" stopColor={strokeColor} stopOpacity={strokeOpacity * 0.8} />
          <stop offset="100%" stopColor={strokeColor} stopOpacity={strokeOpacity * 0.3} />
        </linearGradient>
      </defs>

      {variant === "all" ? (
        <>
          <motion.path d={paths.top} {...commonPathProps} />
          <motion.path d={paths.middle} {...commonPathProps} />
          <motion.path d={paths.bottom} {...commonPathProps} />
        </>
      ) : (
        <motion.path d={paths[variant]} {...commonPathProps} />
      )}
    </svg>
  );
}