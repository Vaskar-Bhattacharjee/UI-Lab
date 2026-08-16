'use client'
import { IconChevronDownFilled, IconLayersLinked, IconLinkFilled, IconLoader2, IconPointer, IconSend, IconSettings } from "@tabler/icons-react";
import Image from "next/image";
import { AnimatePresence, LegacyAnimationControls, motion, useAnimationControls, useInView } from "motion/react";
import { cn } from "../lib/utils";
import { useEffect, useState, useRef } from "react";

const MovingImages = [
  {
    src: "/moving1.webp",
    alt: "Moving 1",
  },
  {
    src: "/moving2.webp",
    alt: "Moving 2",
  },
  {
    src: "/moving3.webp",
    alt: "Moving 3",
  },
  {
    src: "/moving4.webp",
    alt: "Moving 4",
  },
  {
    src: "/moving5.webp",
    alt: "Moving 5",
  },
  {
    src: "/moving6.webp",
    alt: "Moving 6",
  },
]

export const Bento = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-12 w-[65rem] mx-auto py-32">
      <h1 className="text-2xl text-neutral-200 tracking-tight font-semibold">
        Build with templates, blocks, <br />skills, and AI. Not blank pages
      </h1>
      <div className="grid grid-cols-2 gap-4 w-full">
        <BentoCard
          title="Import and edit Templates"
          description="Never start from a blank slate again. Pull in Aceternity UI Pro templates and reshape layout, copy, and structure in chat."
          aichatbox={<ChatInput icon={<NextjsICon />} text="AI SaaS template" />}
          skeletonItem={<SkeletonItem1st />}
        />
        <BentoCard
          title="Edit blocks and components"
          description="Drop in sections, cards, and other blocks, then tweak them in place without leaving the editor."
          className="w-full bg-neutral-900/60"
          skeletonItem={<SkeletonItem2nd />}
          parentClass="py-0 w-full"
        />
        <BentoCard
          title="Use skills to counter AI slop"
          description="Point at a section, run a skill, and get sharper layout and copy decisions, not another wall of default Tailwind cards."
          className="flex items-center justify-center h-85 w-full"
          skeletonItem={<SkeletonItem3rd />}
          parentClass="py-0 w-full"
          aichatbox={<ChatInput2 />}
        />

        <BentoCard
          title="Create images on the go"
          description="Generate a scene, apply it as a background, and keep building. No stock photo rabbit holes."
          className="flex items-center justify-center h-85 w-full"
          skeletonItem={<SkeletonItem4th />}
          parentClass="py-0 w-full"

        />
      </div>
    </div>
  );
};

const BentoCard = ({
  title,
  description,
  aichatbox,
  skeletonItem,
  className,
  parentClass,
}: {
  title: string;
  description: string;
  aichatbox?: React.ReactNode;
  skeletonItem?: React.ReactNode;
  className?: string;
  parentClass?: string;
}) => {
  return (
    <div className="relative overflow-clip bg-neutral-800/60 rounded-2xl flex flex-col items-center justify-between">
      <CardSkeleton
        aichatbox={aichatbox}
        skeletonItem={skeletonItem}
        className={className}
        parentClass={parentClass}

      />
      <div className="w-full ">
        <div className="flex flex-col items-start justify-between px-8 pb-8 h-full">
          <h1 className="text-lg font-inter font-medium text-neutral-200">{title} </h1>
          <p className="text-sm mt-2 text-neutral-200/40 text-balance">{description}</p>
        </div>
      </div>
    </div>
  );
};

const CardSkeleton = ({ aichatbox, skeletonItem, className, parentClass }: { aichatbox?: React.ReactNode, skeletonItem?: React.ReactNode, className?: string, parentClass?: string }) => {
  return (
    <div className={cn("relative h-90 py-8 overflow-visible flex items-start justify-center", parentClass)}>
      <div className={cn("w-80 h-60 bg-neutral-900 rounded-xl  pb-8", className)}>
        {skeletonItem}
      </div>
      {aichatbox}

    </div>
  )
}

