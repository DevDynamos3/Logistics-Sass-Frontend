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
    Plus,
    Activity,
    ShieldCheck,
    Zap,
    AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from "recharts";

export default function SuperAdminDashboard() {
    const { user } = useAuth();
    const stats = [
        { label: "Total Organizations", value: "128", icon: Building2, color: "bg-primary-500", trend: "+12.5%", isUp: true },
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

    const growthData = [
        { month: "Jan", orgs: 45, units: 120 },
        { month: "Feb", orgs: 52, units: 150 },
        { month: "Mar", orgs: 61, units: 210 },
        { month: "Apr", orgs: 78, units: 280 },
        { month: "May", orgs: 95, units: 350 },
        { month: "Jun", orgs: 128, units: 482 },
    ];

    const regionalData = [
        { region: "Lagos", value: 45000, color: "#22c55e" },
        { region: "Abuja", value: 32000, color: "#4ade80" },
        { region: "PH", value: 28000, color: "#86efac" },
        { region: "Kano", value: 15000, color: "#bbf7d0" },
    ];

    const topUnits = [
        { name: "Lagos Hub-A1", shipments: 1250, growth: "+14%", status: "Optimal" },
        { name: "Abuja Central", shipments: 980, growth: "+8%", status: "High Load" },
        { name: "Port Harcourt", shipments: 840, growth: "+12%", status: "Optimal" },
    ];

    return (
        <div className="space-y-10">
            {/* Page Header */}
            <div>
                <div className="flex items-center gap-3 mb-4 overflow-x-auto no-scrollbar py-2">
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/10 rounded-full border border-green-100 dark:border-green-800/50">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase text-green-700 dark:text-green-400 whitespace-nowrap">System Live</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/10 rounded-full border border-primary-100 dark:border-primary-800/50">
                        <Zap size={12} className="text-primary-600" />
                        <span className="text-[10px] font-black uppercase text-primary-700 dark:text-primary-400 whitespace-nowrap">482 Active Drivers</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800/50 rounded-full">
                        <ShieldCheck size={12} className="text-neutral-500" />
                        <span className="text-[10px] font-black uppercase text-neutral-500 whitespace-nowrap">Verified Infrastructure</span>
                    </div>
                </div>
                <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white uppercase tracking-tighter">
                    Welcome back, {user?.name?.split(' ')[0] || 'Admin'}
                </h1>
                <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px] mt-2">Fleetra infrastructure & performance command center</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 md:p-8 bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[32px] border border-neutral-100 dark:border-neutral-800 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-xl shadow-${stat.color.split('-')[1]}-500/20`}>
                                <stat.icon size={22} />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.trend}
                            </div>
                        </div>
                        <h3 className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">{stat.label}</h3>
                        <p className="text-2xl md:text-3xl font-black mt-1 dark:text-white">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Growth Area Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 md:p-8 bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[40px] border border-neutral-100 dark:border-neutral-800 shadow-sm"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-xl font-black tracking-tight dark:text-white uppercase tracking-tight">Ecosystem Growth</h2>
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Monthly registration trends</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                                <span className="text-[10px] font-black uppercase text-neutral-400">Units</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                                <span className="text-[10px] font-black uppercase text-neutral-400">Orgs</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-64 sm:h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData}>
                                <defs>
                                    <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-neutral-800" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#171717',
                                        border: 'none',
                                        borderRadius: '16px',
                                        fontSize: '10px',
                                        fontWeight: 'bold',
                                        color: '#fff'
                                    }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="units"
                                    stroke="#22c55e"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorUnits)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="orgs"
                                    stroke="#9CA3AF"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    fill="transparent"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Regional Bar Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 md:p-8 bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[40px] border border-neutral-100 dark:border-neutral-800 shadow-sm"
                >
                    <div className="mb-8">
                        <h2 className="text-xl font-black tracking-tight dark:text-white uppercase tracking-tight">Revenue by Region</h2>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Daily distribution analytics</p>
                    </div>
                    <div className="h-64 sm:h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={regionalData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-neutral-800" />
                                <XAxis
                                    dataKey="region"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{
                                        backgroundColor: '#171717',
                                        border: 'none',
                                        borderRadius: '16px',
                                        fontSize: '10px',
                                        fontWeight: 'bold'
                                    }}
                                />
                                <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
                                    {regionalData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
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

                    <div className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[40px] border border-neutral-100 dark:border-neutral-800 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-neutral-100 dark:border-neutral-800">
                                        <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Organization</th>
                                        <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Location</th>
                                        <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</th>
                                        <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrgs.map((org, i) => (
                                        <tr key={org.name} className="group hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="px-6 md:px-8 py-6 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 min-w-[40px] rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-primary-600 font-black">
                                                        {org.name[0]}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-sm dark:text-white uppercase tracking-tight">{org.name}</span>
                                                        <span className="text-[10px] text-neutral-400 font-medium">{org.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 md:px-8 py-6 whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-neutral-500 font-medium text-xs">
                                                    <MapPin size={14} className="text-neutral-400" />
                                                    {org.location}
                                                </div>
                                            </td>
                                            <td className="px-6 md:px-8 py-6">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${org.status === 'Active' ? 'bg-green-100 text-green-600 dark:bg-green-900/20' :
                                                    org.status === 'Pending' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20' :
                                                        'bg-neutral-100 text-neutral-600 dark:bg-neutral-800'
                                                    }`}>
                                                    {org.status}
                                                </span>
                                            </td>
                                            <td className="px-6 md:px-8 py-6 text-right">
                                                <button className="w-10 h-10 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800 flex items-center justify-center transition-colors ml-auto">
                                                    <MoreHorizontal size={18} className="text-neutral-400" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Cards */}
                <div className="space-y-8">
                    {/* Performance Radar Widget */}
                    <div className="bg-white dark:bg-neutral-900 p-6 md:p-8 rounded-3xl md:rounded-[40px] text-neutral-900 dark:text-white border border-neutral-100 dark:border-neutral-800 shadow-sm overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-6 md:p-8 opacity-10">
                            <Activity size={80} />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Activity size={16} />
                            Peak Efficiency
                        </h3>
                        <div className="space-y-6">
                            {topUnits.map((unit, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-black">{unit.name}</p>
                                        <p className="text-[10px] opacity-60 font-bold">{unit.shipments} shipments</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-primary-500">{unit.growth}</p>
                                        <p className="text-[8px] opacity-40 uppercase font-black">{unit.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[40px] p-6 md:p-8 border border-neutral-100 dark:border-neutral-800 shadow-sm relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg font-black tracking-tight dark:text-white">Activity Flow</h2>
                            <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                                <AlertCircle size={14} className="text-neutral-400" />
                            </div>
                        </div>
                        <div className="space-y-8">
                            {[
                                { user: "Admin", action: "approved Organization", target: "Swift Freight", time: "10m ago", icon: UserCheck, color: "text-primary-500" },
                                { user: "System", action: "new Unit added to", target: "Global Log", time: "25m ago", icon: Truck, color: "text-primary-600" },
                                { user: "Admin", action: "registered new Org", target: "SkyNet Ltd", time: "1h ago", icon: Plus, color: "text-green-500" },
                            ].map((act, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className={`mt-1 h-2 w-2 rounded-full bg-current ${act.color} ring-4 ring-neutral-50 dark:ring-neutral-800 ring-offset-4 ring-offset-white dark:ring-offset-neutral-900 group-hover:scale-150 transition-transform`}></div>
                                    <div className="flex flex-col">
                                        <p className="text-xs font-bold dark:text-neutral-300">
                                            <span className="text-neutral-900 dark:text-white font-black">{act.user}</span> {act.action} <span className="text-primary-600">{act.target}</span>
                                        </p>
                                        <span className="text-[10px] font-bold text-neutral-400 flex items-center gap-1 mt-1 font-mono">
                                            <Calendar size={10} />
                                            {act.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Registration Card */}
                    <div className="p-6 md:p-8 bg-primary-600 rounded-3xl md:rounded-[40px] text-white shadow-2xl shadow-primary-600/30 relative overflow-hidden group">
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-black mb-2">New Partner?</h3>
                            <p className="text-white/70 text-xs font-medium leading-relaxed mb-6">Instantly register a new organization and start onboarding units to the ecosystem.</p>
                            <button className="w-full py-4 bg-white text-primary-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-neutral-50 active:scale-95 transition-all shadow-xl">
                                Launch Registration
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
