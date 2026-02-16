"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Truck,
    MapPin,
    Battery,
    Signal,
    ChevronRight,
    Search,
    Filter,
    Activity,
    UserCheck
} from "lucide-react";
import BottomTabBar from "@/components/BottomTabBar";
import { useRouter } from "next/navigation";

const vehicles = [
    {
        id: "VH-40291",
        model: "Mercedes Benz Sprinter",
        type: "Refrigerated Lorry",
        driver: "Tunde Ednut",
        status: "Active",
        battery: "82%",
        location: "Ikorodu Rd, Lagos",
        load: "Partial (450kg)"
    },
    {
        id: "VH-38102",
        model: "Toyota Dyna",
        type: "Flatbed Truck",
        driver: "Musa Chen",
        status: "Busy",
        battery: "45%",
        location: "Apapa Wharf",
        load: "Full (2,500kg)"
    },
    {
        id: "VH-22901",
        model: "Volkswagen LT",
        type: "Cargo Van",
        driver: "Chidi Okafor",
        status: "Maintenance",
        battery: "0%",
        location: "Mainland Workshop",
        load: "Empty"
    }
];

export default function FleetPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-black font-sans pb-32">
            {/* Header */}
            <div className="p-3 mb-8 border-b border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                    <motion.button
                        onClick={() => router.back()}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 shadow-sm"
                    >
                        <ChevronRight size={20} className="rotate-180" />
                    </motion.button>
                    <h1 className="text-3xl font-black tracking-tight">Fleet Management</h1>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">12 Online</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-primary-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">4 En route</span>
                    </div>
                </div>
            </div>

            {/* Quick Search */}
            <div className="px-5 mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search vehicle or driver..."
                        className="w-full h-14 bg-white dark:bg-neutral-900 rounded-[22px] pl-12 pr-4 text-sm font-medium border border-neutral-100 dark:border-neutral-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
                </div>
            </div>

            {/* Fleet List */}
            <div className="px-5 space-y-6">
                {vehicles.map((vehicle, idx) => (
                    <motion.div
                        key={idx}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white dark:bg-neutral-900 rounded-[32px] p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm relative overflow-hidden group"
                    >
                        {/* Battery Indicator */}
                        <div className="absolute top-6 right-6 flex items-center gap-2">
                            <span className={`text-[10px] font-black ${parseInt(vehicle.battery) < 50 ? 'text-amber-500' : 'text-neutral-400'}`}>{vehicle.battery}</span>
                            <Battery size={14} className={parseInt(vehicle.battery) < 50 ? 'text-amber-500' : 'text-neutral-400'} />
                        </div>

                        <div className="flex items-center gap-5 mb-6">
                            <div className="w-16 h-16 rounded-[24px] bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600">
                                <Truck size={32} />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-neutral-400 mb-1">{vehicle.id}</h3>
                                <h2 className="text-xl font-black tracking-tight leading-tight">{vehicle.model}</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <UserCheck size={12} className="text-neutral-400" />
                                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Driver</span>
                                </div>
                                <p className="text-sm font-black tracking-tight">{vehicle.driver}</p>
                            </div>
                            <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <Activity size={12} className="text-neutral-400" />
                                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Load Status</span>
                                </div>
                                <p className="text-sm font-black tracking-tight">{vehicle.load}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-5 border-t border-neutral-100 dark:border-neutral-800">
                            <div className="flex items-center gap-2">
                                <MapPin size={14} className="text-primary-600" />
                                <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">{vehicle.location}</span>
                            </div>
                            <div className="flex items-center gap-1 text-primary-600">
                                <span className="text-[10px] font-black uppercase tracking-widest">Live Diagnostics</span>
                                <ChevronRight size={14} />
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Action Button */}
                <button className="w-full py-5 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-[28px] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-xl">
                    <Signal size={16} />
                    Register New Vehicle
                </button>
            </div>

            <BottomTabBar />
        </main>
    );
}
