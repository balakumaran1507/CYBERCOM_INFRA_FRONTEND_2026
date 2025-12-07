'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getOrdinal, formatNumber } from '@/lib/utils';
import type { ScoreboardEntry } from '@/lib/types';

interface PodiumProps {
    entries: ScoreboardEntry[];
}

const podiumConfig = [
    { position: 1, height: 'h-48 sm:h-64', color: 'bg-yellow-500', borderColor: 'border-yellow-500', textColor: 'text-yellow-400' },
    { position: 0, height: 'h-40 sm:h-48', color: 'bg-gray-400', borderColor: 'border-gray-400', textColor: 'text-gray-300' },
    { position: 2, height: 'h-32 sm:h-40', color: 'bg-amber-700', borderColor: 'border-amber-700', textColor: 'text-amber-600' },
];

export function Podium({ entries }: PodiumProps) {
    if (entries.length < 3) {
        return null;
    }

    // Reorder for display: 2nd, 1st, 3rd
    const displayOrder = [entries[1], entries[0], entries[2]];

    return (
        <div className="flex items-end justify-center gap-4 sm:gap-8 mb-20">
            {displayOrder.map((entry, index) => {
                const config = podiumConfig[index];
                const actualPosition = config.position;
                const isFirst = actualPosition === 0; // 0 index is actually 2nd place in array for left side, but let's check config
                // Wait, config.position 1 is 1st place (center).
                // Let's rely on actual rank (index + 1 if sorted, but here we mixed them).
                // Config: [1 (2nd place), 0 (1st place), 2 (3rd place)] in the display map loop?
                // Actually: config array is fixed: 0->2nd(pos1), 1->1st(pos0), 2->3rd(pos2)
                // Correct logic:
                // displayOrder[0] = entries[1] (2nd place)
                // displayOrder[1] = entries[0] (1st place)
                // displayOrder[2] = entries[2] (3rd place)

                // My config mapping was index based on displayOrder.
                // Index 0 -> 2nd place.
                // Index 1 -> 1st place.
                // Index 2 -> 3rd place.

                const rank = index === 0 ? 2 : index === 1 ? 1 : 3;

                return (
                    <motion.div
                        key={entry.account_id}
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        className="flex flex-col items-center group relative"
                    >
                        {/* User Info - Floating above */}
                        <div className={`
              mb-4 text-center transition-transform duration-300 group-hover:-translate-y-2
              ${rank === 1 ? 'scale-110' : ''}
            `}>
                            {/* Crown/Rank Indicator */}
                            <div className={`
                w-12 h-12 mx-auto mb-2 flex items-center justify-center font-bold text-xl clip-corner-1
                bg-black border-2 ${config.borderColor} ${config.textColor}
              `}>
                                {rank}
                            </div>

                            <h3 className="font-bold uppercase text-white tracking-wider text-sm mb-1 max-w-[120px] truncate">
                                {entry.name}
                            </h3>
                            <p className={`font-mono font-bold ${config.textColor}`}>
                                {formatNumber(entry.score)}
                            </p>
                        </div>

                        {/* Pillar */}
                        <div
                            className={cn(
                                'w-24 sm:w-32 flex items-end justify-center pb-4 relative overflow-hidden',
                                config.height,
                                'bg-black border-t-4 border-x-2 border-b-0 backdrop-blur-sm',
                                config.borderColor,
                                'bg-opacity-50'
                            )}
                        >
                            <div className={cn(
                                'absolute inset-0 opacity-10',
                                config.color
                            )} />

                            {/* Scanlines */}
                            <div className="absolute inset-0 bg-[url('/grid.png')] opacity-20" />

                            <span className={cn('font-bold text-4xl opacity-20 select-none', config.textColor)}>
                                0{rank}
                            </span>
                        </div>

                        {/* Reflection/Ground Glow */}
                        <div className={cn(
                            'absolute -bottom-4 w-full h-4 blur-xl opacity-30',
                            config.color
                        )} />
                    </motion.div>
                );
            })}
        </div>
    );
}
