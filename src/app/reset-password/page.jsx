"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("idle"); // idle, success
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const email = searchParams.get("email");
    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await api.post("/Account/reset-password", {
                email,
                token,
                newPassword: password
            });
            setStatus("success");
            toast.success("Password reset successfully!");
        } catch (error) {
            toast.error(error.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    if (!email || !token) {
        return (
            <main className="min-h-screen bg-neutral-50 dark:bg-black flex items-center justify-center p-5 text-center">
                <p className="text-red-500 font-bold uppercase tracking-widest text-xs">Invalid or missing reset token.</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-black font-sans flex items-center justify-center p-5">
            <div className="w-full max-w-md space-y-10">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white">New Password</h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px]">Secure your Fleetra account with a new password</p>
                </div>

                {status !== "success" ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <Lock size={18} className="text-neutral-400 group-focus-within:text-primary-600 transition-colors" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="New Password"
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
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm New Password"
                                className="w-full h-16 bg-white dark:bg-neutral-900 rounded-[24px] pl-16 pr-6 font-semibold border-2 border-transparent focus:border-primary-600 outline-none transition-all shadow-sm"
                            />
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            className="w-full h-16 bg-primary-600 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary-600/40 flex items-center justify-center gap-3 transition-all disabled:opacity-70 mt-4"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Update Password
                                    <ArrowRight size={18} strokeWidth={3} />
                                </>
                            )}
                        </motion.button>
                    </form>
                ) : (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white dark:bg-neutral-900 rounded-[40px] p-8 border border-neutral-100 dark:border-neutral-800 text-center space-y-6 shadow-xl"
                    >
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto shadow-lg">
                            <CheckCircle2 size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black">Success!</h3>
                            <p className="text-sm font-medium text-neutral-500 mt-2">Your password has been reset. You can now login with your new credentials.</p>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.push("/login")}
                            className="w-full h-16 bg-primary-600 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-xs shadow-xl"
                        >
                            Back to Login
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
