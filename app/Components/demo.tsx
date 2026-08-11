"use client";
import { useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

const INITIAL_STACK = [
    {
        name: "Switzerland",
        description: "Mountains, lakes and chocolate",
        image: "https://images.unsplash.com/photo-1594069758873-e79e9075eb7d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3dpdHplcmxhbmR8ZW58MHx8MHx8fDI%3D"
    },
    {
        name: "Japan",
        description: "Temples, cherry blossoms and technology",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFwYW58ZW58MHx8MHx8fDI%3D"
    },
    {
        name: "Italy",
        description: "Pasta, pizza and art",
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXRhbHxlbnwwfHwwfHx8Mg%3D%3D"
    },
    {
        name: "France",
        description: "Eiffel tower, art and wine",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJhbmNlfGVufDB8fDB8fHwy"
    }
]

export const Cards = () => {
    const [stack, setStack] = useState(INITIAL_STACK);
    return (
        <div className="relative flex h-96 w-80 items-center justify-center">
            {stack.map((item, index) => (
                <StackedCard
                    key={item.name}
                    item={item}
                    index={index}
                    total={stack.length}
                    onSendToBack={
                        index === 0
                            ? () => setStack((s) => [...s.slice(1), s[0]])
                            : () => { }
                    }

                />
            ))}
        </div>
    );
};

const STACK_SPRING = {
  type: "spring" as const,
  stiffness: 500,
  damping: 35,
  mass: 0.5,
};
const StackedCard = ({ item, index, total, onSendToBack }: { item: typeof INITIAL_STACK[0]; index: number; total: number; onSendToBack: () => void }) => {
     const x = useMotionValue(0);
     const rotate = useTransform(x, [-150, 150], [-12, 12])
     const isStop = index === 0
    return (
       
        <motion.div
            drag={isStop ? "x" : false}
            dragConstraints={{ left: -150, right: 150 }}
            dragElastic={0.08}
            onDragEnd={() => {
                if (!isStop || !onSendToBack) return
                onSendToBack();
                animate(x, 0, STACK_SPRING)
            }}

            style={{
                zIndex: total - index,
                x: x,
                rotate: rotate,
            }}
            animate={{
                y: `${-index * 5}%`,
                scale: 1 - index * 0.05,
               
            }}
            transition={STACK_SPRING}
            className="absolute inset-0">
            <img src={item.image} alt={item.name} className="h-full min-h-96 w-full object-cover pointer-events-none rounded-xl" />
            <h2 className="absolute bottom-8 left-0 right-0 p-4 text-white font-bold text-lg z-20">{item.name}</h2>
            <p className="absolute bottom-4 left-0 right-0 p-4 text-white/60 text-sm z-20">{item.description}</p>
            <div className="absolute inset-0 bg-black/50 mask-t-from-50%"></div>
        </motion.div>
    )
}