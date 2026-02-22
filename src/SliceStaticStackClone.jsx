import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SliceStaticStackClone = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const handleScroll = (e) => {
        const { scrollTop, clientHeight } = e.currentTarget;
        // Hero occupies 0–100vh, card stack 100–200vh, story 200vh+
        // Trigger morph halfway through the second scroll (Snap 1 at 1.0, Snap 2 at 2.0)
        setIsExpanded(scrollTop > clientHeight * 1.5);
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

    const snapSpring = { type: "spring", bounce: 0.05, duration: 0.7 };

    const mainImagePositions = {
        collapsed: { top: "54%", left: "4%", right: "4%", bottom: "0%", borderRadius: "32px 32px 0 0" },
        expanded: { top: "0%", left: "0%", right: "0%", bottom: "0%", borderRadius: "0px" }
    };

    return (
        <div
            onScroll={handleScroll}
            className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-white no-scrollbar relative font-sans"
        >
            {/* =============================================
                SECTION 1: HERO
                ============================================= */}
            <section className="h-screen w-full snap-start snap-stop-always shrink-0 relative z-10 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop')` }}
                />
                <div className="absolute inset-0 bg-black/5" />

                <nav className="relative z-10 flex items-center justify-between px-8 lg:px-16 py-5">
                    <span className="text-[22px] font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent tracking-tight">
                        slice
                    </span>
                    <div className="flex items-center gap-2">
                        {["Savings account", "UPI credit card", "What we offer +"].map((item) => (
                            <button
                                key={item}
                                className="px-4 py-2 text-[13px] font-medium text-gray-800 bg-white/75 backdrop-blur-sm rounded-full border border-white/40 hover:bg-white/90 transition-all duration-200"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </nav>

                <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100%-80px)] text-center px-8">
                    <h1 className="text-[56px] md:text-[72px] lg:text-[80px] font-extrabold text-white leading-[1.05] tracking-tight drop-shadow-lg">
                        Do right by the money
                    </h1>
                    <p className="mt-4 text-white/90 text-lg md:text-xl font-medium drop-shadow-md">
                        Simple, fast, intelligent banking
                    </p>
                    <div className="mt-8 flex items-center gap-0 bg-white/80 backdrop-blur-sm rounded-full pl-6 pr-1.5 py-1.5 shadow-xl">
                        <span className="text-sm font-medium text-gray-700 mr-3 whitespace-nowrap">
                            Trusted by <strong className="font-bold">18mn+ Indians</strong>
                        </span>
                        <button className="px-6 py-3 bg-purple-600 text-white text-sm font-bold rounded-full hover:bg-purple-700 transition-colors shadow-md">
                            Get slice
                        </button>
                    </div>
                </div>
            </section>

            {/* =============================================
                SECTIONS 2 & 3: STICKY MORPH WRAPPER
                ============================================= */}
            <div className="relative snap-start snap-stop-always">
                {/* Sticky visual layer covers the scroll distance of its parent */}
                <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-20">
                    <motion.div
                        animate={isExpanded ? { y: "-20vh", opacity: 0 } : { y: "0vh", opacity: 1 }}
                        transition={snapSpring}
                        className="absolute top-[18%] left-10 lg:left-24 w-full z-30 pointer-events-auto"
                    >
                        <h1 className="text-[52px] md:text-[64px] font-extrabold text-[#3A0867] leading-[1.05] tracking-tight">
                            Spend anywhere<br />with UPI credit card
                        </h1>
                        <p className="text-[#3A0867]/80 mt-5 max-w-[380px] text-[17px] leading-relaxed font-medium">
                            India's most flexible payment experience.<br />Use credit wherever UPI is accepted online, offline, and everywhere in between.
                        </p>
                    </motion.div>

                    <div className="absolute top-[48%] left-[10%] right-[10%] bottom-0 bg-[#E3C7A5] rounded-t-[32px] z-0 shadow-sm" />
                    <div className="absolute top-[51%] left-[7%] right-[7%] bottom-0 bg-[#5A8FA8] rounded-t-[32px] z-10 shadow-md" />

                    <motion.div
                        initial={mainImagePositions.collapsed}
                        animate={isExpanded ? mainImagePositions.expanded : mainImagePositions.collapsed}
                        transition={snapSpring}
                        style={{
                            backgroundPosition: "top center",
                            backgroundImage: `url('https://images.unsplash.com/photo-1583095123982-1200cb2aa51e?q=80&w=2000')`
                        }}
                        className="absolute bg-cover bg-no-repeat bg-slate-800 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] z-20 pointer-events-auto"
                    >
                        <motion.div
                            animate={{ opacity: isExpanded ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 bg-black/10 transition-opacity"
                        />
                        <motion.div
                            animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                            transition={{ ...snapSpring, delay: isExpanded ? 0.15 : 0 }}
                            className="absolute left-10 lg:left-24 top-[35%] pointer-events-none"
                        >
                            <div className="bg-white/10 backdrop-blur-[40px] border border-white/20 shadow-2xl p-10 rounded-[32px] w-[380px] text-white">
                                <h2 className="text-[44px] font-bold leading-[1.05] tracking-tight text-white drop-shadow-md">
                                    Instant<br />cashback<br />with spark
                                </h2>
                                <p className="mt-6 text-white/95 text-[16px] leading-relaxed font-medium drop-shadow-sm">
                                    Get new deals every week on your favourite brands, no codes, no waiting, just instant cashback
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 20 }}
                            transition={{ duration: 0.4, delay: isExpanded ? 0.2 : 0 }}
                            className="absolute bottom-10 left-0 w-full px-10 lg:px-24 z-30 pointer-events-auto"
                        >
                            <div className="flex gap-6 w-full max-w-4xl mx-auto">
                                {["Spark offers", "slice in 3", "Rewards"].map((tab, i) => (
                                    <div key={i} className="flex flex-col gap-3 flex-1 cursor-pointer" onClick={() => setActiveTab(i)}>
                                        <span className={`text-[13px] font-bold transition-colors duration-300 ${activeTab === i ? "text-white drop-shadow-md" : "text-white/60"}`}>
                                            {tab}
                                        </span>
                                        <div className="h-[2px] w-full bg-white/30 rounded-full overflow-hidden">
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

                {/* This anchor ensures there's enough room for the morph and provides the second snap point */}
                <div className="h-screen w-full snap-start snap-stop-always" />
            </div>

            {/* =============================================
                SECTION 4: GROW YOUR MONEY (Normal Scroll)
                ============================================= */}
            <section className="h-screen w-full snap-start snap-stop-always shrink-0 relative z-30 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#4a6741]/60 via-[#5a7a52]/40 to-[#3d5535]/70" />

                <div className="relative z-10 h-full flex flex-col px-10 lg:px-16 pt-14 pb-10">
                    <h2 className="text-[44px] md:text-[56px] font-extrabold text-white leading-[1.05] tracking-tight max-w-[520px] drop-shadow-lg">
                        Grow your money, transparently
                    </h2>

                    <div className="flex-1 flex items-end gap-5 mt-6">
                        {/* Card 1 */}
                        <div className="flex-[0.8] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[28px] p-8 text-white shadow-2xl self-end">
                            <h3 className="text-[28px] font-bold leading-[1.1]">No minimum<br />balance</h3>
                            <p className="mt-4 text-white/80 text-[14px] leading-relaxed font-medium">Zero balance savings account with no hidden conditions or hidden charges.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="flex-1 bg-white/95 backdrop-blur-xl rounded-[28px] p-7 shadow-2xl self-end">
                            <h3 className="text-[22px] font-bold text-gray-900 text-center leading-snug">Interest credited<br />every day</h3>
                            <div className="mt-5 space-y-0 rounded-2xl overflow-hidden border border-gray-100">
                                {[
                                    { date: "Interest for Jan 15", sub: "16 Jan '26", amount: "₹14.94" },
                                    { date: "Interest for Jan 14", sub: "15 Jan '26", amount: "₹14.94" },
                                    { date: "Interest for Jan 13", sub: "14 Jan '26", amount: "₹14.94" },
                                ].map((row, i) => (
                                    <div key={i} className={`flex items-center justify-between px-4 py-3 ${i !== 2 ? "border-b border-gray-100" : ""}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center">
                                                <span className="text-orange-500 text-[11px]">📈</span>
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-semibold text-gray-800">{row.date}</p>
                                                <p className="text-[11px] text-gray-400">{row.sub}</p>
                                            </div>
                                        </div>
                                        <span className="text-[14px] font-bold text-green-600">{row.amount}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-gray-500 text-[12px] leading-relaxed text-center font-medium">Watch your balance grow every single day.<br />Interest paid daily, not monthly or quarterly.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="flex-1 bg-white/95 backdrop-blur-xl rounded-[28px] p-7 shadow-2xl self-stretch flex flex-col">
                            <h3 className="text-[20px] font-bold text-gray-900 text-center leading-snug">Linked to 100%<br />repo-rate</h3>
                            <div className="mt-4 bg-gray-50 rounded-2xl p-5 border border-gray-100 flex-1 flex flex-col">
                                <p className="text-[36px] font-extrabold text-gray-900 text-center tracking-tight">₹79,952</p>
                                <p className="text-[11px] text-gray-400 text-center mt-1 font-medium">Additional earnings in 5Y</p>
                                <div className="mt-4 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-[12px] font-semibold text-gray-700">Earn with slice</p>
                                            <p className="text-[10px] text-gray-400">@6.25% p.a.</p>
                                        </div>
                                        <span className="text-[14px] font-bold text-gray-900">₹6,50,075</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-[12px] font-semibold text-gray-700">Traditional savings a/c</p>
                                            <p className="text-[10px] text-gray-400">@~2.62% p.a.</p>
                                        </div>
                                        <span className="text-[14px] font-bold text-gray-900">₹5,70,123</span>
                                    </div>
                                </div>
                                <div className="mt-4 bg-white rounded-xl px-3 py-2 border border-gray-200 flex items-center gap-2">
                                    <span className="text-[13px] font-bold text-gray-800">₹5,00,000</span>
                                    <div className="flex-1 h-1 bg-gray-200 rounded-full relative ml-2">
                                        <div className="absolute left-[40%] top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-purple-500 rounded-full border-2 border-white shadow-md" />
                                    </div>
                                </div>
                            </div>
                            <p className="mt-3 text-gray-500 text-[11px] leading-relaxed text-center font-medium">Your interest rate moves with RBI repo rate.<br />Completely transparent, no hidden calculations.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SliceStaticStackClone;
