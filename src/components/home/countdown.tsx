'use client';

import React, { useEffect, useState } from 'react';
import { formatCountdown } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CountdownProps {
    targetDate: Date;
    label?: string;
}

export function Countdown({ targetDate }: CountdownProps) {
    const [countdown, setCountdown] = useState(() => formatCountdown(targetDate));

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(formatCountdown(targetDate));
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const timeBlocks = [
        { value: countdown.days, label: 'DAYS' },
        { value: countdown.hours, label: 'HRS' },
        { value: countdown.minutes, label: 'MIN' },
        { value: countdown.seconds, label: 'SEC' },
    ];

    return (
        <div className="grid grid-cols-4 gap-2">
            {timeBlocks.map((block) => (
                <div key={block.label} className="text-center group">
                    <div className={cn(
                        "bg-white/5 border border-white/10 p-4 clip-corner-1 transition-all duration-300",
                        "group-hover:border-primary/50 group-hover:bg-primary/5"
                    )}>
                        <div className="text-3xl font-bold font-mono text-white group-hover:text-primary transition-colors">
                            {String(block.value).padStart(2, '0')}
                        </div>
                    </div>
                    <div className="text-xs font-bold text-muted mt-2 tracking-widest">
                        {block.label}
                    </div>
                </div>
            ))}
        </div>
    );
}
