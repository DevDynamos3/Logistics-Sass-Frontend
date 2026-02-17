"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Globe, CheckCircle } from "lucide-react";

const stats = [
    { label: "Drivers", value: "10K+", emoji: "🚛", color: "from-blue-400 to-blue-600" },
    { label: "Deliveries", value: "25K+", emoji: "📦", color: "from-green-400 to-green-600" },
    { label: "Cities", value: "45+", emoji: "🏙️", color: "from-purple-400 to-purple-600" },
    { label: "Happy Users", value: "99%", emoji: "😊", color: "from-amber-400 to-amber-600" },
];

export default function StatsBar() {
    return (
        <div className="py-6 bg-neutral-50 dark:bg-black">
            <div className="flex items-center justify-between px-4 mb-4">
                <div>
                    <h3 className="text-lg font-black dark:text-white">Our Numbers</h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">Growing every day</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-black text-green-600 dark:text-green-400">Live</span>
                </div>
            </div>

            <div className="overflow-x-auto scrollbar-hide flex gap-4 px-4 pb-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex-shrink-0 w-36 relative overflow-hidden rounded-[24px] shadow-lg"
                    >
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-20`} />

                        {/* Glassmorphism Layer */}
                        <div className="relative backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 p-5 flex flex-col items-center text-center">
                            <div className="text-5xl mb-3">{stat.emoji}</div>
                            <p className="text-2xl font-black dark:text-white mb-1">{stat.value}</p>
                            <p className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
                                {stat.label}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
