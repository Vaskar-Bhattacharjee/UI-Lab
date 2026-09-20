"use client";
import React, { useEffect, useRef, useId } from "react";

interface CurvedConnectorProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  strokeWidth?: number | string;
  beamWidth?: number;
  beamColor?: string;
  tipColor?: string;
  duration?: number;
  delay?: number;
}

export default function CurvedConnector({
  className = "text-neutral-500",
  strokeWidth = 1.5,
  beamWidth = 2,
  beamColor = "#3b82f6",
  tipColor,
  duration = 3,
  delay = 0,
  ...props
}: CurvedConnectorProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const beamRef = useRef<SVGPathElement>(null);
  const gradRef = useRef<SVGLinearGradientElement>(null);
  const uid = useId().replace(/:/g, "");
  const resolvedTip = tipColor ?? beamColor;

useEffect(() => {
  const pathEl = pathRef.current;
  const beamEl = beamRef.current;
  const gradEl = gradRef.current;
  if (!pathEl || !beamEl || !gradEl) return;

    const totalLength = pathEl.getTotalLength();
    const beamLength = totalLength * 0.4;
    const extendedLength = totalLength + beamLength;
    const durationMs = duration * 1000;
    const pauseMs = 400;
    const samples = 20;

  function normalAt(dist: number) {
    const eps = 0.5;
    const d0 = Math.max(0, dist - eps);
    const d1 = Math.min(totalLength, dist + eps);
    const p0 = pathEl!.getPointAtLength(d0);
    const p1 = pathEl!.getPointAtLength(d1);
    let dx = p1.x - p0.x;
    let dy = p1.y - p0.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    dx /= len;
    dy /= len;
    return { nx: -dy, ny: dx };
  }

  let raf: number;
  let timeoutId: NodeJS.Timeout;
  let startTime: number | null = null;
  let pausing = false;
  let pauseStart = 0;

  function frame(ts: number) {
    if (pausing) {
      if (ts - pauseStart >= pauseMs) {
        pausing = false;
        startTime = ts;
      }
      raf = requestAnimationFrame(frame);
      return;
    }

    if (startTime === null) startTime = ts;
    const elapsed = ts - startTime;
    const progress = Math.min(elapsed / durationMs, 1);
      const logicalTip = progress * extendedLength;
      const tipDist = Math.min(logicalTip, totalLength);
      const tailDist = Math.max(0, Math.min(logicalTip - beamLength, totalLength));

    const up: { x: number; y: number }[] = [];
    const down: { x: number; y: number }[] = [];

    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const dist = tailDist + t * (tipDist - tailDist);
      const w = beamWidth * t;
      const point = pathEl!.getPointAtLength(dist);
      const { nx, ny } = normalAt(dist);
      up.push({ x: point.x + (nx * w) / 2, y: point.y + (ny * w) / 2 });
      down.push({ x: point.x - (nx * w) / 2, y: point.y - (ny * w) / 2 });
    }

    const d =
      `M ${up[0].x},${up[0].y} ` +
      up.slice(1).map((p) => `L ${p.x},${p.y}`).join(" ") +
      " " +
      down.slice().reverse().map((p) => `L ${p.x},${p.y}`).join(" ") +
      " Z";

    beamEl!.setAttribute("d", d);

    const tail = pathEl!.getPointAtLength(tailDist);
    const tip = pathEl!.getPointAtLength(tipDist);
    gradEl!.setAttribute("x1", String(tail.x));
    gradEl!.setAttribute("y1", String(tail.y));
    gradEl!.setAttribute("x2", String(tip.x));
    gradEl!.setAttribute("y2", String(tip.y));

    if (progress >= 1) {
      pausing = true;
      pauseStart = ts;
    }

    raf = requestAnimationFrame(frame);
  }

  // Start the animation loop after the initial delay
  timeoutId = setTimeout(() => {
    raf = requestAnimationFrame(frame);
  }, delay * 1000);

  // Correctly return the cleanup function to React
  return () => {
    clearTimeout(timeoutId);
    cancelAnimationFrame(raf);
  };
}, [duration, beamWidth, delay]);

  return (
    <svg
      viewBox="0 0 100 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient
          ref={gradRef}
          id={`beam-gradient-${uid}`}
          gradientUnits="userSpaceOnUse"
          x1="10"
          y1="15"
          x2="10"
          y2="15"
        >
          <stop offset="0%" stopColor={beamColor} stopOpacity="0" />
          <stop offset="40%" stopColor={beamColor} stopOpacity="0.5" />
          <stop offset="100%" stopColor={resolvedTip} stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* base dim track */}
      <path
        ref={pathRef}
        d="M 10,15 C 50,15 50,125 90,125"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* tapered comet-shaped beam, pointed tail, flat head */}
      <path ref={beamRef} fill={`url(#beam-gradient-${uid})`} stroke="none" />
    </svg>
  );
}



