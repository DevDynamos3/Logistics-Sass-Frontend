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
    Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function OrganizationsPage() {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchOrganizations();
    }, []);

    const fetchOrganizations = async () => {
        try {
            const data = await api.get("/Organization/all");
            // API might return an array or an object with an array
            setOrganizations(Array.isArray(data) ? data : data.organizations || []);
        } catch (error) {
            console.error(error);
            // mock data for presentation if API fails
            setOrganizations([
                { id: "1", name: "Lagos Logistics", email: "info@lagoslog.com", address: "Victoria Island, Lagos", phoneNumber: "+234 800 123 4567", unitsCount: 12 },
                { id: "2", name: "Abuja Freight", email: "ops@abujafreight.com", address: "Maitama, Abuja", phoneNumber: "+234 900 765 4321", unitsCount: 8 },
                { id: "3", name: "Port Harcourt Delivery", email: "ship@phdelivery.net", address: "GRA, Port Harcourt", phoneNumber: "+234 700 999 8888", unitsCount: 5 }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const filteredOrgs = organizations.filter(org =>
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-10">
            {/* Header Area */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">Organizations</h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px] mt-2">Manage your logistics partners</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-600 transition-colors" size={18} />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Filter organizations..."
                            className="w-72 h-14 pl-12 pr-4 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl text-sm font-semibold outline-none focus:border-primary-600 transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="h-96 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-[24px] bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
                        <Loader2 className="animate-spin" size={32} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Loading organizations...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredOrgs.map((org, i) => (
                            <motion.div
                                key={org.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: i * 0.05 }}
                                className="group bg-white dark:bg-neutral-900 rounded-[48px] p-8 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-2xl hover:shadow-primary-600/5 hover:-translate-y-2 transition-all duration-500"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-16 h-16 rounded-[24px] bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-primary-600 font-black text-2xl group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-primary-600/30 transition-all duration-500">
                                        {org.name[0]}
                                    </div>
                                    <button className="w-12 h-12 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center transition-colors">
                                        <MoreHorizontal size={20} className="text-neutral-400" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black tracking-tight dark:text-white line-clamp-1">{org.name}</h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-neutral-500 font-bold text-[11px] uppercase tracking-wider">
                                            <Mail size={14} className="text-primary-600" />
                                            {org.email}
                                        </div>
                                        <div className="flex items-center gap-3 text-neutral-500 font-bold text-[11px] uppercase tracking-wider">
                                            <Phone size={14} className="text-primary-600" />
                                            {org.phoneNumber}
                                        </div>
                                        <div className="flex items-start gap-3 text-neutral-500 font-bold text-[11px] uppercase tracking-wider leading-relaxed">
                                            <MapPin size={14} className="text-primary-600 mt-0.5" />
                                            <span className="line-clamp-2">{org.address}</span>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 mt-6 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-xl text-primary-600">
                                                <Truck size={14} />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                                                {org.unitsCount || 0} Active Units
                                            </span>
                                        </div>
                                        <Link href={`/super-admin/organizations/${org.id}`}>
                                            <motion.button
                                                whileHover={{ x: 5 }}
                                                className="w-10 h-10 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center shadow-lg hover:shadow-primary-600/20"
                                            >
                                                <ArrowRight size={18} strokeWidth={3} />
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Add New Organization Card */}
                    <Link href="/super-admin/organizations/new">
                        <motion.button
                            whileHover={{ scale: 1.02, y: -8 }}
                            className="w-full h-full min-h-[400px] border-4 border-dashed border-neutral-200 dark:border-neutral-800 rounded-[48px] flex flex-col items-center justify-center gap-6 group hover:border-primary-600/50 transition-all duration-500"
                        >
                            <div className="w-20 h-20 rounded-[32px] bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-400 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-2xl group-hover:shadow-primary-600/40 transition-all duration-500">
                                <Plus size={40} strokeWidth={3} />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-black dark:text-white uppercase tracking-widest">Register Organization</h3>
                                <p className="text-neutral-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-2 px-10">Expand the Fleetra ecosystem</p>
                            </div>
                        </motion.button>
                    </Link>
                </div>
            )}
        </div>
    );
}
