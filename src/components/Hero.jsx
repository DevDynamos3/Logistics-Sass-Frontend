"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Calculator, Truck, Navigation2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const quickActions = [
  { icon: Package, emoji: "📦", label: "Ship Now", sublabel: "Send package", color: "from-primary-500 to-primary-600", delay: 0.1, href: "/create-load-request" },
  { icon: Calculator, emoji: "💰", label: "Get Quote", sublabel: "Check price", color: "from-blue-500 to-blue-600", delay: 0.15 },
  { icon: Truck, emoji: "🚛", label: "Find Fleet", sublabel: "Hire trucks", color: "from-green-500 to-green-600", delay: 0.2 },
  { icon: Navigation2, emoji: "📍", label: "Track", sublabel: "Find package", color: "from-purple-500 to-purple-600", delay: 0.25 },
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
    <section className="relative pt-36 pb-8 px-4 overflow-hidden bg-neutral-50 dark:bg-black min-h-[600px]">
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
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-black text-green-600 dark:text-green-400 uppercase tracking-wider">Live & Ready</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-3 dark:text-white">
            Send Your Package
            <br />
            <span className="relative">
              <span className="text-primary-600">Anywhere in Nigeria</span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute -bottom-1 left-0 h-2 bg-primary-100 dark:bg-primary-900/30 -z-10 rounded-full"
              />
            </span>
          </h1>
          <p className="text-base font-medium text-neutral-600 dark:text-neutral-400 max-w-md">
            Fast, safe, and affordable delivery with trusted drivers
          </p>

          {/* Main Search/Tracking Input */}
          <div className="relative mt-6 group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none z-10">
              <span className="text-2xl">📦</span>
            </div>
            <input
              type="text"
              placeholder="Enter tracking number to find your package..."
              className="w-full bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 h-16 pl-16 pr-4 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-lg dark:text-white"
            />
            <div className="absolute right-2 top-2 bottom-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="h-full px-8 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl text-sm font-black shadow-lg shadow-primary-600/30 overflow-hidden relative flex items-center gap-2"
              >
                <span className="text-xl">🔍</span>
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

        {/* Quick Actions Grid - Emoji First */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative overflow-hidden rounded-[24px] shadow-lg"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-20`} />

              {action.href ? (
                <Link href={action.href} className="block">
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 p-5 cursor-pointer"
                  >
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="text-4xl mb-1">{action.emoji}</div>
                      <div>
                        <p className="text-sm font-black dark:text-white">{action.label}</p>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">{action.sublabel}</p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ) : (
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 p-5 cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="text-4xl mb-1">{action.emoji}</div>
                    <div>
                      <p className="text-sm font-black dark:text-white">{action.label}</p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">{action.sublabel}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Active Shipment Card - Glassmorphism */}
        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[28px] shadow-2xl"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 via-primary-500/20 to-primary-600/20" />

          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary-300/20 blur-[80px] rounded-full -mr-12 -mt-12" />

          {/* Glassmorphism Layer */}
          <div className="relative backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-black text-sm dark:text-white">Live Delivery</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">Package on the way</p>
                </div>
              </div>
              <span className="px-3 py-1.5 bg-green-500/20 backdrop-blur-sm text-green-700 dark:text-green-300 text-xs font-black rounded-full border border-green-500/30">
                On Time ✓
              </span>
            </div>

            {/* Route Info */}
            <div className="bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-[20px] p-5 mb-5 border border-white/10">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-xl shadow-primary-600/30 text-3xl"
                >
                  🚛
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">#FL-82910</span>
                    <Sparkles size={12} className="text-primary-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-lg dark:text-white">Ikeja</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight size={18} className="text-primary-600" />
                    </motion.div>
                    <span className="font-black text-lg dark:text-white">Lekki</span>
                  </div>
                  <div className="mt-2">
                    <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 relative"
                      >
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/30 to-transparent animate-pulse" />
                      </motion.div>
                    </div>
                    <p className="text-xs font-bold text-neutral-600 dark:text-neutral-400 mt-1">65% Complete</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + (i * 0.1) }}
                      className="w-9 h-9 rounded-full border-2 border-white dark:border-neutral-900 bg-gradient-to-br from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-800"
                    />
                  ))}
                </div>
                <p className="text-xs font-bold text-neutral-600 dark:text-neutral-400">+2 Drivers Available</p>
              </div>
              <motion.button
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-full border border-white/10"
              >
                <span className="text-xs font-black text-primary-600">View Details</span>
                <ArrowRight size={14} className="text-primary-600" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
