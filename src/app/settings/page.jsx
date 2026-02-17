"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    ChevronLeft
} from "lucide-react";
import { useRouter } from "next/navigation";
import BottomTabBar from "@/components/BottomTabBar";
import { useTheme } from "next-themes";

const sections = [
    {
        title: "My Account",
        items: [
            { emoji: "👤", label: "My Profile", sub: "Edit personal info", color: "from-blue-400 to-blue-600" },
            { emoji: "💳", label: "Payments", sub: "Cards & Wallet", color: "from-emerald-400 to-emerald-600" },
            { emoji: "🚛", label: "My Trucks", sub: "Fleet management", color: "from-orange-400 to-orange-600" },
        ]
    },
    {
        title: "Preferences",
        items: [
            { emoji: "🔔", label: "Alerts", sub: "Notification sounds", color: "from-purple-400 to-purple-600" },
            { emoji: "🌙", label: "Dark Mode", sub: "Night view", toggle: true, color: "from-indigo-400 to-indigo-600" },
            { emoji: "🌍", label: "Language", sub: "English (NG)", value: "English", color: "from-cyan-400 to-cyan-600" },
        ]
    },
    {
        title: "Support",
        items: [
            { emoji: "🛡️", label: "Security", sub: "Privacy & Safety", color: "from-rose-400 to-rose-600" },
            { emoji: "❓", label: "Get Help", sub: "Customer support", color: "from-amber-400 to-amber-600" },
        ]
    }
];

export default function SettingsPage() {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-black font-sans pb-40">
            {/* Premium Header */}
            <div className="py-4 px-3 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={() => router.back()}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-800 dark:text-white shadow-xl"
                        >
                            <ChevronLeft size={24} strokeWidth={3} />
                        </motion.button>
                        <div>
                            <h1 className="text-4xl font-black tracking-tight dark:text-white">Settings</h1>
                            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">App control center</p>
                        </div>
                    </div>
                    <div className="text-4xl">⚙️</div>
                </div>
            </div>

            {/* Profile Highlight Card */}
            <div className="px-3 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-[40px] shadow-2xl"
                >
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 opacity-90" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16" />

                    <div className="relative backdrop-blur-xl p-8 flex items-center gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-3xl font-black border border-white/30 shadow-inner">
                            AA
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-black tracking-tight text-white mb-1">Alex Adeyemi</h2>
                            <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-4">Premium Member ✨</p>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2 bg-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary-600 shadow-lg shadow-black/10"
                            >
                                Edit Information
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Settings Sections */}
            <div className="px-5 space-y-12">
                {sections.map((section, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-5">{section.title}</h3>
                        <div className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-2xl rounded-[40px] border border-neutral-100 dark:border-neutral-800 shadow-xl overflow-hidden">
                            {section.items.map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileTap={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                                    onClick={() => item.toggle && setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className={`flex items-center justify-between p-6 cursor-pointer group ${i !== section.items.length - 1 ? 'border-b border-neutral-50 dark:border-neutral-800' : ''}`}
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl shadow-lg shadow-black/5 transition-transform group-hover:scale-110`}>
                                            {item.emoji}
                                        </div>
                                        <div>
                                            <span className="text-base font-black tracking-tight dark:text-white block mb-0.5">{item.label}</span>
                                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{item.sub}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {item.value && <span className="text-xs font-black text-primary-600">{item.value}</span>}
                                        {item.toggle && (
                                            <div
                                                className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center ${theme === 'dark' ? 'bg-primary-600 justify-end' : 'bg-neutral-200 dark:bg-neutral-800 justify-start'}`}
                                            >
                                                <motion.div
                                                    layout
                                                    className="w-6 h-6 bg-white rounded-full shadow-lg"
                                                />
                                            </div>
                                        )}
                                        {!item.toggle && <ChevronRight size={20} className="text-neutral-300 group-hover:text-primary-600 transition-colors" />}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}

                <div className="pt-4">
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-red-500/10 dark:bg-red-500/5 text-red-500 p-7 rounded-[32px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 border-2 border-red-500/20 shadow-xl"
                    >
                        <span className="text-2xl">🚪</span>
                        Log me out safely
                    </motion.button>
                    <p className="text-center mt-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest opacity-50">
                        Fleetra Version 2.0.4 • Lag-Free Experience
                    </p>
                </div>
            </div>

            <BottomTabBar />
        </main>
    );
}
