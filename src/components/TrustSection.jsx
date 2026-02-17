"use client";

import React from "react";
import { CheckCircle2, Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustSection() {
    return (
        <section className="py-8 px-4 bg-neutral-50 dark:bg-black">
            <div className="relative overflow-hidden rounded-[32px] shadow-2xl">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 via-primary-500/30 to-primary-600/30" />

                {/* Decorative Blur */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary-300/20 blur-[100px] rounded-full -mr-12 -mt-12" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-400/10 blur-[80px] rounded-full -ml-10 -mb-10" />

                {/* Glassmorphism Layer */}
                <div className="relative backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 p-8">
                    <div className="relative z-10">
                        <div className="text-center mb-6">
                            <div className="text-6xl mb-3">🛡️</div>
                            <h2 className="text-2xl font-black mb-2 leading-tight dark:text-white">
                                Safe & Trusted
                            </h2>
                            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 max-w-xs mx-auto">
                                All our drivers are verified and trusted
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/20 dark:bg-black/20 backdrop-blur-md p-5 rounded-[24px] border border-white/10 flex flex-col items-center text-center"
                            >
                                <div className="flex gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-2xl">⭐</span>
                                    ))}
                                </div>
                                <span className="text-2xl font-black dark:text-white mb-1">4.9/5</span>
                                <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">User Rating</span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-gradient-to-br from-primary-500 to-primary-600 p-5 rounded-[24px] flex flex-col items-center text-center text-white shadow-xl"
                            >
                                <div className="text-4xl mb-1">👥</div>
                                <span className="text-2xl font-black mb-1">200K+</span>
                                <span className="text-xs font-bold opacity-90">Happy Users</span>
                            </motion.div>
                        </div>

                        {/* Trust Features */}
                        <div className="space-y-3">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4 bg-white/20 dark:bg-black/20 backdrop-blur-md p-4 rounded-[20px] border border-white/10"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-3xl shrink-0">
                                    ✅
                                </div>
                                <div>
                                    <p className="text-sm font-black dark:text-white">Verified Drivers</p>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400">All drivers are checked</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="flex items-center gap-4 bg-white/20 dark:bg-black/20 backdrop-blur-md p-4 rounded-[20px] border border-white/10"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-3xl shrink-0">
                                    🔒
                                </div>
                                <div>
                                    <p className="text-sm font-black dark:text-white">Secure Payment</p>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400">Your money is protected</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-4 bg-white/20 dark:bg-black/20 backdrop-blur-md p-4 rounded-[20px] border border-white/10"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-3xl shrink-0">
                                    📞
                                </div>
                                <div>
                                    <p className="text-sm font-black dark:text-white">24/7 Support</p>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400">We're always here to help</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
