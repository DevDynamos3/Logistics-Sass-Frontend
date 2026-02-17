"use client";

import React from "react";
import { Shield, Zap, Globe, Clock, BarChart3, Truck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        title: "Fast Delivery",
        description: "Get your package in 24 hours",
        emoji: "⚡",
        color: "from-amber-400 to-amber-600",
    },
    {
        title: "Safe & Secure",
        description: "Your items are protected",
        emoji: "🔒",
        color: "from-green-400 to-green-600",
    },
    {
        title: "Track Anytime",
        description: "Know where your package is",
        emoji: "📍",
        color: "from-blue-400 to-blue-600",
    },
    {
        title: "Affordable",
        description: "Best prices guaranteed",
        emoji: "💰",
        color: "from-purple-400 to-purple-600",
    },
];

export default function Features() {
    return (
        <section className="py-8 px-4 bg-neutral-50 dark:bg-black">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-black tracking-tight dark:text-white">Why Choose Us</h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">What makes us special</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative overflow-hidden rounded-[24px] shadow-lg cursor-pointer"
                    >
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20`} />

                        {/* Glassmorphism Layer */}
                        <div className="relative backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 p-5 flex flex-col items-start">
                            <div className="text-5xl mb-3">{feature.emoji}</div>
                            <h3 className="text-sm font-black mb-1 dark:text-white">{feature.title}</h3>
                            <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
