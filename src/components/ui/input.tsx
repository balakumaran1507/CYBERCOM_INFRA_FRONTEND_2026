'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, className, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            'w-full bg-black border border-border px-4 py-3',
                            'text-white placeholder:text-muted/30 font-mono text-sm',
                            'focus:outline-none focus:border-primary focus:ring-0',
                            'transition-all duration-200 clip-corner-1',
                            icon && 'pl-12',
                            error && 'border-error focus:border-error',
                            className
                        )}
                        {...props}
                    />
                    {/* Active border indicator */}
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-focus-within:w-full transition-all duration-300" />
                </div>
                {error && (
                    <p className="mt-2 text-xs text-error uppercase tracking-wide font-bold">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
