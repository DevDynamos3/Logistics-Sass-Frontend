"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Filter,
    Package,
    Truck,
    Clock,
    CheckCircle2,
    ChevronRight,
    ArrowUpRight,
    MapPin,
    ChevronLeft
} from "lucide-react";
import { useRouter } from "next/navigation";
import BottomTabBar from "@/components/BottomTabBar";
import Link from "next/link";

const shipments = [
    {
        id: "FL-82910",
        status: "In Transit",
        statusEmoji: "🚚",
        origin: "Ikeja, Lagos",
        destination: "Lekki Phase 1",
        eta: "Today, 4:30 PM",
        progress: 65,
        type: "Express",
        date: "Feb 16, 2026"
    },
    {
        id: "FL-77102",
        status: "Pending",
        statusEmoji: "⏳",
        origin: "Surulere, Lagos",
        destination: "Port Harcourt",
        eta: "Arriving Feb 18",
        progress: 10,
        type: "Inter-State",
        date: "Feb 15, 2026"
    },
    {
        id: "FL-66901",
        status: "Delivered",
        statusEmoji: "✅",
        origin: "Victoria Island",
        destination: "Abuja CBD",
        eta: "Delivered Feb 14",
        progress: 100,
        type: "Secure Box",
        date: "Feb 12, 2026"
    }
];

const categories = [
    { name: "Active", emoji: "🚚", count: 2 },
    { name: "Completed", emoji: "✅", count: 1 },
    { name: "Drafts", emoji: "📝", count: 0 }
];

