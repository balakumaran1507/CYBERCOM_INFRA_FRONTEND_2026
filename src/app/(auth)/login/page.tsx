'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const loginSchema = z.object({
    name: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        await login(data);
        setIsLoading(false);
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold uppercase tracking-widest text-white mb-2">
                    Operator Login
                </h1>
                <p className="text-muted text-xs font-mono tracking-wide">
                    AUTHENTICATE TO ACCESS INFRASTRUCTURE
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <Input
                        {...register('name')}
                        label="Username"
                        error={errors.name?.message}
                        placeholder="ENTER_ID"
                        className="bg-transparent border-x-0 border-t-0 border-b border-white/20 focus:border-primary px-0 text-lg"
                    />

                    <Input
                        {...register('password')}
                        type="password"
                        label="Password"
                        error={errors.password?.message}
                        placeholder="••••••••"
                        className="bg-transparent border-x-0 border-t-0 border-b border-white/20 focus:border-primary px-0 text-lg"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-primary hover:text-black font-bold tracking-widest"
                    isLoading={isLoading}
                >
                    CONNECT
                </Button>
            </form>

            <div className="text-center">
                <Link
                    href="/register"
                    className="text-xs font-mono text-muted hover:text-white transition-colors"
                >
                    NO CREDENTIALS? [REQUEST ACCESS]
                </Link>
            </div>
        </div>
    );
}
