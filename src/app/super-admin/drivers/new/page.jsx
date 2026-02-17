"use client";

import React, { useState, useEffect } from "react";
import {
    User,
    ArrowRight,
    Loader2,
    Phone,
    MapPin,
    IdCard,
    Building2,
    Truck,
    ChevronLeft,
    Camera,
    Info,
    CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Mock Data for Dropdowns
const MOCK_ORGS = [
    { id: "org-1", name: "Lagos Logistics", units: ["Apapa Hub", "Ikeja Depot"] },
    { id: "org-2", name: "Abuja Freight", units: ["Central Hub", "Wuse Terminal"] },
    { id: "org-3", name: "Kano Distribution", units: ["North Relay", "Ancient City Warehouse"] }
];

const VEHICLE_TYPES = ["Heavy Duty Truck", "Mini Van", "Delivery Bike", "Flatbed Trailer", "Refrigerated Van"];

export default function RegisterDriver() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        licenseNumber: "",
        phone: "",
        organization: "",
        unit: "",
        vehicleType: "",
        vehiclePlate: "",
        profileImage: null
    });

    const [availableUnits, setAvailableUnits] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "organization") {
            const selectedOrg = MOCK_ORGS.find(org => org.name === value);
            setAvailableUnits(selectedOrg ? selectedOrg.units : []);
            setFormData({ ...formData, organization: value, unit: "" }); // Reset unit when org changes
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Simulator API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success("Driver registered successfully!");
            router.push("/super-admin/drivers");
        } catch (error) {
            toast.error("Failed to register driver");
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full h-14 md:h-16 bg-neutral-50 dark:bg-neutral-800 rounded-[24px] pl-14 md:pl-16 pr-6 font-semibold border border-neutral-200 dark:border-neutral-700 focus:border-primary-600 outline-none transition-all shadow-inner focus:shadow-lg focus:shadow-primary-600/10 appearance-none text-sm md:text-base";
    const iconClasses = "text-neutral-400 group-focus-within:text-primary-600 transition-colors";
    const labelClasses = "text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 ml-4 block";

    return (
        <div className="max-w-7xl mx-auto overflow-y-auto space-y-8">
            {/* Nav */}
            <Link href="/super-admin/drivers" className="flex items-center gap-2 text-neutral-400 font-black uppercase tracking-widest text-[10px] hover:text-primary-600 transition-colors w-fit">
                <ChevronLeft size={16} strokeWidth={3} />
                Back to Fleet
            </Link>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">Register Driver</h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px] mt-2">Onboard new personnel to specific units</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Form Section */}
                <div className="lg:col-span-8 bg-white dark:bg-neutral-900 rounded-[40px] p-6 md:p-10 border border-neutral-100 dark:border-neutral-800 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/5 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none"></div>

                    <form onSubmit={handleSubmit} className="space-y-10 relative">

                        {/* Section 1: Personal Details */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-primary-600 flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-primary-600"></span> Personal Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Profile Photo Upload Mock */}
                                <div className="md:col-span-2 flex justify-center mb-4">
                                    <div className="relative group cursor-pointer">
                                        <div className="w-24 h-24 rounded-[32px] bg-neutral-100 dark:bg-neutral-800 border-2 border-dashed border-neutral-300 dark:border-neutral-700 flex flex-col items-center justify-center text-neutral-400 group-hover:border-primary-600 group-hover:text-primary-600 transition-all">
                                            <Camera size={24} />
                                            <span className="text-[8px] font-black uppercase tracking-widest mt-2">Add Photo</span>
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform">
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClasses}>Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 md:pl-6 flex items-center pointer-events-none">
                                            <User size={18} className={iconClasses} />
                                        </div>
                                        <input
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="e.g. John Doe"
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClasses}>Phone Number</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 md:pl-6 flex items-center pointer-events-none">
                                            <Phone size={18} className={iconClasses} />
                                        </div>
                                        <input
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="e.g. +234 812 345 6789"
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1 md:col-span-2">
                                    <label className={labelClasses}>Driver's License ID</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 md:pl-6 flex items-center pointer-events-none">
                                            <IdCard size={18} className={iconClasses} />
                                        </div>
                                        <input
                                            name="licenseNumber"
                                            required
                                            value={formData.licenseNumber}
                                            onChange={handleChange}
                                            placeholder="e.g. LAG-882991-AA"
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Deployment */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-primary-600 flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-primary-600"></span> Assignment
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1 md:col-span-2">
                                    <label className={labelClasses}>Organization</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 md:pl-6 flex items-center pointer-events-none">
                                            <Building2 size={18} className={iconClasses} />
                                        </div>
                                        <select
                                            name="organization"
                                            required
                                            value={formData.organization}
                                            onChange={handleChange}
                                            className={inputClasses}
                                        >
                                            <option value="" disabled>Select Organization</option>
                                            {MOCK_ORGS.map(org => (
                                                <option key={org.id} value={org.name}>{org.name}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                                            <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-neutral-400"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1 md:col-span-2">
                                    <label className={labelClasses}>Unit / Hub</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 md:pl-6 flex items-center pointer-events-none">
                                            <MapPin size={18} className={iconClasses} />
                                        </div>
                                        <select
                                            name="unit"
                                            required
                                            disabled={!formData.organization}
                                            value={formData.unit}
                                            onChange={handleChange}
                                            className={`${inputClasses} ${!formData.organization ? 'opacity-50 cursor-not-allowed bg-neutral-100 dark:bg-neutral-800' : ''}`}
                                        >
                                            <option value="" disabled>Select Assignment Unit</option>
                                            {availableUnits.map(unit => (
                                                <option key={unit} value={unit}>{unit}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                                            <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-neutral-400"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Vehicle Profile */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-primary-600 flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-primary-600"></span> Vehicle Profile
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className={labelClasses}>Primary Vehicle Classification</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 md:pl-6 flex items-center pointer-events-none">
                                            <Truck size={18} className={iconClasses} />
                                        </div>
                                        <select
                                            name="vehicleType"
                                            required
                                            value={formData.vehicleType}
                                            onChange={handleChange}
                                            className={inputClasses}
                                        >
                                            <option value="" disabled>Select Type</option>
                                            {VEHICLE_TYPES.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                                            <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-neutral-400"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClasses}>Vehicle Plate Number (Optional)</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 md:pl-6 flex items-center pointer-events-none">
                                            <div className="text-[10px] font-black border border-neutral-400 rounded px-1 text-neutral-500">ABC</div>
                                        </div>
                                        <input
                                            name="vehiclePlate"
                                            value={formData.vehiclePlate}
                                            onChange={handleChange}
                                            placeholder="e.g. AAA-123-BC"
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex justify-end">
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                disabled={loading}
                                className="h-14 px-10 md:h-16 md:px-12 bg-primary-600 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-primary-600/40 flex items-center justify-center gap-4 transition-all disabled:opacity-70 group w-full md:w-auto"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        Confirm Registration
                                        <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>
                </div>

                {/* Preview / Info Panel */}
                <div className="hidden lg:block lg:col-span-4 space-y-6 sticky top-24">
                    {/* Live Preview Card */}
                    <div className="p-6 bg-white dark:bg-neutral-900 rounded-[32px] border border-neutral-100 dark:border-neutral-800 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Live Card Preview</h3>
                            <span className="px-3 py-1 bg-green-100 text-green-600 dark:bg-green-900/20 rounded-full text-[9px] font-black uppercase tracking-widest">Active</span>
                        </div>

                        <div className="flex flex-col items-center text-center p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-3xl border border-neutral-100 dark:border-neutral-800">
                            <div className="w-20 h-20 rounded-2xl bg-neutral-200 dark:bg-neutral-700 mb-4 flex items-center justify-center overflow-hidden">
                                {formData.name ? (
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={32} className="text-neutral-400" />
                                )}
                            </div>
                            <h4 className="text-lg font-black dark:text-white uppercase tracking-tight mb-1">{formData.name || "Driver Name"}</h4>
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest bg-white dark:bg-neutral-800 px-3 py-1 rounded-lg border border-neutral-100 dark:border-neutral-700 shadow-sm">
                                {formData.licenseNumber || "License ID"}
                            </p>

                            <div className="w-full h-[1px] bg-neutral-200 dark:bg-neutral-700 my-6"></div>

                            <div className="w-full grid grid-cols-2 gap-4">
                                <div className="text-left">
                                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Assigned To</p>
                                    <p className="text-[10px] font-black dark:text-white uppercase tracking-tighter truncate">{formData.unit || "Unassigned"}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Vehicle</p>
                                    <p className="text-[10px] font-black dark:text-white uppercase tracking-tighter truncate">{formData.vehicleType || "TBD"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Card */}
                    <div className="p-6 bg-primary-600 text-white rounded-[32px] shadow-xl shadow-primary-600/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                        <Info size={24} className="mb-4 text-white/80" />
                        <h3 className="text-lg font-black uppercase tracking-tight mb-2">Driver Onboarding</h3>
                        <p className="text-[11px] font-medium leading-relaxed opacity-80 mb-6">
                            Ensure all license documents are verified before activating a driver. Drivers will receive an SMS with their login credentials once registered.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-white" />
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Background Check Cleared</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-white" />
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Valid License</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-white" />
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Vehicle Inspection</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
