"use client";

import React from "react";
import {
    LayoutDashboard,
    Building2,
    Users,
    Settings,
    LogOut,
    ChevronRight,
    Search,
    Bell,
    Plus,
    BarChart3
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", href: "/super-admin" },
        { icon: Building2, label: "Organizations", href: "/super-admin/organizations" },
        { icon: Users, label: "Units", href: "/super-admin/units" },
        { icon: BarChart3, label: "Analytics", href: "/super-admin/analytics" },
        { icon: Settings, label: "Settings", href: "/super-admin/settings" },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FC] dark:bg-[#0A0A0A] flex font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-white dark:bg-neutral-900 border-r border-neutral-100 dark:border-neutral-800 flex flex-col fixed inset-y-0 z-50">
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-600/20">
                            F
                        </div>
                        <span className="text-xl font-black tracking-tighter dark:text-white">Fleetra <span className="text-primary-600">Admin</span></span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.label} href={item.href}>
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    className={`flex items-center justify-between px-4 py-4 rounded-2xl transition-all ${isActive
                                            ? "bg-primary-600 text-white shadow-xl shadow-primary-600/20"
                                            : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <item.icon size={20} strokeWidth={isActive ? 3 : 2} />
                                        <span className={`text-sm tracking-tight font-black uppercase text-[10px] ${isActive ? "opacity-100" : "opacity-70"}`}>
                                            {item.label}
                                        </span>
                                    </div>
                                    {isActive && <ChevronRight size={14} strokeWidth={3} />}
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-neutral-100 dark:border-neutral-800 m-4 rounded-3xl bg-neutral-50 dark:bg-neutral-800/50">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-black dark:text-white">Super Admin</span>
                            <span className="text-[10px] font-bold text-neutral-400">admin@fleetra.com</span>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-600 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
                    >
                        <LogOut size={14} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72">
                {/* Header */}
                <header className="h-20 bg-white/80 dark:bg-black/80 backdrop-blur-3xl border-b border-neutral-100 dark:border-neutral-800 sticky top-0 z-40 px-10 flex items-center justify-between">
                    <div className="relative w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-600 transition-colors" size={18} />
                        <input
                            placeholder="Search everything..."
                            className="w-full h-12 pl-12 pr-4 bg-neutral-50 dark:bg-neutral-900 rounded-2xl text-sm font-medium border border-transparent focus:border-primary-100 dark:focus:border-neutral-700 outline-none transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="w-12 h-12 rounded-2xl bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center text-neutral-500 relative transition-all hover:bg-neutral-100">
                            <Bell size={20} />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full ring-4 ring-white dark:ring-black"></span>
                        </button>
                        <Link href="/super-admin/organizations/new">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="h-12 px-6 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl shadow-primary-600/20"
                            >
                                <Plus size={18} strokeWidth={3} />
                                Register Org
                            </motion.button>
                        </Link>
                    </div>
                </header>

                <div className="p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
