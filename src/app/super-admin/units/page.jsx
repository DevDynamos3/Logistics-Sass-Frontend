"use client";

import React, { useState, useEffect } from "react";
import {
    Truck,
    Search,
    MapPin,
    Phone,
    Building2,
    MoreHorizontal,
    Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

export default function UnitsManagement() {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        // Since there is no 'get all units' endpoint provided, 
        // we normally fetch all orgs and their units or wait for an endpoint.
        // For now, we show a list and use mock data.
        const fetchAllUnits = async () => {
            try {
                // Mocking the behavior for now
                setUnits([
                    { id: "u1", unitName: "Main Depot", organizationName: "Lagos Logistics", phoneNumber: "+234 812 345 6780", address: "Apapa Port, Lagos" },
                    { id: "u2", unitName: "North Distribution", organizationName: "Lagos Logistics", phoneNumber: "+234 812 345 6781", address: "Ikeja, Lagos" },
                    { id: "u3", unitName: "Central Hub", organizationName: "Abuja Freight", phoneNumber: "+234 900 765 4321", address: "Maitama, Abuja" }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchAllUnits();
    }, []);

    const filteredUnits = units.filter(unit =>
        unit.unitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        unit.organizationName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">Unit Management</h1>
                <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px] mt-2">Oversee all distribution units across organizations</p>
            </div>

            <div className="flex gap-4">
                <div className="relative group w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-600 transition-colors" size={18} />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by unit or organization..."
                        className="w-full h-14 pl-12 pr-4 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl text-sm font-semibold outline-none focus:border-primary-600 transition-all shadow-sm"
                    />
                </div>
            </div>

            {loading ? (
                <div className="h-96 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="animate-spin text-primary-600" size={32} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Loading units...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredUnits.map((unit, i) => (
                            <motion.div
                                key={unit.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-neutral-900 rounded-[40px] p-8 border border-neutral-100 dark:border-neutral-800 shadow-sm relative overflow-hidden group"
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-primary-600 shadow-inner group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                                        <Truck size={24} />
                                    </div>
                                    <button className="w-10 h-10 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center justify-center">
                                        <MoreHorizontal size={18} className="text-neutral-400" />
                                    </button>
                                </div>

                                <span className="text-[10px] font-black uppercase tracking-widest text-primary-600 flex items-center gap-1.5 mb-2">
                                    <Building2 size={12} />
                                    {unit.organizationName}
                                </span>
                                <h3 className="text-xl font-black tracking-tight dark:text-white mb-6 uppercase tracking-tight">{unit.unitName}</h3>

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
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
