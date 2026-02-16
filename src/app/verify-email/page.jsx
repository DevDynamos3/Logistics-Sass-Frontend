"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import Link from "next/link";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState("loading"); // loading, success, error
    const [message, setMessage] = useState("");

    const userId = searchParams.get("userId");
    const token = searchParams.get("token");

    useEffect(() => {
        if (!userId || !token) {
            setStatus("error");
            setMessage("Invalid verification link.");
            return;
        }

        const verify = async () => {
            try {
                await api.post("/Account/verify-email", { userId, token });
                setStatus("success");
            } catch (error) {
                setStatus("error");
                setMessage(error.message || "Failed to verify email.");
            }
        };

        verify();
    }, [userId, token]);

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-black font-sans flex items-center justify-center p-5">
            <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-[56px] p-10 border border-neutral-100 dark:border-neutral-800 shadow-2xl text-center space-y-8">
                {status === "loading" && (
                    <>
                        <div className="w-24 h-24 rounded-[40px] bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 mx-auto animate-pulse">
                            <Loader2 className="animate-spin" size={48} />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight">Verifying Email</h1>
                        <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px]">Please wait while we confirm your identity</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-24 h-24 rounded-[40px] bg-green-500 flex items-center justify-center text-white mx-auto shadow-2xl shadow-green-500/30"
                        >
                            <CheckCircle2 size={48} />
                        </motion.div>
                        <h1 className="text-3xl font-black tracking-tight">Email Verified!</h1>
                        <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px]">Your account is now ready to use</p>
                        <Link href="/login" className="block">
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                className="w-full h-16 bg-primary-600 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary-600/30 flex items-center justify-center gap-3 mt-4"
                            >
                                Continue to Login
                                <ArrowRight size={18} strokeWidth={3} />
                            </motion.button>
                        </Link>
                    </>
                )}

                {status === "error" && (
                    <>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-24 h-24 rounded-[40px] bg-red-500 flex items-center justify-center text-white mx-auto shadow-2xl shadow-red-500/30"
                        >
                            <XCircle size={48} />
                        </motion.div>
                        <h1 className="text-3xl font-black tracking-tight">Verification Failed</h1>
                        <p className="text-red-500 font-black uppercase tracking-widest text-[11px] px-4 leading-relaxed">
                            {message}
                        </p>
                        <Link href="/signup" className="block text-primary-600 font-black uppercase tracking-widest text-[10px] hover:underline pt-4">
                            Try Registering Again
                        </Link>
                    </>
                )}
            </div>
        </main>
    );
}
