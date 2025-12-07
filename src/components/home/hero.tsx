'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Countdown } from './countdown';
import { StatsCards } from './stats-cards';
import { CyberShape } from '@/components/ui/cyber-shape';

// Set competition date - adjust as needed
const COMPETITION_DATE = new Date('2024-02-15T00:00:00Z');

export function Hero() {
    return (
        <section className="relative min-h-screen pt-20 flex flex-col justify-center overflow-hidden bg-dot-pattern">
            {/* Spotlight Gradients (Colorful Impact) */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-secondary/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

            {/* Background Grid (Existing, Subtle) */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Massive Structure Graphics */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <CyberShape className="w-[800px] h-[800px] opacity-100 text-white/5" variant="outline" />
                <CyberShape className="w-[1200px] h-[1200px] opacity-100 rotate-45 text-primary/5" variant="primary" delay={0.5} />
            </div>

            {/* Large Cyber Accent Bars */}
            <div className="absolute top-0 left-0 w-1 h-2/3 bg-gradient-to-b from-primary to-transparent" />
            <div className="absolute bottom-0 right-0 w-1 h-2/3 bg-gradient-to-t from-secondary to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* Main Content */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Season Tag */}
                            <div className="inline-flex items-center gap-3 mb-6 bg-black/40 border border-white/10 px-4 py-2 clip-corner-1 backdrop-blur-sm">
                                <span className="w-2 h-2 bg-primary animate-pulse shadow-[0_0_10px_var(--color-primary)]" />
                                <span className="font-mono text-primary text-sm tracking-widest uppercase shadow-black drop-shadow-md">
                                    System Online // Season 2024
                                </span>
                            </div>

                            {/* Massive Headline */}
                            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-bold leading-[0.9] mb-8 tracking-tighter mix-blend-lighten">
                                HACK<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary animate-pulse">THE PLANET</span>
                            </h1>

                            <p className="text-xl text-zinc-400 max-w-xl mb-10 font-mono leading-relaxed pl-6 border-l-2 border-white/20">
                                <span className="text-white font-bold">ELITE CTF OPERATIONS.</span><br />
                                Infiltrate systems. Decrypt intelligence.<br />
                                Dominate the leaderboard.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-6 mb-16">
                                <Link href="/register">
                                    <Button variant="primary" size="lg" className="text-lg px-10 border-primary/50 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all">
                                        Join Operation
                                    </Button>
                                </Link>
                                <Link href="/challenges">
                                    <Button variant="secondary" size="lg" className="text-lg px-10 border-white/20 hover:bg-white/10">
                                        View Briefing
                                    </Button>
                                </Link>
                            </div>

                            {/* Stats Bar */}
                            <div className="border-t border-white/10 pt-8">
                                <StatsCards />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Panel - Countdown & Visuals */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            {/* Decorative Frame */}
                            <div className="absolute -inset-4 border border-dashed border-white/20 clip-corner-2 opacity-50" />
                            <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl opacity-50" />

                            <div className="bg-black/80 border border-white/20 p-8 clip-corner-2 relative overflow-hidden group backdrop-blur-md">
                                {/* Scanline Effect */}
                                <div className="scanline" />

                                <h3 className="text-2xl font-bold uppercase mb-8 flex items-center gap-3">
                                    <span className="text-primary">//</span> Countdown
                                </h3>

                                <Countdown targetDate={COMPETITION_DATE} />

                                <div className="mt-8 pt-8 border-t border-dashed border-white/20">
                                    <div className="flex justify-between text-sm font-mono text-muted mb-2">
                                        <span>STATUS</span>
                                        <span className="text-success shadow-[0_0_10px_rgba(0,255,157,0.5)]">ACTIVE</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-mono text-muted">
                                        <span>OPERATORS</span>
                                        <span className="text-primary">500+</span>
                                    </div>
                                </div>

                                {/* Corner Accents */}
                                <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-primary" />
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-secondary" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