interface BeamPathProps {
  d: string;
  className?: string;
  strokeWidth?: number | string;
  beamWidth?: number;
  beamColor?: string;
  tipColor?: string;
  duration?: number;
  delay?: number;
}

function BeamPath({
  d,
  className = "text-neutral-500",
  strokeWidth = 1.5,
  beamWidth = 2,
  beamColor = "#3b82f6",
  tipColor,
  duration = 3,
  delay = 0,
}: BeamPathProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const beamRef = useRef<SVGPathElement>(null);
  const gradRef = useRef<SVGLinearGradientElement>(null);
  const uid = useId().replace(/:/g, "");
  const resolvedTip = tipColor ?? beamColor;

  useEffect(() => {
    const pathEl = pathRef.current;
    const beamEl = beamRef.current;
    const gradEl = gradRef.current;
    if (!pathEl || !beamEl || !gradEl) return;

    const totalLength = pathEl.getTotalLength();
    const beamLength = totalLength * 0.4;
    const extendedLength = totalLength + beamLength;
    const durationMs = duration * 1000;
    const pauseMs = 400;
    const samples = 20;

    function normalAt(dist: number) {
      const eps = 0.5;
      const d0 = Math.max(0, dist - eps);
      const d1 = Math.min(totalLength, dist + eps);
      const p0 = pathEl!.getPointAtLength(d0);
      const p1 = pathEl!.getPointAtLength(d1);
      let dx = p1.x - p0.x;
      let dy = p1.y - p0.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      dx /= len;
      dy /= len;
      return { nx: -dy, ny: dx };
    }

    let raf: number;
    let startTime: number | null = null;
    let pausing = false;
    let pauseStart = 0;

    function frame(ts: number) {
      if (pausing) {
        if (ts - pauseStart >= pauseMs) {
          pausing = false;
          startTime = ts;
        }
        raf = requestAnimationFrame(frame);
        return;
      }

      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      const logicalTip = progress * extendedLength;
      const tipDist = Math.min(logicalTip, totalLength);
      const tailDist = Math.max(0, Math.min(logicalTip - beamLength, totalLength));

      const up: { x: number; y: number }[] = [];
      const down: { x: number; y: number }[] = [];

      for (let i = 0; i <= samples; i++) {
        const t = i / samples;
        const dist = tailDist + t * (tipDist - tailDist);
        const w = beamWidth * t;
        const point = pathEl!.getPointAtLength(dist);
        const { nx, ny } = normalAt(dist);
        up.push({ x: point.x + (nx * w) / 2, y: point.y + (ny * w) / 2 });
        down.push({ x: point.x - (nx * w) / 2, y: point.y - (ny * w) / 2 });
      }

      const dAttr =
        `M ${up[0].x},${up[0].y} ` +
        up
          .slice(1)
          .map((p) => `L ${p.x},${p.y}`)
          .join(" ") +
        " " +
        down
          .slice()
          .reverse()
          .map((p) => `L ${p.x},${p.y}`)
          .join(" ") +
        " Z";

      beamEl!.setAttribute("d", dAttr);

      const tail = pathEl!.getPointAtLength(tailDist);
      const tip = pathEl!.getPointAtLength(tipDist);
      gradEl!.setAttribute("x1", String(tail.x));
      gradEl!.setAttribute("y1", String(tail.y));
      gradEl!.setAttribute("x2", String(tip.x));
      gradEl!.setAttribute("y2", String(tip.y));

      if (progress >= 1) {
        pausing = true;
        pauseStart = ts;
      }

      raf = requestAnimationFrame(frame);
    }

    const timeoutId = setTimeout(() => {
      raf = requestAnimationFrame(frame);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(raf);
    };
  }, [duration, beamWidth, delay, d]);

  return (
    <svg
      viewBox="0 0 100 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          ref={gradRef}
          id={`beam-gradient-${uid}`}
          gradientUnits="userSpaceOnUse"
          x1="10"
          y1="15"
          x2="10"
          y2="15"
        >
          <stop offset="0%" stopColor={beamColor} stopOpacity="0" />
          <stop offset="40%" stopColor={beamColor} stopOpacity="0.5" />
          <stop offset="100%" stopColor={resolvedTip} stopOpacity="1" />
        </linearGradient>
      </defs>

      <path
        ref={pathRef}
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path ref={beamRef} fill={`url(#beam-gradient-${uid})`} stroke="none" />
    </svg>
  );
}

interface CurvedConnectorProps extends Omit<BeamPathProps, "d"> {}

export function CurvedConnectorBeam(props: CurvedConnectorProps) {
  return <BeamPath d="M 10,15 C 50,15 50,125 90,125" {...props} />;
}

interface StraightLineProps extends Omit<BeamPathProps, "d"> {}

export function StraightLine(props: StraightLineProps) {
  return <BeamPath d="M 10,70 L 90,70" {...props} />;
}