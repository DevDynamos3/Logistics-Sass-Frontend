"use client";

import React, { useState } from "react";
import {
    motion,
    AnimatePresence
} from "framer-motion";
import {
    Settings as SettingsIcon,
    ShieldCheck,
    Globe,
    Bell,
    Key,
    Save,
    RotateCcw,
    Mail,
    Smartphone,
    Database,
    Cloud,
    Search,
    User,
    ChevronRight,
    Lock
} from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");
    const [isSaving, setIsSaving] = useState(false);

    const tabs = [
        { id: "general", label: "General", icon: Globe },
        { id: "security", label: "Security", icon: ShieldCheck },
        { id: "notifications", label: "Alerts", icon: Bell },
        { id: "system", label: "System", icon: Database },
    ];

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000);
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Header Control Panel */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white uppercase tracking-tighter">System Configuration</h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center gap-2">
                        <SettingsIcon size={14} className="text-primary-600" />
                        Manage global platform parameters & security protocols
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="h-12 px-6 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-neutral-600 transition-all"
                    >
                        <RotateCcw size={16} />
                        Discard Changes
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className={`h-12 px-8 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all ${isSaving ? 'bg-green-600 text-white' : 'bg-primary-600 text-white shadow-xl shadow-primary-600/20'}`}
                    >
                        {isSaving ? <RotateCcw size={16} className="animate-spin" /> : <Save size={16} />}
                        {isSaving ? "Synchronizing..." : "Apply Changes"}
                    </motion.button>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-8">
                {/* Navigation Sidebar */}
                <aside className="xl:w-80 flex-shrink-0">
                    <div className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[40px] p-2 md:p-4 border border-neutral-100 dark:border-neutral-800 shadow-sm md:sticky md:top-32">
                        <div className="flex xl:flex-col overflow-x-auto xl:overflow-x-visible scrollbar-hide gap-2 p-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center justify-between p-4 rounded-3xl transition-all group ${activeTab === tab.id ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <tab.icon size={20} className={activeTab === tab.id ? 'text-white' : 'text-neutral-400 group-hover:text-primary-600 transition-colors'} />
                                        <span className="text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
                                    </div>
                                    <ChevronRight size={14} className={activeTab === tab.id ? 'opacity-100' : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0 transition-all'} />
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-neutral-50 dark:border-neutral-800 px-4 pb-4 hidden xl:block">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
                                    <Cloud size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest dark:text-white">Cloud Sync</span>
                                    <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest">System Operational</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[8px] font-black uppercase tracking-widest text-neutral-400">API Latency</span>
                                    <span className="text-[10px] font-black dark:text-white">12ms</span>
                                </div>
                                <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                    <div className="w-[85%] h-full bg-primary-600 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[48px] border border-neutral-100 dark:border-neutral-800 p-6 md:p-8 lg:p-12 shadow-sm relative overflow-hidden"
                        >
                            {/* Decorative background blur */}
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                            {activeTab === "general" && (
                                <div className="space-y-12 relative z-10">
                                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
                                            <div className="w-2 h-8 bg-primary-600 rounded-full"></div>
                                            Platform Identity
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-1">Application Name</label>
                                                <input
                                                    type="text"
                                                    defaultValue="Fleetra Logistics Control"
                                                    className="w-full h-16 bg-neutral-50 dark:bg-neutral-800 px-6 rounded-3xl border border-transparent focus:border-primary-100 dark:focus:border-primary-900/30 outline-none font-black text-sm dark:text-white tracking-tight transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-1">Administrative Alias</label>
                                                <input
                                                    type="text"
                                                    defaultValue="Fleetra_HQ_Admin"
                                                    className="w-full h-16 bg-neutral-50 dark:bg-neutral-800 px-6 rounded-3xl border border-transparent focus:border-primary-100 dark:focus:border-primary-900/30 outline-none font-black text-sm dark:text-white tracking-tight transition-all text-neutral-400"
                                                />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-1">Global Support Node</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                                    <input
                                                        type="email"
                                                        defaultValue="ops@fleetra.com"
                                                        className="w-full h-16 bg-neutral-50 dark:bg-neutral-800 pl-16 pr-6 rounded-3xl border border-transparent focus:border-primary-100 dark:focus:border-primary-900/30 outline-none font-black text-sm dark:text-white tracking-tight transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                                        <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-8 flex items-center gap-3 focus:ring-primary-500">
                                            <div className="w-2 h-8 bg-blue-600 rounded-full text-primary-500"></div>
                                            Global Localization
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-1">Primary Network Timezone</label>
                                                <select className="w-full h-16 bg-neutral-50 dark:bg-neutral-800 px-6 rounded-3xl border border-transparent focus:border-primary-100 dark:focus:border-primary-900/30 outline-none font-black text-sm dark:text-white tracking-tight transition-all appearance-none">
                                                    <option>Lagos, Nigeria (GMT+1)</option>
                                                    <option>New York, USA (GMT-5)</option>
                                                    <option>London, UK (GMT)</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-1">Default Operational Currency</label>
                                                <select className="w-full h-16 bg-neutral-50 dark:bg-neutral-800 px-6 rounded-3xl border border-transparent focus:border-primary-100 dark:focus:border-primary-900/30 outline-none font-black text-sm dark:text-white tracking-tight transition-all appearance-none">
                                                    <option>Nigerian Naira (₦)</option>
                                                    <option>US Dollar ($)</option>
                                                    <option>Euro (€)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            )}

                            {activeTab === "security" && (
                                <div className="space-y-12 relative z-10">
                                    <section>
                                        <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
                                            <div className="w-2 h-8 bg-orange-600 rounded-full"></div>
                                            Authentication Protocols
                                        </h3>
                                        <div className="space-y-4">
                                            {[
                                                { title: "Multi-Factor Authentication", desc: "Require a verified device for all admin logins", icon: Smartphone, enabled: true },
                                                { title: "Biometric Verification", desc: "Allow Touch/Face ID for authorized workstations", icon: User, enabled: false },
                                                { title: "Session Auto-Termination", desc: "Automatically logout after 30 minutes of inactivity", icon: RotateCcw, enabled: true }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 md:p-6 bg-neutral-50 dark:bg-neutral-800 rounded-3xl md:rounded-[32px] group hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-all">
                                                    <div className="flex items-center gap-4 md:gap-6">
                                                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex-shrink-0 flex items-center justify-center ${item.enabled ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400'}`}>
                                                            <item.icon size={20} className="md:w-6 md:h-6" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-widest dark:text-white">{item.title}</h4>
                                                            <p className="text-[8px] md:text-[9px] font-bold text-neutral-400 uppercase tracking-widest mt-1">{item.desc}</p>
                                                        </div>
                                                    </div>
                                                    <button className={`w-12 h-7 md:w-14 md:h-8 rounded-full relative transition-all flex-shrink-0 ml-2 ${item.enabled ? 'bg-primary-600 shadow-lg shadow-primary-600/30' : 'bg-neutral-300 dark:bg-neutral-700'}`}>
                                                        <motion.div
                                                            layout
                                                            className={`absolute top-1 w-5 h-5 md:w-6 md:h-6 rounded-full bg-white shadow-sm ${item.enabled ? 'left-6 md:left-7' : 'left-1'}`}
                                                        />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section>
                                        <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
                                            <div className="w-2 h-8 bg-red-600 rounded-full"></div>
                                            API Firewalls
                                        </h3>
                                        <div className="p-6 md:p-8 border-2 border-dashed border-neutral-100 dark:border-neutral-800 rounded-3xl md:rounded-[40px] text-center">
                                            <div className="w-16 h-16 rounded-3xl bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4 text-neutral-400">
                                                <Lock size={28} />
                                            </div>
                                            <h4 className="text-[11px] font-black uppercase tracking-widest dark:text-white">IP Whitelisting Required</h4>
                                            <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mt-2 max-w-xs mx-auto mb-6">Restrict administrative access to specific network infrastructures</p>
                                            <button className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-primary-600 hover:text-white transition-all">
                                                Configure Access Lists
                                            </button>
                                        </div>
                                    </section>
                                </div>
                            )}

                            {activeTab === "notifications" && (
                                <div className="space-y-12 relative z-10">
                                    <section>
                                        <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
                                            <div className="w-2 h-8 bg-purple-600 rounded-full"></div>
                                            Operational Alerts
                                        </h3>
                                        <div className="space-y-6">
                                            {[
                                                { label: "Critical System Failures", type: "Urgent", method: "Email + SMS" },
                                                { label: "New Organization Onboarding", type: "Standard", method: "Internal" },
                                                { label: "Network Throughput Spikes", type: "Warning", method: "Push" },
                                                { label: "Database Maintenance Window", type: "System", method: "Email" },
                                            ].map((n, i) => (
                                                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-2 gap-3 sm:gap-0 bg-neutral-50 dark:bg-neutral-800/30 sm:bg-transparent rounded-2xl sm:rounded-none">
                                                    <div className="flex items-center gap-3 md:gap-4">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-600 flex-shrink-0"></div>
                                                        <div>
                                                            <h4 className="text-[10px] font-black uppercase tracking-[0.1em] dark:text-white">{n.label}</h4>
                                                            <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest block mt-0.5">{n.type} Alert • {n.method}</span>
                                                        </div>
                                                    </div>
                                                    <button className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-600 hover:underline text-left sm:text-right pl-4 sm:pl-0">Customize</button>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            )}

                            {activeTab === "system" && (
                                <div className="space-y-12 relative z-10">
                                    <section>
                                        <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
                                            <div className="w-2 h-8 bg-red-600 rounded-full"></div>
                                            Critical Overrides
                                        </h3>
                                        <div className="p-6 md:p-8 bg-red-500/5 border border-red-500/20 rounded-3xl md:rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-6 group overflow-hidden relative">
                                            <div className="relative z-10">
                                                <h4 className="text-lg font-black dark:text-white uppercase tracking-tighter mb-2">Maintenance Protocol</h4>
                                                <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest max-w-sm">Disable all public organizational nodes for critical database refinement. Data remains active for admin entities.</p>
                                            </div>
                                            <button className="relative z-10 px-8 py-4 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-red-600/20 hover:scale-105 transition-all">
                                                Initiate Lockdown
                                            </button>
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-red-600/20 transition-colors duration-1000"></div>
                                        </div>
                                    </section>

                                    <section>
                                        <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
                                            <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                                            Infrastructure Snapshots
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {[
                                                { label: "Master Database", status: "Recent", time: "12m ago", icon: Database },
                                                { label: "Assets Storage", status: "Secure", time: "1h ago", icon: Cloud },
                                                { label: "Activity Logs", status: "Streaming", time: "Live", icon: Search },
                                            ].map((s, i) => (
                                                <div key={i} className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-[32px] border border-neutral-100 dark:border-neutral-800/50">
                                                    <div className={`w-12 h-12 rounded-2xl mb-4 flex items-center justify-center ${i === 0 ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' : 'bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-neutral-400'}`}>
                                                        <s.icon size={20} />
                                                    </div>
                                                    <h4 className="text-[10px] font-black uppercase tracking-widest dark:text-white mb-1">{s.label}</h4>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[8px] font-bold text-green-500 uppercase">{s.status}</span>
                                                        <span className="text-[8px] font-bold text-neutral-400 uppercase">• {s.time}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
