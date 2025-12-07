// CTFd API Types

export interface User {
    id: number;
    name: string;
    email: string;
    team_id?: number;
    country?: string;
    affiliation?: string;
    website?: string;
    bracket?: string;
    created?: string;
}

export interface Challenge {
    id: number;
    name: string;
    description: string;
    category: string;
    value: number;
    type: string;
    state: 'visible' | 'hidden';
    max_attempts?: number;
    attempts?: number;
    solves: number;
    solved_by_me: boolean;
    tags?: { value: string }[];
    files?: string[];
    hints?: { id: number; cost: number; content?: string }[];
    connection_info?: string;
}

export interface ScoreboardEntry {
    pos: number;
    account_id: number;
    account_url: string;
    oauth_id?: string;
    name: string;
    score: number;
    bracket?: string;
    bracket_id?: number;
    members?: { id: number; name: string; score: number }[];
    // Extended fields for UI
    id?: number;
    account_type?: string;
    affiliation?: string;
}

export interface APIResponse<T> {
    success: boolean;
    data: T;
    errors?: string[];
}

export interface LoginRequest {
    name: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface AttemptRequest {
    challenge_id: number;
    submission: string;
}

export interface AttemptResponse {
    status: 'correct' | 'incorrect' | 'already_solved' | 'ratelimited';
    message: string;
}

// Category type for filtering
export type ChallengeCategory = 'Web' | 'Crypto' | 'Forensics' | 'Pwn' | 'Reverse' | 'Misc' | 'All';

// Difficulty levels
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

// Helper to determine difficulty from points
export function getDifficulty(points: number): Difficulty {
    if (points <= 100) return 'Easy';
    if (points <= 300) return 'Medium';
    return 'Hard';
}

// Category colors mapping
export const categoryColors: Record<string, string> = {
    web: 'badge-web',
    crypto: 'badge-crypto',
    forensics: 'badge-forensics',
    pwn: 'badge-pwn',
    reverse: 'badge-reverse',
    misc: 'badge-misc',
};

export function getCategoryBadgeClass(category: string): string {
    return categoryColors[category.toLowerCase()] || 'badge-misc';
}

export const CHALLENGE_CATEGORIES = ['Web', 'Crypto', 'Forensics', 'Pwn', 'Reverse', 'Misc'];
