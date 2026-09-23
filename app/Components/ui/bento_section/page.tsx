import { Bento } from "../bento/bento";


export const Bento_Section = () => {
    return (
    <div className="h-full min-h-screen w-screen flex flex-col items-center justify-center gap-8 bg-white py-10">
      <h1 className="font-inter font-medium tracking-tight text-4xl text-neutral-700 text-center">
        More than a chatbot
        <br />
        An autonomous system
      </h1>
      <p className="text-neutral-500/80 text-center text-base max-w-lg px-4 lg:px-4">
        Our agentic AI doesn't just respond. It thinks, plans, and takes action.
        Built to handle real work, not just conversations.
      </p>
      <Bento />
    </div>
    );
};