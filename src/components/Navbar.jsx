"use client";

import React from "react";
import { Search, Bell, MapPin, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur-2xl border-b border-neutral-100 dark:border-neutral-900 pb-2">
            <div className="max-w-7xl mx-auto px-5 pt-4 pb-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <motion.div
                                    whileTap={{ scale: 0.9 }}
                                    className="w-10 h-10 rounded-2xl bg-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-600/20"
                                >
                                    {user.fullName ? user.fullName[0].toUpperCase() : "U"}
                                </motion.div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none mb-1">Welcome back</span>
                                    <div className="flex items-center gap-1 group cursor-pointer relative" onClick={() => logout()}>
                                        <span className="font-black text-sm tracking-tight">{user.fullName || user.email}</span>
                                        <ChevronDown size={14} className="text-neutral-400 group-hover:text-primary-600 transition-colors" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Link href="/login">
                                <motion.div
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-2.5 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary-600/20"
                                >
                                    Log In
                                </motion.div>
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {user && (
                            <Link href="/notifications">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center relative transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800"
                                >
                                    <Bell size={20} className="text-neutral-700 dark:text-neutral-300" />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-black"></span>
                                </motion.button>
                            </Link>
                        )}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                            <Search size={20} className="text-neutral-700 dark:text-neutral-300" />
                        </motion.button>
                    </div>
                </div>

                {/* Location / Status Bar or Marquee */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden h-10 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border border-neutral-100 dark:border-neutral-800 flex items-center"
                >
                    {user ? (
                        <div className="flex items-center gap-2 px-3">
                            <div className="p-1 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                                <MapPin size={14} fill="currentColor" fillOpacity={0.2} />
                            </div>
                            <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate">
                                Delivering to <span className="text-neutral-900 dark:text-neutral-100 font-bold ml-1">Victoria Island, Lagos</span>
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center w-full overflow-hidden whitespace-nowrap">
                            <motion.div
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="flex items-center gap-12 pr-12 min-w-max"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-300">
                                        Welcome to Fleetra: The bridge between customers and trusted drivers
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-300">
                                        Join our professional logistics ecosystem today
                                    </span>
                                </div>
                                {/* Duplicates for seamless loop */}
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-300">
                                        Welcome to Fleetra: The bridge between customers and trusted drivers
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-300">
                                        Join our professional logistics ecosystem today
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            </div>
        </nav>
    );
}
