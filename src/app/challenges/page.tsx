'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import type { Challenge, ChallengeCategory } from '@/lib/types';
import { CategorySidebar } from '@/components/challenges/category-sidebar';
import { ChallengeCard } from '@/components/challenges/challenge-card';
import { ChallengeDetail } from '@/components/challenges/challenge-detail';
import { ChallengeSkeleton } from '@/components/ui/skeleton';

export default function ChallengesPage() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory>('All');
    const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchChallenges();
    }, []);

    const fetchChallenges = async () => {
        try {
            const response = await api.getChallenges();
            if (response.success) {
                setChallenges(response.data);
            } else {
                setError(response.errors?.[0] || 'Failed to load challenges');
            }
        } catch {
            setError('Failed to load challenges');
        } finally {
            setIsLoading(false);
        }
    };

    // Filter challenges by category
    const filteredChallenges = useMemo(() => {
        if (selectedCategory === 'All') return challenges;
        return challenges.filter(
            (c) => c.category.toLowerCase() === selectedCategory.toLowerCase()
        );
    }, [challenges, selectedCategory]);

    // Calculate challenge counts per category
    const challengeCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        challenges.forEach((c) => {
            const cat = c.category.toLowerCase();
            counts[cat] = (counts[cat] || 0) + 1;
        });
        return counts;
    }, [challenges]);

    // Handle solve to refresh challenge state
    const handleSolve = () => {
        fetchChallenges();
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                        <span className="gradient-text">Challenges</span>
                    </h1>
                    <p className="text-muted max-w-2xl mx-auto">
                        Test your skills across multiple categories. Solve challenges to earn points and climb the leaderboard.
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <CategorySidebar
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                            counts={challengeCounts}
                        />
                    </div>

                    {/* Challenges Grid & Detail */}
                    <div className="lg:col-span-3">
                        {isLoading ? (
                            <ChallengeSkeleton />
                        ) : error ? (
                            <div className="bg-error/10 border border-error/30 rounded-xl p-6 text-center">
                                <p className="text-error">{error}</p>
                                <button
                                    onClick={fetchChallenges}
                                    className="mt-4 text-primary hover:underline"
                                >
                                    Try again
                                </button>
                            </div>
                        ) : filteredChallenges.length === 0 ? (
                            <div className="bg-card border border-border rounded-xl p-12 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">No Challenges Found</h3>
                                <p className="text-muted">
                                    {selectedCategory === 'All'
                                        ? 'No challenges are available yet. Check back later!'
                                        : `No challenges in the ${selectedCategory} category.`}
                                </p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Challenge List */}
                                <div className="space-y-4">
                                    {filteredChallenges.map((challenge) => (
                                        <ChallengeCard
                                            key={challenge.id}
                                            challenge={challenge}
                                            isSelected={selectedChallenge?.id === challenge.id}
                                            onClick={() => setSelectedChallenge(challenge)}
                                        />
                                    ))}
                                </div>

                                {/* Challenge Detail */}
                                <div className="md:sticky md:top-24 md:self-start">
                                    {selectedChallenge ? (
                                        <ChallengeDetail
                                            challenge={selectedChallenge}
                                            onSolve={handleSolve}
                                        />
                                    ) : (
                                        <div className="bg-card border border-border rounded-xl p-12 text-center">
                                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold text-white mb-2">Select a Challenge</h3>
                                            <p className="text-muted">
                                                Click on a challenge to view details and submit your flag.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
