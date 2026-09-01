'use client'
import { cn } from "@/app/lib/utils"
import { motion } from "motion/react"
import { useState } from "react"
import { PlasticFilmOverlay } from "./PlasticFilmOverlay"

const CARD_INFO = [
    {
        backgroundImage: "https://images.unsplash.com/photo-1708502786016-03b60bfc5587?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Into the Wild",
        description:
            "A visual exploration of distance, scale, and movement inspired by quiet mountain landscapes."
    },
    {
        backgroundImage: "https://images.unsplash.com/photo-1580405624815-5168a9f8bb63?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Between the Peaks",
        description:
            "An atmospheric interaction built around depth and soft transitions through mountain."
    },
    {
        backgroundImage: "https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjB2aWV3fGVufDB8fDB8fHww",
        title: "Above the Clouds",
        description:
            "A spatial experiment exploring elevation and perspective through layered fluid motion."
    },
    {
        backgroundImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
        title: "Afterlight",
        description:
            "A cinematic interaction inspired by twilight across distant peaks with gradual visual reveals."
    }
]

export type CardProps = {
    className?: string;
    children?: React.ReactNode;
}

export const Card = ({ className }: CardProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative flex min-h-[500px] w-full items-center justify-center ml-50 p-8">
            {CARD_INFO.map((card, idx) => {
                const offset = (idx - activeIndex + CARD_INFO.length) % CARD_INFO.length;
                const isActive = idx === activeIndex;

                return (
                    <motion.div
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        initial={false}
                        animate={{
                            x: -offset * 88,
                            y: offset * -19,
                            rotate: offset * -5,
                            scale: 1 - offset * 0.04,
                            zIndex: CARD_INFO.length - offset,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 22,
                        }}
                        className={cn(
                            "absolute h-[315px] w-[220px] md:h-[440px] md:w-[340px] cursor-pointer flex-col justify-start border border-neutral-800 bg-neutral-900 p-0 shadow-xl transition-colors duration-200 rounded-xl overflow-hidden group",
                            isActive ? "border-neutral-600 shadow-2xl shadow-indigo-500/10 cursor-grabbing" : "bg-neutral-900 cursor-pointer",
                            className
                        )}
                        style={{
                            backgroundImage: `url(${card.backgroundImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/15 to-black/70 -z-10" />
                        <CardSkelton className="pointer-events-none" />
                        <CardHeader title={card.title} />
                        <CardDescription description={card.description} />
                        <PlasticFilmOverlay isActive={isActive} />
                    </motion.div>
                );
            })}
        </div>
    )
}
const CardSkelton = ({ className }: { className?: string }) => {
    return (
        <div className={cn("h-56 md:h-70 w-full rounded-xl p-0 relative mask-b-from-70% mask-t-from-70% mask-l-from-70% mask-r-from-70%", className)}>
        </div>
    )
}

const CardHeader = ({ className, title }: { className?: string; title: string }) => {
    return (
        <h2 className={cn(" mt-0 md:mt-4 px-3 text-sm md:text-xl font-semibold text-neutral-50/80 px-3 z-10", className)}>{title}</h2>
    )
}

const CardDescription = ({ className, description }: { className?: string; description: string }) => {
    return (
        <p className={cn("mt-2 px-4 text-xs md:text-[14px] font-inter text-neutral-300/50  z-10", className)}>{description}</p>
    )
}

