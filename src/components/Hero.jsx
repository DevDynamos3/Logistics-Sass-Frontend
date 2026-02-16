"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Calculator, Truck, Navigation2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const quickActions = [
  { icon: Package, label: "Ship Now", color: "bg-primary-600", textColor: "text-white", delay: 0.1, href: "/create-load-request" },
  { icon: Calculator, label: "Get Quote", color: "bg-white dark:bg-neutral-900", textColor: "text-neutral-900 dark:text-neutral-100", delay: 0.15 },
  { icon: Truck, label: "Find Fleet", color: "bg-white dark:bg-neutral-900", textColor: "text-neutral-900 dark:text-neutral-100", delay: 0.2 },
  { icon: Navigation2, label: "Track", color: "bg-white dark:bg-neutral-900", textColor: "text-neutral-900 dark:text-neutral-100", delay: 0.25 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function Hero() {
  return (
    <section className="relative pt-36 pb-8 px-5 overflow-hidden bg-neutral-50 dark:bg-black min-h-[600px]">
      {/* Dynamic Background Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-80 h-80 bg-primary-500/10 blur-[100px] rounded-full -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-10 w-64 h-64 bg-primary-600/5 blur-[80px] rounded-full -z-10"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Animated Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-2 w-2 rounded-full bg-primary-600 animate-pulse" />
            <span className="text-[10px] font-bold text-primary-600 uppercase tracking-[0.2em]">Live Intelligence Platform</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight leading-tight mb-2">
            Where are we <br />
            <span className="relative">
              <span className="text-primary-600">shipping today?</span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute -bottom-1 left-0 h-1.5 bg-primary-100 dark:bg-primary-900/30 -z-10 rounded-full"
              />
            </span>
          </h1>

          {/* Main Search/Tracking Input with Shimmer */}
          <div className="relative mt-8 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
              <Search size={18} className="text-neutral-400 group-focus-within:text-primary-600 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Enter waybill or tracking number"
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800 h-16 pl-12 pr-4 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all shadow-sm group-hover:shadow-md"
            />
            <div className="absolute right-2 top-2 bottom-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="h-full px-6 bg-primary-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-primary-600/30 overflow-hidden relative"
              >
                <span className="relative z-10">Track</span>
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Grid with Staggered Entrance */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center gap-3"
            >
              {action.href ? (
                <Link href={action.href} className="w-full">
                  <motion.button
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-full aspect-square rounded-3xl flex items-center justify-center shadow-md border border-neutral-200/50 dark:border-neutral-800 transition-all relative overflow-hidden group/btn ${action.color}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <action.icon size={26} className={`${action.textColor} relative z-10 transition-transform group-hover/btn:scale-110`} />
                  </motion.button>
                </Link>
              ) : (
                <motion.button
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-full aspect-square rounded-3xl flex items-center justify-center shadow-md border border-neutral-200/50 dark:border-neutral-800 transition-all relative overflow-hidden group/btn ${action.color}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <action.icon size={26} className={`${action.textColor} relative z-10 transition-transform group-hover/btn:scale-110`} />
                </motion.button>
              )}
              <span className="text-[10px] font-black text-neutral-500 uppercase tracking-tighter">{action.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Active Shipments Card */}
        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ y: -8 }}
          className="bg-white dark:bg-neutral-900 p-6 rounded-[32px] border border-neutral-200/50 dark:border-neutral-800 shadow-2xl shadow-primary-500/5 relative overflow-hidden group"
        >
          {/* Progress Bar Detail */}
          <div className="absolute bottom-0 left-0 h-1.5 bg-neutral-100 dark:bg-neutral-800 w-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
              className="h-full bg-primary-600 relative"
            >
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/20 to-transparent animate-pulse" />
            </motion.div>
          </div>

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
              </div>
              <h3 className="font-black text-[10px] uppercase tracking-[0.15em] text-neutral-400">Live Journey</h3>
            </div>
            <span className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-[10px] font-black rounded-full uppercase tracking-tight">On Time</span>
          </div>

          <div className="flex items-center gap-5">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-16 h-16 rounded-[22px] bg-primary-600 flex items-center justify-center text-white shadow-xl shadow-primary-600/20"
            >
              <Truck size={32} strokeWidth={2.5} />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-neutral-400">#FL-82910</span>
                <Sparkles size={10} className="text-primary-400" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight">Ikeja</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight size={16} className="text-primary-600" />
                </motion.div>
                <span className="font-black text-xl tracking-tight">Lekki</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-neutral-100 dark:border-neutral-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5 + (i * 0.1) }}
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900 bg-neutral-200 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-800" />
                  </motion.div>
                ))}
              </div>
              <p className="text-[10px] font-bold text-neutral-400">+2 Dispatchers</p>
            </div>
            <motion.button
              whileHover={{ x: 3 }}
              className="flex items-center gap-1.5"
            >
              <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest leading-none">View Hub</span>
              <ArrowRight size={12} className="text-primary-600" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
