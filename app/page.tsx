"use client";
import { Bento } from "./Components/ui/bento/bento";

export default function Home() {
  return (
    <div className="h-full min-h-screen w-screen flex flex-col items-center justify-center gap-8 bg-white">
      <h1 className="font-inter font-medium tracking-tight text-4xl text-neutral-700 text-center">
        More than a chatbot <br />
        An autonomous system
      </h1>
      <p className="text-neutral-500/80 text-center text-base">
        Our agentic AI doesn't just respond. It thinks, plans, and takes action.<br />
        Built to handle real work, not just conversations.
      </p>
      <Bento />
    </div>
  );
}
