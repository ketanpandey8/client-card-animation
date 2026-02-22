import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SliceMagneticClone = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    // 1. We listen to the native scroll of the container.
    // When the user scrolls past a threshold, we toggle the state.
    // CSS scroll-snap will handle the physical "magnet" pull.
    const handleScroll = (e) => {
        const { scrollTop, clientHeight } = e.currentTarget;
        // If we've scrolled past 30% of the screen, trigger the expansion
        if (scrollTop > clientHeight * 0.3) {
            setIsExpanded(true);
        } else {
            setIsExpanded(false);
        }
    };

    // Story Tab Timer Logic
    useEffect(() => {
        if (isExpanded) {
            const interval = setInterval(() => {
                setActiveTab((prev) => (prev < 2 ? prev + 1 : 0));
            }, 3000);
            return () => clearInterval(interval);
        } else {
            setActiveTab(0);
        }
    }, [isExpanded]);

    // A unified spring transition for that premium, smooth feel
    const springTransition = { type: "spring", stiffness: 200, damping: 25, mass: 0.8 };

    return (
        // The parent controls the magnetic scrolling
        <div
            onScroll={handleScroll}
            className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-white no-scrollbar relative"
        >

            {/* THE STICKY UI LAYER - This holds the morphing elements */}
            <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">

                {/* SECTION 1 TEXT */}
                <motion.div
                    animate={isExpanded ? { y: "-15vh", opacity: 0 } : { y: "0vh", opacity: 1 }}
                    transition={springTransition}
                    className="absolute top-16 left-0 w-full px-10 z-30 pointer-events-auto"
                >
                    <h1 className="text-[44px] font-bold text-[#4B1979] leading-[1.1] tracking-tight">
                        Spend anywhere<br />with UPI credit card
                    </h1>
                    <p className="text-gray-500 mt-4 max-w-[280px] text-lg leading-snug">
                        India's most flexible payment experience. Use credit wherever UPI is accepted online, offline, and everywhere in between.
                    </p>
                </motion.div>

                {/* THE CARD STACK */}
                <motion.div
                    animate={isExpanded ? { y: "0vh", scale: 0.82, opacity: 0 } : { y: "22vh", scale: 0.78, opacity: 0.8 }}
                    transition={springTransition}
                    className="absolute inset-0 bg-[#2B2B36] rounded-[32px] mx-auto w-[90%] h-full z-0"
                />
                <motion.div
                    animate={isExpanded ? { y: "0vh", scale: 0.82, opacity: 0 } : { y: "20vh", scale: 0.75, opacity: 0.8 }}
                    transition={springTransition}
                    className="absolute inset-0 bg-[#1C1C26] rounded-[32px] mx-auto w-[85%] h-full z-0"
                />

                {/* MAIN IMAGE COMPONENT */}
                <motion.div
                    animate={isExpanded ? { scale: 1, y: "0vh", borderRadius: "0px" } : { scale: 0.82, y: "24vh", borderRadius: "32px" }}
                    transition={springTransition}
                    style={{
                        transformOrigin: "top center",
                        backgroundImage: `url('https://images.unsplash.com/photo-1620121692029-d088224efc74?q=80&w=2000')`
                    }}
                    className="relative w-full h-full bg-cover bg-center shadow-2xl z-10 bg-slate-200 pointer-events-auto"
                >
                    <motion.div
                        animate={{ backgroundColor: isExpanded ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0)" }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    />

                    {/* SPARK BUBBLE */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0, x: 20 }}
                                animate={{ scale: 1, opacity: 1, x: 0 }}
                                exit={{ scale: 0.8, opacity: 0, x: 10 }}
                                transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.2 }}
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
                    <motion.div
                        animate={isExpanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ ...springTransition, delay: isExpanded ? 0.1 : 0 }}
                        className="absolute inset-0 flex flex-col justify-end p-10 pb-36 pointer-events-none"
                    >
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 rounded-[40px] max-w-[320px] text-white">
                            <h2 className="text-[32px] font-bold leading-[1.1]">Instant cashback with spark</h2>
                            <p className="mt-4 text-white/80 text-base leading-snug">Get new deals every week on your favourite brands. No codes, no waiting, just instant cashback.</p>
                        </div>
                    </motion.div>

                    {/* STORY TABS + LABELS */}
                    <motion.div
                        animate={{ opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-12 left-0 w-full px-10"
                    >
                        <div className="flex gap-2 mb-4">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ width: isExpanded && activeTab === i ? "100%" : activeTab > i ? "100%" : "0%" }}
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

            {/* THE ANCHORS - These create the physical scroll areas for the browser to snap to */}
            <div className="h-screen w-full snap-start absolute top-0 left-0" />
            <div className="h-screen w-full snap-start absolute top-[100vh] left-0" />

            {/* Invisible spacer to give the container actual scrollable height */}
            <div className="h-[200vh] w-full pointer-events-none" />
        </div>
    );
};

export default SliceMagneticClone;
