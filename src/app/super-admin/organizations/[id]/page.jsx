"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
    Building2,
    Truck,
    Plus,
    ArrowRight,
    Loader2,
    Mail,
    Phone,
    MapPin,
    ChevronLeft,
    MoreHorizontal,
    Globe,
    Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function OrganizationDetails() {
    const { id } = useParams();
    const [org, setOrg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addingUnit, setAddingUnit] = useState(false);
    const [newUnit, setNewUnit] = useState({
        organizationId: id,
        unitName: "",
        phoneNumber: "",
        address: "",
        secondaryPhone: "",
        description: ""
    });

    useEffect(() => {
        fetchOrgDetails();
    }, [id]);

    const fetchOrgDetails = async () => {
        try {
            const data = await api.get(`/Organization/${id}`);
            setOrg(data);
        } catch (error) {
            console.error(error);
            // Mock data if API fails
            setOrg({
                id,
                name: "Lagos Logistics Hub",
                email: "mgmt@lagoslog.com",
                phoneNumber: "+234 812 345 6789",
                address: "Plot 12, Adeola Hopewell, VI, Lagos",
                description: "Premier logistics and supply chain provider for West Africa.",
                units: [
                    { id: "u1", unitName: "Main Depot", phoneNumber: "+234 812 345 6780", address: "Apapa Port, Lagos" },
                    { id: "u2", unitName: "North Distribution", phoneNumber: "+234 812 345 6781", address: "Ikeja, Lagos" }
                ]
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddUnit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/Organization/add-unit", newUnit);
            toast.success("Unit added successfully!");
            setAddingUnit(false);
            fetchOrgDetails(); // Refresh
        } catch (error) {
            toast.error(error.message || "Failed to add unit");
        } finally {
            setLoading(false);
        }
    };

    if (loading && !org) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Nav */}
            <Link href="/super-admin/organizations" className="flex items-center gap-2 text-neutral-400 font-black uppercase tracking-widest text-[10px] hover:text-primary-600 transition-colors">
                <ChevronLeft size={16} strokeWidth={3} />
                Back to Organizations
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Profile Card */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white dark:bg-neutral-900 rounded-[56px] p-10 border border-neutral-100 dark:border-neutral-800 shadow-xl text-center">
                        <div className="w-24 h-24 rounded-[32px] bg-primary-600 flex items-center justify-center text-white mx-auto text-4xl font-black shadow-2xl shadow-primary-600/30 mb-6">
                            {org.name[0]}
                        </div>
                        <h1 className="text-2xl font-black tracking-tight dark:text-white">{org.name}</h1>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary-600 mt-2 bg-primary-100 dark:bg-primary-900/30 inline-block px-4 py-1.5 rounded-full">
                            Premium Partner
                        </p>

                        <div className="mt-10 space-y-4 text-left">
                            <div className="p-5 bg-neutral-50 dark:bg-neutral-800 rounded-3xl space-y-3">
                                <div className="flex items-center gap-3 text-neutral-500 font-bold text-[10px] uppercase tracking-wider">
                                    <Mail size={14} className="text-primary-600" />
                                    {org.email}
                                </div>
                                <div className="flex items-center gap-3 text-neutral-500 font-bold text-[10px] uppercase tracking-wider">
                                    <Phone size={14} className="text-primary-600" />
                                    {org.phoneNumber}
                                </div>
                                <div className="flex items-start gap-3 text-neutral-500 font-bold text-[10px] uppercase tracking-wider">
                                    <MapPin size={14} className="text-primary-600 mt-0.5" />
                                    <span className="leading-relaxed">{org.address}</span>
                                </div>
                            </div>

                            <div className="p-6 border border-neutral-100 dark:border-neutral-800 rounded-3xl">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-3">About</h3>
                                <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 leading-relaxed italic">
                                    "{org.description || 'No description available for this organization.'}"
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <button className="py-4 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest">
                                Edit Profile
                            </button>
                            <button className="py-4 rounded-2xl border-2 border-neutral-100 dark:border-neutral-800 text-neutral-400 text-[10px] font-black uppercase tracking-widest hover:bg-neutral-50 dark:hover:bg-neutral-800">
                                More
                            </button>
                        </div>
                    </div>

                    <div className="bg-primary-600 rounded-[40px] p-8 text-white shadow-2xl shadow-primary-600/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                <Shield size={20} />
                            </div>
                            <h3 className="font-black text-sm uppercase tracking-widest">Compliance Status</h3>
                        </div>
                        <p className="text-xs font-medium text-white/70 leading-relaxed mb-6">All safety audits and legal documentations are currently up to date.</p>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-white rounded-full"></div>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest mt-3 block">Fully Verified</span>
                    </div>
                </div>

                {/* Units Section */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-8 bg-primary-600 rounded-full"></div>
                            <h2 className="text-2xl font-black tracking-tight dark:text-white">Active Units</h2>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setAddingUnit(true)}
                            className="px-6 py-3 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl shadow-primary-600/20"
                        >
                            <Plus size={16} strokeWidth={3} />
                            Add Unit
                        </motion.button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatePresence>
                            {org.units?.map((unit, i) => (
                                <motion.div
                                    key={unit.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-8 bg-white dark:bg-neutral-900 rounded-[40px] border border-neutral-100 dark:border-neutral-800 shadow-sm relative overflow-hidden group"
                                >
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="w-14 h-14 rounded-2xl bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-primary-600 shadow-inner group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                                            <Building2 size={24} />
                                        </div>
                                        <button className="w-10 h-10 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center justify-center">
                                            <MoreHorizontal size={18} className="text-neutral-400" />
                                        </button>
                                    </div>
                                    <h3 className="text-xl font-black tracking-tight dark:text-white mb-4">{unit.unitName}</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-neutral-500 font-bold text-[10px] uppercase tracking-wider">
                                            <Phone size={14} className="text-primary-600" />
                                            {unit.phoneNumber}
                                        </div>
                                        <div className="flex items-start gap-3 text-neutral-500 font-bold text-[10px] uppercase tracking-wider">
                                            <MapPin size={14} className="text-primary-600 mt-0.5" />
                                            <span className="leading-relaxed line-clamp-1">{unit.address}</span>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight size={20} className="text-primary-600" />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Add Unit Modal Shadow */}
                    <AnimatePresence>
                        {addingUnit && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/20">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-[56px] shadow-2xl border border-neutral-100 dark:border-neutral-800 p-12 relative"
                                >
                                    <button
                                        onClick={() => setAddingUnit(false)}
                                        className="absolute top-8 right-8 w-12 h-12 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-400"
                                    >
                                        <ChevronLeft size={24} className="rotate-90" />
                                    </button>

                                    <div className="mb-10">
                                        <h2 className="text-3xl font-black tracking-tight dark:text-white">Add New Unit</h2>
                                        <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px] mt-2">Deploy a distribution or service unit</p>
                                    </div>

                                    <form onSubmit={handleAddUnit} className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="relative group col-span-2 md:col-span-1">
                                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                                    <Building2 size={18} className="text-neutral-400 group-focus-within:text-primary-600 transition-colors" />
                                                </div>
                                                <input
                                                    required
                                                    placeholder="Unit Name"
                                                    value={newUnit.unitName}
                                                    onChange={(e) => setNewUnit({ ...newUnit, unitName: e.target.value })}
                                                    className="w-full h-16 bg-neutral-50 dark:bg-neutral-800 rounded-[24px] pl-16 pr-6 font-semibold outline-none focus:ring-2 ring-primary-600 transition-all shadow-inner"
                                                />
                                            </div>
                                            <div className="relative group col-span-2 md:col-span-1">
                                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                                    <Phone size={18} className="text-neutral-400 group-focus-within:text-primary-600 transition-colors" />
                                                </div>
                                                <input
                                                    required
                                                    placeholder="Phone Number"
                                                    value={newUnit.phoneNumber}
                                                    onChange={(e) => setNewUnit({ ...newUnit, phoneNumber: e.target.value })}
                                                    className="w-full h-16 bg-neutral-50 dark:bg-neutral-800 rounded-[24px] pl-16 pr-6 font-semibold outline-none focus:ring-2 ring-primary-600 transition-all shadow-inner"
                                                />
                                            </div>
                                            <div className="relative group col-span-2">
                                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                                    <MapPin size={18} className="text-neutral-400 group-focus-within:text-primary-600 transition-colors" />
                                                </div>
                                                <input
                                                    required
                                                    placeholder="Physical Address"
                                                    value={newUnit.address}
                                                    onChange={(e) => setNewUnit({ ...newUnit, address: e.target.value })}
                                                    className="w-full h-16 bg-neutral-50 dark:bg-neutral-800 rounded-[24px] pl-16 pr-6 font-semibold outline-none focus:ring-2 ring-primary-600 transition-all shadow-inner"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-4 mt-8">
                                            <button
                                                type="button"
                                                onClick={() => setAddingUnit(false)}
                                                className="px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] text-neutral-500 hover:text-neutral-900 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <motion.button
                                                whileTap={{ scale: 0.98 }}
                                                className="px-10 py-5 bg-primary-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-primary-600/30 flex items-center gap-3"
                                            >
                                                Register Unit
                                                <ArrowRight size={16} strokeWidth={3} />
                                            </motion.button>
                                        </div>
                                    </form>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