export default function ShipmentsPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("Active");

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-black font-sans pb-32">
            {/* Premium Sticky Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-2xl border-b border-neutral-100 dark:border-neutral-900 pt-3 pb-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <motion.button
                                onClick={() => router.back()}
                                whileTap={{ scale: 0.9 }}
                                className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-600 dark:text-neutral-400"
                            >
                                <ChevronLeft size={24} />
                            </motion.button>
                            <div>
                                <h1 className="text-2xl font-black tracking-tight dark:text-white">My Shipments</h1>
                                <p className="text-xs font-medium text-neutral-500">Track your deliveries</p>
                            </div>
                        </div>
                        <Link href="/create-load-request">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center shadow-xl shadow-primary-600/30"
                            >
                                <Plus size={28} strokeWidth={3} />
                            </motion.button>
                        </Link>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by tracking number..."
                            className="w-full h-14 bg-neutral-100 dark:bg-neutral-900 rounded-2xl pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all dark:text-white"
                        />
                    </div>
                </div>
            </nav>

            <div className="pt-48 px-4">
                {/* Category Tabs - Emoji First */}
                <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide pb-2">
                    {categories.map((cat) => (
                        <motion.button
                            key={cat.name}
                            onClick={() => setActiveCategory(cat.name)}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-black transition-all shrink-0 ${activeCategory === cat.name
                                    ? "bg-neutral-900 dark:bg-white text-white dark:text-black shadow-lg"
                                    : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800"
                                }`}
                        >
                            <span className="text-xl">{cat.emoji}</span>
                            <span>{cat.name}</span>
                            {cat.count > 0 && (
                                <span className={`px-2 py-0.5 rounded-full text-xs ${activeCategory === cat.name
                                        ? "bg-white/20 text-white dark:bg-black/20 dark:text-black"
                                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                                    }`}>
                                    {cat.count}
                                </span>
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Shipment Cards */}
                <div className="space-y-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            {shipments
                                .filter(s =>
                                    activeCategory === "Active" ? s.status !== "Delivered" :
                                        activeCategory === "Completed" ? s.status === "Delivered" :
                                            false
                                )
                                .map((shipment, index) => (
                                    <motion.div
                                        key={shipment.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative overflow-hidden rounded-[28px] shadow-lg"
                                    >
                                        {/* Gradient Background */}
                                        <div className={`absolute inset-0 ${shipment.status === "In Transit"
                                                ? "bg-gradient-to-br from-primary-400/20 via-primary-500/20 to-primary-600/20"
                                                : shipment.status === "Pending"
                                                    ? "bg-gradient-to-br from-amber-400/20 via-amber-500/20 to-amber-600/20"
                                                    : "bg-gradient-to-br from-green-400/20 via-green-500/20 to-green-600/20"
                                            }`} />

                                        {/* Glassmorphism Layer */}
                                        <div className="relative backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 p-5">
                                            {/* Header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/30 dark:bg-black/30 flex items-center justify-center text-2xl">
                                                        {shipment.statusEmoji}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black dark:text-white">{shipment.status}</p>
                                                        <p className="text-xs text-neutral-600 dark:text-neutral-400">{shipment.type}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs font-black text-neutral-700 dark:text-neutral-300">{shipment.id}</p>
                                                    <p className="text-[10px] text-neutral-500 dark:text-neutral-500">{shipment.date}</p>
                                                </div>
                                            </div>

                                            {/* Route */}
                                            <div className="bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-[20px] p-4 mb-4 border border-white/10">
                                                <div className="flex gap-3">
                                                    {/* Route Line */}
                                                    <div className="flex flex-col items-center pt-1">
                                                        <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center shadow-lg">
                                                            <div className="w-3 h-3 bg-white rounded-full" />
                                                        </div>
                                                        <div className="w-1 flex-1 bg-neutral-300 dark:bg-neutral-600 my-2" style={{ minHeight: '40px' }} />
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${shipment.progress === 100 ? 'bg-green-400' : 'bg-red-400'
                                                            }`}>
                                                            <MapPin size={16} className="text-white" />
                                                        </div>
                                                    </div>

                                                    {/* Locations */}
                                                    <div className="flex-1 space-y-6">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-xl">📍</span>
                                                                <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Pickup</span>
                                                            </div>
                                                            <p className="text-sm font-bold text-neutral-800 dark:text-white">{shipment.origin}</p>
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-xl">🎯</span>
                                                                <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Drop Off</span>
                                                            </div>
                                                            <p className="text-sm font-bold text-neutral-800 dark:text-white">{shipment.destination}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status Footer */}
                                            {shipment.progress < 100 ? (
                                                <div className="bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-[20px] p-4 flex items-center justify-between border border-white/10">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-primary-500/30 flex items-center justify-center text-2xl">
                                                            ⏰
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Arriving</p>
                                                            <p className="text-sm font-black text-neutral-800 dark:text-white">{shipment.eta}</p>
                                                        </div>
                                                    </div>
                                                    <Link href={`/tracking/${shipment.id}`}>
                                                        <motion.button
                                                            whileTap={{ scale: 0.9 }}
                                                            className="w-12 h-12 rounded-full bg-white dark:bg-neutral-800 text-primary-600 flex items-center justify-center shadow-lg"
                                                        >
                                                            <ArrowUpRight size={20} />
                                                        </motion.button>
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className="bg-green-500/20 backdrop-blur-md rounded-[20px] p-4 flex items-center gap-3 border border-green-500/30">
                                                    <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl">
                                                        ✅
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xs font-bold text-green-700 dark:text-green-400">Delivered</p>
                                                        <p className="text-sm font-black text-green-800 dark:text-green-300">{shipment.eta}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Empty State */}
                    {shipments.filter(s =>
                        activeCategory === "Active" ? s.status !== "Delivered" :
                            activeCategory === "Completed" ? s.status === "Delivered" :
                                false
                    ).length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-16"
                            >
                                <div className="text-6xl mb-4">📦</div>
                                <h3 className="text-xl font-black text-neutral-800 dark:text-white mb-2">No Shipments</h3>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">You don't have any {activeCategory.toLowerCase()} shipments</p>
                            </motion.div>
                        )}
                </div>
            </div>

            <BottomTabBar />
        </main>
    );
}
