"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, Facebook, Chrome as Google } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success("Welcome back to Fleetra!");
            router.push("/");
        } catch (error) {
            toast.error(error.message || "Failed to login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-black font-sans flex flex-col items-center justify-center px-3 py-10">
            <div className="w-full max-w-md space-y-10">
                {/* Logo Section */}
                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 rounded-[32px] bg-primary-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-primary-600/30 mb-6"
                    >
                        F
                    </motion.div>
                    <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white">Welcome Back</h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px] mt-2">Log in to your Fleetra account</p>
                </div>

                {/* Form Section */}
                <motion.form
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <Mail size={18} className="text-neutral-400 group-focus-within:text-primary-600 transition-colors" />
                            </div>
                            <input
                                type="email"
                                required
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-16 bg-white dark:bg-neutral-900 rounded-[24px] pl-16 pr-6 font-semibold border-2 border-transparent focus:border-primary-600 outline-none transition-all shadow-sm"
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <Lock size={18} className="text-neutral-400 group-focus-within:text-primary-600 transition-colors" />
                            </div>
                            <input
                                type="password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-16 bg-white dark:bg-neutral-900 rounded-[24px] pl-16 pr-6 font-semibold border-2 border-transparent focus:border-primary-600 outline-none transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end px-2">
                        <Link href="/forgot-password" size="sm" className="text-[11px] font-black text-primary-600 uppercase tracking-widest hover:underline">
                            Forgot Password?
                        </Link>
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
                                Sign In
                                <ArrowRight size={18} strokeWidth={3} />
                            </>
                        )}
                    </motion.button>
                </motion.form>

                {/* Social Login */}
                <div className="space-y-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200 dark:border-neutral-800"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                            <span className="bg-neutral-50 dark:bg-black px-4">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="h-14 bg-white dark:bg-neutral-900 rounded-[20px] flex items-center justify-center gap-3 border border-neutral-100 dark:border-neutral-800 shadow-sm"
                        >
                            <Google size={18} className="text-red-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Google</span>
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="h-14 bg-white dark:bg-neutral-900 rounded-[20px] flex items-center justify-center gap-3 border border-neutral-100 dark:border-neutral-800 shadow-sm"
                        >
                            <Facebook size={18} className="text-blue-600" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Facebook</span>
                        </motion.button>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm font-medium text-neutral-500">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-primary-600 font-black hover:underline ml-1">
                        Create One
                    </Link>
                </p>
            </div>
        </main>
    );
}
