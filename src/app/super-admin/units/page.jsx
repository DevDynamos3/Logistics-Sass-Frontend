"use client";

import React, { useState, useEffect } from "react";
import {
    Truck,
    Search,
    MapPin,
    Phone,
    Building2,
    MoreHorizontal,
    Loader2,
    Filter,
    FilterX,
    CheckCircle2,
    AlertTriangle,
    Activity,
    ArrowRight,
    ArrowUpRight,
    Zap,
    Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import Link from "next/link";

export default function UnitsManagement() {
    const [activeStatus, setActiveStatus] = useState("All");
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchAllUnits = async () => {
            try {
                // Mocking data with more operational details
                const mockUnits = [
                    { id: "u1", unitName: "Main Depot", organizationName: "Lagos Logistics", phoneNumber: "+234 812 345 6780", address: "Apapa Port, Lagos", status: "Active", utilization: 88, drivers: 42 },
                    { id: "u2", unitName: "North Distribution", organizationName: "Lagos Logistics", phoneNumber: "+234 812 345 6781", address: "Ikeja, Lagos", status: "Active", utilization: 92, drivers: 18 },
                    { id: "u3", unitName: "Central Hub", organizationName: "Abuja Freight", phoneNumber: "+234 900 765 4321", address: "Maitama, Abuja", status: "Maintenance", utilization: 0, drivers: 12 },
                    { id: "u4", unitName: "Port Terminal", organizationName: "Abuja Freight", phoneNumber: "+234 900 111 2222", address: "Wuse 2, Abuja", status: "Active", utilization: 75, drivers: 25 },
                    { id: "u5", unitName: "East Relay", organizationName: "PH Delivery", phoneNumber: "+234 703 999 0000", address: "GRA, Port Harcourt", status: "Offline", utilization: 0, drivers: 5 }
                ];
                setUnits(mockUnits);
            } finally {
                setLoading(false);
            }
        };
        fetchAllUnits();
    }, []);

    const filteredUnits = units.filter(unit => {
        const matchesSearch = unit.unitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            unit.organizationName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = activeStatus === "All" || unit.status === activeStatus;
        return matchesSearch && matchesStatus;
    });

    const summaryStats = [
        { label: "Total Deployments", value: units.length, icon: Truck, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/10" },
        { label: "Active Channels", value: units.filter(u => u.status === 'Active').length, icon: Zap, color: "text-primary-600", bg: "bg-primary-50 dark:bg-primary-900/10" },
        { label: "System Health", value: "94.2%", icon: Activity, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/10" },
    ];

    const SkeletonRow = () => (
        <tr className="animate-pulse border-b border-neutral-100 dark:border-neutral-800">
            <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-2xl"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-32 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                        <div className="h-3 w-24 bg-neutral-50 dark:bg-neutral-900 rounded"></div>
                    </div>
                </div>
            </td>
            <td className="px-8 py-6"><div className="h-4 w-40 bg-neutral-100 dark:bg-neutral-800 rounded"></div></td>
            <td className="px-8 py-6"><div className="h-4 w-24 bg-neutral-100 dark:bg-neutral-800 rounded"></div></td>
            <td className="px-8 py-6"><div className="h-10 w-24 bg-neutral-100 dark:bg-neutral-800 rounded-xl ml-auto"></div></td>
        </tr>
    );

    return (
        <div className="space-y-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white uppercase tracking-tighter">Unit Infrastructure</h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center gap-2">
                        <Shield size={12} className="text-primary-600" />
                        Global Distribution & Relay Network Control
                    </p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative group w-full md:w-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-600 transition-colors" size={18} />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Find a unit..."
                            className="w-full md:w-72 h-14 pl-12 pr-4 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl text-sm font-semibold outline-none focus:border-primary-600 transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {summaryStats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-100 dark:border-neutral-800 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                <stat.icon size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{stat.label}</p>
                                <p className="text-xl font-black dark:text-white uppercase tracking-tighter">{stat.value}</p>
                            </div>
                        </div>
                        <ArrowUpRight size={16} className="text-neutral-300" />
                    </motion.div>
                ))}
            </div>

            {/* Filter Tabs */}
            <div className="flex overflow-x-auto scrollbar-hide gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800/50 w-full md:w-fit rounded-[20px] border border-neutral-200 dark:border-neutral-800">
                {["All", "Active", "Maintenance", "Offline"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setActiveStatus(status)}
                        className={`px-6 py-2 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex-1 md:flex-none ${activeStatus === status
                            ? "bg-white dark:bg-neutral-800 text-primary-600 shadow-sm"
                            : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Units Table */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[40px] border border-neutral-100 dark:border-neutral-800 overflow-hidden shadow-sm min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/50">
                                <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Hub Identity</th>
                                <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Organization</th>
                                <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Contact / Location</th>
                                <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Performance</th>
                                <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50 dark:divide-neutral-800">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => <SkeletonRow key={i} />)
                            ) : filteredUnits.length > 0 ? (
                                <AnimatePresence mode="popLayout">
                                    {filteredUnits.map((unit, i) => (
                                        <motion.tr
                                            key={unit.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                                        >
                                            <td className="px-6 md:px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center shadow-inner group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                                                        <Truck size={20} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-sm dark:text-white uppercase tracking-tighter group-hover:text-primary-600 transition-colors">{unit.unitName}</span>
                                                        <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest w-fit mt-1 ${unit.status === 'Active' ? 'bg-green-100 text-green-600 dark:bg-green-900/20' :
                                                            unit.status === 'Maintenance' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20' :
                                                                'bg-neutral-100 text-neutral-600 dark:bg-neutral-800'
                                                            }`}>
                                                            {unit.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 md:px-8 py-6">
                                                <div className="flex items-center gap-2 text-neutral-500 font-bold text-[10px] uppercase tracking-wider">
                                                    <Building2 size={12} className="text-primary-600" />
                                                    {unit.organizationName}
                                                </div>
                                            </td>
                                            <td className="px-6 md:px-8 py-6">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 text-neutral-400 font-bold text-[10px] uppercase tracking-widest">
                                                        <Phone size={10} className="text-primary-600" />
                                                        {unit.phoneNumber}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-neutral-400 font-bold text-[10px] uppercase tracking-widest">
                                                        <MapPin size={10} className="text-primary-600" />
                                                        <span className="truncate max-w-[150px]">{unit.address}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 md:px-8 py-6">
                                                <div className="flex flex-col gap-1.5">
                                                    <div className="flex items-center justify-between gap-4">
                                                        <span className="text-[9px] font-black uppercase text-neutral-400">Load Utilization</span>
                                                        <span className="text-[10px] font-black dark:text-white">{unit.utilization}%</span>
                                                    </div>
                                                    <div className="w-32 h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${unit.utilization}%` }}
                                                            className={`h-full ${unit.utilization > 80 ? 'bg-green-500' : unit.utilization > 50 ? 'bg-primary-600' : 'bg-orange-500'}`}
                                                        />
                                                    </div>
                                                    <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest italic">{unit.drivers} Drivers Active</span>
                                                </div>
                                            </td>
                                            <td className="px-6 md:px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="h-10 px-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform shadow-lg shadow-neutral-900/10">
                                                        Analytics <ArrowRight size={14} strokeWidth={3} />
                                                    </button>
                                                    <button className="w-10 h-10 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-400">
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-32">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="w-20 h-20 rounded-[32px] bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-neutral-300 mb-6">
                                                <FilterX size={32} />
                                            </div>
                                            <h3 className="text-xl font-black dark:text-white uppercase tracking-tight">Infrastructure Out of View</h3>
                                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-2">Adjust your filters or search query to locate units</p>
                                            <button
                                                onClick={() => { setSearchQuery(""); setActiveStatus("All"); }}
                                                className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 hover:tracking-[0.3em] transition-all"
                                            >
                                                Reset Network Filters
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
