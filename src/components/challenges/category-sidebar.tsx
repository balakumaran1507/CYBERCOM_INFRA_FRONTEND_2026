'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CHALLENGE_CATEGORIES, type ChallengeCategory } from '@/lib/types';

interface CategorySidebarProps {
    selectedCategory: ChallengeCategory;
    onSelectCategory: (category: ChallengeCategory) => void;
    counts: Record<string, number>;
}

export function CategorySidebar({ selectedCategory, onSelectCategory, counts }: CategorySidebarProps) {
    const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

    return (
        <div className="space-y-1">
            <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-4 px-2">
                Categories
            </h3>

            <button
                onClick={() => onSelectCategory('All')}
                className={cn(
                    'w-full flex items-center justify-between px-4 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-200 border-l-2',
                    selectedCategory === 'All'
                        ? 'border-primary bg-primary/10 text-white'
                        : 'border-transparent text-muted hover:text-white hover:bg-white/5'
                )}
            >
                <span>All Missions</span>
                <span className="font-mono text-xs opacity-60">[{totalCount}]</span>
            </button>

            {CHALLENGE_CATEGORIES.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category as ChallengeCategory)}
                    className={cn(
                        'w-full flex items-center justify-between px-4 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-200 border-l-2',
                        selectedCategory === category
                            ? 'border-primary bg-primary/10 text-white'
                            : 'border-transparent text-muted hover:text-white hover:bg-white/5'
                    )}
                >
                    <span>{category}</span>
                    <span className="font-mono text-xs opacity-60">
                        [{counts[category] || 0}]
                    </span>
                </button>
            ))}
        </div>
    );
}
