"use client";

import React, { useState, useEffect } from "react";
import {
    MapPin,
    Navigation,
    MessageSquare,
    Phone,
    Clock,
    DollarSign,
    TrendingUp,
    Star,
    Package,
    CheckCircle2,
    ArrowRight,
    Wifi,
    WifiOff
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function DriverDashboard() {
    const [isOnline, setIsOnline] = useState(true);

    // Auto-detect online status based on internet connection
    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine);
        };

        // Set initial status
        updateOnlineStatus();

        // Listen for online/offline events
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    const activeJob = {
        id: "ORD-2026-X99",
        customer: "Dangote Cement",
        pickup: "Apapa Port, Lagos",
        dropoff: "Ikeja City Mall, Lagos",
        price: "₦45,000",
        distance: "24km",
        status: "In Progress",
        customerImage: "https://api.dicebear.com/7.x/initials/svg?seed=DC"
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-4">
            {/* Online Status Banner - Glassmorphism */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative overflow-hidden rounded-[24px] shadow-lg"
            >
                {/* Gradient Background */}
                <div className={`absolute inset-0 ${isOnline
                    ? 'bg-gradient-to-r from-green-400/20 via-emerald-500/20 to-teal-500/20'
                    : 'bg-gradient-to-r from-red-400/20 via-rose-500/20 to-pink-500/20'
                    }`} />

                {/* Glassmorphism Layer */}
                <div className="relative backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm ${isOnline
                                ? 'bg-green-500/30 text-green-600 dark:text-green-400'
                                : 'bg-red-500/30 text-red-600 dark:text-red-400'
                                }`}>
                                {isOnline ? <Wifi size={24} /> : <WifiOff size={24} />}
                            </div>
                            <div>
                                <p className={`font-black text-lg ${isOnline
                                    ? 'text-green-700 dark:text-green-300'
                                    : 'text-red-700 dark:text-red-300'
                                    }`}>
                                    {isOnline ? "You're Online" : "You're Offline"}
                                </p>
                                <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                                    {isOnline ? "Ready to accept trips" : "Connect to internet to go online"}
                                </p>
                            </div>
                        </div>
                        {isOnline && (
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
                            />
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Active Trip Card - Glassmorphism */}
            <AnimatePresence>
                {activeJob && (
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="relative overflow-hidden rounded-[32px] shadow-2xl"
                    >
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 via-primary-500/30 to-primary-600/30" />

                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-300/20 blur-[100px] rounded-full -mr-20 -mt-20" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-400/10 blur-[80px] rounded-full -ml-16 -mb-16" />

                        {/* Glassmorphism Layer */}
                        <div className="relative backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 p-6">
                            <div className="space-y-6">
                                {/* Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-primary-500/30 rounded-full flex items-center justify-center backdrop-blur-sm text-primary-700 dark:text-primary-300">
                                            <Package size={20} />
                                        </div>
                                        <span className="font-black text-sm uppercase tracking-wider text-primary-700 dark:text-primary-300">Active Trip</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-black text-primary-700 dark:text-primary-300">{activeJob.price}</div>
                                        <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400">{activeJob.distance}</div>
                                    </div>
                                </div>

                                {/* Route Visualization */}
                                <div className="bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-[24px] p-5 space-y-4 border border-white/10">
                                    {/* Pickup */}
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center pt-1">
                                            <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                                                <div className="w-3 h-3 bg-white rounded-full" />
                                            </div>
                                            <div className="w-1 flex-1 bg-neutral-300 dark:bg-neutral-600 my-2" style={{ minHeight: '40px' }} />
                                            <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center shadow-lg">
                                                <MapPin size={16} className="text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-6">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="text-2xl">📍</div>
                                                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Pickup</span>
                                                </div>
                                                <p className="text-lg font-bold leading-tight text-neutral-800 dark:text-white">{activeJob.pickup}</p>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="text-2xl">🎯</div>
                                                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Drop Off</span>
                                                </div>
                                                <p className="text-lg font-bold leading-tight text-neutral-800 dark:text-white">{activeJob.dropoff}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer & Actions */}
                                <div className="flex items-center justify-between bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-[20px] p-4 border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={activeJob.customerImage}
                                            alt="Customer"
                                            className="w-12 h-12 rounded-full border-2 border-white/50 shadow-lg"
                                        />
                                        <div>
                                            <p className="font-bold text-sm text-neutral-800 dark:text-white">{activeJob.customer}</p>
                                            <p className="text-xs text-neutral-600 dark:text-neutral-400">Customer</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href="/driver/messages">
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                className="w-12 h-12 bg-white dark:bg-neutral-800 text-primary-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                                            >
                                                <MessageSquare size={20} />
                                            </motion.button>
                                        </Link>
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                                        >
                                            <Phone size={20} />
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick Stats - Large Icons */}
            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: "Earnings", sublabel: "Today", value: "₦85,200", icon: "💰", color: "from-green-400 to-green-600" },
                    { label: "Trips", sublabel: "Completed", value: "12", icon: "✅", color: "from-blue-400 to-blue-600" },
                    { label: "Time", sublabel: "Online", value: "6.5h", icon: "⏰", color: "from-orange-400 to-orange-600" },
                    { label: "Rating", sublabel: "Driver", value: "4.9 ⭐", icon: "🌟", color: "from-yellow-400 to-yellow-600" }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white dark:bg-neutral-900 rounded-[24px] p-5 shadow-lg border border-neutral-100 dark:border-neutral-800 cursor-pointer hover:shadow-xl transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="text-4xl">{stat.icon}</div>
                            <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white text-xs font-black`}>
                                {stat.sublabel}
                            </div>
                        </div>
                        <div className="text-2xl font-black dark:text-white mb-1">{stat.value}</div>
                        <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Available Jobs - Visual First */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-black dark:text-white flex items-center gap-2">
                            <span className="text-2xl">📍</span>
                            Nearby Jobs
                        </h3>
                        <p className="text-xs text-neutral-400 font-medium mt-1">Tap to view details</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {[
                        { emoji: "📦", name: "Construction Materials", location: "Lekki Phase 1", distance: "5.2km", price: "₦32,000" },
                        { emoji: "🏗️", name: "Building Supplies", location: "Victoria Island", distance: "8.1km", price: "₦28,500" },
                        { emoji: "🚚", name: "Office Equipment", location: "Ikeja GRA", distance: "12km", price: "₦45,000" }
                    ].map((job, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white dark:bg-neutral-900 rounded-[20px] p-4 shadow-md border border-neutral-100 dark:border-neutral-800 cursor-pointer hover:border-primary-500/50 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                                    {job.emoji}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h4 className="font-bold text-sm dark:text-white truncate">{job.name}</h4>
                                        <span className="font-black text-primary-600 text-lg shrink-0">{job.price}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                                        <MapPin size={14} className="shrink-0" />
                                        <span className="text-xs font-medium truncate">{job.location}</span>
                                        <span className="text-xs font-bold">•</span>
                                        <span className="text-xs font-bold text-primary-600">{job.distance}</span>
                                    </div>
                                </div>
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    className="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center text-primary-600 shrink-0"
                                >
                                    <ArrowRight size={20} />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
