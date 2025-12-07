import React from 'react';
import { cn } from '@/lib/utils';
import { getCategoryBadgeClass } from '@/lib/types';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'category';
    category?: string;
    className?: string;
}

export function Badge({ children, variant = 'default', category, className }: BadgeProps) {
    const baseStyles = 'inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wider clip-corner-1';

    const variants = {
        default: 'bg-white/5 text-white border border-border',
        success: 'bg-success/10 text-success border border-success/30',
        warning: 'bg-warning/10 text-warning border border-warning/30',
        error: 'bg-error/10 text-error border border-error/30',
        category: category ? getCategoryBadgeClass(category) : 'bg-white/5 text-white border border-border',
    };

    return (
        <span className={cn(baseStyles, variants[variant], className)}>
            {children}
        </span>
    );
}

interface DifficultyBadgeProps {
    difficulty: 'Easy' | 'Medium' | 'Hard';
    className?: string;
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
    const colors = {
        Easy: 'text-success border-success/30 bg-success/10',
        Medium: 'text-warning border-warning/30 bg-warning/10',
        Hard: 'text-error border-error/30 bg-error/10',
    };

    return (
        <span className={cn(
            'flex items-center gap-2 text-xs font-bold uppercase px-3 py-1 border clip-corner-1',
            colors[difficulty],
            className
        )}>
            <span className={cn('w-1.5 h-1.5', {
                'bg-success': difficulty === 'Easy',
                'bg-warning': difficulty === 'Medium',
                'bg-error': difficulty === 'Hard',
            })} />
            {difficulty}
        </span>
    );
}
