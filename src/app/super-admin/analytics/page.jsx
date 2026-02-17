"use client";

import React, { useState } from "react";
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Calendar,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Download,
    RefreshCcw,
    Zap,
    Users,
    Truck,
    Building2,
    DollarSign,
    Target,
    Activity,
    Layers,
    Map,
    Plus
} from "lucide-react";
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
    Cell,
    PieChart,
    Pie,
    Legend
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const revenueData = [
    { name: "Jan", revenue: 45000, shipments: 2400 },
    { name: "Feb", revenue: 52000, shipments: 2800 },
    { name: "Mar", revenue: 48000, shipments: 2600 },
    { name: "Apr", revenue: 61000, shipments: 3200 },
    { name: "May", revenue: 55000, shipments: 2900 },
    { name: "Jun", revenue: 67000, shipments: 3400 },
    { name: "Jul", revenue: 72000, shipments: 3800 },
];

const vehicleData = [
    { name: "Heavy Duty", value: 45, color: "#16a34a" },
    { name: "Light Trucks", value: 25, color: "#22c55e" },
    { name: "Mini Vans", value: 20, color: "#4ade80" },
    { name: "Bikes", value: 10, color: "#86efac" },
];

const regionalPerformance = [
    { name: "Lagos", growth: 85, volume: 12400 },
    { name: "Abuja", growth: 62, volume: 8200 },
    { name: "Kano", growth: 45, volume: 5100 },
    { name: "PH", growth: 78, volume: 9800 },
    { name: "Ibadan", growth: 38, volume: 3200 },
];

