import { MilestoneDiamond } from "@/app/illustration/illustration";
import { cn } from "@/app/lib/utils";
import { AnimatePresence, motion } from "motion/react";

type TimelineItemProps = {
  id: string;
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
  clicked?: string;
};

export const TimelineItem = ({
  id,
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
  clicked,
}: TimelineItemProps) => {
  return (
    <AnimatePresence>
    <motion.div
      initial={{ x: -50 }}
      animate={{ clickx: 0 }}
      exit={{ x: -50 }}
      transition={{ duration: 0.5 }}
      className="absolute z-20 flex flex-col gap-1.5 pointer-events-auto font-sans"
      style={{ top: `${top}px`, left: `${left}px`, width: `${totalWidth}px` }}
    >
      {/* Title Bar */}
      <div className="flex items-center gap-1.5 text-xs font-medium text-[#f7f8f8]">
        {icon1}
        <span>{title}</span>
        {icon2}
      </div>

      {/* Track Bar */}
      <div className="relative flex h-6 w-full items-center">
        {/* Solid Bar Section */}
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
                <span className="absolute top-5 whitespace-nowrap text-[11px]">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Faded Dashed Extension Section */}
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
    </AnimatePresence>
  );
};