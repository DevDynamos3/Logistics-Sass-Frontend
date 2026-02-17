"use client";

import React, { useState, useEffect } from "react";
import {
    Users,
    Search,
    Filter,
    Package,
    Truck,
    Calendar,
    ArrowRight,
    MoreHorizontal,
    Mail,
    Loader2,
    CalendarDays,
    FilterX,
    CheckCircle2,
    Clock,
    TrendingUp,
    Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import Link from "next/link";

export default function UsersManagementPage() {
    const [activeTab, setActiveTab] = useState("All");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            // Mocking the joined user, shipment and driver data
            const mockUsers = [
                {
                    id: "usr-101",
                    name: "Samuel Oak",
                    email: "oak.sam@gmail.com",
                    phone: "+234 812 345 6789",
                    totalShipments: 12,
                    lastShipmentMonth: "Feb 2026",
                    assignedDriver: {
                        name: "Chinedu Okafor",
                        details: "Heavy Duty Truck - LAG 452-XP",
                        status: "On Trip"
                    }
                },
                {
                    id: "usr-102",
                    name: "Sarah Jenkins",
                    email: "jenkins.s@outlook.com",
                    phone: "+234 901 222 3344",
                    totalShipments: 4,
                    lastShipmentMonth: "Jan 2026",
                    assignedDriver: {
                        name: "Babatunde Raji",
                        details: "Mini Van - ABJ 881-ZZ",
                        status: "Idle"
                    }
                },
                {
                    id: "usr-103",
                    name: "Ahmed Musa",
                    email: "musa.ahmed@yahoo.com",
                    phone: "+234 703 444 5566",
                    totalShipments: 28,
                    lastShipmentMonth: "Feb 2026",
                    assignedDriver: {
                        name: "Ibrahim Yusuf",
                        details: "Flatbed Trailer - KAN 110-XY",
                        status: "On Trip"
                    }
                },
                {
                    id: "usr-104",
                    name: "Grace Adeyemi",
                    email: "grace.ade@gmail.com",
                    phone: "+234 802 888 9900",
                    totalShipments: 1,
                    lastShipmentMonth: "Dec 2025",
                    status: "New",
                    assignedDriver: {
                        name: "Sanni Peters",
                        details: "Delivery Bike - FCT 222-BB",
                        status: "Pending"
                    }
                }
            ].map(u => ({ ...u, status: u.status || (u.totalShipments > 10 ? "Power User" : "Active") }));

            // Artificial delay for loading feel
            setTimeout(() => {
                setUsers(mockUsers);
                setLoading(false);
            }, 800);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === "All" || user.status === activeTab || (activeTab === "High Activity" && user.totalShipments > 20);
        return matchesSearch && matchesTab;
    });

    const summaryStats = [
        { label: "Total Customers", value: users.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/10" },
        { label: "Total Transacted", value: users.reduce((acc, u) => acc + u.totalShipments, 0), icon: Package, color: "text-primary-600", bg: "bg-primary-50 dark:bg-primary-900/10" },
        { label: "Active Drivers", value: users.filter(u => u.assignedDriver.status === "On Trip").length, icon: Truck, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/10" },
    ];

    return (
        <div className="space-y-10">
            {/* Header Area */}
            <div>
                <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">Customer Directory</h1>
                <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px] mt-2">Oversee all registered shippers & activity</p>
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
                    {["All", "Active", "High Activity", "New"].map((tab) => (
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
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-600 transition-colors" size={18} />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Find a customer..."
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
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Compiling user records...</p>
                </div>
            ) : (
                <div className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[40px] border border-neutral-100 dark:border-neutral-800 overflow-hidden shadow-sm min-h-[400px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/50">
                                    <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Customer Profile</th>
                                    <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Activity Level</th>
                                    <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Deployment Status</th>
                                    <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Vehicle Logistics</th>
                                    <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-50 dark:divide-neutral-800">
                                <AnimatePresence mode="popLayout">
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((u, i) => (
                                            <motion.tr
                                                key={u.id}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                                            >
                                                <td className="px-6 md:px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-primary-600 flex items-center justify-center font-black overflow-hidden border border-neutral-100 dark:border-neutral-800 shadow-inner group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`} alt={u.name} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-sm dark:text-white uppercase tracking-tighter group-hover:text-primary-600 transition-colors">{u.name}</span>
                                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                                <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${u.status === 'Power User' ? 'bg-orange-100 text-orange-600' : 'bg-neutral-100 text-neutral-500'}`}>
                                                                    {u.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 md:px-8 py-6">
                                                    <div className="flex flex-col gap-1.5">
                                                        <div className="flex items-center gap-2">
                                                            <Package size={14} className="text-primary-600" />
                                                            <span className="text-xs font-black dark:text-white uppercase tracking-tight">{u.totalShipments} Loads</span>
                                                        </div>
                                                        <div className="w-24 h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${Math.min(u.totalShipments * 4, 100)}%` }}
                                                                className="h-full bg-primary-600"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 md:px-8 py-6">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`w-2 h-2 rounded-full ${u.assignedDriver.status === 'On Trip' ? 'bg-green-500 animate-pulse' : 'bg-neutral-300'}`}></span>
                                                            <span className="text-xs font-black dark:text-white uppercase tracking-tighter">{u.assignedDriver.name}</span>
                                                        </div>
                                                        <span className="text-[10px] font-bold text-neutral-400 ml-4 uppercase tracking-[0.05em]">{u.assignedDriver.status}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 md:px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-xl text-primary-600 shadow-sm">
                                                            <Truck size={14} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] font-black dark:text-white uppercase tracking-widest">{u.assignedDriver.details.split('-')[0]}</span>
                                                            <span className="text-[10px] font-bold text-neutral-400 font-mono italic">{u.assignedDriver.details.split('-')[1]}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 md:px-8 py-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="h-10 px-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-[1.05] active:scale-95 transition-all shadow-lg">
                                                            Profile <ArrowRight size={14} strokeWidth={3} />
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
                                                    <h3 className="text-xl font-black dark:text-white uppercase tracking-tight">No Customers Found</h3>
                                                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-2">Adjust your filters to see more shippers</p>
                                                    <button
                                                        onClick={() => { setSearchQuery(""); setActiveTab("All"); }}
                                                        className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 hover:tracking-[0.3em] transition-all"
                                                    >
                                                        Clear All Filters
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

