'use client';

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import type { ScoreHistoryPoint } from '@/lib/mock-data';

interface ScoreGraphProps {
    data: ScoreHistoryPoint[];
    teams: { name: string; color: string }[];
}

export function ScoreGraph({ data, teams }: ScoreGraphProps) {
    return (
        <div className="w-full h-[400px] bg-black/50 border border-white/10 p-4 rounded-lg clip-corner-2 relative overflow-hidden group">
            {/* Cyber decorative corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-primary/50" />
            <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-primary/50" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-primary/50" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-primary/50" />

            <h3 className="text-xl font-bold font-display uppercase tracking-widest text-white mb-6 pl-2 border-l-4 border-primary">
                Score Trajectory
            </h3>

            <ResponsiveContainer width="100%" height="85%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis
                        dataKey="time"
                        stroke="rgba(255,255,255,0.5)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="rgba(255,255,255,0.5)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(0,0,0,0.9)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '0px',
                            fontFamily: 'monospace'
                        }}
                        itemStyle={{ color: '#fff' }}
                        cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    {teams.map((team, index) => (
                        <Line
                            key={team.name}
                            type="stepAfter"
                            dataKey={team.name}
                            stroke={team.color}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, stroke: 'white', strokeWidth: 2 }}
                            animationDuration={1500}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
