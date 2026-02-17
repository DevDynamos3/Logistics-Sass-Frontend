"use client";

import React, { useState } from "react";
import {
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    CreditCard,
    TrendingUp,
    CheckCircle2,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DriverWallet() {
    const [balance, setBalance] = useState(142500);
    const [showWithdraw, setShowWithdraw] = useState(false);

    const transactions = [
        { id: 1, type: "credit", emoji: "💰", title: "Trip Payment", subtitle: "Dangote Cement", date: "Today, 10:42 AM", amount: 45000 },
        { id: 2, type: "credit", emoji: "💰", title: "Trip Payment", subtitle: "Lagos Port", date: "Yesterday, 4:15 PM", amount: 32000 },
        { id: 3, type: "debit", emoji: "🏦", title: "Withdrawal", subtitle: "GTBank", date: "Feb 14, 2026", amount: -50000 },
        { id: 4, type: "credit", emoji: "🎁", title: "Weekly Bonus", subtitle: "Performance", date: "Feb 12, 2026", amount: 15000 },
    ];

    return (
        <div className="space-y-6 max-w-2xl mx-auto pb-4">
            {/* Balance Card - Large and Visual */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-[32px] p-8 shadow-2xl relative overflow-hidden"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 blur-[80px] rounded-full -ml-12 -mb-12" />

                <div className="relative z-10 space-y-6">
                    {/* Balance Display */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="text-3xl">💵</div>
                            <span className="text-sm font-bold uppercase tracking-wider opacity-80">Your Money</span>
                        </div>
                        <div className="text-5xl md:text-6xl font-black tracking-tighter mb-1">
                            ₦{balance.toLocaleString()}
                        </div>
                        <p className="text-sm opacity-80 font-medium">Available to withdraw</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowWithdraw(true)}
                            className="flex-1 h-16 bg-white text-primary-600 rounded-[20px] font-black text-sm flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-shadow"
                        >
                            <span className="text-2xl">💸</span>
                            <span>Withdraw Money</span>
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="h-16 w-16 bg-white/20 backdrop-blur-md rounded-[20px] flex items-center justify-center text-2xl hover:bg-white/30 transition-colors"
                        >
                            📊
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: "This Week", value: "₦245K", emoji: "📅", color: "from-blue-400 to-blue-600" },
                    { label: "This Month", value: "₦890K", emoji: "📆", color: "from-purple-400 to-purple-600" },
                    { label: "Total Earned", value: "₦2.4M", emoji: "🏆", color: "from-green-400 to-green-600" }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-neutral-900 rounded-[20px] p-4 shadow-md border border-neutral-100 dark:border-neutral-800"
                    >
                        <div className="text-2xl mb-2">{stat.emoji}</div>
                        <div className="text-lg font-black dark:text-white mb-1">{stat.value}</div>
                        <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Transaction History */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">📜</span>
                    <h3 className="text-xl font-black dark:text-white">Recent Activity</h3>
                </div>

                <div className="space-y-3">
                    {transactions.map((tx, i) => (
                        <motion.div
                            key={tx.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white dark:bg-neutral-900 p-4 rounded-[20px] border border-neutral-100 dark:border-neutral-800 cursor-pointer hover:border-primary-500/30 transition-all shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${tx.type === 'credit'
                                        ? 'bg-green-50 dark:bg-green-900/20'
                                        : 'bg-red-50 dark:bg-red-900/20'
                                    }`}>
                                    {tx.emoji}
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-sm dark:text-white truncate">{tx.title}</h4>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{tx.subtitle}</p>
                                        </div>
                                        <span className={`font-black text-lg shrink-0 ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {tx.type === 'credit' ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-[10px] font-medium text-neutral-400">{tx.date}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Withdraw Modal */}
            <AnimatePresence>
                {showWithdraw && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowWithdraw(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-neutral-900 w-full max-w-md rounded-[32px] shadow-2xl relative overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-6 text-white">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-3xl">💸</span>
                                        <h3 className="text-xl font-black">Withdraw Money</h3>
                                    </div>
                                    <button
                                        onClick={() => setShowWithdraw(false)}
                                        className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <p className="text-sm opacity-90">Enter amount to withdraw</p>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Amount Input */}
                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-wider text-neutral-500 ml-2">Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-neutral-400">₦</span>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="w-full h-20 bg-neutral-50 dark:bg-neutral-800 rounded-[24px] pl-14 pr-6 font-black text-3xl outline-none focus:ring-4 ring-primary-500/20 transition-all dark:text-white"
                                        />
                                    </div>
                                    <p className="text-xs text-neutral-400 ml-2">Available: ₦{balance.toLocaleString()}</p>
                                </div>

                                {/* Bank Account */}
                                <div className="bg-primary-50 dark:bg-primary-900/10 p-4 rounded-[20px] flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white dark:bg-neutral-900 rounded-full flex items-center justify-center text-2xl shadow-sm">
                                        🏦
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-primary-600 uppercase tracking-wider">Send To</p>
                                        <p className="text-sm font-black dark:text-white">GTBank •••• 4521</p>
                                    </div>
                                    <button className="text-primary-600 text-xs font-bold">Change</button>
                                </div>

                                {/* Confirm Button */}
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowWithdraw(false)}
                                    className="w-full h-16 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-[20px] font-black text-sm shadow-xl hover:shadow-2xl transition-shadow flex items-center justify-center gap-2"
                                >
                                    <CheckCircle2 size={20} />
                                    <span>Confirm Withdrawal</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
