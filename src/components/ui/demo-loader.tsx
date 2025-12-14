'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyberShape } from '@/components/ui/cyber-shape';

export function DemoLoader({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('INITIALIZING');

    useEffect(() => {
        const hasSeenLoader = sessionStorage.getItem('demo-loader-shown');
        if (hasSeenLoader) {
            // Optional: logic if we only want to show it once per session. 
            // User asked for "when we refresh", implying every time or at least on page load.
            // I'll stick to showing it every time for now as requested "when we refresh".
        }

        const duration = 5000; // 5 seconds
        const interval = 50;
        const steps = duration / interval;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const newProgress = Math.min((currentStep / steps) * 100, 100);
            setProgress(newProgress);

            // Dynamic status text
            if (newProgress < 20) setStatusText('ESTABLISHING SECURE CONNECTION...');
            else if (newProgress < 40) setStatusText('LOADING DEMO ENVIRONMENT...');
            else if (newProgress < 60) setStatusText('GENERATING SYNTHETIC DATA...');
            else if (newProgress < 80) setStatusText('BYPASSING MAINFRAME FIREWALLS...');
            else setStatusText('ACCESS GRANTED');

            if (currentStep >= steps) {
                clearInterval(timer);
                setTimeout(() => setIsVisible(false), 500); // Short delay at 100% before disappearing
            }
        }, interval);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden font-mono"
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.8, ease: "easeInOut" }
                        }}
                    >
                        {/* === GEOMETRIC BACKGROUND === */}

                        {/* 1. Rotating Grid Floor */}
                        <div
                            className="absolute inset-0 opacity-20 pointer-events-none"
                            style={{
                                backgroundImage: `
                                    linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
                                `,
                                backgroundSize: '60px 60px',
                                transform: 'perspective(500px) rotateX(60deg) translateY(0) scale(3)',
                                transformOrigin: 'center 0%',
                                animation: 'grid-scroll 2s linear infinite'
                            }}
                        />

                        {/* 2. Floating Geometric Shapes */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                            {/* Huge Background Shape (Slow Spin) */}
                            <div className="absolute animate-[spin_30s_linear_infinite]">
                                <CyberShape className="w-[1000px] h-[1000px] opacity-20" variant="outline" delay={0} />
                            </div>

                            {/* Middle Shape (Reverse Spin) */}
                            <div className="absolute animate-[spin_20s_linear_infinite_reverse]">
                                <CyberShape className="w-[700px] h-[700px] opacity-30" variant="secondary" delay={0.2} />
                            </div>

                            {/* Inner Shape (Pulse & Spin) */}
                            <div className="absolute animate-[spin_10s_linear_infinite]">
                                <CyberShape className="w-[400px] h-[400px] opacity-40" variant="primary" delay={0.4} />
                            </div>
                        </div>

                        {/* 3. Radial Gradient Overlay for Depth */}
                        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/50 to-black pointer-events-none" />


                        {/* === CENTRAL CONTENT === */}
                        <div className="relative z-10 w-full max-w-3xl px-6 text-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="mb-10 relative"
                            >
                                {/* Glitch Effect on Text */}
                                <h1 className="text-5xl md:text-7xl font-bold tracking-widest mb-4 relative inline-block text-white"
                                    style={{ textShadow: '2px 2px 0px rgba(0, 240, 255, 0.5), -2px -2px 0px rgba(157, 0, 255, 0.5)' }}>
                                    DEMO SITE
                                </h1>

                                <div className="flex items-center justify-center gap-4 mb-6">
                                    <span className="h-[2px] w-12 bg-secondary" />
                                    <p className="text-primary text-sm md:text-lg tracking-[0.4em] uppercase font-bold text-shadow-glow">
                                        Cybercom Infra
                                    </p>
                                    <span className="h-[2px] w-12 bg-secondary" />
                                </div>
                            </motion.div>

                            {/* Enhanced Progress Bar Component */}
                            <div className="relative w-full max-w-xl mx-auto">
                                {/* Outer Frame with Cut Corners */}
                                <div className="absolute inset-0 bg-primary/20 blur-sm transform scale-[1.02]" />
                                <div className="relative h-10 bg-black/80 border border-primary/50 clip-corner-4 p-1">

                                    {/* Inner Filling Bar */}
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-secondary via-primary to-white relative overflow-hidden"
                                        style={{ width: `${progress}%`, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                                    >
                                        {/* Stripes */}
                                        <div className="absolute inset-0 w-full h-full"
                                            style={{
                                                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.8) 10px, rgba(0,0,0,0.8) 20px)'
                                            }}
                                        />
                                        {/* Highlighting Shine */}
                                        <div className="absolute top-0 right-0 h-full w-2 bg-white blur-[2px] animate-pulse" />
                                    </motion.div>
                                </div>

                                {/* Tech readout under bar */}
                                <div className="flex justify-between items-start mt-2 font-mono text-xs text-primary/80 uppercase">
                                    <div>Mem: {Math.floor(progress * 32.5)}TB // Allocating...</div>
                                    <div className="text-right">
                                        <span className="text-secondary mr-2">Core: {progress < 100 ? 'ACTIVE' : 'READY'}</span>
                                        <span className="text-white font-bold">{Math.round(progress)}%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 h-8 flex items-center justify-center">
                                <p className="text-white/70 text-sm tracking-wider font-bold animate-pulse">
                                    [ {statusText} ]
                                </p>
                            </div>

                            {/* Flashy Warning Box */}
                            <motion.div
                                className="mt-16 bg-error/10 border border-error p-4 max-w-md mx-auto relative overflow-hidden group"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                            >
                                {/* Moving striped background for warning */}
                                <div className="absolute inset-0 opacity-10 animate-[scroll_2s_linear_infinite]"
                                    style={{ backgroundImage: 'repeating-linear-gradient(90deg, #FF2A2A, #FF2A2A 2px, transparent 2px, transparent 10px)' }}
                                />

                                <p className="text-error font-bold uppercase tracking-widest text-xs relative z-10 flex items-center justify-center gap-2">
                                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-error opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-error"></span>
                                    Simulation Mode Active
                                </p>
                            </motion.div>
                        </div>

                        {/* HUD Elements */}
                        <div className="absolute top-0 left-0 p-8 w-full flex justify-between pointer-events-none">
                            <div className="flex flex-col gap-1">
                                <div className="w-32 h-1 bg-primary/30" />
                                <div className="w-24 h-1 bg-primary/20" />
                                <div className="w-16 h-1 bg-primary/10" />
                            </div>
                            <div className="text-right">
                                <div className="w-32 h-1 bg-secondary/30 ml-auto" />
                                <div className="w-24 h-1 bg-secondary/20 ml-auto" />
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
            {!isVisible && children}
        </>
    );
}

// Add global styles for animations locally component if needed, or rely on existing globals.
// Since we used standard CSS for some parts (like background), we might need a keyframe for the scanner if not present.
// I'll add a style tag for the scan animation to be safe.