const SkeletonItem1st = () => {
  return (
    <div className="w-full h-60 flex flex-col items-start justify-start">
      {/* Browser Header */}
      <div className="w-full h-8 flex items-start justify-between gap-4 rounded-2xl px-5 z-10 bg-neutral-900">
        <div className="size-10 rounded-lg flex items-start justify-center gap-1 mt-2.5">
          <div className="size-2 bg-red-500/70 rounded-full"></div>
          <div className="size-2 bg-yellow-500/70 rounded-full"></div>
          <div className="size-2 bg-green-500/70 rounded-full"></div>
        </div>
        <div className="w-55 h-3 bg-neutral-600 rounded-4xl mt-2"></div>
      </div>

      <div className="bg-black w-full h-full relative flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 p-4 flex flex-col gap-3 w-full h-full">
          <div className="w-1/3 h-4 bg-neutral-800 rounded-md animate-pulse" />
          <div className="w-full h-16 bg-neutral-800 rounded-md animate-pulse" />
          <div className="w-2/3 h-4 bg-neutral-800 rounded-md animate-pulse" />
          <div className="w-1/2 h-4 bg-neutral-800 rounded-md animate-pulse" />
        </div>

        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ delay: 1.5, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full overflow-hidden z-10 bg-black"
        >
          <div className="relative w-full h-[13rem] px-0.5 py-0.5 ">
            <Image
              src="/ai-saas.webp"
              alt="AI SaaS"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const SkeletonItem2nd = () => {
  const duplicatedImages = [...MovingImages, ...MovingImages];

  return (
    <div className="w-full max-w-full overflow-hidden flex flex-col items-center justify-between gap-5 
     mask-l-from-80% mask-r-from-80% mask-t-from-90% mask-b-from-80%">

      <motion.div
        className="flex w-max gap-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 40,
          repeat: Infinity,
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={`row1-${index}`}
            className="relative h-36 w-56 shrink-0 overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 dark:bg-neutral-900 dark:shadow-none dark:ring-white/10"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-center"
            />
          </div>
        ))}
      </motion.div>

      <motion.div
        className="flex w-max gap-4"
        animate={{ x: ["0%", "50%"] }}
        transition={{
          ease: "linear",
          duration: 40,
          repeat: Infinity,
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={`row2-${index}`}
            className="relative h-36 w-56 shrink-0 overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 dark:bg-neutral-900 dark:shadow-none dark:ring-white/10"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-center"
            />
          </div>
        ))}
      </motion.div>
      <ChatInput text="Card" className="top-30" />
    </div>
  );
};
const SkeletonItem3rd = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative mx-auto flex h-80 w-95 flex-col gap-4 overflow-visible bg-neutral-950 px-5 pb-8 pt-5 shadow-lg mask-t-from-90%", className)}>

      <motion.div
        className="absolute top-30 right-30 -translate-x-1/2 z-50"
        initial={{ y: 50, scale: 1 }}
        whileInView={{
          y: [50, 0, 0, 0, 0],
          scale: [1, 1, 0.75, 1, 1],
        }}
        viewport={{ once: true }}
        transition={{
          delay: 0.5,
          duration: 3.5,
          ease: "easeInOut",
        }}
      >
        <IconPointer className="text-white drop-shadow-md" />
      </motion.div>


      <div className="flex shrink-0 items-center justify-between">
        <div className="h-2.5 w-14 rounded-sm bg-neutral-600" />

        <div className="flex gap-2">
          <div className="h-2 w-8 rounded-sm bg-neutral-700" />
          <div className="h-2 w-8 rounded-sm bg-neutral-700" />
          <div className="h-2 w-8 rounded-sm bg-neutral-700" />
        </div>
      </div>

      <div className="shrink-0 rounded-lg border-3 border-white/5 bg-neutral-900 px-3 py-4 text-center shadow-sm ring-1 ring-white/15">

        <h2 className="text-[11px] font-semibold leading-tight tracking-tight text-white">
          Skills that push back on generic output
        </h2>

        <p className="mx-auto mt-1 max-w-[11rem] text-[8px] leading-snug text-neutral-400">
          Point at a section, run a skill, get sharper layout and copy.
        </p>

        <div className="mt-2.5 flex justify-center gap-1.5">
          <span className="inline-flex h-4 items-center rounded-[4px] bg-neutral-700 px-2 text-[7px] font-medium text-white">
            Get Started
          </span>

          <span className="inline-flex h-4 items-center rounded-[4px] border border-white/15 bg-neutral-800 px-2 text-[7px] font-medium text-neutral-300">
            Learn More
          </span>
        </div>
      </div>

      <div className="shrink-0 space-y-2.5">
        <div className="mx-auto h-2 w-20 rounded-sm bg-neutral-600/80" />

        <div className="grid grid-cols-3 gap-2">
          <div className="aspect-[4/3] rounded-lg bg-neutral-800" />
          <div className="aspect-[4/3] rounded-lg bg-neutral-800" />
          <div className="aspect-[4/3] rounded-lg bg-neutral-800" />
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-2 px-1">
        <div className="h-2 flex-1 rounded-sm bg-neutral-800" />
        <div className="h-2 flex-1 rounded-sm bg-neutral-800" />
        <div className="h-2 flex-1 rounded-sm bg-neutral-800" />
        <div className="h-2 flex-1 rounded-sm bg-neutral-800" />
      </div>

      <div className="shrink-0 space-y-2 rounded-xl bg-neutral-900 px-3 py-4">

        <div className="h-2.5 w-1/2 rounded-sm bg-neutral-600/70" />

        <div className="h-2 w-full rounded-sm bg-neutral-700" />

        <div className="h-2 w-[85%] rounded-sm bg-neutral-700" />

        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="h-16 rounded-md bg-neutral-800" />
          <div className="h-16 rounded-md bg-neutral-800" />
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-center gap-2 rounded-xl bg-neutral-900 px-3 py-5">

        <div className="h-2.5 w-2/3 rounded-sm bg-neutral-600/80" />

        <div className="h-2 w-1/2 rounded-sm bg-neutral-700" />

        <div className="mt-1 h-6 w-24 rounded-md bg-neutral-700" />
      </div>

      <div className="flex shrink-0 justify-between gap-4 pt-1">

        <div className="space-y-1.5">
          <div className="h-2 w-10 rounded-sm bg-neutral-700" />
          <div className="h-1.5 w-14 rounded-sm bg-neutral-800" />
          <div className="h-1.5 w-12 rounded-sm bg-neutral-800" />
        </div>

        <div className="space-y-1.5">
          <div className="h-2 w-10 rounded-sm bg-neutral-700" />
          <div className="h-1.5 w-14 rounded-sm bg-neutral-800" />
          <div className="h-1.5 w-12 rounded-sm bg-neutral-800" />
        </div>

        <div className="space-y-1.5">
          <div className="h-2 w-10 rounded-sm bg-neutral-700" />
          <div className="h-1.5 w-14 rounded-sm bg-neutral-800" />
          <div className="h-1.5 w-12 rounded-sm bg-neutral-800" />
        </div>

      </div>

    </div>
  );
};

