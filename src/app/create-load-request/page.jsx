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
    { id: "boxes", label: "Package", emoji: "📦", desc: "Cartons & Small Items", color: "from-primary-500 to-primary-600" },
    { id: "relocation", label: "Home Move", emoji: "🏠", desc: "House or Office", color: "from-blue-500 to-blue-600" },
    { id: "food", label: "Food Items", emoji: "🍎", desc: "Rice, Meat, Drinks", color: "from-orange-400 to-orange-600" },
    { id: "container", label: "Big Cargo", emoji: "🚛", desc: "Large Containers", color: "from-emerald-500 to-emerald-600" },
    { id: "clothes", label: "Clothes", emoji: "👕", desc: "Bags, Shoes, Fabrics", color: "from-pink-500 to-pink-600" },
    { id: "electronics", label: "Electronics", emoji: "💻", desc: "Phones, TV, Laptops", color: "from-purple-500 to-purple-600" },
    { id: "heavy", label: "Heavy Goods", emoji: "🏗️", desc: "Furniture, Cement", color: "from-neutral-600 to-neutral-800" },
    { id: "parts", label: "Auto Parts", emoji: "⚙️", desc: "Cars & Spare Parts", color: "from-red-500 to-red-600" },
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
            {/* Premium Navigation Header */}
            <nav className="sticky top-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur-2xl border-b border-neutral-100 dark:border-neutral-900">
                <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">
                    <motion.button
                        onClick={prevStep}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-900 flex items-center justify-center text-neutral-800 dark:text-white border border-neutral-200 dark:border-neutral-800 shadow-sm"
                    >
                        <ChevronLeft size={24} strokeWidth={3} />
                    </motion.button>

                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">🚚</span>
                            <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest">Step {step} of 4</span>
                        </div>
                        <div className="flex gap-1.5">
                            {[1, 2, 3, 4].map(i => (
                                <motion.div
                                    key={i}
                                    layoutId={`step-${i}`}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? "w-8 bg-primary-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]" : "w-1.5 bg-neutral-200 dark:bg-neutral-800"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="w-12" /> {/* Spacer for balance */}
                </div>
            </nav>

            <div className="px-4 pt-8">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-8">
                                <div className="text-6xl mb-4">📦</div>
                                <h1 className="text-3xl font-black tracking-tight mb-2 dark:text-white">What are you sending?</h1>
                                <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">Tap to select items</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {loadTypes.map((item) => {
                                    const isActive = selectedTypes.includes(item.id);
                                    return (
                                        <motion.button
                                            key={item.id}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => toggleType(item.id)}
                                            className={`group relative flex flex-col items-center justify-center p-6 rounded-[32px] overflow-hidden min-h-[160px] border-2 transition-all duration-300 ${isActive
                                                ? "border-primary-600 bg-white dark:bg-neutral-900 shadow-xl scale-[1.02]"
                                                : "border-transparent bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md"
                                                }`}
                                        >
                                            {/* Gradient Accent */}
                                            {isActive && (
                                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5`} />
                                            )}

                                            <div className={`text-5xl mb-3 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'scale-110' : 'opacity-80'}`}>
                                                {item.emoji}
                                            </div>

                                            <span className={`font-black text-base tracking-tight mb-1 ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-700 dark:text-neutral-300'}`}>
                                                {item.label}
                                            </span>

                                            {isActive && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute top-3 right-3"
                                                >
                                                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-[10px]">
                                                        ✓
                                                    </div>
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
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center mb-8">
                                <div className="text-6xl mb-4">📍</div>
                                <h1 className="text-3xl font-black tracking-tight mb-2 dark:text-white">Delivery Route</h1>
                                <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">Where are we going?</p>
                            </div>

                            {/* Pickup Module */}
                            <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-[32px] p-6 border border-neutral-200 dark:border-neutral-800 shadow-xl">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-5">
                                        <div className="text-4xl">🟢</div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 px-1">Pick up Location</p>
                                            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-4 border border-neutral-200/50 dark:border-neutral-700/50 shadow-inner">
                                                <input
                                                    autoFocus
                                                    placeholder="Enter pickup address..."
                                                    className="w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none outline-none text-base font-bold placeholder:text-neutral-300 dark:placeholder:text-neutral-600 dark:text-white"
                                                    value={formData.pickup}
                                                    onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Destination Module */}
                            <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-[32px] p-6 border border-neutral-200 dark:border-neutral-800 shadow-xl">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-5">
                                        <div className="text-4xl">🔴</div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 px-1">Drop off Location</p>
                                            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-4 border border-neutral-200/50 dark:border-neutral-700/50 shadow-inner">
                                                <input
                                                    placeholder="Enter destination address..."
                                                    className="w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none outline-none text-base font-bold placeholder:text-neutral-300 dark:placeholder:text-neutral-600 dark:text-white"
                                                    value={formData.destination}
                                                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-[24px] border border-blue-100 dark:border-blue-900/30 flex items-center gap-4">
                                <div className="text-2xl">🤝</div>
                                <p className="text-xs font-bold leading-relaxed text-blue-900 dark:text-blue-300">
                                    Don't worry about the price yet. You will negotiate directly with the driver later!
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-8 py-4"
                        >
                            <div className="text-center">
                                <div className="text-6xl mb-4">{formData.hasMedia ? "📸" : "📷"}</div>
                                <h1 className="text-3xl font-black tracking-tight mb-2 dark:text-white">
                                    {formData.hasMedia ? "Great Shot!" : "Snap a Photo"}
                                </h1>
                                <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">
                                    {formData.hasMedia ? "Items captured clearly" : "Show the driver what you're sending"}
                                </p>
                            </div>

                            <div className="relative">
                                {!formData.hasMedia ? (
                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setFormData({ ...formData, hasMedia: true })}
                                        className="w-full h-[340px] bg-white dark:bg-neutral-900 rounded-[40px] border-2 border-dashed border-primary-200 dark:border-neutral-800 flex flex-col items-center justify-center group overflow-hidden relative shadow-2xl"
                                    >
                                        <div className="absolute inset-0 bg-primary-600/5 group-hover:bg-primary-600/10 transition-colors" />
                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className="w-20 h-20 rounded-[28px] bg-primary-600 text-white flex items-center justify-center mb-6 shadow-xl shadow-primary-600/30 text-4xl">
                                                📸
                                            </div>
                                            <h3 className="text-xl font-black tracking-tight mb-2 dark:text-white">Open Camera</h3>
                                            <p className="text-xs font-bold text-neutral-400">Tap to take a photo</p>
                                        </div>
                                    </motion.button>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="w-full h-[340px] bg-neutral-100 dark:bg-neutral-800 rounded-[40px] relative overflow-hidden shadow-2xl flex items-center justify-center border-4 border-white dark:border-neutral-700"
                                    >
                                        <div className="text-center bg-white/90 dark:bg-black/90 backdrop-blur-md p-8 rounded-[32px] shadow-xl border border-white/20">
                                            <div className="text-4xl mb-3">✅</div>
                                            <p className="text-lg font-black dark:text-white uppercase tracking-tight">Image Captured</p>
                                            <button
                                                onClick={() => setFormData({ ...formData, hasMedia: false })}
                                                className="mt-4 px-6 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-[10px] font-black text-primary-600 uppercase tracking-widest"
                                            >
                                                Take Another
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {!formData.hasMedia && (
                                <button
                                    onClick={nextStep}
                                    className="w-full py-2 text-neutral-400 font-black uppercase tracking-[0.3em] text-[10px]"
                                >
                                    Skip this step ➔
                                </button>
                            )}
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8"
                        >
                            <div className="text-center mb-8">
                                <div className="text-6xl mb-4">✨</div>
                                <h1 className="text-3xl font-black tracking-tight mb-2 dark:text-white">Final Check</h1>
                                <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">Verify your request details</p>
                            </div>

                            <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-[40px] p-8 border border-neutral-200 dark:border-neutral-800 shadow-2xl relative overflow-hidden">
                                <div className="space-y-8 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="text-4xl shrink-0">📦</div>
                                        <div>
                                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Items for shipment</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedTypes.map(typeId => {
                                                    const type = loadTypes.find(t => t.id === typeId);
                                                    return (
                                                        <span key={typeId} className="text-xs font-black dark:text-white bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full uppercase tracking-tighter">
                                                            {type.label}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 pt-6 border-t border-neutral-100 dark:border-neutral-800/50">
                                        <div className="flex gap-4">
                                            <div className="text-2xl shrink-0">🟢</div>
                                            <div>
                                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1 leading-none">Pickup</p>
                                                <p className="text-lg font-black leading-tight text-neutral-800 dark:text-neutral-200">{formData.pickup}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="text-2xl shrink-0">🔴</div>
                                            <div>
                                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1 leading-none">Destination</p>
                                                <p className="text-lg font-black leading-tight text-neutral-800 dark:text-neutral-200">{formData.destination}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary-600 text-white p-6 rounded-[32px] flex items-center justify-between shadow-xl shadow-primary-600/20">
                                <div className="flex items-center gap-4">
                                    <div className="text-3xl">⚖️</div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Price Info</p>
                                        <p className="text-xl font-black">Negotiable</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Fair Trade</p>
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
                                {/* Radar Rings */}
                                {[1, 2, 3].map((ring) => (
                                    <motion.div
                                        key={ring}
                                        animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: ring * 0.8 }}
                                        className="absolute inset-0 bg-primary-600 rounded-full"
                                    />
                                ))}
                                
                                <div className="w-40 h-40 bg-white dark:bg-neutral-900 rounded-[64px] shadow-2xl flex items-center justify-center relative z-10 border-4 border-white dark:border-neutral-800">
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="text-7xl"
                                    >
                                        🚛
                                    </motion.div>
                                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg animate-pulse text-2xl">
                                        🛰️
                                    </div>
                                </div>
                            </div>
                            <h1 className="text-4xl font-black tracking-tight mb-4 dark:text-white">Finding Drivers</h1>
                            <p className="text-neutral-500 font-bold uppercase tracking-widest text-[11px] max-w-[240px] leading-relaxed">
                                Searching for the best available trucks near your location...
                            </p>
                        </motion.div>
                    )}

                    {showDrivers && (
                        <div className="fixed inset-0 z-[100] border-none outline-none">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md"
                                onClick={() => setShowDrivers(false)}
                            />
                            <motion.div
                                key="drivers-modal"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="absolute inset-x-0 bottom-0 top-10 bg-neutral-50 dark:bg-black rounded-t-[48px] shadow-2xl flex flex-col overflow-hidden"
                            >
                                {/* Modal Handle */}
                                <div className="w-16 h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full mx-auto mt-6 mb-2 shrink-0" />

                                <div className="px-6 py-6 flex items-center justify-between shrink-0">
                                    <div>
                                        <h2 className="text-3xl font-black tracking-tight dark:text-white">Drivers Nearby</h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                            <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">24 Drivers Online Now</p>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setShowDrivers(false)}
                                        className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-400"
                                    >
                                        ✕
                                    </motion.button>
                                </div>

                                <div className="flex-1 overflow-y-auto px-4 pb-32 space-y-4 pt-2">
                                    {drivers.map((driver) => (
                                        <motion.div
                                            key={driver.id}
                                            whileTap={{ scale: 0.98 }}
                                            className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-[32px] p-6 border border-neutral-100 dark:border-neutral-800 shadow-xl flex items-center justify-between gap-4 group"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-0.5 rounded-full">
                                                        <span className="text-yellow-500 text-xs">⭐</span>
                                                        <span className="text-xs font-black text-yellow-700 dark:text-yellow-400">{driver.rating}</span>
                                                    </div>
                                                    <span className="px-2 py-0.5 bg-green-500/10 text-green-600 text-[8px] font-black uppercase tracking-widest rounded-full">Ready to go</span>
                                                </div>
                                                <h3 className="text-xl font-black mb-1 dark:text-white">{driver.name}</h3>
                                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">{driver.info}</p>

                                                <motion.button
                                                    onClick={() => handleNegotiate(driver.id)}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="w-full bg-primary-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20"
                                                >
                                                    💬 Chat & Negotiate
                                                </motion.button>
                                            </div>
                                            <div className="w-24 h-24 rounded-[28px] overflow-hidden border-4 border-white dark:border-neutral-800 shrink-0 shadow-lg">
                                                <img src={driver.image} className="w-full h-full object-cover" alt={driver.name} />
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Map Preview Placeholder */}
                                    <div className="mt-8 relative rounded-[32px] overflow-hidden h-48 border border-neutral-200 dark:border-neutral-800 shadow-xl">
                                        <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                                            <div className="text-center opacity-30">
                                                <div className="text-6xl mb-2">🗺️</div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Live Radar View</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Premium Floating Navigation */}
            {!isFinding && !showDrivers && (
                <div className="fixed bottom-32 left-0 right-0 px-8 z-40 pointer-events-none">
                    <div className="max-w-md mx-auto flex justify-between items-center pointer-events-auto">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={prevStep}
                            className={`w-14 h-14 rounded-full bg-white dark:bg-neutral-900 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 shadow-xl ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                        >
                            <ChevronLeft size={24} strokeWidth={3} />
                        </motion.button>

                        {step < 4 ? (
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={nextStep}
                                disabled={step === 1 && selectedTypes.length === 0 || step === 2 && (!formData.pickup || !formData.destination)}
                                className={`h-14 px-10 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-2xl transition-all duration-300 ${(step === 1 && selectedTypes.length > 0) || (step === 2 && formData.pickup && formData.destination) || step === 3
                                    ? "bg-primary-600 text-white shadow-primary-600/30"
                                    : "bg-neutral-200 text-neutral-400 opacity-50 cursor-not-allowed"
                                    }`}
                            >
                                Continue
                                <span className="text-lg">➔</span>
                            </motion.button>
                        ) : (
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={handleFinalCreate}
                                disabled={isCreating}
                                className="h-14 px-10 rounded-full bg-primary-600 text-white font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-2xl shadow-primary-600/40"
                            >
                                {isCreating ? "Creating..." : "Find My Driver"}
                                <span className="text-lg">🚚</span>
                            </motion.button>
                        )}
                    </div>
                </div>
            )}

            <BottomTabBar />
        </main>
    );
}
