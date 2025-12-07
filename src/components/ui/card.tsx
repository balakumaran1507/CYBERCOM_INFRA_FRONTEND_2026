import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
}

export function Card({ children, className, hover = false, glow = false }: CardProps) {
    return (
        <div
            className={cn(
                'relative bg-card border border-border p-6 clip-corner-2 transition-all duration-300',
                hover && 'hover:border-primary hover:bg-card-hover group cursor-pointer',
                glow && 'border-primary shadow-[0_0_15px_rgba(0,240,255,0.15)]',
                className
            )}
        >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-white/20 group-hover:border-primary transition-colors" />
            <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-white/20 group-hover:border-primary transition-colors" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-white/20 group-hover:border-primary transition-colors" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-white/20 group-hover:border-primary transition-colors" />

            {children}
        </div>
    );
}

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
    return (
        <div className={cn('mb-4 relative z-10', className)}>
            {children}
        </div>
    );
}

interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
    return (
        <h3 className={cn('text-xl font-bold uppercase text-white tracking-wide', className)}>
            {children}
        </h3>
    );
}

interface CardDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
    return (
        <p className={cn('text-muted text-sm mt-1 font-mono', className)}>
            {children}
        </p>
    );
}

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
    return (
        <div className={cn('relative z-10', className)}>
            {children}
        </div>
    );
}

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
    return (
        <div className={cn('mt-6 pt-4 border-t border-border relative z-10', className)}>
            {children}
        </div>
    );
}
