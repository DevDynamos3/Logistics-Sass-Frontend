"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, ArrowRight } from "lucide-react";

export default function MapPreview() {
    return (
        <section className="py-8 px-3 bg-neutral-50 dark:bg-black pb-32">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black tracking-tight">Live Network</h2>
                <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Active</span>
                </div>
            </div>

            <div className="relative aspect-square w-full bg-neutral-100 dark:bg-neutral-900 rounded-[32px] overflow-hidden border border-neutral-100 dark:border-neutral-800 shadow-inner group">
                {/* Animated Map Grid */}
                <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Pulsing Pins */}
                    {[
                        { top: '25%', left: '30%', size: 24 },
                        { top: '50%', left: '55%', size: 40 },
                        { top: '70%', left: '20%', size: 32 }
                    ].map((pin, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{ top: pin.top, left: pin.left }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        >
                            <div className="relative">
                                <MapPin className="text-primary-600" size={pin.size} fill="currentColor" fillOpacity={0.2} />
                                <motion.div
                                    className="absolute inset-0 bg-primary-600 rounded-full -z-10"
                                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Floating Stats Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-600/10 text-primary-600 rounded-xl flex items-center justify-center">
                                <Navigation size={18} className="rotate-45" />
                            </div>
                            <div>
                                <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">Active Corridors</p>
                                <p className="text-sm font-black tracking-tight">1,492 Routes</p>
                            </div>
                        </div>
                        <button className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
