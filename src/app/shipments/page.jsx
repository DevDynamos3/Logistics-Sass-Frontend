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
    MapPin
} from "lucide-react";
import { useRouter } from "next/navigation";
import BottomTabBar from "@/components/BottomTabBar";
import Link from "next/link";

const shipments = [
    {
        id: "FL-82910",
        status: "In Transit",
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
        origin: "Victoria Island",
        destination: "Abuja CBD",
        eta: "Delivered Feb 14",
        progress: 100,
        type: "Secure Box",
        date: "Feb 12, 2026"
    }
];

const categories = ["Active", "Completed", "Drafts"];

export default function ShipmentsPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("Active");

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-black font-sans pb-32">
            {/* Premium Sticky Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur-2xl border-b border-neutral-100 dark:border-neutral-900 pt-3 pb-4">
                <div className="max-w-7xl mx-auto px-3">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <motion.button
                                onClick={() => router.back()}
                                whileTap={{ scale: 0.9 }}
                                className="w-10 h-10 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-600 dark:text-neutral-400"
                            >
                                <ChevronRight size={20} className="rotate-180" />
                            </motion.button>
                            <h1 className="text-2xl font-black tracking-tight">My Shipments</h1>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-600/20"
                        >
                            <Plus size={24} />
                        </motion.button>
                    </div>

                    {/* Search & Filter */}
                    <div className="flex gap-3 mb-2">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search waybill..."
                                className="w-full h-12 bg-neutral-100 dark:bg-neutral-900 rounded-xl pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                            />
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-600 dark:text-neutral-400"
                        >
                            <Filter size={18} />
                        </motion.button>
                    </div>
                </div>
            </nav>

            <div className="pt-44 px-2">
                {/* Category Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat
                                ? "bg-neutral-900 dark:bg-white text-white dark:text-black"
                                : "bg-white dark:bg-neutral-900 text-neutral-400 border border-neutral-100 dark:border-neutral-800"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Shipment Cards */}
                <div className="space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            {shipments
                                .filter(s => activeCategory === "Active" ? s.status !== "Delivered" : activeCategory === "Completed" ? s.status === "Delivered" : false)
                                .map((shipment) => (
                                    <motion.div
                                        key={shipment.id}
                                        whileTap={{ scale: 0.98 }}
                                        className="bg-white dark:bg-neutral-900 rounded-[32px] p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm relative overflow-hidden group"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${shipment.status === "In Transit" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600" :
                                                    shipment.status === "Pending" ? "bg-amber-50 dark:bg-amber-900/30 text-amber-600" :
                                                        "bg-green-50 dark:bg-green-900/30 text-green-600"
                                                    }`}>
                                                    {shipment.status}
                                                </div>
                                                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{shipment.type}</span>
                                            </div>
                                            <span className="text-[11px] font-black">{shipment.id}</span>
                                        </div>

                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="relative">
                                                <div className="w-1.5 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex flex-col items-center justify-between py-1">
                                                    <div className="w-3 h-3 rounded-full bg-primary-600 border-2 border-white dark:border-neutral-900 z-10" />
                                                    <div className={`w-3 h-3 rounded-full ${shipment.progress === 100 ? 'bg-primary-600' : 'bg-neutral-300 dark:bg-neutral-700'} border-2 border-white dark:border-neutral-900 z-10`} />
                                                </div>
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">Origin</p>
                                                        <p className="text-sm font-black">{shipment.origin}</p>
                                                    </div>
                                                    <Link href={`/tracking/${shipment.id}`}>
                                                        <div className="w-8 h-8 rounded-full bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                                            <ArrowUpRight size={14} />
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">Destination</p>
                                                    <p className="text-sm font-black">{shipment.destination}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {shipment.progress < 100 && (
                                            <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-xl bg-primary-600/10 text-primary-600 flex items-center justify-center">
                                                        <Clock size={16} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">Estimated Arrival</p>
                                                        <p className="text-xs font-black">{shipment.eta}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-primary-600">{shipment.progress}%</p>
                                                    <div className="w-16 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full mt-1 overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${shipment.progress}%` }}
                                                            className="h-full bg-primary-600"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {shipment.progress === 100 && (
                                            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-green-500 text-white flex items-center justify-center">
                                                    <CheckCircle2 size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-[8px] font-bold text-green-600 dark:text-green-400 uppercase tracking-widest">Delivered Successfully</p>
                                                    <p className="text-xs font-black text-green-700 dark:text-green-300">Signed by receiver at gate</p>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <BottomTabBar />
        </main>
    );
}
