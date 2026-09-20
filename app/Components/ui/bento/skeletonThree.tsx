"use client";

import * as React from "react";
import { AdaptiveWorkflowConnector } from "@/app/illustration/adaptive";
import { cn } from "@/app/lib/utils";
import { CodeXml, Database, FileText } from "lucide-react";
import { useAnimate, useAnimation } from "motion/react";

export const CardSkeletonThree = () => {
  const [scope, animate] = useAnimate();
  const pathControls = useAnimation(); 

  React.useEffect(() => {
    let isMounted = true;

    const runSequence = async () => {
      while (isMounted) {
        pathControls.set({ pathLength: 0, opacity: 0 }); 
        
        animate(".card-box", { scale: 1, borderColor: "#d1d5db" }, { duration: 0 });
        animate(".action-text", { opacity: 0, y: 5 }, { duration: 0 });
        animate(".result-text", { opacity: 0, y: 5 }, { duration: 0 });
        animate(".skeleton-lines", { opacity: 1 }, { duration: 0 });
        animate(".card-icon", { color: "#9ca3af" }, { duration: 0 });

        await new Promise((r) => setTimeout(r, 100));

        await pathControls.start({
          pathLength: 1,
          opacity: 1,
          transition: { duration: 1.8, ease: "easeInOut" },
        });

        animate(".card-box", { scale: 1.04, borderColor: "#6b7280" }, { duration: 0.3 });
        animate(".icon-doc", { color: "#3b82f6" }, { duration: 0.3 });
        animate(".icon-db", { color: "#a855f7" }, { duration: 0.3 });
        animate(".icon-code", { color: "#f97316" }, { duration: 0.3 });
        animate(".skeleton-lines", { opacity: 0 }, { duration: 0.2 });
        await animate(".action-text", { opacity: 1, y: 0 }, { duration: 0.3 });


        await new Promise((r) => setTimeout(r, 1500));

        animate(".action-text", { opacity: 0, y: -5 }, { duration: 0.2 });
        await animate(".result-text", { opacity: 1, y: 0 }, { duration: 0.3 });

        await new Promise((r) => setTimeout(r, 2000));

        animate(".result-text", { opacity: 0 }, { duration: 0.3 });
        animate(".card-box", { scale: 1, borderColor: "#d1d5db" }, { duration: 0.3 });
        animate(".card-icon", { color: "#9ca3af" }, { duration: 0.3 });
        await pathControls.start({ opacity: 1, transition: { duration: 0.4 } });

        await new Promise((r) => setTimeout(r, 400));
      }
    };

    runSequence();

    return () => {
      isMounted = false;
    };
  }, [animate, pathControls]);

  return (
    <div ref={scope} className="min-w-52 min-h-52 max-w-52 max-h-52 relative">
      <Card
        icon={<FileText className="w-5 h-5 stroke-1.2 card-icon icon-doc" />}
        actionText="Parsing doc..."
        resultText="Doc connected"
        className="top-10 left-10"
      />
      <Card
        icon={<Database className="w-5 h-5 stroke-1.2 card-icon icon-db" />}
        actionText="Querying DB..."
        resultText="DB connected"
        className="top-25 left-55"
      />
      <Card
        icon={<CodeXml className="w-5 h-5 stroke-1.2 card-icon icon-code" />}
        actionText="Executing..."
        resultText=" Code Executed"
        className="top-43 left-20"
      />

      <AdaptiveWorkflowConnector
        variant="all"
        pathControls={pathControls}
        className="absolute top-1 -left-40 w-100 h-50"
      />
    </div>
  );
};

const Card = ({
  icon,
  actionText,
  resultText,
  className,
}: {
  icon: React.ReactNode;
  actionText: string;
  resultText: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "card-box w-35 h-10 flex items-center justify-center gap-2 border border-gray-300 rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-10 transition-colors",
        className
      )}
    >
      {icon}

      <div className="skeleton-lines flex flex-col gap-1">
        <div className="w-20 h-2 bg-gray-200 rounded-md animate-pulse "></div>
        <div className="w-16 h-2 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      <div className="action-text absolute inset-0 flex items-center justify-center pl-6 opacity-0 pointer-events-none">
        <span className="text-[11px] font-medium text-gray-700 whitespace-nowrap">
          {actionText}
        </span>
      </div>

      <div className="result-text absolute inset-0 flex items-center justify-center pl-6 opacity-0 pointer-events-none">
        <span className="text-[11px] font-medium text-emerald-600 whitespace-nowrap">
          {resultText}
        </span>
      </div>
    </div>
  );
};