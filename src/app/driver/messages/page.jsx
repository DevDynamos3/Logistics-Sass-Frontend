"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Search,
    MoreVertical,
    Phone,
    Video,
    Mic,
    Image as ImageIcon,
    Send,
    ChevronLeft,
    Check,
    MessageSquare,
    Play,
    Pause,
    Square,
    Trash2,
    StopCircle,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_CHATS = [
    {
        id: 1,
        name: "Dangote Cement",
        message: "The truck is at the gate now.",
        time: "10:42 AM",
        unread: 2,
        online: true,
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=DC"
    },
    {
        id: 2,
        name: "Lagos Port Authority",
        message: "Please present your manifest.",
        time: "Yesterday",
        unread: 0,
        online: false,
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=LP"
    },
    {
        id: 3,
        name: "Julius Berger",
        message: "Payment has been processed.",
        time: "Feb 14",
        unread: 0,
        online: false,
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=JB"
    }
];

const MOCK_MESSAGES = [
    { id: 1, text: "Hello! checking in on the ETA?", sender: "customer", time: "10:30 AM" },
    { id: 2, text: "I'm about 15 minutes away from the pickup point.", sender: "me", time: "10:32 AM" },
    { id: 3, text: "Great, the security team is notified.", sender: "customer", time: "10:35 AM" },
    { id: 4, text: "The truck is at the gate now.", sender: "customer", time: "10:42 AM" },
];

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
                {isPlaying ? <Pause size={14} fill="white" /> : <Play size={14} fill="white" className="ml-0.5" />}
            </button>
            <div className="flex-1 h-8 flex items-center gap-0.5 opacity-60">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="w-1 bg-white rounded-full animate-pulse"
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

const INITIAL_MESSAGES = {
    1: [
        { id: 1, text: "Hello! checking in on the ETA?", sender: "customer", time: "10:30 AM" },
        { id: 2, text: "I'm about 15 minutes away from the pickup point.", sender: "me", time: "10:32 AM" },
        { id: 3, text: "Great, the security team is notified.", sender: "customer", time: "10:35 AM" },
        { id: 4, text: "The truck is at the gate now.", sender: "customer", time: "10:42 AM" },
    ],
    2: [
        { id: 1, text: "Good morning. Please present your manifest at the main gate.", sender: "customer", time: "Yesterday" },
    ],
    3: [
        { id: 1, text: "Payment has been processed for your last trip.", sender: "customer", time: "Feb 14" },
    ]
};

