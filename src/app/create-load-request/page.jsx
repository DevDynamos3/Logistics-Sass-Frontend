"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    Package,
    Box,
    Truck,
    Car,
    MapPin,
    Flag,
    Camera,
    Video,
    Info,
    Calendar,
    Weight,
    ArrowRight,
    Utensils,
    Shirt,
    Smartphone,
    Navigation,
    CheckCircle2,
    Mic,
    PlayCircle,
    Home,
    Container,
    ArrowLeft,
    Handshake,
    MessageSquare,
    X
} from "lucide-react";
import { useRouter } from "next/navigation";
import BottomTabBar from "@/components/BottomTabBar";

const loadTypes = [
    { id: "relocation", label: "Relocation", icon: Home, desc: "Moving House / Office", color: "bg-indigo-600" },
    { id: "container", label: "Container", icon: Container, desc: "20ft / 40ft Cargo", color: "bg-emerald-600" },
    { id: "food", label: "Food", icon: Utensils, desc: "Rice, Meat, Items", color: "bg-orange-500" },
    { id: "clothes", label: "Clothes", icon: Shirt, desc: "Bags, Shoes, Fabrics", color: "bg-blue-500" },
    { id: "electronics", label: "Electronics", icon: Smartphone, desc: "Phones, TV, Laptop", color: "bg-purple-500" },
    { id: "boxes", label: "General", icon: Box, desc: "Cartons & Packages", color: "bg-primary-600" },
    { id: "heavy", label: "Heavy", icon: Truck, desc: "Furniture, Cement", color: "bg-neutral-600" },
    { id: "parts", label: "Auto Parts", icon: Car, desc: "Cars & Spare Parts", color: "bg-red-500" },
];

