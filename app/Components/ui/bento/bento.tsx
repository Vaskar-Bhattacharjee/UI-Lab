import { cn } from "@/app/lib/utils";
import { CardSkeletonOne } from "./skeletonOne";
import { CardSkeletonTwo } from "./skeletonTwo";
import { CardSkeletonThree } from "./skeletonThree";
import { CardSkeletonFour } from "./skeletonFour";


export const Bento = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 h-full lg:h-[616px] w-screen max-w-[1250px] mx-auto px-2 py-4 lg:py-0 lg:px-0">
            
            <div className="w-full lg:w-[528px] h-full">
            <BentoCard className="bg-white border border-neutral-300 w-full h-full p-8 relative overflow-hidden">
                <CardSkeleton height="h-120" > 
                    <CardSkeletonOne />
                </CardSkeleton>
                <CardHeading>Autonomous Agents</CardHeading>
                <CardDescription>Al agents that independently plan, make decisions and execute</CardDescription>
            </BentoCard>
            </div>

           <div className="flex flex-col gap-4 w-full lg:w-[428px] h-full">
            <BentoCard className="bg-white border border-neutral-300 relative overflow-hidden">
                <CardSkeleton height="h-52 w-full flex items-center justify-center mask-t-from-80% mask-b-from-80%" >
                    <CardSkeletonTwo className="text-neutral-400/60 -mt-8" />
                </CardSkeleton>
                <CardHeading className="px-8">Deep reasoning</CardHeading>
                <CardDescription className="px-8 pb-5">Multi-step reasoning to solve complex problems with greater accuracy</CardDescription>
            </BentoCard>

            <BentoCard className="bg-white border border-neutral-300 relative overflow-hidden">
                <CardSkeleton height="h-52" className="mask-l-from-90% mask-r-from-90% mask-t-from-90%"  >
                    <CardSkeletonThree />
                </CardSkeleton>
                <CardHeading className="px-8">Adaptive workflows</CardHeading>
                <CardDescription className="px-8 pb-5">Dynamic workfiows that adjust in real time based on context. </CardDescription>
            </BentoCard>
            </div>

            <div className="w-full lg:w-[500px] h-full">
            <BentoCard className="bg-white border border-neutral-300  relative overflow-hidden">
                <CardSkeleton height="h-117" >
                    <CardSkeletonFour />
                </CardSkeleton>
                <CardHeading className="px-8 mt-10">Human + AI</CardHeading>
                <CardDescription className="px-8 pb-6 ">Work together with Al agents that understand your goais, context and style</CardDescription>
            </BentoCard>
            </div>

        </div>
    );
};
interface BentoCardProps {

  className?: string;
  children?: React.ReactNode;
}
export const BentoCard = ({

  className,
  children,
}: BentoCardProps) => {
  return (
    <div
      className={cn(
        "bg-white border border-neutral-250 rounded-lg shadow-sm relative overflow-hidden flex flex-col justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};
const CardHeading = ({className, children}: {className?: string, children: React.ReactNode}) => {
    return (
        <div className={cn("text-lg font-medium font-inter text-neutral-900 tracking-tight", className)}>
            {children}
        </div>
    );
};
const CardDescription = ({className, children}: {className?: string, children: React.ReactNode}) => {
    return (
        <div className={cn("text-neutral-500/80 text-base font-normal font-inter tracking-tight max-w-[400px] text-balance mt-2", className)}>
            {children}
        </div>
    );
};

const CardSkeleton = ({className, height, children}: {className?: string, height?: string, children?: React.ReactNode}) => {
    return (
        
        <div className={cn("bg-white relative overflow-hidden flex items-center justify-center", height, className)}>
            {children}
        </div>
    );
};


