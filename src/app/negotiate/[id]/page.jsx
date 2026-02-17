"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    Info,
    Star,
    Truck,
    MapPin,
    Send,
    User,
    CheckCircle2,
    XCircle,
    Handshake,
    MessageSquare,
    Mic,
    Play,
    Volume2,
    Square,
    Trash2
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";

const driverData = {
    "1": { name: "James Wilson", rating: 4.9, experience: "8 years", license: "Class A CDL", image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=200&h=200&auto=format&fit=crop" },
    "2": { name: "Elena Rodriguez", rating: 4.8, experience: "4 years", license: "Heavy Duty", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop" },
    "3": { name: "Marcus Chen", rating: 5.0, experience: "12 years", license: "Masters CDL", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop" },
    "default": { name: "Alex Johnson", rating: 4.8, experience: "5 years", license: "Class A CDL", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop" }
};

const AudioMessage = ({ src }) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const audioRef = React.useRef(null);

    React.useEffect(() => {
        if (audioRef.current) {
            audioRef.current.onended = () => setIsPlaying(false);
        }
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="flex items-center gap-2 min-w-[120px]">
            <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 hover:bg-white/30 transition-colors"
            >
                {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
            </button>
            <div className="flex-1 h-8 flex items-center gap-0.5 opacity-60">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="w-1 bg-current rounded-full animate-pulse"
                        style={{
                            height: Math.max(4, Math.random() * 24) + 'px',
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: isPlaying ? '0.5s' : '0s'
                        }}
                    />
                ))}
            </div>
            <audio ref={audioRef} src={src} className="hidden" />
        </div>
    );
};

export default function NegotiationRoom() {
    const router = useRouter();
    const params = useParams();
    const driver = driverData[params.id] || driverData["default"];

    const [messages, setMessages] = useState([
        { id: 1, sender: "driver", text: `Hi! I'm interested in your load request. Based on the route and current fuel costs, I can do this for ₦15,000.`, time: "2:45 PM", type: "text" }
    ]);
    const [inputText, setInputText] = useState("");
    const [isAccepted, setIsAccepted] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0); // Renamed from recordingTime to match driver
    const [isDriverTyping, setIsDriverTyping] = useState(false);

    const mediaRecorderRef = React.useRef(null);
    const audioChunksRef = React.useRef([]);
    const timerRef = React.useRef(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                handleSendMessage("audio", null, audioUrl); // Pass audioUrl
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingDuration(0);

            timerRef.current = setInterval(() => {
                setRecordingDuration(prev => prev + 1);
            }, 1000);

        } catch (error) {
            console.error("Error accessing microphone:", error);
            alert("Could not access microphone. Please ensuring permission is granted.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            clearInterval(timerRef.current);
            setIsRecording(false);
        }
    };

    const cancelRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.onstop = null;
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            clearInterval(timerRef.current);
            setIsRecording(false);
            setRecordingDuration(0);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSendMessage = (type = "text", duration = null, audioUrl = null) => {
        if (type === "text" && !inputText.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            sender: "user",
            text: type === "text" ? inputText : null,
            duration: duration,
            type: type,
            audioUrl: audioUrl,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        if (type === "text") setInputText("");

        // Mock driver typing and reply
        setTimeout(() => setIsDriverTyping(true), 1000);

        setTimeout(() => {
            setIsDriverTyping(false);
            const reply = {
                id: messages.length + 2,
                sender: "driver",
                type: "text",
                text: "I'm only a few miles away. I can be at your pickup point within 30 minutes of you accepting. Does ₦15,000 work for you?",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, reply]);
        }, 3000);
    };

    const playVoiceMessage = (msgId, durationInSeconds) => {
        if (currentlyPlaying === msgId) {
            setCurrentlyPlaying(null);
            return;
        }

        setCurrentlyPlaying(msgId);

        // Mock end of playback based on actual duration (if available) or default 3s
        const playTime = (typeof durationInSeconds === 'number' && durationInSeconds > 0)
            ? durationInSeconds * 1000
            : 3000;

        setTimeout(() => {
            setCurrentlyPlaying(prev => prev === msgId ? null : prev);
        }, playTime);
    };

    const handleAccept = () => {
        setIsAccepted(true);
        setTimeout(() => {
            router.push('/shipments');
        }, 3000);
    };

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-black font-sans pb-40">
            {/* Premium Header */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-3xl border-b border-neutral-100 dark:border-neutral-900">
                <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">
                    <motion.button
                        onClick={() => router.back()}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-600 dark:text-neutral-400"
                    >
                        <ChevronLeft size={24} />
                    </motion.button>

                    <h1 className="font-black text-lg tracking-tight">Negotiation Room</h1>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-600 dark:text-neutral-400"
                    >
                        <Info size={20} />
                    </motion.button>
                </div>
            </nav>

            <div className="px-5 pt-6 space-y-6">
                {/* Driver Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-neutral-900 rounded-[40px] p-6 shadow-xl border border-neutral-100 dark:border-neutral-800 flex items-center gap-5"
                >
                    <div className="w-20 h-20 rounded-[32px] overflow-hidden border-2 border-primary-500 shadow-lg shrink-0">
                        <img src={driver.image} className="w-full h-full object-cover" alt={driver.name} />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-black mb-1">{driver.name}</h2>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded-full">
                                <Star size={12} className="fill-yellow-500 text-yellow-500" />
                                <span className="text-xs font-black text-yellow-700 dark:text-yellow-400">{driver.rating}</span>
                            </div>
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{driver.experience} exp</span>
                        </div>
                        <p className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em]">{driver.license}</p>
                    </div>
                </motion.div>

                {/* Offer Status Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative rounded-[48px] overflow-hidden shadow-2xl h-48 group"
                >
                    <div className="absolute inset-0 bg-neutral-900">
                        <img
                            src="https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=800&auto=format&fit=crop"
                            className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000"
                            alt="Background"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    </div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <div className="flex items-center justify-between items-end">
                            <div>
                                <span className="px-3 py-1 bg-primary-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest mb-2 inline-block">New Offer</span>
                                <h3 className="text-white text-3xl font-black tracking-tight">₦15,000</h3>
                                <p className="text-neutral-300 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mt-1">
                                    <Truck size={12} />
                                    James started bidding
                                </p>
                            </div>
                            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                                Details
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Chat Section */}
                <div className="space-y-6 pt-4 pb-20">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, x: msg.sender === "driver" ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex items-end gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                            >
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${msg.sender === "driver" ? "bg-white dark:bg-neutral-800" : "bg-primary-600"
                                    }`}>
                                    {msg.sender === "driver" ? (
                                        <img src={driver.image} className="w-full h-full object-cover rounded-2xl" />
                                    ) : (
                                        <User size={20} className="text-white" />
                                    )}
                                </div>
                                <div className="space-y-1 max-w-[80%]">
                                    <p className={`text-[10px] font-black uppercase tracking-widest text-neutral-400 ${msg.sender === "user" ? "text-right mr-1" : "ml-1"}`}>
                                        {msg.sender === "driver" ? driver.name : "You"}
                                    </p>
                                    <div className={`p-4 rounded-[32px] text-sm font-medium shadow-sm border ${msg.sender === "driver"
                                        ? "bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 rounded-bl-none"
                                        : "bg-primary-600 text-white border-transparent rounded-br-none"
                                        }`}>
                                        {msg.type === "audio" || msg.type === "voice" ? ( // Handle both for backward compat with mock
                                            <AudioMessage src={msg.audioUrl} />
                                        ) : (
                                            msg.text
                                        )}
                                    </div>
                                    <p className={`text-[9px] font-bold text-neutral-300 ${msg.sender === "user" ? "text-right" : ""}`}>
                                        {msg.time}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                        {isDriverTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-10 h-10 rounded-2xl bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-lg">
                                    <img src={driver.image} className="w-full h-full object-cover rounded-2xl" />
                                </div>
                                <div className="bg-white dark:bg-neutral-900 px-4 py-3 rounded-full rounded-bl-none border border-neutral-100 dark:border-neutral-800 flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-600 rounded-full animate-bounce" />
                                    <div className="w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Interaction Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-white/80 dark:bg-black/95 backdrop-blur-2xl border-t border-neutral-100 dark:border-neutral-900">
                <div className="max-w-7xl mx-auto space-y-4">
                    <AnimatePresence>
                        {isAccepted ? (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-green-500 text-white p-6 rounded-[32px] flex items-center justify-center gap-4 text-center"
                            >
                                <CheckCircle2 size={32} strokeWidth={3} />
                                <span className="text-lg font-black uppercase tracking-widest text-shadow">Deal Accepted! Redirecting...</span>
                            </motion.div>
                        ) : (
                            <div className="flex gap-4">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleAccept}
                                    className="flex-1 bg-primary-600 text-white py-6 rounded-[32px] font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary-600/30 flex items-center justify-center gap-3"
                                >
                                    <Handshake size={20} />
                                    Accept Offer
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-6 rounded-[32px] bg-white dark:bg-neutral-900 border-2 border-neutral-100 dark:border-neutral-800 font-black text-neutral-400 uppercase tracking-widest text-xs"
                                >
                                    <XCircle size={20} />
                                </motion.button>
                            </div>
                        )}
                    </AnimatePresence>

                    <div className="flex gap-3 items-center">
                        <div className="relative flex-1">
                            <AnimatePresence mode="wait">
                                {isRecording ? (
                                    <motion.div
                                        key="recording"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="w-full bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-full px-4 py-3 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={cancelRecording}
                                                className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                            <span className="text-sm font-black text-red-600 dark:text-red-400 tabular-nums">{formatTime(recordingDuration)}</span>
                                        </div>

                                        <button
                                            onClick={stopRecording}
                                            className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
                                        >
                                            <Send size={20} />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="input"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="relative flex items-center gap-2"
                                    >
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                placeholder="Type a message..."
                                                className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full px-6 py-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary-500/10 pr-12 border-none transition-all"
                                                value={inputText}
                                                onChange={(e) => setInputText(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage("text")}
                                            />
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={startRecording}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-red-500 w-10 h-10 flex items-center justify-center transition-colors"
                                            >
                                                <Mic size={20} />
                                            </motion.button>
                                        </div>
                                        {inputText.trim() && (
                                            <motion.button
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleSendMessage("text")}
                                                className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-primary-600/30 shrink-0"
                                            >
                                                <Send size={20} />
                                            </motion.button>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
