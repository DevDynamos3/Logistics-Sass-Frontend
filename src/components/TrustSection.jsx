"use client";

import React from "react";
import { CheckCircle2, Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustSection() {
    return (
        <section className="py-8 px-5 bg-neutral-50 dark:bg-black">
            <div className="bg-neutral-900 rounded-[32px] p-8 text-white relative overflow-hidden">
                {/* Abstract Background Detail */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                    <h2 className="text-2xl font-black mb-4 leading-tight">
                        Radical transparency & <br />
                        <span className="text-primary-400">bank-grade security.</span>
                    </h2>

                    <p className="text-neutral-400 text-xs mb-8 leading-relaxed max-w-[240px]">
                        Every carrier is ISO 9001 certified and undergoes a rigorous multi-stage verification process.
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-8">
                        <div className="bg-neutral-800/50 backdrop-blur-md p-4 rounded-3xl border border-white/5 flex flex-col items-center">
                            <div className="flex text-amber-500 mb-2">
                                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                            </div>
                            <span className="text-xl font-black">4.9/5</span>
                            <span className="text-neutral-500 text-[8px] uppercase font-bold tracking-tighter">App Store</span>
                        </div>
                        <div className="bg-primary-600 p-4 rounded-3xl flex flex-col items-center text-center">
                            <span className="text-xl font-black">200K+</span>
                            <span className="text-white/70 text-[8px] uppercase font-bold tracking-tighter">Happy Clients</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary-400">
                                <CheckCircle2 size={16} />
                            </div>
                            <p className="text-[10px] font-bold text-neutral-300">ISO 9001:2015 Certified Fleet</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary-400">
                                <ShieldCheck size={16} />
                            </div>
                            <p className="text-[10px] font-bold text-neutral-300">Biometric Driver Verification</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
