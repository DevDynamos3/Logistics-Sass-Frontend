"use client";

import React, { useState, useEffect } from "react";
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
    BarChart3,
    Sun,
    Moon,
    Menu,
    X,
    ChevronLeft,
    Truck
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const { logout, user } = useAuth();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Handle initial screen size
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!mounted) return null;

    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", href: "/super-admin" },
        { icon: Building2, label: "Organizations", href: "/super-admin/organizations" },
        { icon: Users, label: "Users", href: "/super-admin/users" },
        { icon: Users, label: "Units", href: "/super-admin/units" },
        { icon: Truck, label: "Drivers", href: "/super-admin/drivers" },
        { icon: BarChart3, label: "Analytics", href: "/super-admin/analytics" },
        { icon: Settings, label: "Settings", href: "/super-admin/settings" },
    ];

    const sidebarVariants = {
        open: {
            width: "280px",
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        closed: {
            width: "88px",
            transition: { type: "spring", stiffness: 300, damping: 30 }
        }
    };

    return (
        <div className="h-screen bg-[#F8F9FC] dark:bg-[#0A0A0A] flex font-sans overflow-hidden">
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={isSidebarOpen || isMobileMenuOpen ? "open" : "closed"}
                variants={sidebarVariants}
                className={`
                    fixed inset-y-0 left-0 z-[70] bg-white dark:bg-neutral-900 border-r border-neutral-100 dark:border-neutral-800 flex flex-col
                    lg:relative lg:translate-x-0
                    ${isMobileMenuOpen ? "translate-x-0 w-[280px]" : "-translate-x-full lg:translate-x-0"}
                    transition-transform duration-300 ease-in-out
                `}
            >
                <div className="p-6 h-20 flex items-center justify-between overflow-hidden">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 min-w-[40px] rounded-2xl bg-primary-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-600/20">
                            F
                        </div>
                        <AnimatePresence>
                            {(isSidebarOpen || isMobileMenuOpen) && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="text-xl font-black tracking-tighter dark:text-white whitespace-nowrap"
                                >
                                    Fleetra <span className="text-primary-600">Admin</span>
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                    {isMobileMenuOpen && (
                        <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-neutral-400">
                            <X size={20} />
                        </button>
                    )}
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto overflow-x-hidden scrollbar-hide">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        const showLabel = isSidebarOpen || isMobileMenuOpen;
                        return (
                            <Link key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                                <motion.div
                                    whileHover={{ x: showLabel ? 5 : 0 }}
                                    className={`flex items-center group relative px-3 py-4 rounded-2xl transition-all ${isActive
                                        ? "bg-primary-600 text-white shadow-xl shadow-primary-600/20"
                                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <item.icon size={22} strokeWidth={isActive ? 3 : 2} className="min-w-[22px]" />
                                        <AnimatePresence>
                                            {showLabel && (
                                                <motion.span
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    className={`text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${isActive ? "opacity-100" : "opacity-70"}`}
                                                >
                                                    {item.label}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    {!showLabel && (
                                        <div className="absolute left-full ml-4 px-3 py-2 bg-neutral-900 text-white text-[10px] font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                            {item.label}
                                        </div>
                                    )}
                                    {isActive && showLabel && <ChevronRight className="ml-auto" size={14} strokeWidth={3} />}
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                <div className={`p-4 border-t border-neutral-100 dark:border-neutral-800 m-2 rounded-3xl bg-neutral-50 dark:bg-neutral-800/50 overflow-hidden`}>
                    {(isSidebarOpen || isMobileMenuOpen) ? (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 min-w-[40px] rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-black dark:text-white truncate">Super Admin</span>
                                    <span className="text-[10px] font-bold text-neutral-400 truncate">admin@fleetra.com</span>
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
                    ) : (
                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center py-3 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
                        >
                            <LogOut size={20} />
                        </button>
                    )}
                </div>

                {/* Desktop Toggle Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-4 top-24 w-8 h-8 bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-full hidden lg:flex items-center justify-center text-neutral-400 shadow-sm hover:text-primary-600 transition-colors z-50"
                >
                    {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
                {/* Header */}
                <header className="h-20 py-4 bg-white/80 dark:bg-black/80 backdrop-blur-3xl border-b border-neutral-100 dark:border-neutral-800 sticky top-0 z-40 px-4 lg:px-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-50 dark:bg-neutral-900 text-neutral-500"
                        >
                            <Menu size={20} />
                        </button>
                        <div className="relative w-40 md:w-96 group hidden sm:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-600 transition-colors" size={18} />
                            <input
                                placeholder="Search everything..."
                                className="w-full h-12 pl-12 pr-4 bg-neutral-50 dark:bg-neutral-900 rounded-2xl text-sm font-medium border border-transparent focus:border-primary-100 dark:focus:border-neutral-700 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center text-neutral-500"
                        >
                            <AnimatePresence mode="wait">
                                {theme === 'dark' ? (
                                    <motion.div key="sun" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                        <Sun size={20} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="moon" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                        <Moon size={20} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        <button className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center text-neutral-500 relative transition-all">
                            <Bell size={20} />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full ring-4 ring-white dark:ring-black"></span>
                        </button>

                        <Link href="/super-admin/organizations/new">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="h-10 md:h-12 px-4 md:px-6 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl shadow-primary-600/20"
                            >
                                <Plus size={18} strokeWidth={3} />
                                <span className="hidden md:inline">New Org</span>
                            </motion.button>
                        </Link>
                    </div>
                </header>

                <div className="p-4 2xl:p-10 max-w-[1600px] mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
