"use client";

import React, { useState } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Shield,
    Bell,
    ChevronRight,
    LogOut,
    Truck,
    Moon,
    Sun,
    Camera,
    Star,
    Award,
    Clock
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function DriverProfile() {
    const { logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Mock user
    const user = {
        name: "Chinedu Okafor",
        email: "chinedu.o@fleetra.com",
        phone: "+234 812 345 6789",
        role: "Senior Driver",
        unit: "Lagos Hub",
        vehicle: "Heavy Duty Truck",
        plateNumber: "LAG-552-XP",
        rating: 4.9,
        totalTrips: 1247,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MainDriver"
    };

    const stats = [
        { emoji: "⭐", label: "Rating", value: user.rating.toFixed(1) },
        { emoji: "🚚", label: "Total Trips", value: user.totalTrips.toLocaleString() },
        { emoji: "🏆", label: "Rank", value: user.role },
    ];

    const sections = [
        {
            title: "Account",
            emoji: "👤",
            items: [
                { icon: User, emoji: "📝", label: "Personal Info", sublabel: "Update your details" },
                { icon: Truck, emoji: "🚛", label: "Vehicle Info", sublabel: user.vehicle },
                { icon: Shield, emoji: "🔒", label: "Security", sublabel: "Password & 2FA" },
            ]
        },
        {
            title: "Settings",
            emoji: "⚙️",
            items: [
                { icon: Bell, emoji: "🔔", label: "Notifications", sublabel: "Manage alerts" },
                { icon: MapPin, emoji: "📍", label: "Location", sublabel: "Always allowed" },
            ]
        }
    ];

    return (
        <div className="space-y-6 max-w-2xl mx-auto pb-4">
            {/* Profile Header Card - Glassmorphism */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative overflow-hidden rounded-[32px] shadow-2xl"
            >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 via-primary-500/30 to-primary-600/30" />

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-300/20 blur-[100px] rounded-full -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-400/10 blur-[80px] rounded-full -ml-16 -mb-16" />

                {/* Glassmorphism Layer */}
                <div className="relative backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-white dark:bg-neutral-800 p-1 shadow-xl">
                                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
                            </div>
                            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-500 transition-colors">
                                <Camera size={14} />
                            </button>
                        </div>

                        {/* User Info */}
                        <div>
                            <h2 className="text-2xl font-black text-neutral-800 dark:text-white mb-1">{user.name}</h2>
                            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-3">{user.email}</p>
                            <div className="flex gap-2 justify-center">
                                <span className="px-3 py-1.5 bg-primary-500/20 backdrop-blur-sm text-primary-700 dark:text-primary-300 rounded-full text-xs font-black uppercase tracking-wider border border-primary-500/30">
                                    {user.role}
                                </span>
                                <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-neutral-700 dark:text-neutral-300 rounded-full text-xs font-black uppercase tracking-wider border border-white/30">
                                    {user.unit}
                                </span>
                            </div>
                        </div>

                        {/* Vehicle Info */}
                        <div className="w-full bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-[20px] p-4 border border-white/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/30 dark:bg-black/30 rounded-full flex items-center justify-center text-2xl">
                                        🚛
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-neutral-800 dark:text-white">{user.vehicle}</p>
                                        <p className="text-xs text-neutral-600 dark:text-neutral-400">{user.plateNumber}</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-neutral-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-neutral-900 rounded-[20px] p-4 shadow-md border border-neutral-100 dark:border-neutral-800 text-center"
                    >
                        <div className="text-3xl mb-2">{stat.emoji}</div>
                        <div className="text-xl font-black dark:text-white mb-1">{stat.value}</div>
                        <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Settings Sections */}
            {sections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                    <div className="flex items-center gap-2 px-2">
                        <span className="text-2xl">{section.emoji}</span>
                        <h3 className="text-lg font-black dark:text-white">{section.title}</h3>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 rounded-[24px] border border-neutral-100 dark:border-neutral-800 overflow-hidden shadow-sm">
                        {section.items.map((item, i) => (
                            <motion.div
                                key={i}
                                whileTap={{ scale: 0.98 }}
                                className={`p-4 flex items-center gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer ${i !== section.items.length - 1 ? 'border-b border-neutral-100 dark:border-neutral-800' : ''
                                    }`}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-3xl">
                                    {item.emoji}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-sm dark:text-white mb-0.5">{item.label}</p>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{item.sublabel}</p>
                                </div>
                                <ChevronRight size={20} className="text-neutral-300 shrink-0" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Theme Toggle */}
            {mounted && (
                <div className="bg-white dark:bg-neutral-900 rounded-[24px] border border-neutral-100 dark:border-neutral-800 overflow-hidden shadow-sm">
                    <motion.div
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-4 flex items-center gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-3xl">
                            {theme === 'dark' ? '🌙' : '☀️'}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm dark:text-white mb-0.5">
                                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                {theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                            </p>
                        </div>
                        <div className={`w-14 h-8 rounded-full transition-colors ${theme === 'dark' ? 'bg-primary-600' : 'bg-neutral-200'
                            } relative`}>
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                                }`} />
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Logout Button */}
            <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={logout}
                className="w-full h-16 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-[24px] font-black text-sm flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-shadow"
            >
                <span className="text-2xl">👋</span>
                <span>Sign Out</span>
            </motion.button>
        </div>
    );
}
