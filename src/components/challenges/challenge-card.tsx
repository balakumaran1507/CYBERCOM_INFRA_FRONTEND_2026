'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { getCategoryBadgeClass, getDifficulty, type Challenge } from '@/lib/types';

interface ChallengeCardProps {
    challenge: Challenge;
    onClick: () => void;
    isSelected?: boolean;
}

export function ChallengeCard({ challenge, onClick, isSelected }: ChallengeCardProps) {
    const difficulty = getDifficulty(challenge.value);

    const difficultyColor = {
        Easy: 'text-success border-success/30',
        Medium: 'text-warning border-warning/30',
        Hard: 'text-error border-error/30',
    };

    return (
        <div
            onClick={onClick}
            className={cn(
                'group relative bg-black border border-white/10 p-5 cursor-pointer transition-all duration-300 clip-corner-1',
                'hover:bg-white/5 hover:border-primary/50',
                challenge.solved_by_me && 'border-success/30 bg-success/5'
            )}
        >
            <div className="flex justify-between items-start mb-3">
                <div className={cn(
                    'text-xs font-bold uppercase tracking-wider px-2 py-1 border',
                    getCategoryBadgeClass(challenge.category)
                )}>
                    {challenge.category}
                </div>
                <div className={cn(
                    'text-xs font-bold uppercase tracking-wider px-2 py-1 border clip-corner-1',
                    difficultyColor[difficulty]
                )}>
                    {difficulty}
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors uppercase">
                {challenge.name}
            </h3>

            <div className="flex items-center justify-between mt-4 border-t border-white/10 pt-3">
                <span className="text-2xl font-bold font-mono text-white">
                    {challenge.value} <span className="text-xs text-muted">PTS</span>
                </span>
                {challenge.solved_by_me && (
                    <span className="text-success text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                        <span className="w-2 h-2 bg-success rounded-full animate-pulse" /> Solved
                    </span>
                )}
            </div>

            {/* Hover corner accent */}
            <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-r-[20px] border-b-transparent border-r-transparent group-hover:border-r-primary transition-all duration-300" />
        </div>
    );
}
