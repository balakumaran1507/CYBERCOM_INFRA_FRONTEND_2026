'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ScoreboardEntry } from '@/lib/types';

interface TopTeamsWidgetProps {
    entries: ScoreboardEntry[];
}

export function TopTeamsWidget({ entries }: TopTeamsWidgetProps) {
    // Only take top 3
    const topTeams = entries.slice(0, 3);

    // Sort logic handled by parent, we assume entries are sorted

    const getRankColor = (pos: number) => {
        switch (pos) {
            case 1: return 'text-[#FFD700] border-[#FFD700]'; // Gold
            case 2: return 'text-[#C0C0C0] border-[#C0C0C0]'; // Silver
            case 3: return 'text-[#CD7F32] border-[#CD7F32]'; // Bronze
            default: return 'text-white border-white';
        }
    };

    const getMedalIcon = (pos: number) => {
        switch (pos) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return '';
        }
    };

    return (
        <div className="space-y-4">
            {topTeams.map((entry, index) => (
                <motion.div
                    key={entry.account_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/40 border border-white/10 p-4 relative group hover:bg-white/5 transition-colors overflow-hidden"
                >
                    {/* Rank Indicator Bar */}
                    <div className={cn("absolute left-0 top-0 bottom-0 w-1",
                        index === 0 ? "bg-[#FFD700]" :
                            index === 1 ? "bg-[#C0C0C0]" :
                                "bg-[#CD7F32]"
                    )} />

                    <div className="flex items-center justify-between pl-3">
                        {/* Left: Rank & Name */}
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-8 h-8 rounded-none flex items-center justify-center font-bold text-lg",
                                // getRankColor(index + 1)
                            )}>
                                {getMedalIcon(index + 1)}
                            </div>

                            <div>
                                <h3 className="font-bold text-white uppercase tracking-wider text-sm md:text-base">
                                    {entry.name}
                                </h3>
                                <p className="text-xs text-muted font-mono mt-0.5">
                                    {entry.affiliation || 'Unknown Affiliation'}
                                </p>
                            </div>
                        </div>

                        {/* Right: Score & Stats */}
                        <div className="text-right">
                            <div className={cn("font-mono font-bold text-lg md:text-xl", getRankColor(index + 1).split(' ')[0])}>
                                {entry.score} <span className="text-xs opacity-60">pts</span>
                            </div>
                            <div className="text-xs text-muted font-mono mt-1">
                                {Math.floor(Math.random() * 20) + 10} / 39 Solved
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar Visual (Decorative) */}
                    <div className="mt-4 h-1 bg-white/10 w-full relative">
                        <div
                            className={cn("h-full absolute left-0 top-0 transition-all duration-1000",
                                index === 0 ? "bg-[#FFD700]" :
                                    index === 1 ? "bg-[#C0C0C0]" :
                                        "bg-[#CD7F32]"
                            )}
                            style={{ width: `${(entry.score / 2000) * 100}%` }}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
