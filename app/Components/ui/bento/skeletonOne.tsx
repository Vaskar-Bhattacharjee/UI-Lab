"use client";
import { CodeXml, Database, Brain, FileText, Globe, Zap, Sparkles } from "lucide-react";
import { useState } from "react";
import CurvedConnector from "@/app/illustration/illustration";
import { cn } from "@/app/lib/utils";
import { StraightLine } from "@/app/illustration/illustration";
import { motion } from "motion/react";

export const CardSkeletonOne = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const rings = [
    "size-[50px] z-8 bg-gray-300/30 shadow-xs",
    "size-[90px] z-7 bg-gray-300/25 shadow-xs",
    "size-[130px] z-6 bg-gray-300/20 shadow-xs",
    "size-[180px] z-5 bg-gray-300/15 shadow-xs",
    "size-[230px] z-4 bg-gray-300/10 shadow-xs",
    "size-[270px] z-3 bg-gray-300/5 shadow-xs",
    "size-[310px] z-2 bg-gray-100/2",
  ];

  const cards = [
    { icon: <CodeXml />, text: "Code", angle: 220, radius: 195 },
    { icon: <Globe />, text: "Research", angle: -38, radius: 197 },
    { icon: <Database />, text: "Data", angle: 175, radius: 155 },
    { icon: <FileText />, text: "Docs", angle: 4, radius: 155 },
    { icon: <Brain />, text: "Analyze", angle: 136, radius: 200 },
    { icon: <Zap />, text: "Execute", angle: 45, radius: 213 },
  ];

  return (
    <div className="bg-white relative h-full w-full flex items-center justify-center scale-[0.9] sm:scale-[0.9] md:scale-100">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none [mask-image:radial-gradient(circle_at_center,black_30%,transparent_85%)]">
        {rings.map((ringSize, index) => (
          <motion.div
            key={index}
            className={cn("absolute rounded-full border border-neutral-200/70", ringSize)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          />
        ))}
      </div>
      <CurvedConnector className="w-64 h-43.5 text-neutral-300 absolute top-22 -left-2" beamColor="#3b82f6" tipColor="#93c5fd" strokeWidth={1} delay={0.2} />
      <CurvedConnector className="w-64 h-42 text-neutral-300  absolute top-58 -left-1 -scale-y-100" beamColor="#3b82f6" tipColor="#93c5fd" strokeWidth={1} delay={0.4} />
      <CurvedConnector className="w-64 h-44 text-neutral-300 absolute top-22 -right-4 -scale-x-100" beamColor="#3b82f6" tipColor="#93c5fd" strokeWidth={1} delay={0.6} />
      <CurvedConnector className="w-64 h-44.5 text-neutral-300 absolute top-59 -right-4 -scale-x-100 -scale-y-100" beamColor="#3b82f6" tipColor="#93c5fd" strokeWidth={1} delay={0.8} />
      <StraightLine className="w-60 h-49 text-neutral-300 absolute top-38 -right-1 -scale-x-100" />
      <StraightLine className="w-60 h-49 text-neutral-300 absolute top-37.5 -left-1 scale-x-100" />

      <div className="relative z-10 flex items-center justify-center">
        <div className="relative size-14 mt-3 bg-neutral-900 rounded-full flex items-center justify-center shadow-lg z-20">
          <Sparkles className="size-6 text-white" />
        </div>
      </div>

      {cards.map((card, index) => {
        const rad = (card.angle * Math.PI) / 180;
        const x = Math.round(Math.cos(rad) * card.radius);
        const y = Math.round(Math.sin(rad) * card.radius);

        return (
          <div
            key={index}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            className={`absolute z-30 flex flex-col items-center justify-center gap-1.5 bg-white/95 backdrop-blur-sm border border-neutral-400/80 rounded-lg px-3 py-2 w-[60px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-neutral-400 cursor-pointer ${hoveredCard === index ? "border-neutral-300" : ""}`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className={`${hoveredCard === index ? "text-neutral-700 scale-102" : "text-neutral-400"} transition-all duration-300 size-8 flex items-center justify-center`}>
              {card.icon}
            </div>
            <span className={`${hoveredCard === index ? "text-neutral-800" : "text-neutral-600"} text-[11px] font-medium tracking-tight`}>
              {card.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};