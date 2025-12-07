'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge, DifficultyBadge } from '@/components/ui/badge';
import type { Challenge } from '@/lib/types';
import { getDifficulty } from '@/lib/types';
import { cn } from '@/lib/utils';

const flagSchema = z.object({
    flag: z.string().min(1, 'Flag is required'),
});

type FlagFormValues = z.infer<typeof flagSchema>;

interface ChallengeDetailProps {
    challenge: Challenge | null;
    onSolve: (id: number) => void;
}

export function ChallengeDetail({ challenge, onSolve }: ChallengeDetailProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FlagFormValues>({
        resolver: zodResolver(flagSchema),
    });

    if (!challenge) {
        return (
            <div className="h-full flex items-center justify-center text-muted font-mono border border-white/10 bg-black/50 p-12 clip-corner-2">
                <div className="text-center">
                    <div className="text-4xl mb-4 opacity-20">⚠</div>
                    <p>SELECT A MISSION TO VIEW INTELLIGENCE</p>
                </div>
            </div>
        );
    }

    const onSubmit = async (data: FlagFormValues) => {
        setIsSubmitting(true);
        try {
            const response = await api.submitFlag({ challenge_id: challenge.id, submission: data.flag });

            if (response.success && response.data?.status === 'correct') {
                toast.success('FLAG CAPTURED! EXCELLENT WORK.');
                onSolve(challenge.id);
                reset();
            } else {
                toast.error('ACCESS DENIED: INCORRECT FLAG');
            }
        } catch {
            toast.error('CONNECTION FAILURE');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-black border border-white/20 h-full overflow-y-auto clip-corner-2 relative">
            {/* Header */}
            <div className="p-8 border-b border-white/10 bg-white/5">
                <div className="flex flex-wrap gap-3 mb-4">
                    <Badge variant="category" category={challenge.category}>
                        {challenge.category}
                    </Badge>
                    <DifficultyBadge difficulty={getDifficulty(challenge.value)} />
                    {challenge.solved_by_me && (
                        <Badge variant="success" className="animate-pulse">SOLVED</Badge>
                    )}
                </div>

                <h2 className="text-3xl font-bold uppercase text-white mb-2">
                    {challenge.name}
                </h2>
                <div className="text-3xl font-mono font-bold text-primary">
                    {challenge.value} PTS
                </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
                {/* Description */}
                <div>
                    <h3 className="text-sm font-bold uppercase text-muted mb-3 flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary"></span> Mission Briefing
                    </h3>
                    <div className="prose prose-invert max-w-none font-mono text-sm leading-relaxed text-gray-300">
                        {challenge.description}
                    </div>
                </div>

                {/* Connection Info */}
                {challenge.connection_info && (
                    <div className="bg-white/5 border border-white/10 p-4 clip-corner-1 group hover:border-primary/50 transition-colors">
                        <h3 className="text-xs font-bold uppercase text-muted mb-2">Target Access</h3>
                        <code className="block font-mono text-primary text-sm break-all">
                            {challenge.connection_info}
                        </code>
                    </div>
                )}

                {/* Downloads */}
                {challenge.files && challenge.files.length > 0 && (
                    <div>
                        <h3 className="text-sm font-bold uppercase text-muted mb-3 flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary"></span> Intel Files
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {challenge.files.map((file, idx) => (
                                <a
                                    key={idx}
                                    href={`${process.env.NEXT_PUBLIC_CTFD_URL}${file}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-black border border-white/20 px-4 py-2 text-sm font-mono hover:bg-white/10 hover:border-primary hover:text-primary transition-all uppercase flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download_Asset_{idx + 1}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Flag Submission */}
                {!challenge.solved_by_me && (
                    <div className="pt-8 border-t border-white/10">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <Input
                                {...register('flag')}
                                placeholder="CTF{FLAG_FORMAT}"
                                label="Submit Flag"
                                error={errors.flag?.message}
                                disabled={isSubmitting}
                                className="font-mono"
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                isLoading={isSubmitting}
                                disabled={isSubmitting}
                            >
                                Execute Submission
                            </Button>
                        </form>
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
                    <div>
                        <div className="text-xs font-bold uppercase text-muted">Solves</div>
                        <div className="text-xl font-mono text-white">{challenge.solves}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs font-bold uppercase text-muted">First Blood</div>
                        <div className="text-sm font-mono text-primary truncate">
                            —
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20" />
        </div>
    );
}
