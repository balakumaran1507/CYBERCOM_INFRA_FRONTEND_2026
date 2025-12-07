'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CyberShapeProps {
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    delay?: number;
}

export function CyberShape({ className, variant = 'outline', delay = 0 }: CyberShapeProps) {
    const strokeColor = variant === 'primary' ? 'var(--color-primary)' :
        variant === 'secondary' ? 'var(--color-secondary)' :
            'rgba(255, 255, 255, 0.2)';

    return (
        <motion.div
            className={cn("absolute pointer-events-none", className)}
            initial={{ opacity: 0, rotate: -10, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1.5, delay, ease: "easeOut" }}
        >
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Large Outer Hex-like Shape */}
                <motion.path
                    d="M200 10 L390 100 L390 300 L200 390 L10 300 L10 100 Z"
                    stroke={strokeColor}
                    strokeWidth="1"
                    className="cyber-shape-stroke"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: delay + 0.2, ease: "easeInOut" }}
                />

                {/* Inner Crosshair / Reticle */}
                <motion.path
                    d="M200 50 V350 M50 200 H350"
                    stroke={strokeColor}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 1, delay: delay + 1 }}
                />

                {/* Decorative Circles */}
                <circle cx="200" cy="200" r="100" stroke={strokeColor} strokeWidth="1" strokeDasharray="10 5" opacity="0.5" />
                <circle cx="200" cy="200" r="140" stroke={strokeColor} strokeWidth="1" opacity="0.3" />

                {/* Random Tech Accents */}
                <circle cx="390" cy="100" r="3" fill={strokeColor} />
                <circle cx="10" cy="300" r="3" fill={strokeColor} />
                <rect x="190" y="190" width="20" height="20" stroke={strokeColor} strokeWidth="1" />
            </svg>
        </motion.div>
    );
}
