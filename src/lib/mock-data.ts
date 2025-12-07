import type { ScoreboardEntry } from './types';

// New type for score history
export interface ScoreHistoryPoint {
    time: string;
    [key: string]: number | string; // Dynamic keys for team names
}

export const MOCK_CHALLENGES = [
    {
        id: 1,
        name: 'SQL Injection 101',
        description: 'Basic SQL injection vulnerability in search parameter.',
        category: 'Web',
        value: 100,
        type: 'standard',
        state: 'visible' as const,
        solves: 42,
        solved_by_me: true,
    },
    {
        id: 2,
        name: 'Buffer Overflow Basic',
        description: 'Classic stack-based buffer overflow exploit.',
        category: 'Pwn',
        value: 200,
        type: 'standard',
        state: 'visible' as const,
        solves: 15,
        solved_by_me: false,
    },
    {
        id: 3,
        name: 'RSA Oracle',
        description: 'Padding oracle attack against RSA implementation.',
        category: 'Crypto',
        value: 300,
        type: 'standard',
        state: 'visible' as const,
        solves: 8,
        solved_by_me: false,
    },
    {
        id: 4,
        name: 'Missing Headers',
        description: 'Security headers missing from response.',
        category: 'Web',
        value: 150,
        type: 'standard',
        state: 'visible' as const,
        solves: 89,
        solved_by_me: false,
    },
    {
        id: 5,
        name: 'Reverse Me',
        description: 'Find the hidden flag in the binary string.',
        category: 'Reverse Engineering',
        value: 250,
        type: 'standard',
        state: 'visible' as const,
        solves: 12,
        solved_by_me: false,
    },
    {
        id: 6,
        name: 'Forensics 101',
        description: 'Extract metadata from the provided image file.',
        category: 'Forensics',
        value: 100,
        type: 'standard',
        state: 'visible' as const,
        solves: 156,
        solved_by_me: true,
    },
];

export const MOCK_SCOREBOARD: ScoreboardEntry[] = [
    {
        pos: 1,
        account_id: 101,
        account_url: '#',
        account_type: 'team',
        name: 'Red Pwners',
        score: 1250,
        id: 1,
        oauth_id: undefined,
    },
    {
        pos: 2,
        account_id: 102,
        account_url: '#',
        account_type: 'team',
        name: 'Blue Team Alpha',
        score: 1100,
        id: 2,
        oauth_id: undefined,
    },
    {
        pos: 3,
        account_id: 103,
        account_url: '#',
        account_type: 'team',
        name: 'Null Pointers',
        score: 950,
        id: 3,
        oauth_id: undefined,
    },
    {
        pos: 4,
        account_id: 104,
        account_url: '#',
        account_type: 'team',
        name: 'Cyber Ninjas',
        score: 800,
        id: 4,
        oauth_id: undefined,
    },
    {
        pos: 5,
        account_id: 105,
        account_url: '#',
        account_type: 'team',
        name: 'Script Kiddies',
        score: 600,
        id: 5,
        oauth_id: undefined,
    },
];

// Mock data for the graph
export const MOCK_SCORE_HISTORY: ScoreHistoryPoint[] = [
    { time: '08:00', 'Red Pwners': 100, 'Blue Team Alpha': 50, 'Null Pointers': 0 },
    { time: '09:00', 'Red Pwners': 250, 'Blue Team Alpha': 150, 'Null Pointers': 100 },
    { time: '10:00', 'Red Pwners': 400, 'Blue Team Alpha': 300, 'Null Pointers': 200 },
    { time: '11:00', 'Red Pwners': 550, 'Blue Team Alpha': 450, 'Null Pointers': 350 },
    { time: '12:00', 'Red Pwners': 700, 'Blue Team Alpha': 600, 'Null Pointers': 500 },
    { time: '13:00', 'Red Pwners': 850, 'Blue Team Alpha': 750, 'Null Pointers': 650 },
    { time: '14:00', 'Red Pwners': 1000, 'Blue Team Alpha': 900, 'Null Pointers': 800 },
    { time: '15:00', 'Red Pwners': 1150, 'Blue Team Alpha': 1000, 'Null Pointers': 900 },
    { time: '16:00', 'Red Pwners': 1250, 'Blue Team Alpha': 1100, 'Null Pointers': 950 },
];