type CreateStage = "placeholder" | "prompt" | "loading" | "result" | "exiting";

const CREATE_PROMPT = "Create an image of a scenery with a beautiful mountain.";

const CREATE_TIMINGS = {
  toPrompt: 1000,
  toGenerate: 2400,
  loading: 2000, // loader duration, you said 0.2-3s, tune this constant to taste
  toExit: 1400,
};

const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const wordItem = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const pressButton = async (controls: LegacyAnimationControls) => {
  await controls.start({ scale: 0.95, transition: { duration: 0.15, ease: "easeInOut" } });
  await controls.start({ scale: 1, transition: { duration: 0.15, ease: "easeInOut" } });
};
const SkeletonItem4th = () => {
const [stage, setStage] = useState<CreateStage>("placeholder");
const [backgroundVisible, setBackgroundVisible] = useState(false);
const buttonControls = useAnimationControls();
const words = CREATE_PROMPT.split(" ");

useEffect(() => {
  if (stage !== "placeholder") return;
  const t = setTimeout(() => setStage("prompt"), CREATE_TIMINGS.toPrompt);
  return () => clearTimeout(t);
}, [stage]);

useEffect(() => {
  if (stage !== "prompt") return;
  const t = setTimeout(async () => {
    await pressButton(buttonControls);
    setStage("loading");
  }, CREATE_TIMINGS.toGenerate);
  return () => clearTimeout(t);
}, [stage]);

useEffect(() => {
  if (stage !== "loading") return;
  const t = setTimeout(() => setStage("result"), CREATE_TIMINGS.loading);
  return () => clearTimeout(t);
}, [stage]);

useEffect(() => {
  if (stage !== "result") return;
  const t = setTimeout(async () => {
    setBackgroundVisible(true);
    await pressButton(buttonControls);
    setStage("exiting");
  }, CREATE_TIMINGS.toExit);
  return () => clearTimeout(t);
}, [stage]);
  return (
    <div className="relative w-full py-0 h-full bg-linear-to-b from-black to-transparent">
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: backgroundVisible ? 1 : 0, opacity: backgroundVisible ? 1 : 0 }}
      transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
      className="absolute inset-0"
    >
      <Image
        src="/mountains-2.webp"
        alt="mountains-2"
        fill
        className="w-full h-full object-cover opacity-40 mask-b-from-80%"
        draggable={false}
      />
    </motion.div>

      <div className="flex shrink-0 items-center justify-between px-4 py-2">
        <div className="h-2.5 w-14 rounded-sm bg-neutral-800/60 z-10" />
        <span className="rounded-md px-1.5 py-0.5 text-[7px] font-medium tracking-wide uppercase bg-neutral-800/20 text-white ring-1 ring-white/35 backdrop-blur-sm">Example output</span>
      </div>
      <div className="mt-8 max-w-[18rem] px-10 space-y-2">
        <h3 className="text-[13px] font-semibold font-inter leading-tight tracking-tight text-white z-10">Escape to the peaks</h3>
        <p className="text-[10px] font-inter text-white max-w-[18rem] z-10">Plan your next alpine trip with guides, trails, and stays in one place.</p>
        <div className="flex gap-1.5 pt-1">
          <span className={`inline-flex h-5 items-center rounded-xl px-2 text-[8px] font-medium ${backgroundVisible ? 'bg-neutral-800 text-white' : 'bg-blue-500 text-white'} cursor-pointer z-10`}>Book a trip</span>
          <span className="inline-flex h-5 items-center rounded-xl border px-2 text-[8px] font-medium border-black/50 bg-white/10 text-white backdrop-blur-sm cursor-pointer z-10">View trails</span>
        </div>
      </div>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="mt-4 grid grid-cols-3 gap-3">
        <div className="aspect-[4/3] rounded-lg bg-white/2 ring-1 ring-white/3"></div>
        <div className="aspect-[4/3] rounded-lg bg-white/2 ring-1 ring-white/3"></div>
        <div className="aspect-[4/3] rounded-lg bg-white/2 ring-1 ring-white/3"></div>
      </motion.div>

