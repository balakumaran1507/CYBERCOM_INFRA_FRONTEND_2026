'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import type { ScoreboardEntry } from '@/lib/types';
import { ScoreboardSkeleton } from '@/components/ui/skeleton';
import { ScoreGraph } from '@/components/scoreboard/score-graph';
import { TopTeamsWidget } from '@/components/scoreboard/top-teams-widget';
import { MOCK_SCORE_HISTORY } from '@/lib/mock-data';

const REFRESH_INTERVAL = 30000; // 30 seconds

// Colors for the top teams in the graph
const GRAPH_COLORS = ['#FFD700', '#00F0FF', '#9D00FF', '#FF003C', '#00FF9D'];

export default function ScoreboardPage() {
    const [entries, setEntries] = useState<ScoreboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchScoreboard = useCallback(async () => {
        try {
            const response = await api.getScoreboard();
            if (response.success) {
                setEntries(response.data);
                setLastUpdated(new Date());
                setError(null);
            } else {
                setError(response.errors?.[0] || 'Failed to load scoreboard');
            }
        } catch {
            setError('Failed to load scoreboard');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchScoreboard();
        const interval = setInterval(fetchScoreboard, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [fetchScoreboard]);

    // Prepare data for graph (mock for now, as API doesn't provide history yet)
    // In a real app, we'd map this from the API response
    const graphTeams = entries.slice(0, 5).map((entry, index) => ({
        name: entry.name,
        color: GRAPH_COLORS[index % GRAPH_COLORS.length]
    }));

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">

            {/* Header */}
            <header className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-tight">
                        <span className="text-white">Scoreboard</span>
                    </h1>
                    <p className="text-sm text-muted font-mono mt-1">
                        Live Ranking • Updated {lastUpdated?.toLocaleTimeString()}
                    </p>
                </div>
                <div className="hidden md:block">
                    <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-sm border border-primary/20">
                        STATUS: LIVE
                    </span>
                </div>
            </header>

            {isLoading ? (
                <ScoreboardSkeleton />
            ) : error ? (
                <div className="text-error text-center p-10 border border-error/20 bg-error/5">{error}</div>
            ) : (
                <div className="space-y-8">

                    {/* Top: Score Graph */}
                    <section>
                        <ScoreGraph data={MOCK_SCORE_HISTORY} teams={graphTeams} />
                    </section>

                    {/* Bottom Split Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Left: Top 3 Cards */}
                        <div className="lg:col-span-4 space-y-6">
                            <h3 className="text-sm font-bold text-muted uppercase tracking-widest pl-1">
                                Podium Leaders
                            </h3>
                            <TopTeamsWidget entries={entries} />
                        </div>

                        {/* Right: Detailed List */}
                        <div className="lg:col-span-8">
                            <h3 className="text-sm font-bold text-muted uppercase tracking-widest pl-1 mb-6">
                                All Teams
                            </h3>

                            <div className="bg-black/40 border border-white/10 rounded-sm overflow-hidden">
                                {/* Table Header */}
                                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-white/5 border-b border-white/10 text-xs font-bold text-muted uppercase tracking-wider">
                                    <div className="col-span-1">#</div>
                                    <div className="col-span-5">Team</div>
                                    <div className="col-span-3 text-right">Score</div>
                                    <div className="col-span-3 text-right">Last Solved</div>
                                </div>

                                {/* Table Body */}
                                <div className="divide-y divide-white/5">
                                    {entries.map((entry, index) => (
                                        <motion.div
                                            key={entry.account_id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/5 transition-colors group"
                                        >
                                            <div className="col-span-1 font-mono text-muted group-hover:text-white">
                                                {index + 1}
                                            </div>
                                            <div className="col-span-5 font-bold text-white uppercase text-sm tracking-wide">
                                                {entry.name}
                                                {index < 3 && (
                                                    <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-primary/20 text-primary border border-primary/30 rounded-sm">
                                                        TOP {index + 1}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="col-span-3 text-right font-mono text-primary font-bold">
                                                {entry.score}
                                            </div>
                                            <div className="col-span-3 text-right font-mono text-xs text-muted">
                                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
