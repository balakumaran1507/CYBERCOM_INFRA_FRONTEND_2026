'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { formatNumber } from '@/lib/utils';
import type { ScoreboardEntry } from '@/lib/types';

interface TeamCardProps {
    entry: ScoreboardEntry;
    index: number;
}

export function TeamCard({ entry, index }: TeamCardProps) {
    const isTopThree = entry.pos <= 3;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className={cn(
                'flex items-center gap-6 p-4 border border-transparent transition-all duration-300',
                'bg-white/5 hover:bg-white/10 hover:border-primary/30 hover:pl-6',
                'clip-corner-1 group cursor-default'
            )}
        >
            {/* Position */}
            <div
                className={cn(
                    'w-12 h-12 flex items-center justify-center font-bold text-lg font-mono border',
                    isTopThree
                        ? 'text-black bg-primary border-primary'
                        : 'text-muted border-white/10 bg-black/50'
                )}
            >
                {String(entry.pos).padStart(2, '0')}
            </div>

            {/* Team Info */}
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white uppercase tracking-wider truncate group-hover:text-primary transition-colors">
                    {entry.name}
                </h3>
            </div>

            {/* Score */}
            <div className="text-right px-4 border-l border-white/10">
                <p className={cn(
                    'text-lg font-bold font-mono',
                    isTopThree ? 'text-primary' : 'text-white'
                )}>
                    {formatNumber(entry.score)}
                </p>
                <p className="text-[10px] font-bold uppercase text-muted tracking-widest">points</p>
            </div>

            {/* Hover Line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom" />
        </motion.div>
    );
}
