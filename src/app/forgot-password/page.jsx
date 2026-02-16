"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/Account/forgot-password", { email });
            setSubmitted(true);
            toast.success("Reset link sent!");
        } catch (error) {
            toast.error(error.message || "Failed to send reset link");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-black font-sans flex items-center justify-center p-5">
            <div className="w-full max-w-md space-y-10">
                <Link href="/login" className="flex items-center gap-2 text-neutral-400 font-black uppercase tracking-widest text-[10px] hover:text-primary-600 transition-colors">
                    <ChevronLeft size={16} strokeWidth={3} />
                    Back to Login
                </Link>

                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white">Recover Password</h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px]">Enter your email to receive a reset link</p>
                </div>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <Mail size={18} className="text-neutral-400 group-focus-within:text-primary-600 transition-colors" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Registered Email Address"
                                className="w-full h-16 bg-white dark:bg-neutral-900 rounded-[24px] pl-16 pr-6 font-semibold border-2 border-transparent focus:border-primary-600 outline-none transition-all shadow-sm"
                            />
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            className="w-full h-16 bg-primary-600 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary-600/40 flex items-center justify-center gap-3 transition-all disabled:opacity-70"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Send Reset Link
                                    <ArrowRight size={18} strokeWidth={3} />
                                </>
                            )}
                        </motion.button>
                    </form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-neutral-900 rounded-[40px] p-8 border border-neutral-100 dark:border-neutral-800 text-center space-y-4 shadow-xl"
                    >
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto shadow-lg">
                            <Mail size={32} />
                        </div>
                        <h3 className="text-xl font-black">Check Your Email</h3>
                        <p className="text-sm font-medium text-neutral-500 leading-relaxed px-4">
                            We've sent a password recovery link to <span className="text-neutral-900 dark:text-white font-bold">{email}</span>. Click the link in the email to proceed.
                        </p>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
