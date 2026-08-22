"use client";

import React from "react";
import {
  IconBriefcaseFilled,
  IconCashBanknoteFilled,
  IconDeviceMobile,
  IconMapPinFilled,
  IconMessageFilled,
} from "@tabler/icons-react";
import { Bot, Landmark, MapPinCheck, MessageSquareText, PencilRuler } from "lucide-react";
import { AnimatePresence, delay, motion } from "motion/react";
import { CurvedLine, CurvedLine2, Electric } from "../../illustration/illustration";
import { TimelineItem } from "../timline-bar/timeline";

const calendarColumns = [
  { cellHeight: "h-2", month: "FEB", digit: [2, 9, 16, 23] },
  { cellHeight: "h-2", month: "MAR", digit: [2, 9, 16, 23] },
  { cellHeight: "h-2", month: "APR", digit: [30, 6, 13, 20] },
  { cellHeight: "h-2", month: "MAY", digit: [27, 4, 11, 18] },
  { cellHeight: "h-2", month: "JUN", digit: [25, 1, 8, 15] },
  { cellHeight: "h-2", month: "JUL", digit: [22, 29, 6, 13] },
  { cellHeight: "h-2", month: "AUG", digit: [20, 27, 3, 10] },
  { cellHeight: "h-2", month: "SEP", digit: [17, 24, 31, 7] },
];

