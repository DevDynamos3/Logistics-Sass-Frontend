"use client";

import React from "react";
import { Home, Package, Truck, Bell, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Package, label: "Shipments", href: "/shipments" },
    { icon: Truck, label: "Fleet", href: "/fleet" },
    { icon: Bell, label: "Alerts", href: "/notifications" },
    { icon: Settings, label: "Settings", href: "/settings" },
];

export default function BottomTabBar() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 px-2 pb-safe md:hidden">
            <div className="bg-white/80 dark:bg-black/80 backdrop-blur-2xl border border-neutral-100 dark:border-neutral-900 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex justify-between items-center px-2 py-2 mb-6">
                {tabs.map((tab, index) => {
                    const isActive = pathname === tab.href;
                    return (
                        <Link key={index} href={tab.href} className="flex-1">
                            <motion.div
                                whileTap={{ scale: 0.85 }}
                                className="flex flex-col items-center justify-center relative py-2"
                            >
                                <div className={`p-2 rounded-2xl transition-all duration-300 relative z-10 ${isActive ? 'text-primary-600' : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'}`}>
                                    <tab.icon size={24} strokeWidth={isActive ? 2.5 : 2} />

                                    {isActive && (
                                        <motion.div
                                            layoutId="activeGlow"
                                            className="absolute inset-0 bg-primary-600/10 rounded-2xl -z-10 blur-sm"
                                        />
                                    )}
                                </div>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.span
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-[10px] font-black tracking-tighter text-primary-600 mt-1"
                                        >
                                            {tab.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute -top-2 w-1.5 h-1.5 bg-primary-600 rounded-full"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
