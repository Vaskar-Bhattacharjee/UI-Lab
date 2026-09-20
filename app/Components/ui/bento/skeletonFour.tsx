"use client";

import { cn } from "@/app/lib/utils";
import { Sparkle } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { useEffect, useState } from "react";

type Stage = 0 | 1 | 2 | 3;

const STAGE_DURATIONS: Record<Stage, number> = {
  0: 600,
  1: 1100,
  2: 900,
  3: 6000,
};

export const CardSkeletonFour = ({ className }: { className?: string }) => {
  const [stage, setStage] = useState<Stage>(0);
  const [loopKey, setLoopKey] = useState(0);
  const [variant, setVariant] = useState<Variant>(SCENARIOS[0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage === 3) {
        setStage(0);
        setLoopKey((k) => k + 1);
        setVariant(SCENARIOS[(loopKey + 1) % SCENARIOS.length]);
      } else {
        setStage((s) => (s + 1) as Stage);
      }
    }, STAGE_DURATIONS[stage]);
    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <div className={cn("w-full h-full flex flex-col items-center justify-start pt-8 gap-4 mask-b-from-90%", className)}>      <BackgroundImage key="bg" />

      <TextBox key={loopKey} text={variant.prompt} />

      <AnimatePresence>
        {stage >= 1 && (
          <motion.div
            key="understanding"
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center justify-start w-full px-8 mt-3 z-10"
          >
            {stage === 3 ? (
              <p className="text-neutral-700 font-inter text-[13px] font-medium pointer-events-none ml-2">
                Worked for 10 seconds.
              </p>
            ) : (
              <ThinkingText />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage >= 2 && (
          <motion.div
            key="badges"
            layout
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="flex items-center justify-start gap-2 w-full px-8"
          >
            {variant.badges.map((text) => (
              <Badge key={text} text={text} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{stage >= 3 && <PlannedApproach key="plan" rows={variant.plan} />}</AnimatePresence>
    </div>
  );
};

const BackgroundImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-full absolute inset-0"
    >
      <Image
        src="https://images.unsplash.com/photo-1600385380555-82d475371154?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1w8fHx8fA%3D%3D"
        alt="Skeleton Four"
        fill
        className="object-cover blur-[2px] mask-b-from-50% mask-t-to-100%"
      />
    </motion.div>
  );
};

const textBoxVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};



const SCENARIOS = [
  {
    prompt: "Create a launch plan for our new product with a focus on user engagement and retention.",
    badges: ["Brand voice", "Target audience", "Past launches"],
    plan: [
      "Lead with one clear customer outcome",
      "Build anticipation with a five-day rollout",
      "Give the team a clear story and proof points",
    ],
  },
  {
    prompt: "Draft a content calendar that grows our newsletter subscribers this quarter.",
    badges: ["Brand voice", "Target audience", "Top posts"],
    plan: [
      "Post weekly on what readers open most",
      "End each post with a reason to subscribe",
    ],
  },
  {
    prompt: "Outline a pricing strategy that improves conversion without hurting margins.",
    badges: ["Current pricing", "Competitors", "Margins"],
    plan: [
      "Make the middle plan the obvious choice",
      "Test one price change at a time",
    ],
  },
];
type Variant = { prompt: string; badges: string[]; plan: string[] };
const pickRandom = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const pickVariant = (prevPrompt?: string): Variant => {
  const pool = SCENARIOS.filter((s) => s.prompt !== prevPrompt);
  return pickRandom(pool);
};

const TextBox = ({ text }: { text: string }) => {
  return (
    <motion.div
      layout
      variants={textBoxVariants}
      initial={{
        y: 40,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.1,
        ease: "easeOut",
      }}
      className="self-stretch mx-8 h-fit p-4 bg-neutral-100 border border-neutral-200 rounded-lg z-10"
    >
      <p className="text-neutral-900/70 font-inter text-[15px] font-medium pointer-events-none py-3">
        {text}
      </p>
    </motion.div>
  );
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const Badge = ({ className, text }: { className?: string; text: string }) => {
  return (
    <motion.div
      variants={badgeVariants}
      className={cn(
        "text-neutral-900 font-inter font-normal pointer-events-none text-xs border border-neutral-400 rounded-lg px-3 py-1 z-10",
        className
      )}
    >
      {text}
    </motion.div>
  );
};

const planContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const planRowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const PlannedApproach = ({ rows }: { rows: string[] }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full px-8 mt-1"
    >
      <div className="w-full rounded-xl border border-neutral-300/80 bg-white/55 backdrop-blur-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-300/70">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-neutral-50 flex items-center justify-center">
              <Sparkle className="size-3.5 text-neutral-500" />
            </div>
            <p className="text-neutral-700 font-inter text-sm font-medium">Recommended approach</p>
          </div>

          <span className="text-[10px] font-inter font-medium tracking-wide uppercase text-sky-600 bg-sky-50 border border-sky-100 rounded-md px-2 py-1">
            Draft
          </span>
        </div>

        <motion.div variants={planContainerVariants} initial="hidden" animate="visible" className="px-4">
          {rows.map((text, i) => (
            <PlanRow
              key={text}
              number={String(i + 1).padStart(2, "0")}
              text={text}
              last={i === rows.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const PlanRow = ({
  number,
  text,
  last = false,
}: {
  number: string;
  text: string;
  last?: boolean;
}) => {
  return (
    <motion.div
      variants={planRowVariants}
      className={cn("flex items-center gap-2 py-4", !last && "border-b border-neutral-300/60")}
    >
      <span className="shrink-0 text-[11px] font-inter font-medium text-neutral-400">{number}</span>
      <p className="text-neutral-700 font-inter text-[13px] leading-relaxed">{text}</p>
    </motion.div>
  );
};

const ThinkingText = () => {
  return (
    <motion.p
      initial={{ backgroundPosition: "100% 0" }}
      animate={{ backgroundPosition: "-100% 0" }}
      transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
      style={{
        backgroundImage: "linear-gradient(110deg, #a3a3a3 35%, #171717 50%, #a3a3a3 65%)",
        backgroundSize: "200% 100%",
      }}
      className="font-inter text-[13px] font-medium pointer-events-none ml-2 bg-clip-text text-transparent"
    >
      Thinking...
    </motion.p>
  );
};