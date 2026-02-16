"use client";

import React from "react";
import {
    Building2,
    Truck,
    UserCheck,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    MapPin,
    Calendar,
    ChevronRight,
    MoreHorizontal,
    Plus
} from "lucide-react";
import { motion } from "framer-motion";

export default function SuperAdminDashboard() {
    const stats = [
        { label: "Total Organizations", value: "128", icon: Building2, color: "bg-blue-500", trend: "+12.5%", isUp: true },
        { label: "Active Units", value: "482", icon: Truck, color: "bg-primary-600", trend: "+8.2%", isUp: true },
        { label: "Pending Approvals", value: "14", icon: UserCheck, color: "bg-orange-500", trend: "-3.1%", isUp: false },
        { label: "Revenue Growth", value: "$42.5k", icon: TrendingUp, color: "bg-green-500", trend: "+14.2%", isUp: true },
    ];

    const recentOrgs = [
        { name: "Global Logistics Ltd", email: "contact@globallog.com", location: "Lagos, Nigeria", status: "Active", date: "2 hours ago" },
        { name: "Swift Freight Co.", email: "ops@swiftfreight.net", location: "Accra, Ghana", status: "Pending", date: "5 hours ago" },
        { name: "Continental Movers", email: "info@contmovers.com", location: "Nairobi, Kenya", status: "Active", date: "1 day ago" },
        { name: "EcoShip Solutions", email: "hello@ecoship.io", location: "Cape Town, SA", status: "Inactive", date: "2 days ago" },
    ];

    return (
        <div className="space-y-10">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px] mt-2">Real-time performance metrics</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-100 dark:border-neutral-800 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-xl shadow-${stat.color.split('-')[1]}-500/20`}>
                                <stat.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.trend}
                            </div>
                        </div>
                        <h3 className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">{stat.label}</h3>
                        <p className="text-3xl font-black mt-1 dark:text-white">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Lower Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Organizations Table */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-8 bg-primary-600 rounded-full"></div>
                            <h2 className="text-xl font-black tracking-tight dark:text-white">Recent Organizations</h2>
                        </div>
                        <button className="text-[10px] font-black uppercase tracking-widest text-primary-600 hover:underline flex items-center gap-1">
                            View All <ChevronRight size={14} strokeWidth={3} />
                        </button>
                    </div>

                    <div className="bg-white dark:bg-neutral-900 rounded-[40px] border border-neutral-100 dark:border-neutral-800 overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Organization</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Location</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrgs.map((org, i) => (
                                    <tr key={org.name} className="group hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-primary-600 font-black">
                                                    {org.name[0]}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm dark:text-white">{org.name}</span>
                                                    <span className="text-[10px] text-neutral-400 font-medium">{org.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-neutral-500 font-medium text-xs">
                                                <MapPin size={14} className="text-neutral-400" />
                                                {org.location}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${org.status === 'Active' ? 'bg-green-100 text-green-600 dark:bg-green-900/20' :
                                                    org.status === 'Pending' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20' :
                                                        'bg-neutral-100 text-neutral-600 dark:bg-neutral-800'
                                                }`}>
                                                {org.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="w-10 h-10 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800 flex items-center justify-center transition-colors">
                                                <MoreHorizontal size={18} className="text-neutral-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar Cards */}
                <div className="space-y-8">
                    {/* Activity Feed */}
                    <div className="bg-white dark:bg-neutral-900 rounded-[40px] p-8 border border-neutral-100 dark:border-neutral-800 shadow-sm">
                        <h2 className="text-lg font-black tracking-tight mb-8 dark:text-white">Activity Timeline</h2>
                        <div className="space-y-8">
                            {[
                                { user: "Admin", action: "approved Organization", target: "Swift Freight", time: "10m ago", icon: UserCheck, color: "text-blue-500" },
                                { user: "System", action: "new Unit added to", target: "Global Log", time: "25m ago", icon: Truck, color: "text-primary-600" },
                                { user: "Admin", action: "registered new Org", target: "SkyNet Ltd", time: "1h ago", icon: Plus, color: "text-green-500" },
                            ].map((act, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className={`mt-1 h-2 w-2 rounded-full bg-current ${act.color} ring-4 ring-neutral-50 dark:ring-neutral-800 ring-offset-4 ring-offset-white dark:ring-offset-neutral-900`}></div>
                                    <div className="flex flex-col">
                                        <p className="text-xs font-bold dark:text-neutral-300">
                                            <span className="text-neutral-900 dark:text-white font-black">{act.user}</span> {act.action} <span className="text-primary-600">{act.target}</span>
                                        </p>
                                        <span className="text-[10px] font-bold text-neutral-400 flex items-center gap-1 mt-1">
                                            <Calendar size={10} />
                                            {act.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Registration Card */}
                    <div className="p-8 bg-primary-600 rounded-[40px] text-white shadow-2xl shadow-primary-600/30 relative overflow-hidden group">
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                        <h3 className="text-xl font-black mb-2">New Partner?</h3>
                        <p className="text-white/70 text-xs font-medium leading-relaxed mb-6">Instantly register a new organization and start onboarding units to the ecosystem.</p>
                        <button className="w-full py-4 bg-white text-primary-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-neutral-100 transition-colors">
                            Launch Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
