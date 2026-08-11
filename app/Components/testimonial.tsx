"use client";
import { useState } from "react";
import { animate, AnimatePresence, motion, useMotionValue, useTransform } from "motion/react";
import Image from "next/image";
import { IconArrowBadgeLeftFilled, IconArrowBadgeRightFilled } from "@tabler/icons-react";

const INITIAL_STACK = [
  {
    name: "Tom Cruise",
    designation: "CEO",
    quote:
      "Working with the team completely changed how we approach our digital product. The process was simple, thoughtful, and the final result felt better than we imagined.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&auto=format&fit=crop&q=60",
  },
  {
    name: "Richards",
    designation: "CTO",
    quote:
      "The attention to detail was impressive from the beginning. Every interaction felt intentional, and the final experience was fast, polished, and incredibly easy to use.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=60",
  },
  {
    name: "Olivia Carter",
    designation: "Product Designer",
    quote:
      "What stood out most was the balance between beautiful design and practical functionality. Nothing felt unnecessary, and every part of the interface had a clear purpose.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60",
  },
  {
    name: "Daniel Wilson",
    designation: "Engineering Lead",
    quote:
      "The development process was smooth and well organized throughout the project. Communication was clear, technical decisions were thoughtful, and everything shipped exactly when expected.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=60",
  },
  {
    name: "Sophia Miller",
    designation: "Marketing Director",
    quote:
      "Our new website finally feels like it represents the quality of our company. The visual direction is clean, modern, and gives our brand a much stronger presence online.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=60",
  },
  {
    name: "James Anderson",
    designation: "COO",
    quote:
      "The result was more than just a visual upgrade. The entire experience became clearer for our customers, and we immediately noticed how much easier it was to navigate and understand.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=60",
  },
];

export const Testimonial = () => {
    const [active, setActive] = useState(INITIAL_STACK[0]);

const handlePrevious = () => {
  setActive((prev) => {
    const currentIndex = INITIAL_STACK.indexOf(prev);

    const previousIndex =
      (currentIndex - 1 + INITIAL_STACK.length) % INITIAL_STACK.length;

    return INITIAL_STACK[previousIndex];
  });
};

const handleNext = () => {
  setActive((prev) => {
    const currentIndex = INITIAL_STACK.indexOf(prev);

    const nextIndex =
      (currentIndex + 1) % INITIAL_STACK.length;

    return INITIAL_STACK[nextIndex];
  });
};

 const isActive = (idx : number) => idx === INITIAL_STACK.indexOf(active);
 const random = () => Math.floor(Math.random() * 21) - 10;
    return (
        <div className=" relative grid grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
                {INITIAL_STACK.map((item, idx) => (
                    <AnimatePresence>
                    <motion.div
                    key={idx}
                    initial={{
                        scale: 0.9, 
                        y: 0, 
                        opacity: 0 ,
                        rotate: random()
                    }}
                    animate={{ 
                        scale: isActive(idx) ? 1 : 0.98, 
                        y: isActive(idx) ? [0 ,-80, 0] : 0,
                        opacity: isActive(idx) ? 1 : 0.5 ,
                        rotate: isActive(idx) ? 0 : random(),
                        zIndex: isActive(idx) ? 999 : INITIAL_STACK.length + 2 - idx,
                    }}
                    transition={{ duration: 0.3 }}
                    exit={{
                        opacity: 0,
                        scale: 0.9,
                        zIndex: 0,
                        rotate: random()
                    }}
                    className="h-96 w-86 rounded-xl overflow-hidden absolute inset-0">
                        <Image
                         src={item.image} 
                         alt={item.name}
                         width={400}
                         height={400}
                         className="w-full h-full object-cover"
                         />
                        
                    </motion.div>
                    </AnimatePresence>
                ))}
            </div>
            <motion.div
            key={active?.name}
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.3 }}
             className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-gray-100">{active?.name}</h2>
                <p className="text-gray-100/50 ">{active?.designation}</p>
                <p className="text-gray-100/70 text-[20px] max-w-[400px] font-medium text-pretty pt-10
                min-h-[240px] opacity-80">{active?.quote.split(' ').map((word, index) => (
                    <motion.span
                     key={`${word}-${index}`} 
                     
                     initial={{ opacity: 0,
                        filter: 'blur(10px)'
                      }}
                     animate={{ 
                        opacity: 1, 
                        filter: 'blur(0px)' 
                     }}
                     transition={{ duration: 0.3, delay: index * 0.02 }}
                    >{word}{index === active?.quote.split(' ').length - 1 ? '' : ' '} </motion.span>
                ))}</p>
                <div className="flex gap-2">
                    <button 
                    onClick={handlePrevious}
                    className="p-2 bg-gray-800 rounded-full size-12 flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"><IconArrowBadgeLeftFilled className="size-6"/></button>
                    <button 
                    onClick={handleNext}
                    className="p-2 bg-gray-800 rounded-full size-12 flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"><IconArrowBadgeRightFilled className="size-6"/></button>
                </div>
            </motion.div>
        </div>
    )
};
