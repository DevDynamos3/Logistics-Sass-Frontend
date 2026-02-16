"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail, Mail as UserIcon, Lock, ArrowRight, Loader2, Phone, User,
    Truck, Building2, UserCircle, MapPin, AlignLeft
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const { signup, driverSignup } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("user"); // user or driver
    const [driverType, setDriverType] = useState("individual"); // individual or organization

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: "",
        phoneNumber: "",
        bio: "",
        address: "",
        unitId: "" // For organization drivers
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (role === "user") {
                await signup({
                    email: formData.email,
                    password: formData.password,
                    fullName: formData.fullName,
                    phoneNumber: formData.phoneNumber
                });
            } else {
                await driverSignup({
                    email: formData.email,
                    password: formData.password,
                    fullName: formData.fullName,
                    phoneNumber: formData.phoneNumber,
                    bio: formData.bio || "No bio provided",
                    address: formData.address || "No address provided",
                    profileImage: "https://via.placeholder.com/150", // Placeholder
                    unitId: driverType === "organization" ? formData.unitId : "00000000-0000-0000-0000-000000000000" // Individual driver unitId
                });
            }
            toast.success("Account created! Please check your email to verify.");
            router.push("/login");
        } catch (error) {
            toast.error(error.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full h-16 bg-white dark:bg-neutral-900 rounded-[20px] pl-16 pr-6 font-semibold border-2 border-transparent focus:border-primary-600 outline-none transition-all shadow-sm";
    const iconClasses = "text-neutral-400 group-focus-within:text-primary-600 transition-colors";

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-black font-sans px-3 py-10">
            <div className="w-full max-w-xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white">Create Account</h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px] mt-2">Join the Fleetra ecosystem today</p>
                </div>

                {/* Role Switcher */}
                <div className="flex p-2 bg-neutral-200/50 dark:bg-neutral-900/50 backdrop-blur-xl rounded-[32px] max-w-sm mx-auto shadow-inner">
                    <button
                        onClick={() => setRole("user")}
                        className={`flex-1 py-4 rounded-[24px] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all ${role === 'user' ? 'bg-primary-600 text-white shadow-xl' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
                    >
                        <UserIcon size={16} />
                        Customer
                    </button>
                    <button
                        onClick={() => setRole("driver")}
                        className={`flex-1 py-4 rounded-[24px] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all ${role === 'driver' ? 'bg-primary-600 text-white shadow-xl' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
                    >
                        <Truck size={16} />
                        Driver
                    </button>
                </div>

                {/* Driver Type Switcher (only if role is driver) */}
                <AnimatePresence>
                    {role === "driver" && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="flex gap-4 pb-4">
                                <button
                                    onClick={() => setDriverType("individual")}
                                    className={`flex-1 flex flex-col items-center p-6 rounded-[32px] border-2 transition-all ${driverType === 'individual' ? 'border-primary-600 bg-white dark:bg-neutral-900 shadow-xl' : 'border-transparent bg-neutral-100 dark:bg-neutral-900/50 opacity-60'}`}
                                >
                                    <UserCircle size={32} className={driverType === 'individual' ? 'text-primary-600' : ''} />
                                    <span className="text-[10px] font-black uppercase tracking-widest mt-3">Individual</span>
                                </button>
                                <button
                                    onClick={() => setDriverType("organization")}
                                    className={`flex-1 flex flex-col items-center p-6 rounded-[32px] border-2 transition-all ${driverType === 'organization' ? 'border-primary-600 bg-white dark:bg-neutral-900 shadow-xl' : 'border-transparent bg-neutral-100 dark:bg-neutral-900/50 opacity-60'}`}
                                >
                                    <Building2 size={32} className={driverType === 'organization' ? 'text-primary-600' : ''} />
                                    <span className="text-[10px] font-black uppercase tracking-widest mt-3">Organization</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative group md:col-span-2">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <User size={18} className={iconClasses} />
                            </div>
                            <input
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className={inputClasses}
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <Mail size={18} className={iconClasses} />
                            </div>
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className={inputClasses}
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <Phone size={18} className={iconClasses} />
                            </div>
                            <input
                                name="phoneNumber"
                                required
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className={inputClasses}
                            />
                        </div>

                        <div className="relative group md:col-span-2">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <Lock size={18} className={iconClasses} />
                            </div>
                            <input
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create Password"
                                className={inputClasses}
                            />
                        </div>

                        {role === "driver" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="md:col-span-2 space-y-4"
                            >
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <MapPin size={18} className={iconClasses} />
                                    </div>
                                    <input
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Physical Address"
                                        className={inputClasses}
                                    />
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-6 pt-5 flex items-start pointer-events-none">
                                        <AlignLeft size={18} className={iconClasses} />
                                    </div>
                                    <textarea
                                        name="bio"
                                        rows={3}
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Driver Bio (Exp, Specialty...)"
                                        className={`${inputClasses} h-auto py-5 pt-5 resize-none`}
                                    />
                                </div>

                                {driverType === "organization" && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="relative group"
                                    >
                                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                            <Building2 size={18} className={iconClasses} />
                                        </div>
                                        <input
                                            name="unitId"
                                            required
                                            value={formData.unitId}
                                            onChange={handleChange}
                                            placeholder="Unit ID / Organization UUID"
                                            className={inputClasses}
                                        />
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </div>

                    <p className="px-6 text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-relaxed">
                        By clicking sign up, you agree to our <span className="text-primary-600">Terms of Service</span> and <span className="text-primary-600">Privacy Policy</span>.
                    </p>

                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        className="w-full h-16 bg-primary-600 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary-600/40 flex items-center justify-center gap-3 transition-all disabled:opacity-70 mt-8"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                Create {role === 'driver' ? 'Driver' : 'User'} Account
                                <ArrowRight size={18} strokeWidth={3} />
                            </>
                        )}
                    </motion.button>
                </form>

                <p className="text-center text-sm font-medium text-neutral-500">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary-600 font-black hover:underline ml-1">
                        Sign In
                    </Link>
                </p>
            </div>
        </main>
    );
}
