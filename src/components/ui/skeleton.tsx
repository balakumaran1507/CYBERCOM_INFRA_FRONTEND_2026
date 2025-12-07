import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div className={cn('skeleton clip-corner-1 animate-pulse bg-white/5', className)} />
    );
}

export function CardSkeleton() {
    return (
        <div className="bg-card border border-border p-6 clip-corner-2">
            <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-5 w-16" />
            </div>
        </div>
    );
}

export function ChallengeSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    );
}

export function ScoreboardSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex justify-center gap-4 mb-8">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-40 w-32" />
                ))}
            </div>
            {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-card border border-border p-4 clip-corner-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-6 w-40" />
                        </div>
                        <Skeleton className="h-6 w-20" />
                    </div>
                </div>
            ))}
        </div>
    );
}
