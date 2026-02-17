"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, ArrowRight } from "lucide-react";

export default function MapPreview() {
    return (
        <section className="py-8 px-4 bg-neutral-50 dark:bg-black pb-32">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-black tracking-tight dark:text-white">Live Network</h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Active deliveries across Nigeria</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-black text-green-600 dark:text-green-400">Live</span>
                </div>
            </div>

            <div className="relative aspect-square w-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 rounded-[32px] overflow-hidden border-2 border-neutral-200 dark:border-neutral-800 shadow-xl">
                {/* Animated Map Grid */}
                <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#3b82f6_2px,transparent_2px)] [background-size:32px_32px]" />

                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Pulsing Location Pins with Emojis */}
                    {[
                        { top: '25%', left: '30%', emoji: '📍', label: 'Lagos' },
                        { top: '50%', left: '55%', emoji: '🚛', label: 'Abuja' },
                        { top: '70%', left: '20%', emoji: '📦', label: 'PH' }
                    ].map((pin, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{ top: pin.top, left: pin.left }}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        >
                            <div className="relative flex flex-col items-center">
                                {/* Pulsing Ring */}
                                <motion.div
                                    className="absolute inset-0 bg-primary-500 rounded-full -z-10"
                                    animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />

                                {/* Emoji Pin */}
                                <div className="text-4xl mb-1 drop-shadow-lg">{pin.emoji}</div>

                                {/* Location Label */}
                                <div className="bg-white dark:bg-neutral-900 px-3 py-1 rounded-full shadow-lg border border-neutral-200 dark:border-neutral-700">
                                    <span className="text-xs font-black text-neutral-800 dark:text-white">{pin.label}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Floating Stats Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-[24px] shadow-2xl"
                    >
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 via-primary-500/30 to-primary-600/30" />

                        {/* Glassmorphism Layer */}
                        <div className="relative backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-primary-500/20 flex items-center justify-center text-3xl">
                                    🗺️
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Active Routes</p>
                                    <p className="text-lg font-black dark:text-white">1,492 Trips</p>
                                </div>
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="w-12 h-12 rounded-full bg-white dark:bg-neutral-800 text-primary-600 flex items-center justify-center shadow-lg"
                            >
                                <ArrowRight size={20} />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
