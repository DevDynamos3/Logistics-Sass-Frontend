"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    User,
    Bell,
    Shield,
    CreditCard,
    Globe,
    LogOut,
    ChevronRight,
    HelpCircle,
    Moon,
    Truck
} from "lucide-react";
import { useRouter } from "next/navigation";
import BottomTabBar from "@/components/BottomTabBar";

const sections = [
    {
        title: "Account",
        items: [
            { icon: User, label: "Personal Information", color: "text-primary-600", bg: "bg-primary-100" },
            { icon: CreditCard, label: "Payment Methods", color: "text-emerald-600", bg: "bg-emerald-100" },
            { icon: Truck, label: "Fleet Management", color: "text-orange-600", bg: "bg-orange-100" },
        ]
    },
    {
        title: "Preferences",
        items: [
            { icon: Bell, label: "Notifications", color: "text-purple-600", bg: "bg-purple-100" },
            { icon: Moon, label: "Dark Mode", color: "text-indigo-600", bg: "bg-indigo-100", toggle: true },
            { icon: Globe, label: "Language", color: "text-cyan-600", bg: "bg-cyan-100", value: "English" },
        ]
    },
    {
        title: "Security & Support",
        items: [
            { icon: Shield, label: "Privacy & Security", color: "text-rose-600", bg: "bg-rose-100" },
            { icon: HelpCircle, label: "Help Center", color: "text-amber-600", bg: "bg-amber-100" },
        ]
    }
];

export default function SettingsPage() {
    const router = useRouter();
    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-black font-sans pb-32">
            {/* Header */}
            <div className="pt-20 px-6 mb-8 mt-4">
                <div className="flex items-center gap-4 mb-4">
                    <motion.button
                        onClick={() => router.back()}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 shadow-sm"
                    >
                        <ChevronRight size={20} className="rotate-180" />
                    </motion.button>
                    <h1 className="text-3xl font-black tracking-tight">Settings</h1>
                </div>
                <p className="text-sm text-neutral-400 font-medium">Manage your Fleetra experience</p>
            </div>

            {/* User Card */}
            <div className="px-5 mb-10">
                <div className="bg-white dark:bg-neutral-900 rounded-[32px] p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm flex items-center gap-5">
                    <div className="w-20 h-20 rounded-full bg-primary-600 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-primary-600/20">
                        AA
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-black tracking-tight">Alex Adeyemi</h2>
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Enterprise Plan</p>
                        <button className="px-4 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-primary-600">Edit Profile</button>
                    </div>
                </div>
            </div>

            {/* Settings Sections */}
            <div className="px-5 space-y-10">
                {sections.map((section, idx) => (
                    <div key={idx}>
                        <h3 className="px-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">{section.title}</h3>
                        <div className="bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-100 dark:border-neutral-800 shadow-sm overflow-hidden">
                            {section.items.map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileTap={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                                    className={`flex items-center justify-between p-5 cursor-pointer ${i !== section.items.length - 1 ? 'border-b border-neutral-50 dark:border-neutral-800' : ''}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl ${item.bg} dark:bg-neutral-800 flex items-center justify-center ${item.color}`}>
                                            <item.icon size={20} />
                                        </div>
                                        <span className="text-sm font-black tracking-tight">{item.label}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {item.value && <span className="text-xs font-bold text-neutral-400">{item.value}</span>}
                                        {item.toggle && (
                                            <div className="w-10 h-6 bg-primary-600 rounded-full p-1 flex justify-end">
                                                <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                                            </div>
                                        )}
                                        {!item.toggle && <ChevronRight size={18} className="text-neutral-300" />}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}

                <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-red-50 dark:bg-red-950/20 text-red-600 p-5 rounded-3xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 border border-red-100 dark:border-red-900/50 shadow-sm shadow-red-500/5"
                >
                    <LogOut size={16} />
                    Sign Out
                </motion.button>
            </div>

            <BottomTabBar />
        </main>
    );
}