export default function AnalyticsPage() {
    const [timeframe, setTimeframe] = useState("Last 7 Days");

    const kpis = [
        { label: "Total Revenue", value: "₦124.5M", change: "+12.5%", prevValue: "₦110.8M", trendingUp: true, icon: DollarSign, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/10" },
        { label: "Active Nodes", value: "1,242", change: "+4.2%", prevValue: "1,192", trendingUp: true, icon: Zap, color: "text-primary-600", bg: "bg-primary-50 dark:bg-primary-900/10" },
        { label: "Network Churn", value: "2.1%", change: "-0.8%", prevValue: "2.9%", trendingUp: false, icon: Activity, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/10" },
        { label: "Efficiency Rating", value: "94.8%", change: "+1.5%", prevValue: "93.3%", trendingUp: true, icon: Target, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/10" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-10 pb-20"
        >
            {/* System Status Banner */}
            <motion.div variants={itemVariants} className="bg-primary-600/5 dark:bg-primary-600/10 border border-primary-100 dark:border-primary-900/30 rounded-3xl p-4 flex items-center justify-between overflow-hidden relative group">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse transition-all group-hover:scale-150"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-900 dark:text-primary-400">Network Active</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">Global Throughput</span>
                            <span className="text-xs font-black dark:text-white mt-0.5">2.4 TB/s</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">Node Latency</span>
                            <span className="text-xs font-black dark:text-white mt-0.5">14ms average</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-32 h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "85%" }}
                            className="h-full bg-primary-600"
                        />
                    </div>
                    <span className="text-[10px] font-black dark:text-white uppercase tracking-widest">85% Load</span>
                </div>
                {/* Decoration */}
                <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-primary-600/20 to-transparent blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </motion.div>

            {/* Header Control Panel */}
            <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white uppercase tracking-tighter">Network Intelligence</h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center gap-2">
                        <BarChart3 size={14} className="text-primary-600" />
                        Real-time Operational Analytics & Forecasting
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                    <div className="flex overflow-x-auto scrollbar-hide w-full sm:w-auto gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800/50 rounded-[20px] border border-neutral-200 dark:border-neutral-800">
                        {["24h", "7d", "30d", "1y"].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTimeframe(t)}
                                className={`flex-1 sm:flex-none px-6 py-2 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${timeframe === t ? "bg-white dark:bg-neutral-800 text-primary-600 shadow-sm" : "text-neutral-400 hover:text-neutral-600"}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 sm:flex-none h-12 px-4 md:px-6 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl flex items-center justify-center gap-2 md:gap-3 text-[10px] font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-400 shadow-sm"
                        >
                            <Download size={16} />
                            <span className="hidden sm:inline">Export</span>
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-600/20"
                        >
                            <RefreshCcw size={20} />
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* KPI Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, i) => (
                    <motion.div
                        key={kpi.label}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="p-6 md:p-8 bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[40px] border border-neutral-100 dark:border-neutral-800 shadow-sm group hover:border-primary-500/30 transition-all duration-500 overflow-hidden relative"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <div className={`w-14 h-14 rounded-2xl ${kpi.bg} ${kpi.color} flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform duration-500`}>
                                    <kpi.icon size={24} />
                                </div>
                                <div className={`flex flex-col items-end gap-1`}>
                                    <div className={`flex items-center gap-1 font-black text-[10px] tracking-widest ${kpi.trendingUp ? 'text-green-500' : 'text-red-500'}`}>
                                        {kpi.trendingUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                        {kpi.change}
                                    </div>
                                    <span className="text-[8px] font-bold text-neutral-400 uppercase">vs prev</span>
                                </div>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">{kpi.label}</p>
                            <h3 className="text-3xl font-black dark:text-white uppercase tracking-tighter">{kpi.value}</h3>
                            <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Previous: {kpi.prevValue}</span>
                            </div>
                        </div>
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/5 dark:bg-primary-600/10 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.05] group-hover:rotate-45 transition-transform duration-700">
                            <kpi.icon size={120} />
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Main Analytical Section */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Revenue & Volume Chart */}
                <div className="xl:col-span-2 bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[48px] p-6 md:p-10 border border-neutral-100 dark:border-neutral-800 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-10 relative z-10">
                        <div>
                            <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">Performance Flow</h3>
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Revenue vs. Deployment Volume</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Revenue</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Volume</span>
                                </div>
                            </div>
                            <button className="w-10 h-10 rounded-xl bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-primary-600 hover:rotate-45 transition-all">
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="h-[400px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorShipments" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" className="dark:stroke-neutral-800" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                                />
                                <Tooltip
                                    cursor={{ stroke: '#16a34a', strokeWidth: 2, strokeDasharray: '4 4' }}
                                    contentStyle={{
                                        backgroundColor: 'rgba(17, 17, 17, 0.9)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '24px',
                                        padding: '16px',
                                        color: '#fff',
                                        fontSize: '10px',
                                        fontWeight: '900',
                                        textTransform: 'uppercase',
                                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#16a34a"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                    animationDuration={2000}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="shipments"
                                    stroke="#60a5fa"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorShipments)"
                                    animationDuration={2500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Gradient Fuzz */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-600/10 transition-colors duration-1000"></div>
                </div>

                {/* Vehicle Distribution */}
                <div className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[48px] p-6 md:p-10 border border-neutral-100 dark:border-neutral-800 shadow-sm relative group overflow-hidden">
                    <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-2 relative z-10">Fleet Composition</h3>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-10 relative z-10">Load distribution by vehicle type</p>

                    <div className="h-[300px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={vehicleData}
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={8}
                                    dataKey="value"
                                    animationDuration={1500}
                                >
                                    {vehicleData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            stroke="none"
                                            className="hover:opacity-80 transition-opacity"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#111',
                                        border: 'none',
                                        borderRadius: '16px',
                                        color: '#fff',
                                        fontSize: '10px',
                                        fontWeight: '900',
                                        textTransform: 'uppercase'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <Truck className="mx-auto text-neutral-200 dark:text-neutral-800 mb-1" size={32} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Total Fleet</span>
                            <div className="text-2xl font-black dark:text-white uppercase leading-none mt-1">100%</div>
                        </div>
                    </div>

                    <div className="space-y-4 mt-8 relative z-10">
                        {vehicleData.map((v) => (
                            <motion.div
                                key={v.name}
                                whileHover={{ x: 5 }}
                                className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-default"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: v.color }}></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{v.name}</span>
                                </div>
                                <span className="text-[10px] font-black dark:text-white">{v.value}%</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary-600/5 blur-3xl rounded-full"></div>
                </div>
            </motion.div>

            {/* Region & Insights */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[48px] p-6 md:p-10 border border-neutral-100 dark:border-neutral-800 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-10 relative z-10">
                        <div>
                            <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">Regional Velocity</h3>
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Growth rate per geographical hub</p>
                        </div>
                        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-2xl text-primary-600 group-hover:rotate-12 transition-transform duration-500">
                            <Map size={24} />
                        </div>
                    </div>

                    <div className="h-[300px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={regionalPerformance}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" className="dark:stroke-neutral-800" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                                />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                                    contentStyle={{
                                        backgroundColor: '#111',
                                        border: 'none',
                                        borderRadius: '16px',
                                        color: '#fff',
                                        padding: '12px'
                                    }}
                                />
                                <Bar dataKey="growth" radius={[10, 10, 10, 10]} barSize={32}>
                                    {regionalPerformance.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index === 0 ? '#16a34a' : 'rgba(22, 163, 74, 0.1)'}
                                            className="hover:fill-primary-600 transition-all duration-300"
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
                        {regionalPerformance.slice(0, 4).map((hub, i) => (
                            <motion.div
                                key={hub.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + (i * 0.1) }}
                                className="p-4 md:p-5 bg-neutral-50 dark:bg-neutral-800/30 rounded-3xl border border-neutral-100 dark:border-neutral-800 group/hub hover:border-primary-500/20 transition-all"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-400">{hub.name}</p>
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-pulse"></div>
                                </div>
                                <div className="flex items-end justify-between">
                                    <span className="text-2xl font-black dark:text-white tracking-tighter group-hover/hub:text-primary-600 transition-colors">{hub.growth}%</span>
                                    <div className="flex flex-col items-end">
                                        <ArrowUpRight size={14} className="text-green-500" />
                                        <span className="text-[8px] font-bold text-neutral-400 mt-1 uppercase">Growth</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Gradient fuzz */}
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-600/10 blur-[80px] rounded-full pointer-events-none"></div>
                </div>

                <div className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[48px] p-6 md:p-10 border border-neutral-100 dark:border-neutral-800 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                    <div>
                        <div className="flex items-center justify-between mb-10 relative z-10">
                            <div>
                                <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">Live Insight Console</h3>
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Autonomous network observations</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-primary-600/10 text-primary-600 flex items-center justify-center animate-bounce">
                                <Layers size={20} />
                            </div>
                        </div>

                        <div className="space-y-4 relative z-10">
                            {[
                                { title: "Spike Detected", desc: "Lagos Hub seeing 42% volume increase in last 2h.", type: "warning", icon: Zap, time: "2m ago" },
                                { title: "Efficiency Peak", desc: "Abuja unit reached 98.2% utilization record.", type: "success", icon: Target, time: "14m ago" },
                                { title: "Maintenance Alert", desc: "Central Relay offline for scheduled inspection.", type: "info", icon: RefreshCcw, time: "1h ago" }
                            ].map((alert, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 5 }}
                                    className="flex items-start gap-4 p-4 rounded-[24px] hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all border border-transparent hover:border-neutral-100 dark:hover:border-neutral-800 cursor-pointer group/alert"
                                >
                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex-shrink-0 flex items-center justify-center transition-all ${alert.type === 'warning' ? 'bg-orange-100 text-orange-600' : alert.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                        <alert.icon size={18} className="group-hover/alert:scale-110 transition-transform md:w-5 md:h-5" />
                                    </div>
                                    <div className="flex-1 pt-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1 sm:gap-0">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest dark:text-white truncate">{alert.title}</h4>
                                            <span className="text-[8px] font-bold text-neutral-400 uppercase whitespace-nowrap">{alert.time}</span>
                                        </div>
                                        <p className="text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-tight leading-relaxed line-clamp-2 md:line-clamp-none">{alert.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 mt-10">
                        <button className="w-full py-5 rounded-[24px] bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary-600 hover:text-white transition-all shadow-2xl shadow-neutral-900/10 overflow-hidden relative group/btn">
                            <span className="relative z-10">Analyze Detailed Logs</span>
                            <div className="absolute inset-0 bg-primary-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                        </button>
                        <p className="text-center mt-6 text-[8px] font-bold text-neutral-400 uppercase tracking-[0.4em] animate-pulse">Scanning Live Feeds...</p>
                    </div>

                    {/* Gradient background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/5 blur-[100px] rounded-full pointer-events-none"></div>
                </div>
            </motion.div>
        </motion.div>
    );
}