export default function DriverMessages() {
    const router = useRouter();
    const [selectedChat, setSelectedChat] = useState(null);
    const [chatMessages, setChatMessages] = useState(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState("");
    const [isRecording, setIsRecording] = useState(false);

    const messages = selectedChat ? (chatMessages[selectedChat.id] || []) : [];
    const [recordingDuration, setRecordingDuration] = useState(0);
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
                sendAudioMessage(audioUrl);
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
            mediaRecorderRef.current.stop(); // Stop but don't process (we'd need to modify onstop to handle cancel, simplistic here)
            // Ideally remove the onstop handler or use a flag
            mediaRecorderRef.current.onstop = null;
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            clearInterval(timerRef.current);
            setIsRecording(false);
            setRecordingDuration(0);
        }
    };

    const sendAudioMessage = (url) => {
        if (!selectedChat) return;
        setChatMessages(prev => ({
            ...prev,
            [selectedChat.id]: [
                ...(prev[selectedChat.id] || []),
                {
                    id: Date.now(),
                    type: 'audio',
                    audioUrl: url,
                    sender: "me",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]
        }));
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim() || !selectedChat) return;

        setChatMessages(prev => ({
            ...prev,
            [selectedChat.id]: [
                ...(prev[selectedChat.id] || []),
                {
                    id: Date.now(),
                    text: inputText,
                    sender: "me",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]
        }));
        setInputText("");
    };

    return (
        <div className="flex h-full w-full lg:h-[calc(100vh-32px)] lg:m-4 bg-white dark:bg-neutral-900 lg:rounded-[32px] lg:border border-neutral-200 dark:border-neutral-800 overflow-hidden lg:shadow-xl">
            {/* Sidebar / Chat List */}
            <div className={`${selectedChat ? 'hidden lg:flex' : 'flex'} w-full lg:w-80 flex-col border-r border-neutral-100 dark:border-neutral-800`}>
                <div className="p-4 border-b border-neutral-100 dark:border-neutral-800">
                    {/* Back Button */}
                    <div className="flex items-center gap-3 mb-4">
                        <button
                            onClick={() => router.back()}
                            className="w-10 h-10 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <h2 className="text-lg font-black dark:text-white">Messages</h2>
                    </div>

                    {/* Search */}
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-600 transition-colors" size={18} />
                        <input
                            placeholder="Search chats..."
                            className="w-full h-12 bg-neutral-50 dark:bg-neutral-800 rounded-2xl pl-12 pr-4 font-semibold text-sm outline-none focus:ring-2 ring-primary-600 transition-all dark:text-white"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {MOCK_CHATS.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat)}
                            className={`p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors flex gap-3 ${selectedChat?.id === chat.id ? 'bg-primary-50 dark:bg-primary-900/10' : ''}`}
                        >
                            <div className="relative">
                                <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-2xl shadow-sm" />
                                {chat.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-neutral-900 rounded-full"></span>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-bold text-sm truncate dark:text-white">{chat.name}</h4>
                                    <span className="text-[10px] font-bold text-neutral-400">{chat.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-xs text-neutral-500 truncate">{chat.message}</p>
                                    {chat.unread > 0 && (
                                        <span className="w-5 h-5 bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`${!selectedChat ? 'hidden lg:flex' : 'flex'} flex-1 flex-col bg-neutral-50/50 dark:bg-black/20 w-full`}>
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-16 px-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-white dark:bg-neutral-900">
                            <div className="flex items-center gap-3">
                                <button className="lg:hidden" onClick={() => setSelectedChat(null)}>
                                    <ChevronLeft size={24} />
                                </button>
                                <img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-xl" />
                                <div>
                                    <h3 className="font-bold text-sm dark:text-white">{selectedChat.name}</h3>
                                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Online</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="w-10 h-10 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-500 transition-colors">
                                    <Phone size={20} />
                                </button>
                                <button className="w-10 h-10 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-500 transition-colors">
                                    <Video size={20} />
                                </button>
                                <button className="w-10 h-10 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-500 transition-colors">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'me'
                                        ? 'bg-primary-600 text-white rounded-tr-none'
                                        : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white rounded-tl-none shadow-sm'
                                        }`}>
                                        {msg.type === 'audio' ? (
                                            <AudioMessage src={msg.audioUrl} />
                                        ) : (
                                            <p>{msg.text}</p>
                                        )}
                                        <div className={`text-[9px] font-bold mt-2 flex items-center justify-end gap-1 ${msg.sender === 'me' ? 'text-primary-100' : 'text-neutral-400'}`}>
                                            {msg.time}
                                            {msg.sender === 'me' && <Check size={12} />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
                            {isRecording ? (
                                <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <button
                                        onClick={cancelRecording}
                                        className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                    <div className="flex-1 bg-red-50 dark:bg-red-900/10 rounded-2xl h-12 flex items-center justify-between px-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                            <span className="font-mono font-bold text-red-500">{formatDuration(recordingDuration)}</span>
                                        </div>
                                        <div className="flex gap-0.5 h-4 items-center">
                                            {[...Array(20)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-0.5 bg-red-400 rounded-full animate-pulse"
                                                    style={{
                                                        height: Math.max(4, Math.random() * 16) + 'px',
                                                        animationDelay: `${i * 0.05}s`
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        onClick={stopRecording}
                                        className="w-12 h-12 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-600/20 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        <Send size={20} />
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                    <button type="button" className="w-10 h-10 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-400 transition-colors">
                                        <ImageIcon size={20} />
                                    </button>
                                    <div className="flex-1 relative">
                                        <input
                                            value={inputText}
                                            onChange={(e) => setInputText(e.target.value)}
                                            placeholder="Type a message..."
                                            className="w-full h-12 bg-neutral-50 dark:bg-neutral-800 rounded-2xl pl-4 pr-12 font-medium text-sm outline-none focus:ring-2 ring-primary-600 transition-all dark:text-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={startRecording}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg text-neutral-400 hover:text-red-500 transition-colors"
                                        >
                                            <Mic size={18} />
                                        </button>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={!inputText.trim()}
                                        className="w-12 h-12 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-600/20 disabled:opacity-50 disabled:shadow-none transition-all hover:scale-105 active:scale-95"
                                    >
                                        <Send size={20} />
                                    </button>
                                </form>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-neutral-400">
                        <div className="w-20 h-20 rounded-[32px] bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                            <MessageSquare size={32} />
                        </div>
                        <p className="font-bold text-sm dark:text-neutral-500">Select a chat to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}
