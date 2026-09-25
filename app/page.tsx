"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Envelope from "./Components/ui/envelope";

const IMAGE = [
  "https://images.pexels.com/photos/26926327/pexels-photo-26926327.jpeg",
  "https://images.pexels.com/photos/1677344/pexels-photo-1677344.jpeg",
  "https://images.pexels.com/photos/33603099/pexels-photo-33603099.jpeg",
  "https://images.pexels.com/photos/20725666/pexels-photo-20725666.jpeg",
];

// Card size (w-45 h-35) and gap (gap-4) in px
const CARD_W = 180;
const CARD_H = 140;
const GAP = 16;

// Where each card rests inside the envelope: its center in px from the envelope's
// top left corner, plus a small tilt. Outer cards sit higher so they stay above
// the pocket edge and all four are visible.
const INSIDE = [
  { x: 100, y: 70, rotate: -14 },
  { x: 140, y: 80, rotate: -5 },
  { x: 180, y: 80, rotate: 5 },
  { x: 220, y: 70, rotate: 14 },
];

// Gallery position relative to the envelope's top left corner (from the classes on the gallery div)
const GALLERY_LEFT = -28;
const GALLERY_TOP = -273;

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <div className="relative w-100 h-60 mt-50">
        {/* 1. Back of the envelope */}
        <Envelope layer="back" open={open} className=" w-full h-full" />

        {/* 2. Gallery, sits on top of the envelope when open */}
        <div
          className={`absolute left-1/2 top-[-285px]  -translate-x-1/2 w-[376px] flex flex-wrap gap-4 transition-[z-index] duration-0 ${
            open ? "z-[1] delay-[1500ms] " : "z-0 "
          }`}
        >
          {IMAGE.map((image, index) => {
            const col = index % 2;
            const row = Math.floor(index / 2);
            const inside = INSIDE[index];
            const hideX = inside.x - GALLERY_LEFT - (CARD_W / 2 + col * (CARD_W + GAP));
            const hideY = inside.y - GALLERY_TOP - (CARD_H / 3 + row * (CARD_H + GAP));

            return (
              <motion.div
                key={index}
                initial={false}
                animate={
                  open
                    ? { x: 0, y: 0, scale: 1, rotate: 0 }
                    : { x: hideX, y: hideY, scale: 0.4, rotate: inside.rotate }
                }
                transition={
                  open
                    ? { type: "spring", duration: 0.8, bounce: 0.15, delay: 0.5 + index * 0.1 }
                    : { duration: 0.4, ease: "easeIn", delay: index * 0.04 }
                }
              >
                <Card imagelink={image} />
              </motion.div>
            );
          })}
        </div>

        {/* 3. Front of the envelope, this one takes the click */}
        <Envelope
          layer="front"
          open={open}
          onClick={() => setOpen(!open)}
          className="absolute inset-0 w-full h-full cursor-pointer"
        />
      </div>

      {/* <div className="text-sm text-gray-800/80 font-medium pointer-events-none select-none font-inter">
        Click the envelope to open it!
      </div> */}
    </div>
  );
}

const Card = ({ imagelink }: { imagelink: string }) => {
  return (
    <div className="relative w-45 h-35 border border-neutral-300 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer">
      <Image
        src={imagelink}
        alt="Card Image"
        fill
        className="object-cover object-center"
      />
    </div>
  );
};