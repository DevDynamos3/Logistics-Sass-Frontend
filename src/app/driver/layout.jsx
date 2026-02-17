"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    MessageSquare,
    Wallet,
    User,
    LogOut,
    Menu,
    X,
    Bell,
    Moon,
    Sun,
    Truck,
    ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";

export default function DriverLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const routes = [
        { label: "Dashboard", href: "/driver", icon: LayoutDashboard },
        { label: "Messages", href: "/driver/messages", icon: MessageSquare },
        { label: "Wallet", href: "/driver/wallet", icon: Wallet },
        { label: "Profile", href: "/driver/profile", icon: User },
    ];

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-neutral-950 font-sans overflow-hidden">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-72 flex-col border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-4 m-4 rounded-[32px] shadow-sm h-[calc(100vh-32px)]">
                <div className="p-4 flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-600/20">
                        F
                    </div>
                    <span className="text-xl font-black tracking-tighter dark:text-white">Fleetra <span className="text-primary-600">Driver</span></span>
                </div>

                <nav className="flex-1 space-y-2">
                    {routes.map((route) => {
                        const isActive = pathname === route.href;
                        return (
                            <Link key={route.href} href={route.href}>
                                <div className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${isActive ? "bg-primary-600 text-white shadow-xl shadow-primary-600/20 translate-x-1" : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white"}`}>
                                    <route.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="font-bold text-sm tracking-wide">{route.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all font-bold text-sm tracking-wide group">
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 h-full relative">
                {/* Header - Hidden on Messages page */}
                {pathname !== '/driver/messages' && (
                    <header className="h-20 px-4 lg:px-10 flex items-center justify-between sticky top-0 z-30 bg-gray-50/80 dark:bg-neutral-950/80 backdrop-blur-xl">
                        <div className="flex items-center gap-3 lg:hidden">
                            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-primary-600/20">
                                F
                            </div>
                            <span className="font-black tracking-tight text-lg dark:text-white">Driver</span>
                        </div>

                        <div className="hidden lg:block">
                            <h2 className="text-2xl font-black dark:text-white tracking-tight">
                                {routes.find(r => r.href === pathname)?.label || 'Dashboard'}
                            </h2>
                        </div>

                        {/* Mobile Header Title / Back Button */}
                        <div className="lg:hidden flex items-center absolute left-1/2 -translate-x-1/2">
                            {pathname !== '/driver' && (
                                <button
                                    onClick={() => router.back()}
                                    className="mr-2 p-2 -ml-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-white"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                            )}
                            <span className="font-bold text-lg dark:text-white">
                                {routes.find(r => r.href === pathname)?.label || 'Dashboard'}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 md:gap-4">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 transition-all shadow-sm"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 transition-all shadow-sm relative"
                            >
                                <Bell size={20} />
                                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-neutral-900 animate-pulse"></span>
                            </motion.button>

                            <div className="flex items-center gap-3 pl-2 cursor-pointer">
                                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden border-2 border-white dark:border-neutral-900 shadow-md">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MainDriver" alt="Profile" />
                                </div>
                            </div>
                        </div>
                    </header>
                )}

                <div className={`flex-1 scrollbar-hide ${pathname === '/driver/messages' ? 'overflow-hidden p-0' : 'overflow-y-auto p-4 lg:px-10 pb-28 lg:pb-10'}`}>
                    {children}
                </div>

                {/* Mobile Bottom Navigation */}
                <div className={`lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-around z-50 transition-transform duration-300 ${pathname === '/driver/messages' ? 'translate-y-[100%]' : 'translate-y-0'}`}>
                    {routes.map((route) => {
                        const isActive = pathname === route.href;
                        return (
                            <Link key={route.href} href={route.href} className="flex-1 h-full flex flex-col items-center justify-center gap-1">
                                <route.icon size={24} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-primary-600" : "text-neutral-400 dark:text-neutral-600"} />
                                <span className={`text-[10px] font-bold ${isActive ? "text-primary-600" : "text-neutral-400 dark:text-neutral-600"}`}>
                                    {route.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
