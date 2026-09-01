'use client'
import { motion, useMotionValue, useTransform, useAnimation, useSpring } from "motion/react"
import { useEffect, useState } from "react"

export interface PlasticFilmOverlayProps {
    isActive: boolean;
}

export const PlasticFilmOverlay = ({ isActive }: PlasticFilmOverlayProps) => {
    const dragX = useMotionValue(0);
    const dragY = useMotionValue(0);
    
    const hoverExpand = useSpring(0, { stiffness: 400, damping: 30 }); 
    
    const controls = useAnimation();
    const [isPeeled, setIsPeeled] = useState(false);
    const [prevIsActive, setPrevIsActive] = useState(isActive);

    if (prevIsActive !== isActive) {
        setPrevIsActive(isActive);
        if (!isActive) {
            setIsPeeled(false);
        }
    }

    useEffect(() => {
        if (!isActive) {
            controls.start({ x: 0, y: 0, transition: { duration: 0 } });
            hoverExpand.set(0);
        }
    }, [isActive, controls, hoverExpand]);

    const peel = useTransform([dragX, dragY, hoverExpand], ([x, y, hover]) => {
        const rawDragDistance = (Math.abs(x as number) + Math.max(0, y as number)) / 2;
        const acceleratedDistance = rawDragDistance * 1.65; 
        return Math.max(44, acceleratedDistance + 44 + (hover as number));
    });

    const clipPath = useTransform(peel, (p) => 
        `polygon(0% 0%, calc(100% - ${p}px) 0%, 100% ${p}px, 100% 100%, 0% 100%)`
    );

    const flapSize = useTransform(peel, (p) => `${p}px`);

    return (
        <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none rounded-xl">
            
            <motion.div
                style={{ 
                    clipPath,
                    WebkitClipPath: clipPath
                }}
                className="absolute inset-0 pointer-events-none"
            >
                <div 
                    className="absolute inset-0 bg-white/30 backdrop-blur-md border border-white/20"
                    style={{ 
                        transform: "translateZ(0)", 
                        WebkitTransform: "translateZ(0)"
                    }}
                >
                    <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-white/30" />
                    
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-mono text-white/60 select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
                        [ Peel Film ]
                    </div>
                </div>
            </motion.div>

            {isActive && (
                <motion.div
                    style={{ width: flapSize, height: flapSize }}
                    className="absolute top-0 right-0 pointer-events-none drop-shadow-[-4px_4px_12px_rgba(0,0,0,0.9)] flex items-start justify-end"
                >
                    <div 
                        className="w-full h-full bg-linear-to-bl from-white/70 via-white/40 to-white/10 border-b border-l border-neutral-100/80 relative"
                        style={{ 
                            clipPath: "polygon(0 0, 100% 100%, 0 100%)",
                            WebkitClipPath: "polygon(0 0, 100% 100%, 0 100%)"
                        }}
                    >
                        <div 
                            className="absolute inset-0 bg-linear-to-tr from-white/90 via-white/30 to-transparent opacity-80"
                            style={{
                                clipPath: "polygon(0 0, 100% 100%, 98% 100%, 0 2%)",
                                WebkitClipPath: "polygon(0 0, 100% 100%, 98% 100%, 0 2%)"
                            }}
                        />
                    </div>
                </motion.div>
            )}

            {isActive && (
                <motion.div
                    drag={!isPeeled}
                    dragConstraints={{ top: 0, left: -1200, right: 0, bottom: 1200 }}
                    dragElastic={0.1}
                    dragMomentum={false}
                    style={{ x: dragX, y: dragY }}
                    animate={controls}
                    onHoverStart={() => { if (!isPeeled) hoverExpand.set(8); }}
                    onHoverEnd={() => hoverExpand.set(0)}
                    onDragEnd={(e, info) => {
                        const pullDistance = Math.hypot(info.offset.x, info.offset.y);
                        if (pullDistance > 250) {
                            setIsPeeled(true);
                            controls.start({ 
                                x: -800, 
                                y: 800, 
                                transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] } 
                            });
                        } else {
                            controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 400, damping: 25 } });
                        }
                    }}
                    className={`absolute top-0 right-0 w-24 h-24 ${isPeeled ? "pointer-events-none" : "cursor-grab active:cursor-grabbing pointer-events-auto"}`}
                />
            )}
        </div>
    );
};