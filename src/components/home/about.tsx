'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CyberShape } from '@/components/ui/cyber-shape';

const features = [
    {
        title: 'REAL-WORLD OPS',
        description: 'Challenges designed by industry experts reflecting actual security vulnerabilities.',
        icon: '01'
    },
    {
        title: 'LIVE FIRE EXERCISE',
        description: 'Hands-on experience with cutting-edge security tools and techniques.',
        icon: '02'
    },
    {
        title: 'GLOBAL INTEL',
        description: 'Connect with security researchers and ethical hackers worldwide.',
        icon: '03'
    },
];

export function About() {
    return (
        <section className="relative py-32 bg-black overflow-hidden bg-dot-pattern">
            {/* Spotlight Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

            {/* Massive Structural Graphics */}
            <div className="absolute right-[-300px] top-[10%] pointer-events-none">
                <CyberShape className="w-[1000px] h-[1000px] opacity-10 text-white" variant="outline" delay={0.5} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Decorative Tag */}
                        <div className="inline-flex items-center gap-2 mb-6 bg-white/5 border border-white/10 px-3 py-1 clip-corner-1">
                            <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
                            <span className="font-mono text-primary text-xs tracking-widest uppercase">
                                BRIEFING // M.01
                            </span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl font-bold mb-8 uppercase tracking-tight relative">
                            MISSION <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">PARAMETERS</span>
                        </h2>

                        <p className="text-xl text-zinc-400 font-mono leading-relaxed mb-12 border-l-2 border-primary/50 pl-6 bg-gradient-to-r from-white/5 to-transparent py-4">
                            Whether you are a seasoned operative or a recruit, our platform
                            offers missions suited for every clearance level.
                        </p>

                        <div className="space-y-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="flex gap-6 group hover:translate-x-2 transition-transform duration-300"
                                >
                                    <div className="text-4xl font-bold font-mono text-white/20 group-hover:text-primary transition-colors relative">
                                        {feature.icon}
                                        <div className="absolute -bottom-2 -right-2 w-full h-1 bg-white/10 group-hover:bg-primary/50 transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-primary transition-colors flex items-center gap-2">
                                            {feature.title}
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary text-xs">//</span>
                                        </h3>
                                        <p className="text-zinc-500 font-mono text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Content - Categories Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 gap-4 relative"
                    >
                        {/* Background Accent for Grid */}
                        <div className="absolute -inset-4 bg-white/5 -skew-y-2 -z-10 clip-corner-2 opacity-50" />

                        {[
                            { name: 'WEB', color: 'border-cyan-500 hover:bg-cyan-950/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' },
                            { name: 'CRYPTO', color: 'border-purple-500 hover:bg-purple-950/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]' },
                            { name: 'FORENSICS', color: 'border-green-500 hover:bg-green-950/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]' },
                            { name: 'PWN', color: 'border-red-500 hover:bg-red-950/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' },
                            { name: 'REVERSE', color: 'border-yellow-500 hover:bg-yellow-950/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]' },
                            { name: 'MISC', color: 'border-gray-500 hover:bg-gray-800/50 shadow-[0_0_15px_rgba(107,114,128,0.1)]' },
                        ].map((category, index) => (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className={`
                  border-l-4 ${category.color} bg-black/40 backdrop-blur-sm p-8 
                  clip-corner-1 transition-all duration-300 group cursor-pointer
                  border-t border-r border-b border-white/5
                `}
                            >
                                <span className="text-xl font-bold text-white tracking-widest group-hover:translate-x-2 transition-transform block">
                                    {category.name}
                                </span>
                                <span className="text-xs font-mono text-muted mt-2 block group-hover:text-primary transition-colors">
                  // ACCESS GRANTED
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
