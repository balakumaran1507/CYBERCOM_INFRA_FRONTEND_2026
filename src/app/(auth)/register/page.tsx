'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const registerSchema = z.object({
    name: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const { register: registerUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setIsLoading(true);
        const result = await registerUser({
            name: data.name,
            email: data.email,
            password: data.password
        });

        if (!result.success && result.errors) {
            // Handle errors (maybe show a toast or alert, for now just log/alert)
            // Ideally we'd map these to form errors if possible or show a generic error
            console.error(result.errors);
        }
        setIsLoading(false);
    };

    return (
        <Card className="bg-black/80 border-primary/30 backdrop-blur-xl" glow>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <CardHeader className="text-center pb-2 border-b border-white/10">
                <CardTitle className="text-3xl tracking-[0.2em] text-primary drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                    NEW OPERATOR
                </CardTitle>
                <div className="text-[10px] font-mono text-muted mt-2 tracking-widest uppercase opacity-70">
                    // Accreditation Protocol
                </div>
            </CardHeader>

            <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative group">
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-0 group-focus-within:h-8 transition-all duration-300 bg-primary" />
                            <Input
                                {...register('name')}
                                label="CODENAME"
                                error={errors.name?.message}
                                placeholder="CHOOSE_IDENTIFIER"
                                className="bg-white/5 border-white/10 focus:border-primary/50 text-lg tracking-wide pl-4"
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-0 group-focus-within:h-8 transition-all duration-300 bg-primary" />
                            <Input
                                {...register('email')}
                                type="email"
                                label="UPLINK ADDRESS"
                                error={errors.email?.message}
                                placeholder="CONTACT@DOMAIN"
                                className="bg-white/5 border-white/10 focus:border-primary/50 text-lg tracking-wide pl-4"
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-0 group-focus-within:h-8 transition-all duration-300 bg-primary" />
                            <Input
                                {...register('password')}
                                type="password"
                                label="SECURE KEY"
                                error={errors.password?.message}
                                placeholder="••••••••••••"
                                className="bg-white/5 border-white/10 focus:border-primary/50 text-lg tracking-wide pl-4"
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-0 group-focus-within:h-8 transition-all duration-300 bg-primary" />
                            <Input
                                {...register('confirmPassword')}
                                type="password"
                                label="VERIFY KEY"
                                error={errors.confirmPassword?.message}
                                placeholder="••••••••••••"
                                className="bg-white/5 border-white/10 focus:border-primary/50 text-lg tracking-wide pl-4"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-black font-bold tracking-[0.2em] relative overflow-hidden group"
                        isLoading={isLoading}
                    >
                        <span className="relative z-10">INITIATE SEQUENCE</span>
                        <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Button>
                </form>
            </CardContent>

            <div className="text-center py-4 border-t border-white/10 bg-white/5">
                <Link
                    href="/login"
                    className="text-[10px] font-mono text-muted hover:text-primary transition-all uppercase tracking-widest flex items-center justify-center gap-2 group"
                >
                    <span className="w-1 h-1 bg-muted group-hover:bg-primary rounded-full transition-colors" />
                    Already Accredited? [Access Gateway]
                    <span className="w-1 h-1 bg-muted group-hover:bg-primary rounded-full transition-colors" />
                </Link>
            </div>
        </Card>
    );
}
