"use client";

import React, { useState, useEffect } from "react";
import {
    User,
    Search,
    Truck,
    MapPin,
    Phone,
    MoreHorizontal,
    Loader2,
    FilterX,
    ArrowRight,
    Plus,
    IdCard,
    Building2,
    ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function DriversManagementPage() {
    const [activeTab, setActiveTab] = useState("All");
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            // Mocking driver data for super admin view
            const mockDrivers = [
                {
                    id: "drv-001",
                    name: "Chinedu Okafor",
                    licenseNumber: "LAG-882-991",
                    phone: "+234 812 345 6789",
                    organization: "Lagos Logistics",
                    unit: "Apapa Hub",
                    status: "Active",
                    vehicle: "Heavy Duty Truck",
                    trips: 142
                },
                {
                    id: "drv-002",
                    name: "Babatunde Raji",
                    licenseNumber: "ABJ-110-223",
                    phone: "+234 901 222 3344",
                    organization: "Abuja Freight",
                    unit: "Central Hub",
                    status: "On Trip",
                    vehicle: "Mini Van",
                    trips: 89
                },
                {
                    id: "drv-003",
                    name: "Ibrahim Yusuf",
                    licenseNumber: "KAN-554-112",
                    phone: "+234 703 444 5566",
                    organization: "Kano Distribution",
                    unit: "North Relay",
                    status: "Idle",
                    vehicle: "Flatbed Trailer",
                    trips: 215
                },
                {
                    id: "drv-004",
                    name: "Sanni Peters",
                    licenseNumber: "FCT-990-001",
                    phone: "+234 802 888 9900",
                    organization: "Abuja Freight",
                    unit: "Wuse Terminal",
                    status: "Pending",
                    vehicle: "Delivery Bike",
                    trips: 0
                }
            ];

            // Artificial delay for loading feel
            setTimeout(() => {
                setDrivers(mockDrivers);
                setLoading(false);
            }, 800);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const filteredDrivers = drivers.filter(driver => {
        const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.organization.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === "All" || driver.status === activeTab;
        return matchesSearch && matchesTab;
    });

    const summaryStats = [
        { label: "Total Workforce", value: drivers.length, icon: User, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/10" },
        { label: "Active on Road", value: drivers.filter(d => d.status === "On Trip" || d.status === "Active").length, icon: Truck, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/10" },
        { label: "Pending Verification", value: drivers.filter(d => d.status === "Pending").length, icon: ShieldCheck, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/10" },
    ];

    return (
        <div className="space-y-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white uppercase tracking-tighter">Driver Fleet</h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px] mt-2">Manage personnel across all organizations & units</p>
                </div>
                <Link href="/super-admin/drivers/new">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="h-12 px-6 bg-primary-600 text-white rounded-[20px] font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-xl shadow-primary-600/20 hover:bg-primary-700 transition-colors"
                    >
                        <Plus size={18} strokeWidth={3} />
                        Register Driver
                    </motion.button>
                </Link>
            </div>

            {/* Summary Stats Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {summaryStats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-100 dark:border-neutral-800 flex items-center gap-4"
                    >
                        <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{stat.label}</p>
                            <p className="text-xl font-black dark:text-white">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex overflow-x-auto scrollbar-hide gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800/50 w-full md:w-fit rounded-[20px] border border-neutral-200 dark:border-neutral-800">
                    {["All", "Active", "On Trip", "Idle", "Pending"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex-1 md:flex-none ${activeTab === tab
                                ? "bg-white dark:bg-neutral-800 text-primary-600 shadow-sm"
                                : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group w-full md:w-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-600 transition-colors" size={18} />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Find a driver..."
                            className="w-full md:w-72 h-14 pl-12 pr-4 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl text-sm font-semibold outline-none focus:border-primary-600 transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="h-96 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-[24px] bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
                        <Loader2 className="animate-spin" size={32} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Loading driver roster...</p>
                </div>
            ) : (
                <div className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[40px] border border-neutral-100 dark:border-neutral-800 overflow-hidden shadow-sm min-h-[400px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/50">
                                    <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Driver Identity</th>
                                    <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Deployment Unit</th>
                                    <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Vehicle Profile</th>
                                    <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</th>
                                    <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-50 dark:divide-neutral-800">
                                <AnimatePresence mode="popLayout">
                                    {filteredDrivers.length > 0 ? (
                                        filteredDrivers.map((driver, i) => (
                                            <motion.tr
                                                key={driver.id}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                                            >
                                                <td className="px-6 md:px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-500 flex items-center justify-center font-black overflow-hidden border border-neutral-100 dark:border-neutral-800 shadow-inner group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                                                            <User size={20} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-sm dark:text-white uppercase tracking-tighter group-hover:text-primary-600 transition-colors">{driver.name}</span>
                                                            <div className="flex items-center gap-2 mt-0.5 text-neutral-400">
                                                                <IdCard size={10} />
                                                                <span className="text-[10px] font-bold uppercase tracking-widest">{driver.licenseNumber}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 md:px-8 py-6">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold text-xs uppercase tracking-tight">
                                                            <Building2 size={12} className="text-primary-600" />
                                                            {driver.organization}
                                                        </div>
                                                        <span className="text-[10px] font-bold text-neutral-400 ml-5 uppercase tracking-wide">{driver.unit}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 md:px-8 py-6">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold text-xs uppercase tracking-tight">
                                                            <Truck size={12} className="text-primary-600" />
                                                            {driver.vehicle}
                                                        </div>
                                                        <span className="text-[10px] font-bold text-neutral-400 ml-5 uppercase tracking-wide">{driver.trips} Trips Completed</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 md:px-8 py-6">
                                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${driver.status === 'Active' || driver.status === 'On Trip' ? 'bg-green-100 text-green-600 dark:bg-green-900/20' :
                                                        driver.status === 'Pending' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20' :
                                                            'bg-neutral-100 text-neutral-500 dark:bg-neutral-800'
                                                        }`}>
                                                        {driver.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 md:px-8 py-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="h-10 px-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-[1.05] active:scale-95 transition-all shadow-lg">
                                                            Details <ArrowRight size={14} strokeWidth={3} />
                                                        </button>
                                                        <button className="w-10 h-10 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-400 transition-colors">
                                                            <MoreHorizontal size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="py-32">
                                                <div className="flex flex-col items-center justify-center text-center">
                                                    <div className="w-20 h-20 rounded-[32px] bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-neutral-300 mb-6">
                                                        <FilterX size={32} />
                                                    </div>
                                                    <h3 className="text-xl font-black dark:text-white uppercase tracking-tight">No Drivers Found</h3>
                                                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-2">Adjust your search or register a new driver</p>
                                                    <button
                                                        onClick={() => { setSearchQuery(""); setActiveTab("All"); }}
                                                        className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 hover:tracking-[0.3em] transition-all"
                                                    >
                                                        Reset Filters
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
