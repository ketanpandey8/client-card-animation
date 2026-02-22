import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SliceVisualClone = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const handleScroll = (e) => {
        const { scrollTop, clientHeight } = e.currentTarget;
        if (scrollTop > clientHeight * 0.3) {
            setIsExpanded(true);
        } else {
            setIsExpanded(false);
        }
    };

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

    const springTransition = { type: "spring", stiffness: 200, damping: 25, mass: 0.8 };

    const tabs = ["Spark offers", "slice in 3", "Rewards"];

    return (
        <div
            onScroll={handleScroll}
            className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-white no-scrollbar relative font-sans"
        >

            {/* THE STICKY UI LAYER */}
            <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">

                {/* SECTION 1 TEXT (Matches Screenshot 1) */}
                <motion.div
                    animate={isExpanded ? { y: "-15vh", opacity: 0 } : { y: "0vh", opacity: 1 }}
                    transition={springTransition}
                    className="absolute top-24 left-12 w-full z-30 pointer-events-auto"
                >
                    <h1 className="text-[52px] md:text-[64px] font-extrabold text-[#3B0764] leading-[1.05] tracking-tight">
                        Spend anywhere<br />with UPI credit card
                    </h1>
                    <p className="text-[#3B0764]/80 mt-6 max-w-[360px] text-[17px] leading-snug font-medium">
                        India's most flexible payment experience.<br />Use credit wherever UPI is accepted online, offline, and everywhere in between.
                    </p>
                </motion.div>

                {/* THE CARD STACK (Behind main image) */}
                <motion.div
                    animate={isExpanded ? { y: "0vh", scale: 0.82, opacity: 0 } : { y: "24vh", scale: 0.85, opacity: 1 }}
                    transition={springTransition}
                    className="absolute inset-0 bg-[#7B9EAF] rounded-t-[32px] mx-auto w-[88%] h-full z-0 shadow-inner"
                />
                <motion.div
                    animate={isExpanded ? { y: "0vh", scale: 0.82, opacity: 0 } : { y: "21vh", scale: 0.80, opacity: 0.8 }}
                    transition={springTransition}
                    className="absolute inset-0 bg-[#5A7B8C] rounded-t-[32px] mx-auto w-[82%] h-full z-0"
                />

                {/* MAIN IMAGE COMPONENT */}
                <motion.div
                    animate={isExpanded ? { scale: 1, y: "0vh", borderRadius: "0px" } : { scale: 0.92, y: "28vh", borderRadius: "32px" }}
                    transition={springTransition}
                    style={{
                        transformOrigin: "top center",
                        backgroundImage: `url('https://images.unsplash.com/photo-1621574539437-4b7b9122fa4f?q=80&w=2000')`
                    }}
                    className="relative w-full h-full bg-cover bg-center shadow-[0_-20px_50px_rgba(0,0,0,0.15)] z-10 pointer-events-auto"
                >
                    {/* Subtle gradient overlay to ensure text readability */}
                    <motion.div
                        animate={{ opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"
                    />

                    {/* GLASS CARD (Matches Screenshot 2 - Left Aligned) */}
                    <motion.div
                        animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                        transition={{ ...springTransition, delay: isExpanded ? 0.1 : 0 }}
                        className="absolute left-12 top-[25%] pointer-events-none"
                    >
                        <div className="bg-white/10 backdrop-blur-[32px] border border-white/20 shadow-2xl p-10 rounded-[32px] w-[380px] text-white">
                            <h2 className="text-[44px] font-bold leading-[1.05] tracking-tight text-white drop-shadow-sm">
                                Instant<br />cashback<br />with spark
                            </h2>
                            <p className="mt-6 text-white/90 text-[16px] leading-relaxed font-medium">
                                Get new deals every week on your favourite brands, no codes, no waiting, just instant cashback
                            </p>
                        </div>
                    </motion.div>

                    {/* SPARK BUBBLE (Matches Screenshot 2 - Glassy Pill) */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, y: 10 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.8, opacity: 0, y: 10 }}
                                transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.3 }}
                                className="absolute top-[55%] right-[20%] bg-white/30 backdrop-blur-md border border-white/30 pl-2 pr-4 py-2 rounded-full shadow-lg flex items-center gap-3"
                            >
                                <div className="w-6 h-6 bg-[#E87B35] rounded-full flex items-center justify-center text-white text-[12px]">⚡</div>
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col">
                                        <p className="text-[9px] text-gray-800 font-bold uppercase leading-none">spark cashback</p>
                                        <p className="text-[8px] text-gray-600 mt-0.5">27 Jan 30</p>
                                    </div>
                                    <p className="text-sm font-black text-[#1D9974] leading-none">₹100</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* STORY TABS + LABELS (Matches Screenshot 2 - Text above thin lines) */}
                    <motion.div
                        animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 20 }}
                        transition={{ duration: 0.4, delay: isExpanded ? 0.2 : 0 }}
                        className="absolute bottom-10 left-0 w-full px-12 z-20"
                    >
                        <div className="flex gap-4 w-full">
                            {tabs.map((tab, i) => (
                                <div key={i} className="flex flex-col gap-2 flex-1 cursor-pointer" onClick={() => setActiveTab(i)}>
                                    <span className={`text-[12px] font-bold transition-colors duration-300 ${activeTab === i ? "text-white" : "text-white/60"}`}>
                                        {tab}
                                    </span>
                                    <div className="h-[3px] w-full bg-white/20 rounded-full overflow-hidden">
                                        <motion.div
                                            animate={{ width: isExpanded && activeTab === i ? "100%" : activeTab > i ? "100%" : "0%" }}
                                            transition={{ duration: activeTab === i ? 3 : 0.2, ease: "linear" }}
                                            className="h-full bg-white"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* THE ANCHORS */}
            <div className="h-screen w-full snap-start absolute top-0 left-0" />
            <div className="h-screen w-full snap-start absolute top-[100vh] left-0" />
            <div className="h-[200vh] w-full pointer-events-none" />
        </div>
    );
};

export default SliceVisualClone;