<AnimatePresence>
  {stage !== "exiting" && (
    <motion.div
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="absolute left-1/2 -translate-x-1/2 bottom-8 w-60 h-50 rounded-2xl bg-neutral-800 overflow-hidden flex flex-col items-center justify-center gap-2 z-10"
    >
      <div className="relative text-white text-xs font-medium w-55 mx-auto h-25 bg-gray-800 rounded-xl px-2 py-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {stage === "placeholder" && (
            <motion.span key="placeholder" exit={{ opacity: 0 }}>
              Describe the image...
            </motion.span>
          )}

          {stage === "prompt" && (
            <motion.div
              key="prompt"
              variants={wordContainer}
              initial="hidden"
              animate="visible"
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-wrap gap-x-1"
            >
              {words.map((word, i) => (
                <motion.span key={i} variants={wordItem}>
                  {word}
                </motion.span>
              ))}
            </motion.div>
          )}

          {stage === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center gap-1.5 w-full h-full"
            >
              <IconLoader2 size={12} className="animate-spin" />
              <span>Generating…</span>
            </motion.div>
          )}

          {stage === "result" && (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="absolute inset-0"
            >
              <Image src="/mountains-2.webp" alt="chat-image" fill className="object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button className="text-white text-xs font-medium w-55 mx-auto h-8 bg-black rounded-xl px-2 py-1 flex items-center justify-between">
        Flux <span className="text-xs"><IconChevronDownFilled /></span>
      </button>

      <motion.button
        animate={buttonControls}
        className="text-white text-xs font-medium w-55 mx-auto h-8 bg-blue-500/80 rounded-xl px-2 py-1"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={stage === "result" ? "use-this" : "create"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {stage === "result" ? "Use this" : "Create"}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}

const ChatInput = ({ icon, text, className }: { icon?: React.ReactNode, text: string, className?: string }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 1.5,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 }
    },
  };

  const wordsAfterBadge = ["and", "modify", "it", "for", "voice", "agents."];

  return (
    <div className={cn("absolute z-20 w-95 h-20 bg-black bottom-8 left-1/2 -translate-x-1/2 rounded-xl flex items-start justify-start px-3 py-2 border border-white/10 shadow-xl ${className", className)}>

      <motion.div
        className="text-neutral-200 font-normal text-xs flex flex-wrap items-center gap-x-0.5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.span variants={itemVariants}>
          Import
        </motion.span>

        <motion.span variants={itemVariants}>
          <span className="inline-flex max-w-full items-center gap-1 rounded-sm border border-white/50 px-2 py-1 mx-1 bg-gradient-to-b from-brand-light to-brand-dark align-middle text-[9px] font-medium leading-none text-white shadow-sm shadow-black/10 ring-1 ring-inset ring-black/5">
            {icon}
            <span className="truncate">{text}</span>
          </span>
        </motion.span>

        {wordsAfterBadge.map((word, index) => (
          <motion.span key={index} variants={itemVariants}>
            {word}
          </motion.span>
        ))}
      </motion.div>

      <div className="absolute bottom-2 left-0 w-full h-5 flex items-end justify-between px-4">
        <div className="flex items-center justify-center w-fit gap-2">
          <IconLinkFilled size={15} className="text-neutral-200/70 hover:text-white cursor-pointer transition-colors" />
          <IconSettings size={15} className="text-neutral-200/70 hover:text-white cursor-pointer transition-colors" />
        </div>
        <div className="w-6 h-6 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-full flex items-center justify-center cursor-pointer">
          <IconSend size={12} className="text-neutral-200" />
        </div>
      </div>
    </div>
  );
};

