"use client";

import React, { useState, useEffect } from "react";
import {
    Building2,
    MoreHorizontal,
    Search,
    Plus,
    Truck,
    MapPin,
    Mail,
    Phone,
    ArrowRight,
    Loader2,
    Filter,
    FilterX,
    CheckCircle2,
    Clock,
    ShieldOff,
    Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function OrganizationsPage() {
    const [activeStatus, setActiveStatus] = useState("All");
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchOrganizations();
    }, []);

    const fetchOrganizations = async () => {
        try {
            const data = await api.get("/Organization/all");
            const orgs = Array.isArray(data) ? data : data.organizations || [];
            // Adding mock status for UI variety since it might not be in API yet
            const enrichedOrgs = orgs.map(o => ({
                ...o,
                status: o.id === "1" ? "Active" : o.id === "2" ? "Pending" : "Active"
            }));
            setOrganizations(enrichedOrgs);
        } catch (error) {
            console.error(error);
            setOrganizations([
                { id: "1", name: "Lagos Logistics", email: "info@lagoslog.com", address: "Victoria Island, Lagos", phoneNumber: "+234 800 123 4567", unitsCount: 12, status: "Active" },
                { id: "2", name: "Abuja Freight", email: "ops@abujafreight.com", address: "Maitama, Abuja", phoneNumber: "+234 900 765 4321", unitsCount: 8, status: "Pending" },
                { id: "3", name: "Port Harcourt Delivery", email: "ship@phdelivery.net", address: "GRA, Port Harcourt", phoneNumber: "+234 700 999 8888", unitsCount: 5, status: "Active" },
                { id: "4", name: "Kano Swift Move", email: "kmove@gmail.com", address: "Kofar Nassarawa, Kano", phoneNumber: "+234 811 000 1122", unitsCount: 3, status: "Inactive" }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const filteredOrgs = organizations.filter(org => {
        const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            org.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = activeStatus === "All" || org.status === activeStatus;
        return matchesSearch && matchesStatus;
    });

    const SkeletonRow = () => (
        <tr className="animate-pulse border-b border-neutral-100 dark:border-neutral-800">
            <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-2xl"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-32 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                        <div className="h-3 w-24 bg-neutral-50 dark:bg-neutral-900 rounded"></div>
                    </div>
                </div>
            </td>
            <td className="px-8 py-6"><div className="h-4 w-40 bg-neutral-100 dark:bg-neutral-800 rounded"></div></td>
            <td className="px-8 py-6"><div className="h-4 w-24 bg-neutral-100 dark:bg-neutral-800 rounded"></div></td>
            <td className="px-8 py-6"><div className="h-4 w-12 bg-neutral-100 dark:bg-neutral-800 rounded"></div></td>
            <td className="px-8 py-6"><div className="h-10 w-24 bg-neutral-100 dark:bg-neutral-800 rounded-xl ml-auto"></div></td>
        </tr>
    );

    return (
        <div className="space-y-10">
            {/* Header Area */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white uppercase tracking-tighter">Organizations</h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px] mt-2">Manage your logistics partners</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                    <div className="relative group w-full sm:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-600 transition-colors" size={18} />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Filter organizations..."
                            className="w-full h-14 pl-12 pr-4 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl text-sm font-semibold outline-none focus:border-primary-600 transition-all shadow-sm"
                        />
                    </div>
                    <Link href="/super-admin/organizations/new" className="w-full sm:w-auto">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="w-full h-14 px-8 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-xl shadow-primary-600/30"
                        >
                            <Plus size={18} strokeWidth={3} />
                            Register Org
                        </motion.button>
                    </Link>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Partners", value: organizations.length, icon: Building2, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/10" },
                    { label: "Network Units", value: organizations.reduce((acc, curr) => acc + (curr.unitsCount || 0), 0), icon: Truck, color: "text-primary-600", bg: "bg-primary-50 dark:bg-primary-900/10" },
                    { label: "Active Nodes", value: organizations.filter(o => o.status === "Active").length, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/10" },
                ].map((m, i) => (
                    <motion.div
                        key={m.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-100 dark:border-neutral-800 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl ${m.bg} ${m.color} flex items-center justify-center`}>
                                <m.icon size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{m.label}</p>
                                <p className="text-xl font-black dark:text-white">{m.value}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Filter Tabs */}
            <div className="flex overflow-x-auto scrollbar-hide gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800/50 w-full md:w-fit rounded-[20px] border border-neutral-200 dark:border-neutral-800">
                {["All", "Active", "Pending", "Inactive"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setActiveStatus(status)}
                        className={`px-6 py-2 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex-1 md:flex-none ${activeStatus === status
                            ? "bg-white dark:bg-neutral-800 text-primary-600 shadow-sm"
                            : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[40px] border border-neutral-100 dark:border-neutral-800 overflow-hidden shadow-sm min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/50">
                                <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Organization</th>
                                <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Location</th>
                                <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</th>
                                <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Units</th>
                                <th className="px-6 md:px-8 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50 dark:divide-neutral-800">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => <SkeletonRow key={i} />)
                            ) : filteredOrgs.length > 0 ? (
                                <AnimatePresence mode="popLayout">
                                    {filteredOrgs.map((org, i) => (
                                        <motion.tr
                                            key={org.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                                        >
                                            <td className="px-6 md:px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center font-black text-lg group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-inner">
                                                        {org.name[0]}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-sm dark:text-white group-hover:text-primary-600 transition-colors uppercase tracking-tight">{org.name}</span>
                                                        <span className="text-[10px] text-neutral-400 font-medium lowercase italic">{org.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 md:px-8 py-6">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 text-neutral-500 font-bold text-[10px] uppercase tracking-wider">
                                                        <MapPin size={12} className="text-primary-600" />
                                                        <span className="truncate max-w-[150px]">{org.address.split(',')[0]}</span>
                                                    </div>
                                                    <span className="text-[10px] text-neutral-400 ml-5">{org.address.split(',')[1] || ''}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 md:px-8 py-6">
                                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${org.status === 'Active' ? 'bg-green-100 text-green-600 dark:bg-green-900/20' :
                                                    org.status === 'Pending' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20' :
                                                        'bg-neutral-100 text-neutral-600 dark:bg-neutral-800'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${org.status === 'Active' ? 'bg-green-500' :
                                                        org.status === 'Pending' ? 'bg-orange-500' : 'bg-neutral-400'
                                                        }`} />
                                                    {org.status}
                                                </span>
                                            </td>
                                            <td className="px-6 md:px-8 py-6">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-1 px-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-primary-600 text-[10px] font-black">
                                                            {org.unitsCount || 0}
                                                        </div>
                                                        <span className="text-[10px] font-black uppercase text-neutral-400">Deployed</span>
                                                    </div>
                                                    <div className="w-20 h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-primary-600"
                                                            style={{ width: `${Math.min((org.unitsCount || 0) * 10, 100)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 md:px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/super-admin/organizations/${org.id}`}>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className="h-10 px-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm"
                                                        >
                                                            Manage <ArrowRight size={14} strokeWidth={3} />
                                                        </motion.button>
                                                    </Link>
                                                    <button className="w-10 h-10 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-400 transition-colors">
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-32">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="w-20 h-20 rounded-[32px] bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-neutral-300 mb-6">
                                                <FilterX size={32} />
                                            </div>
                                            <h3 className="text-xl font-black dark:text-white uppercase tracking-tight">No results matched</h3>
                                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-2">Try adjusting your filters or search query</p>
                                            <button
                                                onClick={() => { setSearchQuery(""); setActiveStatus("All"); }}
                                                className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 hover:tracking-[0.3em] transition-all"
                                            >
                                                Clear All Filters
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
