"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Settings,
    Package,
    Tag,
    ShieldCheck,
    Bell,
    CheckCheck,
    MoreVertical,
    Clock
} from "lucide-react";
import { useRouter } from "next/navigation";
import BottomTabBar from "@/components/BottomTabBar";

const notifications = [
    {
        id: 1,
        type: "shipment",
        title: "Shipment Delivered",
        message: "Waybill #FL-82910 has been successfully delivered to Lekki Phase 1.",
        time: "10m ago",
        unread: true,
        icon: Package,
        color: "bg-green-500",
    },
    {
        id: 2,
        type: "quote",
        title: "New Quotes Received",
        message: "You have 3 new competitive quotes for your pending shipment to Abuja.",
        time: "1h ago",
        unread: true,
        icon: Tag,
        color: "bg-primary-600",
    },
    {
        id: 3,
        type: "system",
        title: "Account Verified",
        message: "Great news! Your business profile has been verified. You can now access credit lines.",
        time: "4h ago",
        unread: false,
        icon: ShieldCheck,
        color: "bg-indigo-500",
    },
    {
        id: 4,
        type: "shipment",
        title: "Courier Picked Up",
        message: "Your shipment #FL-90211 is now in transit with our partner carrier.",
        time: "Yesterday",
        unread: false,
        icon: Package,
        color: "bg-amber-500",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
};

export default function NotificationsPage() {
    const router = useRouter();
    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-black font-sans pb-32">
            {/* Premium Sub-page Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur-2xl border-b border-neutral-100 dark:border-neutral-900">
                <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={() => router.back()}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-600 dark:text-neutral-400"
                        >
                            <ArrowLeft size={20} />
                        </motion.button>
                        <h1 className="font-black text-xl tracking-tight">Notifications</h1>
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-600 dark:text-neutral-400"
                    >
                        <Settings size={20} />
                    </motion.button>
                </div>
            </nav>

            {/* Content */}
            <div className="pt-24 px-5">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Recent</span>
                        <div className="px-2 py-0.5 bg-primary-600 rounded-full text-[10px] font-black text-white">2 New</div>
                    </div>
                    <button className="flex items-center gap-1.5 text-primary-600 font-bold text-xs uppercase tracking-tighter">
                        <CheckCheck size={14} />
                        Mark all read
                    </button>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                >
                    {notifications.map((notif) => (
                        <motion.div
                            key={notif.id}
                            variants={itemVariants}
                            whileTap={{ scale: 0.98 }}
                            className={`relative bg-white dark:bg-neutral-900 p-5 rounded-[32px] border transition-all ${notif.unread
                                ? "border-primary-100 dark:border-primary-900/30 shadow-lg shadow-primary-500/5"
                                : "border-neutral-100 dark:border-neutral-800 shadow-sm"
                                }`}
                        >
                            <div className="flex gap-4">
                                <div className={`w-12 h-12 flex-shrink-0 rounded-2xl ${notif.color} text-white flex items-center justify-center shadow-lg shadow-${notif.color.split('-')[1]}-500/20`}>
                                    <notif.icon size={24} />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className={`text-sm font-black ${notif.unread ? 'text-neutral-900 dark:text-white' : 'text-neutral-600 dark:text-neutral-400'}`}>
                                            {notif.title}
                                        </h3>
                                        <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-bold">
                                            <Clock size={10} />
                                            {notif.time}
                                        </div>
                                    </div>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3">
                                        {notif.message}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <button className="text-[10px] font-black text-primary-600 uppercase tracking-widest">View Details</button>
                                            <button className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Dismiss</button>
                                        </div>
                                        {notif.unread && (
                                            <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State Illustration Placeholder / Bottom buffer */}
                <div className="py-20 flex flex-col items-center justify-center opacity-30 grayscale">
                    <Bell size={64} className="mb-4 text-neutral-300" />
                    <p className="text-sm font-bold text-neutral-400">No more notifications</p>
                </div>
            </div>

            <BottomTabBar />
        </main>
    );
}
