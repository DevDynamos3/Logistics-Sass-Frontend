"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Globe, CheckCircle } from "lucide-react";

const stats = [
    { label: "Active Carriers", value: "10K+", icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/10" },
    { label: "Daily Shipments", value: "25K+", icon: TrendingUp, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/10" },
    { label: "Countries", value: "45+", icon: Globe, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/10" },
    { label: "Satisfaction", value: "99.9%", icon: CheckCircle, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/10" },
];

export default function StatsBar() {
    return (
        <div className="py-6 bg-neutral-50 dark:bg-black">
            <div className="flex items-center justify-between px-3 mb-4">
                <h3 className="font-black text-xs uppercase tracking-widest text-neutral-400">Network Activity</h3>
                <span className="text-[10px] font-bold text-primary-600 uppercase">Real-time</span>
            </div>

            <div className="overflow-x-auto scrollbar-hide flex gap-4 px-5 pb-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex-shrink-0 w-36 bg-white dark:bg-neutral-900 p-4 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm"
                    >
                        <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-3`}>
                            <stat.icon size={20} />
                        </div>
                        <p className="text-xl font-black mb-1">{stat.value}</p>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter leading-tight">
                            {stat.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
