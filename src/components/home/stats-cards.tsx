'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface StatCard {
    value: string | number;
    label: string;
    suffix?: string;
}

const stats: StatCard[] = [
    { value: '48', label: 'OPERATIONAL HRS', suffix: '' },
    { value: formatNumber(500), label: 'ACTIVE TEAMS', suffix: '+' },
    { value: '$50K', label: 'BOUNTY POOL', suffix: '' },
    { value: '30', label: 'CHALLENGES', suffix: '+' },
];

export function StatsCards() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-black p-6 group hover:bg-white/5 transition-colors"
                >
                    <div className="text-3xl sm:text-4xl font-bold font-mono text-white mb-2 group-hover:text-primary transition-colors">
                        {stat.value}
                        {stat.suffix && <span className="text-primary">{stat.suffix}</span>}
                    </div>
                    <div className="text-xs font-bold text-muted uppercase tracking-widest group-hover:text-white transition-colors">
                        {stat.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
