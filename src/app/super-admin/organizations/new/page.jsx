"use client";

import React, { useState } from "react";
import {
    Building2,
    ArrowRight,
    Loader2,
    Mail,
    Phone,
    MapPin,
    Image as ImageIcon,
    ChevronLeft,
    Type,
    FileText
} from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterOrganization() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        secondaryPhone: "",
        description: "",
        profileImage: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/Organization/register", formData);
            toast.success("Organization registered successfully!");
            router.push("/super-admin/organizations");
        } catch (error) {
            toast.error(error.message || "Failed to register organization");
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full h-16 bg-white dark:bg-neutral-900 rounded-[24px] pl-16 pr-6 font-semibold border-2 border-transparent focus:border-primary-600 outline-none transition-all shadow-sm";
    const iconClasses = "text-neutral-400 group-focus-within:text-primary-600 transition-colors";

    return (
        <div className="max-w-4xl mx-auto space-y-10">
            {/* Nav */}
            <Link href="/super-admin/organizations" className="flex items-center gap-2 text-neutral-400 font-black uppercase tracking-widest text-[10px] hover:text-primary-600 transition-colors">
                <ChevronLeft size={16} strokeWidth={3} />
                Back to Organizations
            </Link>

            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">Register Organization</h1>
                <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px] mt-2">Introduce a new logistics partner to the network</p>
            </div>

            {/* Form Card */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[56px] p-6 md:p-12 border border-neutral-100 dark:border-neutral-800 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/5 blur-3xl rounded-full -mr-20 -mt-20"></div>

                <form onSubmit={handleSubmit} className="space-y-8 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="relative group md:col-span-2">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <Building2 size={18} className={iconClasses} />
                            </div>
                            <input
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Organization Official Name"
                                className={inputClasses}
                            />
                        </div>

                        {/* Email */}
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
                                placeholder="Primary Email Address"
                                className={inputClasses}
                            />
                        </div>

                        {/* Phone */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <Phone size={18} className={iconClasses} />
                            </div>
                            <input
                                name="phoneNumber"
                                required
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Primary Phone Number"
                                className={inputClasses}
                            />
                        </div>

                        {/* Secondary Phone */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <Phone size={18} className={iconClasses} />
                            </div>
                            <input
                                name="secondaryPhone"
                                value={formData.secondaryPhone}
                                onChange={handleChange}
                                placeholder="Secondary Phone (Optional)"
                                className={inputClasses}
                            />
                        </div>

                        {/* Profile Image URL */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <ImageIcon size={18} className={iconClasses} />
                            </div>
                            <input
                                name="profileImage"
                                value={formData.profileImage}
                                onChange={handleChange}
                                placeholder="Logo / Image URL"
                                className={inputClasses}
                            />
                        </div>

                        {/* Address */}
                        <div className="relative group md:col-span-2">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <MapPin size={18} className={iconClasses} />
                            </div>
                            <input
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Physical Headquarters Address"
                                className={inputClasses}
                            />
                        </div>

                        {/* Description */}
                        <div className="relative group md:col-span-2">
                            <div className="absolute inset-y-0 left-0 pl-6 pt-5 flex items-start pointer-events-none">
                                <FileText size={18} className={iconClasses} />
                            </div>
                            <textarea
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Organization Description & Services..."
                                className={`${inputClasses} h-auto py-5 pt-5 resize-none`}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            className="h-14 px-8 md:h-16 md:px-12 bg-primary-600 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-primary-600/40 flex items-center justify-center gap-4 transition-all disabled:opacity-70 group w-full md:w-auto"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Complete Registration
                                    <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
}