const ChatInput2 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.15,
        delay: 1.4,
        ease: "easeOut",
      }}
      className="absolute top-45 left-78 -translate-x-1/2 w-80 rounded-xl bg-black px-2 pt-1 pb-2"
    >
      <p className="text-xs font-semibold text-white mb-2">
        Skills
      </p>

      <div className="rounded-xl bg-neutral-800 px-2 py-2 text-xs leading-6 text-neutral-200">

        {/* Added a simple motion wrapper for the icon so it pops in first */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 1.5 }}
        >
          <IconLayersLinked className="inline-block size-4 mr-1  align-middle text-neutral-400" />
        </motion.span>

        {/* Converted your exact span to a motion.span so the badge pops in second */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 1.6 }}
          className="inline-flex items-center rounded-md border border-neutral-500/70 bg-neutral-900 px-1.5 py-0.5 text-xs text-neutral-300 align-middle"
        >
          /impeccable
        </motion.span>

        {/* Kept your exact span wrapper, but mapped the text to stagger it word by word */}
        <span className="ml-1 text-xs text-neutral-400">
          {"style design this better, make it minimal".split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: 1.7 + index * 0.08, // Staggers each word by 0.08s
              }}
            >
              {word}{" "}
            </motion.span>
          ))}
        </span>

      </div>
    </motion.div>
  );
};

const NextjsICon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-white size-2.5 shrink-0 text-white"><path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" fill="currentColor"></path></svg>
  )
}