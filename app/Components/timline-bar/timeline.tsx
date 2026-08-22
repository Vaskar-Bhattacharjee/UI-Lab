import { MilestoneDiamond } from "@/app/illustration/illustration";
import { cn } from "@/app/lib/utils";
import { motion } from "motion/react";

type TimelineDirection = "left" | "right";

type TimelineItemProps = {
  title: string;
  color: string;
  bgcolor: string;
  top: number;
  left: number;
  totalWidth: number;
  solidWidth: number;
  milestones: { label: string; color: string; bgcolor: string }[];
  icon1?: React.ReactNode;
  icon2?: React.ReactNode;
  milestoneStart?: number;
  milestoneGap?: number;
  className?: string;
  showExtension?: boolean;
  direction?: TimelineDirection;
};

export const TimelineItem = ({
  title,
  color,
  bgcolor,
  top,
  left,
  totalWidth,
  solidWidth,
  milestones,
  icon1,
  icon2,
  milestoneStart = 20,
  milestoneGap = 32,
  className,
  showExtension = true,
  direction = "left",
}: TimelineItemProps) => {
  const offset = direction === "right" ? "40vw" : "-40vw";
  const variants = {
    initial: { x: offset, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: offset, opacity: 0 },
  };

  return (
    <motion.div
      variants={variants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute z-20 flex flex-col gap-1.5 pointer-events-auto"
      style={{ top: `${top}px`, left: `${left}px`, width: `${totalWidth}px` }}
    >
      <div className="flex items-center gap-1.5 text-xs font-medium text-[#f7f8f8]">
        {icon1}
        <span className="text-neutral-100/80">{title}</span>
        {icon2}
      </div>

      <div className="relative flex h-6 w-full items-center">
        <div
          className={`relative flex h-full items-center border border-[0.5px] border-white/10 bg-[#141516]/30 rounded-l-md ${showExtension === false ? "border rounded-r-md" : 'border-r-0'}`}
          style={{ width: `${solidWidth}px` }}
        >
          <div
            className="absolute top-1/2 flex -translate-y-1/2 items-center"
            style={{ 
              left: `${milestoneStart}px`, 
              gap: `${milestoneGap}px` 
            }}
          >
            {milestones.map((m, idx) => (
              <div key={idx} className="relative flex flex-col items-center justify-center text-[#8a8f98]">
                <MilestoneDiamond color={m.color} />
                <span className="absolute top-5 whitespace-nowrap text-[11px] text-neutral-100/50">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {showExtension && (
        <div
          className="relative h-full flex-1 rounded-r-md"
          style={{
            background: `linear-gradient(to right, transparent, ${bgcolor})`,
          }}
        >
          <div
            className={cn("absolute inset-0 rounded-r-md border-[0.5px] border-dashed", className)}
            style={{
              borderColor: color,
              borderLeftWidth: 0,
              WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.05) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 100%)",
              maskImage: "linear-gradient(to right, rgba(0,0,0,0.05) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 100%)",
            }}
          ></div>
        </div>
        )}
    </div>
    </motion.div>
  );
};