export const Linear = () => {
  const [activeTimeline, setActiveTimeline] = React.useState<TimelineView>("initiative");
  return (
    <div className="relative h-[590px] w-full overflow-hidden">
      <Box setActiveTimeline={setActiveTimeline} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative w-[1300px] left-1/2 -translate-x-[55%] md:-translate-x-1/2 shrink-0 px-10 border border-white/20 h-full mt-2 mask-r-from-70% mask-l-from-70% mask-b-from-50% bg-[#101112] grid grid-cols-8 overflow-hidden"
      >
        {calendarColumns.map((col, i) => (
          <div
            key={i}
            className="col-span-1 h-full grid grid-cols-4 divide-x divide-white/10 border-r border-white/10 border-dashed"
          >
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className={`${col.cellHeight} w-full col-span-1 mt-4 relative`}>
                {j === 0 && (
                  <span className="absolute -top-1 left-2 whitespace-nowrap text-[0.75rem] font-medium text-white/40">
                    {col.month}
                  </span>
                )}
                <span className="absolute top-5 left-3 whitespace-nowrap text-[12px] text-white/30">
                  {col.digit[j]}
                </span>
              </div>
            ))}
          </div>
        ))}

        <div className="absolute inset-0 pointer-events-none">

          <AnimatePresence initial={false} mode="wait">
            {activeTimeline === "initiative" && (
              <TimelineScene key="initiative">
                <TimelineItem
                  key={`${activeTimeline}-ui-refresh`}
                  title="UI Refresh"
                  color="#9d3533b2"
                  bgcolor="#251515a5"
                  top={110}
                  left={600}
                  totalWidth={380}
                  solidWidth={260}
                  milestoneGap={120}
                  milestoneStart={80}
                  icon1={<PencilRuler className="text-teal-500 size-4" />}
                  icon2={<Electric className="text-yellow-500 size-4" />}
                  milestones={[
                    { label: "Core screens", color: "#5B5C5A", bgcolor: "#1E1717" },
                    { label: "Polish", color: "#E3484E", bgcolor: "#9d3533b2" },
                  ]}
                />

                <TimelineItem
                  key={`${activeTimeline}-split-fares`}
                  title="Split fares"
                  color="#00738d"
                  bgcolor="#0d2a11b5"
                  top={210}
                  left={450}
                  totalWidth={740}
                  solidWidth={500}
                  milestoneGap={280}
                  milestoneStart={160}
                  icon1={<IconCashBanknoteFilled className="text-green-500 size-4" />}
                  icon2={<Electric className="text-green-500 rotate-90 size-4" />}
                  milestones={[
                    { label: "Internal", color: "#5B5C5A", bgcolor: "#1E1717" },
                    { label: "Public Beta", color: "#008D2C", bgcolor: "#0d2a11b5" },
                  ]}
                />
                <TimelineItem
                  key={`${activeTimeline}-autonomy`}
                  title="Autonomy status clarity"
                  color="#858a85"
                  bgcolor="transparent"
                  top={335}
                  left={860}
                  totalWidth={800}
                  solidWidth={500}
                  milestoneGap={280}
                  milestoneStart={160}
                  icon1={<Bot className="text-blue-500 size-4" />}
                  icon2={<Electric className="text-green-500 rotate-90 size-4" />}
                  milestones={[
                    { label: "Alpha", color: "#5B5C5A", bgcolor: "#1E1717" },
                    { label: "Public Beta", color: "#008D2C", bgcolor: "#0d2a11b5" },
                  ]}
                />

                <TimelineItem
                  key={`${activeTimeline}-random`}
                  title="Random title"
                  color="#858a85"
                  bgcolor="transparent"
                  top={440}
                  left={-90}
                  totalWidth={800}
                  solidWidth={500}
                  milestoneGap={550}
                  milestoneStart={160}
                  className="border-solid opacity-50"
                  icon1={<Bot className="text-teal-500 size-4" />}
                  icon2={<Electric className="text-green-500 rotate-90 size-4" />}
                  milestones={[
                    { label: "Alpha", color: "#5B5C5A", bgcolor: "#1E1717" },
                    { label: "GA", color: "#858a85", bgcolor: "#0d2a11b5" },
                  ]}
                />
                <motion.div
                  variants={{
                    initial: { x: "-40vw", opacity: 0 },
                    animate: { x: 0, opacity: 1 },
                    exit: { x: "-40vw", opacity: 0 },
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="pointer-events-none"
                >
                  <CurvedLine className="absolute top-[370px] left-[708px] w-full h-full" />
                </motion.div>
              </TimelineScene>
            )
            }
            {activeTimeline === "APAC" && (
              <TimelineScene key="APAC">
                <TimelineItem
                  key={`${activeTimeline}-japan`}
                  title="Japan localization"
                  color="#858a85"
                  bgcolor="transparent"
                  top={130}
                  left={450}
                  totalWidth={322}
                  solidWidth={500}
                  milestoneGap={90}
                  milestoneStart={170}
                  className="border-solid opacity-50"
                  direction="right"
                  icon1={<MessageSquareText className="text-neutral-500 size-3" />}
                  icon2={<Electric className="text-green-500 rotate-90 size-4" />}
                  milestones={[
                    { label: "Apps", color: "#5B5C5A", bgcolor: "#1E1717" },
                    { label: "Web", color: "#858a85", bgcolor: "#0d2a11b5" },
                  ]}
                  showExtension={false}
                />
                <TimelineItem
                  key={`${activeTimeline}-tokyo`}
                  title="Tokyo launch"
                  color="#858a85"
                  bgcolor="transparent"
                  top={242}
                  left={860}
                  totalWidth={500}
                  solidWidth={500}
                  milestoneGap={90}
                  milestoneStart={300}
                  className="border-solid opacity-50"
                  direction="right"
                  icon1={<MapPinCheck className="text-green-500 size-4" />}
                  icon2={<Electric className="text-green-500 rotate-90 size-4" />}
                  milestones={[
                    { label: "Beta", color: "#5B5C5A", bgcolor: "#1E1717" },
                  ]}
                  showExtension={false}
                />
                <TimelineItem
                  key={`${activeTimeline}-korea`}
                  title="Korea Compliance Readiness"
                  color="#b3382c"
                  bgcolor="#342020"
                  direction="right"
                  top={335}
                  left={560}
                  totalWidth={700}
                  solidWidth={550}
                  milestoneGap={280}
                  milestoneStart={160}
                  icon1={<Landmark className="text-orange-500 size-3" />}
                  icon2={<Electric className="text-red-500 rotate-90 size-4" />}
                  milestones={[
                    { label: "Research", color: "#5B5C5A", bgcolor: "#1E1717" },
                    { label: "Submission", color: "#008D2C", bgcolor: "#0d2a11b5" },
                  ]}
                />
                <motion.div
                  variants={{
                    initial: { x: "40vw", opacity: 0 },
                    animate: { x: 0, opacity: 1 },
                    exit: { x: "40vw", opacity: 0 },
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="pointer-events-none"
                >
                  <CurvedLine2 className="absolute top-41.25 left-193" />
                </motion.div>
              </TimelineScene>
            )
            }
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
};

type TimelineView = "initiative" | "APAC";

const timelineSceneVariants = {
  initial: {},
  animate: {},
  exit: { opacity: 1, transition: { when: "afterChildren" as const } },
};

const TimelineScene = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={timelineSceneVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="absolute inset-0"
  >
    {children}
  </motion.div>
);

const Box = ({
  setActiveTimeline,
}: {
  setActiveTimeline: (value: TimelineView) => void;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
      }}
      transition={{
        delay: 0.6,
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="absolute hidden md:flex flex-col w-100 h-124 left-15 top-22 z-30 border border-px border-white/10 rounded-xl overflow-hidden "
      style={{
        background: "linear-gradient(#ffffff05 0% 100%), #0f1011",
        boxShadow: "0 4px 32px #08090a99",
      }}
    >
      <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gray-500/5 blur-2xl" />

      <div className="relative flex items-center justify-between border-b border-white/5 px-4 py-6 overflow-hidden">
        <span className="ml-3 text-sm text-[#d0d6e0]">Initiatives</span>
      </div>
      <InitiativesBox setActiveTimeline={setActiveTimeline} />
      <ApacNavigationSection setActiveTimeline={setActiveTimeline} />
    </motion.div>
  );
};

type NavigationItem = {
  label: string;
  count: number;
  icon: React.ReactNode;
};

const initiativeNavigationItems: NavigationItem[] = [
  {
    label: "Infra stability",
    count: 28,
    icon: <IconBriefcaseFilled size={16} color="teal" />,
  },
  {
    label: "Autonomous systems",
    count: 16,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="#02B8CC">
        <path fillRule="evenodd" clipRule="evenodd" d="M6.5 1C6.73834 1 6.94355 1.16823 6.99029 1.40194L7.92824 6.09167L11.6213 7.01493C11.8439 7.07057 12 7.27057 12 7.5C12 7.72943 11.8439 7.92943 11.6213 7.98507L7.92824 8.90833L6.99029 13.5981C6.94355 13.8318 6.73834 14 6.5 14C6.26166 14 6.05645 13.8318 6.00971 13.5981L5.07176 8.90833L1.37873 7.98507C1.15615 7.92943 1 7.72943 1 7.5C1 7.27057 1.15615 7.07057 1.37873 7.01493L5.07176 6.09167L6.00971 1.40194C6.05645 1.16823 6.26166 1 6.5 1Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M12.5 10C12.7152 10 12.9063 10.1377 12.9743 10.3419L13.3953 11.6047L14.6581 12.0256C14.8623 12.0937 15 12.2848 15 12.5C15 12.7152 14.8623 12.9063 14.6581 12.9743L13.3953 13.3953L12.9743 14.6581C12.9063 14.8623 12.7152 15 12.5 15C12.2848 15 12.0937 14.8623 12.0257 14.6581L11.6047 13.3953L10.3419 12.9743C10.1377 12.9063 10 12.7152 10 12.5C10 12.2848 10.1377 12.0937 10.3419 12.0256L11.6047 11.6047L12.0257 10.3419C12.0937 10.1377 12.2848 10 12.5 10Z" />
      </svg>
    ),
  },
  {
    label: "Mobile apps",
    count: 8,
    icon: <IconDeviceMobile size={16} color="teal" />,
  },
];

const InitiativesBox = ({
  setActiveTimeline,
}: {
  setActiveTimeline: (value: TimelineView) => void;
}) => {
  return (
    <div className="relative flex flex-col gap-8 border-b border-white/[0.08] px-[22px] pt-[22px] pb-[26px]">
      <span className="absolute left-[38px] top-15 h-37 w-px bg-[#23252a]" />

      <button
        onClick={() => setActiveTimeline("initiative")}
        className="relative z-10 flex w-full items-center gap-2 text-left hover:bg-neutral-700/15 rounded-sm px-2 py-2 cursor-pointer">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0F3338]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#02B8CC">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.4145 8.3381C7.68162 7.8873 8.31838 7.8873 8.5855 8.3381L11.896 13.925C12.2589 14.5374 11.6035 15.2506 10.9879 14.9132L8.10753 13.3343C8.04032 13.2975 7.95967 13.2975 7.89247 13.3343L5.0121 14.9132C4.39652 15.2506 3.74112 14.5374 4.10401 13.925L7.4145 8.3381Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 8.96927 2.75037 9.87822 3.18945 10.668L3.38867 10.999L3.42773 11.0654C3.60231 11.4033 3.4953 11.825 3.16992 12.0371C2.84468 12.249 2.41642 12.1766 2.17773 11.8809L2.13281 11.8184L2.00195 11.6104C1.36597 10.5558 1 9.31963 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 9.40749 14.5834 10.7198 13.8672 11.8184L13.8223 11.8809C13.5836 12.1766 13.1553 12.249 12.8301 12.0371C12.4831 11.8109 12.3851 11.346 12.6113 10.999L12.8105 10.668C13.2496 9.87822 13.5 8.96927 13.5 8Z" />
          </svg>
        </div>
        <span className="text-[12px] font-medium text-[#f7f8f8]">Core Product</span>
        <span className="ml-auto text-[12px] text-[#8a8f98]">99</span>
      </button>

      {initiativeNavigationItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className="flex ml-4 items-center justify-center rounded-md">
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path
                d="M.5.5v2.764a2 2 0 0 0 1.106 1.789L8.5 8.5"
                stroke="#23252a"
                strokeLinecap="round"
              />
            </svg>
          </div>
          {item.icon}
          <span className="text-[13px] text-[#f7f8f8]">{item.label}</span>
          <span className="ml-auto text-[13px] text-[#8a8f98] pr-2">{item.count}</span>
        </div>
      ))}
    </div>
  );
};

