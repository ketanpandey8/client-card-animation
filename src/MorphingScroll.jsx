import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const MorphingScroll = () => {
    const containerRef = useRef(null);
    const [isSnappedToSection2, setIsSnappedToSection2] = useState(false);

    // 1. Track scroll progress of the specific container (0 to 1)
    const { scrollYProgress } = useScroll({
        container: containerRef,
    });

    // 2. Interpolate values based on scroll progress
    // Image transitions: Card (0.8 scale, rounded) -> Full Screen (1.0 scale, square)
    const imageScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const imageRadius = useTransform(scrollYProgress, [0, 0.8], ["24px", "0px"]);
    const imageY = useTransform(scrollYProgress, [0, 1], ["25vh", "0vh"]);

    // Opacity transitions
    const section1Opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const section2Opacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
    const overlayDarken = useTransform(scrollYProgress, [0.5, 1], ["rgba(0,0,0,0)", "rgba(0,0,0,0.3)"]);

    // 3. Trigger Story Tabs logic when scroll hits the bottom
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest >= 0.95) setIsSnappedToSection2(true);
        if (latest <= 0.05) setIsSnappedToSection2(false);
    });

    return (
        /* MAIN WRAPPER: Handles the physical snapping */
        <div
            ref={containerRef}
            className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-white antialiased no-scrollbar"
        >
            {/* VISUAL CANVAS: This layer stays pinned while you scroll */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center">

                {/* SECTION 1 TEXT */}
                <motion.div
                    style={{ opacity: section1Opacity }}
                    className="absolute top-20 px-8 text-left w-full z-20 pointer-events-none"
                >
                    <h1 className="text-5xl font-extrabold text-[#4A1D7A] leading-tight tracking-tight">
                        Spend anywhere<br />with UPI credit card
                    </h1>
                    <p className="text-gray-500 mt-4 max-w-[280px] text-lg font-medium">
                        India's most flexible payment experience. Use credit wherever UPI is accepted.
                    </p>
                </motion.div>

                {/* THE MORPHING IMAGE */}
                <motion.div
                    style={{
                        scale: imageScale,
                        borderRadius: imageRadius,
                        y: imageY,
                        backgroundImage: `url('https://images.unsplash.com/photo-1620121692029-d088224efc74?q=80&w=2000&auto=format&fit=crop')`,
                    }}
                    className="relative w-full h-full bg-cover bg-center shadow-2xl origin-bottom"
                >
                    {/* Subtle Dark Overlay for Section 2 readability */}
                    <motion.div style={{ backgroundColor: overlayDarken }} className="absolute inset-0" />

                    {/* SECTION 2 CONTENT (Glass Card) */}
                    <motion.div
                        style={{ opacity: section2Opacity }}
                        className="absolute inset-0 flex flex-col justify-end p-8 pb-32"
                    >
                        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[32px] max-w-xs text-white shadow-2xl">
                            <h2 className="text-4xl font-bold leading-[1.1]">Instant<br />cashback<br />with spark</h2>
                            <p className="mt-4 text-white/70 text-base font-light">
                                Get new deals every week on your favourite brands, no codes, no waiting.
                            </p>
                        </div>
                    </motion.div>

                    {/* STORY TABS */}
                    <motion.div
                        style={{ opacity: section2Opacity }}
                        className="absolute bottom-12 left-0 w-full px-8 flex gap-3 z-30"
                    >
                        <StoryTab active={isSnappedToSection2} delay={0} />
                        <StoryTab active={isSnappedToSection2} delay={3} />
                        <StoryTab active={isSnappedToSection2} delay={6} />
                    </motion.div>
                </motion.div>
            </div>

            {/* SNAP ANCHORS: These provide the height and snap points */}
            <div className="h-screen w-full snap-start shrink-0" />
            <div className="h-screen w-full snap-start shrink-0" />
        </div>
    );
};

// Sub-component for the Progress Bars
const StoryTab = ({ active, delay }) => (
    <div className="h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div
            initial={{ width: "0%" }}
            animate={{ width: active ? "100%" : "0%" }}
            transition={{
                duration: active ? 3 : 0.3,
                delay: active ? delay : 0,
                ease: "linear"
            }}
            className="h-full bg-white"
        />
    </div>
);

export default MorphingScroll;
