import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Features from "@/components/Features";
import TrustSection from "@/components/TrustSection";
import MapPreview from "@/components/MapPreview";
import BottomTabBar from "@/components/BottomTabBar";

export default function Home() {
    return (
        <main className="min-h-screen bg-white dark:bg-black font-sans selection:bg-blue-200 selection:text-blue-900">
            <Navbar />
            <Hero />
            <StatsBar />
            <Features />
            <TrustSection />
            <MapPreview />
            <BottomTabBar />
        </main>
    );
}