const apacNavigationItems: NavigationItem[] = [
  {
    label: "Japan Launch",
    count: 12,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <IconMapPinFilled size={16} className="text-[#EC5C5D]" />
      </svg>
    ),
  },
  {
    label: "Customer-driven priorities",
    count: 16,
    icon: <IconMessageFilled size={16} color="#EC5C5D" />,
  },
];

const ApacNavigationSection = ({
  setActiveTimeline,
}: {
  setActiveTimeline: (value: TimelineView) => void;
}) => {
  return (
    <div className="relative flex flex-col gap-8 px-[22px] pt-[22px] pb-[26px]">
      <span className="absolute bottom-8 left-[35px] top-15 w-px bg-[#23252a] h-23" />

      <button
        onClick={() => setActiveTimeline("APAC")}
        className="flex items-center gap-2 text-left z-10 hover:bg-neutral-800/20 rounded-sm px-2 py-2 cursor-pointer">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#482929]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#EC5C5D">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.4145 8.3381C7.68162 7.8873 8.31838 7.8873 8.5855 8.3381L11.896 13.925C12.2589 14.5374 11.6035 15.2506 10.9879 14.9132L8.10753 13.3343C8.04032 13.2975 7.95967 13.2975 7.89247 13.3343L5.0121 14.9132C4.39652 15.2506 3.74112 14.5374 4.10401 13.925L7.4145 8.3381Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 8.96927 2.75037 9.87822 3.18945 10.668L3.38867 10.999L3.42773 11.0654C3.60231 11.4033 3.4953 11.825 3.16992 12.0371C2.84468 12.249 2.41642 12.1766 2.17773 11.8809L2.13281 11.8184L2.00195 11.6104C1.36597 10.5558 1 9.31963 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 9.40749 14.5834 10.7198 13.8672 11.8184L13.8223 11.8809C13.5836 12.1766 13.1553 12.249 12.8301 12.0371C12.4831 11.8109 12.3851 11.346 12.6113 10.999L12.8105 10.668C13.2496 9.87822 13.5 8.96927 13.5 8Z" />
          </svg>
        </div>
        <span className="text-[12px] font-medium text-[#f7f8f8]">APAC Expansion</span>
        <span className="ml-auto text-[12px] text-[#8a8f98]">21</span>
      </button>

      {apacNavigationItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className="flex ml-3.5 items-center justify-center rounded-md">
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path
                d="M.5.5v2.764a2 2 0 0 0 1.106 1.789L8.5 8.5"
                stroke="#23252a"
                strokeLinecap="round"
              />
            </svg>
          </div>
          {item.icon}
          <span className="text-[13px] text-[#f7f8f8]">{item.label}</span>
          <span className="ml-auto text-[13px] text-[#8a8f98] pr-2">{item.count}</span>
        </div>
      ))}
    </div>
  );
};
