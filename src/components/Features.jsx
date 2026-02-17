"use client";

import React from "react";
import { Shield, Zap, Globe, Clock, BarChart3, Truck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        title: "Eco-Shipping",
        description: "AI-route optimization for 30% less CO2.",
        icon: <Truck size={20} />,
        color: "bg-emerald-500",
    },
    {
        title: "Express",
        description: "Guaranteed 24h city-to-city delivery.",
        icon: <Zap size={20} />,
        color: "bg-amber-500",
    },
    {
        title: "Inter-State",
        description: "Reliable cross-country freight logistics.",
        icon: <Globe size={20} />,
        color: "bg-primary-500",
    },
    {
        title: "Secure Box",
        description: "Tamper-proof escrow protected shipping.",
        icon: <Shield size={20} />,
        color: "bg-indigo-500",
    },
];

export default function Features() {
    return (
        <section className="py-8 px-3 bg-neutral-50 dark:bg-black">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black tracking-tight">Discover Services</h2>
                <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">See all</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white dark:bg-neutral-900 p-5 rounded-[28px] border border-neutral-100 dark:border-neutral-800 shadow-sm flex flex-col items-start active:bg-neutral-50 dark:active:bg-neutral-800 transition-colors"
                    >
                        <div className={`w-10 h-10 ${feature.color} text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-${feature.color.split('-')[1]}-500/20`}>
                            {feature.icon}
                        </div>
                        <h3 className="text-xs font-black mb-1 uppercase tracking-tight">{feature.title}</h3>
                        <p className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 leading-tight">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