export default function CreateLoadRequest() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isCreating, setIsCreating] = useState(false);
    const [isFinding, setIsFinding] = useState(false);
    const [showDrivers, setShowDrivers] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [formData, setFormData] = useState({
        pickup: "",
        destination: "",
        hasMedia: false
    });

    const drivers = [
        { id: 1, name: "James Wilson", rating: 4.9, info: "Heavy Truck • 2.5 miles away", image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=200&h=200&auto=format&fit=crop" },
        { id: 2, name: "Elena Rodriguez", rating: 4.8, info: "Cargo Van • 4.1 miles away", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop" },
        { id: 3, name: "Marcus Chen", rating: 5.0, info: "Semi-Trailer • 0.8 miles away", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop" },
    ];

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => {
        if (showDrivers) setShowDrivers(false);
        else if (isFinding) setIsFinding(false);
        else if (step === 1) router.back();
        else setStep(s => s - 1);
    };

    const toggleType = (id) => {
        if (selectedTypes.includes(id)) {
            setSelectedTypes(selectedTypes.filter(t => t !== id));
        } else {
            setSelectedTypes([...selectedTypes, id]);
        }
    };

    const handleFinalCreate = () => {
        setIsCreating(true);
        setTimeout(() => {
            setIsCreating(false);
            setIsFinding(true);
            setTimeout(() => {
                setIsFinding(false);
                setShowDrivers(true);
            }, 3000);
        }, 1000);
    };

    const handleNegotiate = (driverId) => {
        router.push(`/negotiate/${driverId}`);
    };

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-black font-sans pb-44">
            {/* High-Contrast Interactive Header */}
            <nav className="sticky top-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-3xl border-b border-neutral-100 dark:border-neutral-900 pb-2">
                <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">
                    <motion.button
                        onClick={prevStep}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-800 dark:text-white border-2 border-neutral-200 dark:border-neutral-800 shadow-sm"
                    >
                        <ArrowLeft size={24} strokeWidth={3} />
                    </motion.button>

                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.3em] mb-1">Process {step} / 4</span>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4].map(i => (
                                <div
                                    key={i}
                                    className={`h-2 rounded-full transition-all duration-700 ${i <= step ? "w-10 bg-primary-600 shadow-lg shadow-primary-600/30" : "w-3 bg-neutral-200 dark:bg-neutral-800"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600"
                    >
                        <PlayCircle size={24} />
                    </motion.button>
                </div>
            </nav>

            <div className="px-3 pt-8">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-6">
                                <h1 className="text-4xl font-black tracking-tight mb-2">Pick Items</h1>
                                <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px]">Select all things you are sending</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {loadTypes.map((item) => {
                                    const isActive = selectedTypes.includes(item.id);
                                    return (
                                        <motion.button
                                            key={item.id}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => toggleType(item.id)}
                                            className={`flex flex-col items-center justify-center p-6 rounded-[48px] transition-all relative overflow-hidden h-44 border-4 transition-all duration-300 ${isActive
                                                ? "border-primary-600 bg-white dark:bg-neutral-950 shadow-2xl shadow-primary-600/20 ring-4 ring-primary-500/5 scale-[1.02]"
                                                : "border-transparent bg-white dark:bg-neutral-900 shadow-sm"
                                                }`}
                                        >
                                            <div className={`w-16 h-16 rounded-[28px] ${item.color} text-white flex items-center justify-center mb-3 shadow-xl`}>
                                                <item.icon size={30} strokeWidth={2.5} />
                                            </div>
                                            <span className={`font-black text-lg tracking-tight leading-none mb-1 ${isActive ? 'text-neutral-900 dark:text-white' : 'text-neutral-400 opacity-60'}`}>
                                                {item.label}
                                            </span>
                                            <p className={`text-[9px] font-bold uppercase tracking-tighter text-center px-2 ${isActive ? 'text-neutral-500' : 'text-neutral-400 opacity-40'}`}>
                                                {item.desc}
                                            </p>
                                            {isActive && (
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-4 right-4 text-primary-600">
                                                    <CheckCircle2 size={24} fill="currentColor" className="text-primary-600" />
                                                    <div className="absolute inset-0 bg-white -z-10 rounded-full" />
                                                </motion.div>
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            className="space-y-8"
                        >
                            <div className="text-center mb-8">
                                <h1 className="text-4xl font-black tracking-tight mb-2">Locations</h1>
                                <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px]">Where do we pick & drop?</p>
                            </div>

                            {/* Pickup Module */}
                            <div className="bg-white dark:bg-neutral-900 rounded-[48px] p-6 border-2 border-primary-100 dark:border-neutral-800 shadow-xl shadow-primary-600/5 overflow-hidden">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-[24px] bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-600/30 shrink-0">
                                            <MapPin size={32} strokeWidth={2.5} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2 px-1">Where to start?</p>
                                            <div className="bg-slate-50 dark:bg-neutral-800 rounded-2xl p-4 shadow-inner">
                                                <input
                                                    autoFocus
                                                    placeholder="Home Or Office Address"
                                                    className="w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none outline-none text-base font-semibold placeholder:text-neutral-300 dark:placeholder:text-neutral-600"
                                                    value={formData.pickup}
                                                    onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Destination Module */}
                            <div className="bg-white dark:bg-neutral-900 rounded-[48px] p-6 border-2 border-neutral-100 dark:border-neutral-800 shadow-sm relative overflow-hidden">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-[24px] bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/30 shrink-0">
                                            <Flag size={32} strokeWidth={2.5} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2 px-1">Where to deliver?</p>
                                            <div className="bg-slate-50 dark:bg-neutral-800 rounded-2xl p-4 shadow-inner">
                                                <input
                                                    placeholder="Type new address here"
                                                    className="w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none outline-none text-base font-semibold placeholder:text-neutral-300 dark:placeholder:text-neutral-600"
                                                    value={formData.destination}
                                                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary-50 dark:bg-primary-900/10 p-6 rounded-[32px] border border-primary-100 dark:border-primary-900/30 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center text-primary-600">
                                    <Handshake size={24} />
                                </div>
                                <p className="text-xs font-bold leading-snug">Prices are not fixed. You will negotiate and agree on a price directly with your driver.</p>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="space-y-10 py-4"
                        >
                            <div className="text-center">
                                <h1 className="text-4xl font-black tracking-tight mb-3">
                                    {formData.hasMedia ? "Looks Good!" : "Snap Photo"}
                                </h1>
                                <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px]">
                                    {formData.hasMedia ? "Your items are recorded" : "Show us what we are carrying"}
                                </p>
                            </div>

                            <div className="relative">
                                {!formData.hasMedia ? (
                                    <motion.button
                                        whileTap={{ scale: 0.96 }}
                                        onClick={() => setFormData({ ...formData, hasMedia: true })}
                                        className="w-full h-[320px] bg-white dark:bg-neutral-900 rounded-[56px] border-4 border-dashed border-primary-300 dark:border-neutral-800 flex flex-col items-center justify-center group overflow-hidden relative shadow-2xl"
                                    >
                                        <div className="absolute inset-0 bg-primary-600/5 group-hover:bg-primary-600/10 transition-colors" />
                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className="w-24 h-24 rounded-[36px] bg-primary-600 text-white flex items-center justify-center mb-6 shadow-2xl shadow-primary-600/40">
                                                <Camera size={48} strokeWidth={2.5} />
                                            </div>
                                            <h3 className="text-2xl font-black tracking-tight mb-2 leading-none">Open Camera</h3>
                                            <div className="px-6 py-2 bg-green-500 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em]">Safe Step</div>
                                        </div>
                                    </motion.button>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="w-full h-[320px] bg-neutral-100 dark:bg-neutral-800 rounded-[56px] relative overflow-hidden shadow-inner flex items-center justify-center border-4 border-white dark:border-neutral-700"
                                    >
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle2 size={32} />
                                            </div>
                                            <p className="text-sm font-black text-neutral-800 dark:text-white uppercase tracking-widest">Image Captured</p>
                                            <button
                                                onClick={() => setFormData({ ...formData, hasMedia: false })}
                                                className="mt-4 text-[10px] font-bold text-primary-600 underline uppercase tracking-widest"
                                            >
                                                Retake Photo
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {!formData.hasMedia ? (
                                <button
                                    onClick={nextStep}
                                    className="w-full py-4 text-neutral-400 font-black uppercase tracking-[0.4em] text-[10px]"
                                >
                                    SKIP PHOTO STEP
                                </button>
                            ) : (
                                <motion.button
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    onClick={nextStep}
                                    className="w-full py-6 bg-primary-600 text-white rounded-[32px] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary-600/20"
                                >
                                    Continue to Review
                                </motion.button>
                            )}
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8"
                        >
                            <div className="text-center mb-8">
                                <div className="w-24 h-24 bg-green-500 rounded-[40px] flex items-center justify-center text-white mx-auto mb-6 shadow-2xl shadow-green-500/30 rotate-6">
                                    <CheckCircle2 size={48} strokeWidth={3} />
                                </div>
                                <h1 className="text-4xl font-black tracking-tight mb-2">Review</h1>
                                <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px]">Check information before creating</p>
                            </div>

                            <div className="bg-white dark:bg-neutral-900 rounded-[56px] p-8 border border-neutral-100 dark:border-neutral-800 shadow-xl overflow-hidden relative">
                                <div className="space-y-8 relative z-10">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedTypes.map(typeId => {
                                            const type = loadTypes.find(t => t.id === typeId);
                                            return (
                                                <div key={typeId} className="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-2xl border border-primary-100 dark:border-primary-900/30">
                                                    <type.icon size={14} className="text-primary-600" />
                                                    <span className="text-[11px] font-black uppercase tracking-tight">{type.label}</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="space-y-6 pt-6 border-t border-neutral-100 dark:border-neutral-800/50">
                                        <div className="flex gap-4">
                                            <MapPin size={24} className="text-primary-600 shrink-0" />
                                            <div>
                                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1 leading-none">From</p>
                                                <p className="text-lg font-black leading-tight text-neutral-800 dark:text-neutral-200">{formData.pickup}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <Flag size={24} className="text-red-500 shrink-0" />
                                            <div>
                                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1 leading-none">To</p>
                                                <p className="text-lg font-black leading-tight text-neutral-800 dark:text-neutral-200">{formData.destination}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 p-8 rounded-[40px] flex items-center justify-between shadow-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center text-white">
                                        <MessageSquare size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Pricing Model</p>
                                        <p className="text-2xl font-black">Negotiable</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black uppercase bg-primary-600 text-white px-3 py-1 rounded-full mb-1">Direct Chat</span>
                                    <p className="text-[9px] opacity-40 font-bold uppercase tracking-tighter text-right">Talk with driver</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {isFinding && (
                        <motion.div
                            key="finding"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20 px-6 text-center"
                        >
                            <div className="relative mb-12">
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-primary-600 rounded-full blur-3xl"
                                />
                                <div className="w-40 h-40 bg-white dark:bg-neutral-900 rounded-[64px] shadow-2xl flex items-center justify-center relative z-10">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Truck size={64} className="text-primary-600" />
                                    </motion.div>
                                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg animate-pulse">
                                        <Navigation size={24} />
                                    </div>
                                </div>
                            </div>
                            <h1 className="text-4xl font-black tracking-tight mb-4">Finding Drivers</h1>
                            <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px] max-w-[240px] leading-relaxed">
                                Scanning for nearest available trucks in your area...
                            </p>
                        </motion.div>
                    )}

                    {showDrivers && (
                        <div className="fixed inset-0 z-[100] border-none outline-none">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
                                onClick={() => setShowDrivers(false)}
                            />
                            <motion.div
                                key="drivers-modal"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="absolute inset-x-0 bottom-0 top-4 bg-neutral-50 dark:bg-black rounded-t-[64px] shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden"
                            >
                                {/* Modal Handle */}
                                <div className="w-16 h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full mx-auto mt-6 mb-2 shrink-0" />

                                {/* Modal Header */}
                                <div className="md:px-8 px-4 md:py-6 py-3 flex items-center justify-between shrink-0">
                                    <div>
                                        <h1 className="text-3xl font-black tracking-tight">Drivers Online</h1>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">24 Available nearby</p>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setShowDrivers(false)}
                                        className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-400"
                                    >
                                        <X size={24} />
                                    </motion.button>
                                </div>

                                {/* Modal Content - Scrollable */}
                                <div className="flex-1 overflow-y-auto px-3 pb-32 space-y-4 pt-2">
                                    {drivers.map((driver) => (
                                        <motion.div
                                            key={driver.id}
                                            whileTap={{ scale: 0.98 }}
                                            className="bg-white dark:bg-neutral-900 rounded-[40px] p-6 border border-neutral-100 dark:border-neutral-800 shadow-xl flex items-center justify-between gap-4 group"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded-full">
                                                        <span className="text-yellow-600">★</span>
                                                        <span className="text-xs font-black text-yellow-700 dark:text-yellow-400">{driver.rating}</span>
                                                    </div>
                                                    <span className="px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-600 text-[8px] font-black uppercase tracking-widest rounded-full">Available</span>
                                                </div>
                                                <h3 className="text-xl font-black mb-1">{driver.name}</h3>
                                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">{driver.info}</p>

                                                <motion.button
                                                    onClick={() => handleNegotiate(driver.id)}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="bg-primary-50 dark:bg-primary-900/40 text-primary-600 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm"
                                                >
                                                    <MessageSquare size={16} />
                                                    Negotiate Plan
                                                </motion.button>
                                            </div>
                                            <div className="w-28 h-28 rounded-[36px] overflow-hidden border-2 border-primary-50 dark:border-neutral-800 shrink-0 shadow-lg">
                                                <img src={driver.image} className="w-full h-full object-cover" alt={driver.name} />
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Map Preview Placeholder */}
                                    <div className="mt-8 relative rounded-[48px] overflow-hidden h-64 border-4 border-white dark:border-neutral-900 shadow-2xl">
                                        <img
                                            src="https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=800&auto=format&fit=crop"
                                            className="w-full h-full object-cover opacity-60 dark:opacity-40"
                                            alt="Map Preview"
                                        />
                                        <div className="absolute inset-0 bg-primary-600/10" />
                                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-neutral-900 to-transparent">
                                            <p className="text-white text-xs font-black uppercase tracking-[0.2em]">Viewing drivers in real-time</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Compact Floating Navigation Bar */}
            {!isFinding && !showDrivers && (
                <div className="fixed bottom-32 left-0 right-0 px-8 z-40 pointer-events-none">
                    <div className="max-w-md mx-auto flex justify-between items-center pointer-events-auto">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={prevStep}
                            className="w-12 h-12 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-100 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 shadow-lg"
                        >
                            <ChevronLeft size={20} strokeWidth={3} />
                        </motion.button>

                        {step < 4 ? (
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={nextStep}
                                disabled={step === 1 && selectedTypes.length === 0 || step === 2 && (!formData.pickup || !formData.destination)}
                                className={`h-12 px-8 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-2xl transition-all duration-300 ${(step === 1 && selectedTypes.length > 0) || (step === 2 && formData.pickup && formData.destination) || step === 3
                                    ? "bg-primary-600 text-white shadow-primary-600/30"
                                    : "bg-neutral-200 text-neutral-400 opacity-50 cursor-not-allowed"
                                    }`}
                            >
                                Next
                                <ChevronLeft size={16} strokeWidth={4} className="rotate-180" />
                            </motion.button>
                        ) : (
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={handleFinalCreate}
                                disabled={isCreating}
                                className="h-12 px-8 rounded-full bg-primary-600 text-white font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-2xl shadow-primary-600/40"
                            >
                                {isCreating ? "Working..." : "Find Driver"}
                                <CheckCircle2 size={16} />
                            </motion.button>
                        )}
                    </div>
                </div>
            )}

            <BottomTabBar />
        </main>
    );
}
