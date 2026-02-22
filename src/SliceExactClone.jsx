import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";

const SliceExactClone = () => {
    const containerRef = useRef(null);
    const [isSnapped, setIsSnapped] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    // Tracking the scroll container exactly. 
    // Total scrollable height is now 200vh, making scrollYProgress exactly 1 at the snap point.
    const { scrollYProgress } = useScroll({
        container: containerRef,
        offset: ["start start", "end end"]
    });

    // --- TRANSFORMS ---
    // 1. Heading: Pushes UP faster than the card rises to avoid overlap
    const headerY = useTransform(scrollYProgress, [0, 0.4], ["0vh", "-25vh"]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    // 2. Image Morph: Scale from card to full, pivot from TOP
    const mainScale = useTransform(scrollYProgress, [0, 0.8], [0.82, 1]);
    const mainRadius = useTransform(scrollYProgress, [0, 0.7], ["32px", "0px"]);
    const mainY = useTransform(scrollYProgress, [0, 1], ["24vh", "0vh"]);

    // 3. The Stack: Replaced light blues with accurate dark tones
    const stack1Y = useTransform(scrollYProgress, [0, 0.3], ["22vh", "24vh"]);
    const stack2Y = useTransform(scrollYProgress, [0, 0.3], ["20vh", "24vh"]);
    const stackOpacity = useTransform(scrollYProgress, [0, 0.4], [0.8, 0]);

    // 4. Section 2 Overlays
    const overlayOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
    const darkenBg = useTransform(scrollYProgress, [0.6, 1], ["rgba(0,0,0,0)", "rgba(0,0,0,0.45)"]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Triggering slightly before 1 feels more responsive to the user's thumb
        setIsSnapped(latest > 0.95);
    });

    useEffect(() => {
        if (isSnapped) {
            const interval = setInterval(() => {
                setActiveTab((prev) => (prev < 2 ? prev + 1 : 0));
            }, 3000);
            return () => clearInterval(interval);
        } else {
            setActiveTab(0);
        }
    }, [isSnapped]);

    return (
        <div ref={containerRef} className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-white no-scrollbar">
            {/* This sticky container holds the animation. 
        It takes up 100vh of space in the flow. 
      */}
            <div className="sticky top-0 h-screen w-full overflow-hidden snap-start">

                {/* SECTION 1 TEXT */}
                <motion.div style={{ y: headerY, opacity: headerOpacity }} className="absolute top-16 left-0 w-full px-10 z-30">
                    <h1 className="text-[44px] font-bold text-[#4B1979] leading-[1.1] tracking-tight">
                        Spend anywhere<br />with UPI credit card
                    </h1>
                    <p className="text-gray-500 mt-4 max-w-[280px] text-lg leading-snug">
                        India's most flexible payment experience. Use credit wherever UPI is accepted online, offline, and everywhere in between.
                    </p>
                </motion.div>

                {/* THE CARD STACK */}
                <motion.div style={{ y: stack1Y, scale: 0.78, opacity: stackOpacity }} className="absolute inset-0 bg-[#2B2B36] rounded-[32px] mx-auto w-[90%] h-full z-0" />
                <motion.div style={{ y: stack2Y, scale: 0.75, opacity: stackOpacity }} className="absolute inset-0 bg-[#1C1C26] rounded-[32px] mx-auto w-[85%] h-full z-0" />

                {/* MAIN IMAGE COMPONENT */}
                <motion.div
                    style={{
                        scale: mainScale,
                        borderRadius: mainRadius,
                        y: mainY,
                        transformOrigin: "top center",
                        backgroundImage: `url('https://images.unsplash.com/photo-1620121692029-d088224efc74?q=80&w=2000')`
                    }}
                    className="relative w-full h-full bg-cover bg-center shadow-2xl z-10"
                >
                    <motion.div style={{ backgroundColor: darkenBg }} className="absolute inset-0 transition-colors duration-300" />

                    {/* SPARK BUBBLE */}
                    <AnimatePresence>
                        {isSnapped && (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0, x: 20 }}
                                animate={{ scale: 1, opacity: 1, x: 0 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.1 }}
                                className="absolute top-[48%] right-8 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-2xl flex items-center gap-3"
                            >
                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px]">⚡</div>
                                <div className="pr-2">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">spark cashback</p>
                                    <p className="text-lg font-black text-gray-800 leading-none mt-1">₹100</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* GLASS CARD */}
                    <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 flex flex-col justify-end p-10 pb-36">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 rounded-[40px] max-w-[320px] text-white">
                            <h2 className="text-[32px] font-bold leading-[1.1]">Instant cashback with spark</h2>
                            <p className="mt-4 text-white/80 text-base leading-snug">Get new deals every week on your favourite brands. No codes, no waiting, just instant cashback.</p>
                        </div>
                    </motion.div>

                    {/* STORY TABS + LABELS */}
                    <motion.div style={{ opacity: overlayOpacity }} className="absolute bottom-12 left-0 w-full px-10">
                        <div className="flex gap-2 mb-4">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ width: isSnapped && activeTab === i ? "100%" : activeTab > i ? "100%" : "0%" }}
                                        transition={{ duration: 3, ease: "linear" }}
                                        className="h-full bg-white"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/50">
                            <span className={`transition-colors duration-300 ${activeTab === 0 ? "text-white" : ""}`}>Spark offers</span>
                            <span className={`transition-colors duration-300 ${activeTab === 1 ? "text-white" : ""}`}>Slice in 3</span>
                            <span className={`transition-colors duration-300 ${activeTab === 2 ? "text-white" : ""}`}>Rewards</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* ANCHOR
        Exactly ONE viewport height of extra scroll space.
        This forces the total container scrollable height to 200vh.
      */}
            <div className="h-screen w-full snap-start" />
        </div>
    );
};

export default SliceExactClone;
