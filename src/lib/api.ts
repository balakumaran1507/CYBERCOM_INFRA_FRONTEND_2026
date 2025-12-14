import Cookies from 'js-cookie';
import type {
    APIResponse,
    User,
    Challenge,
    ScoreboardEntry,
    LoginRequest,
    RegisterRequest,
    AttemptRequest,
    AttemptResponse
} from './types';
import { MOCK_CHALLENGES, MOCK_SCOREBOARD } from './mock-data';

// Configure your CTFd backend URL here
const API_BASE_URL = process.env.NEXT_PUBLIC_CTFD_URL || 'http://localhost:8000';

// Token management
const TOKEN_KEY = 'ctfd_token';

export function getToken(): string | undefined {
    return Cookies.get(TOKEN_KEY);
}

export function setToken(token: string): void {
    Cookies.set(TOKEN_KEY, token, { expires: 7, sameSite: 'Lax' });
}

export function removeToken(): void {
    Cookies.remove(TOKEN_KEY);
}

// API client with error handling
class APIClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<APIResponse<T>> {
        const token = getToken();

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (token) {
            (headers as Record<string, string>)['Authorization'] = `Token ${token}`;
        }

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers,
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    data: null as T,
                    errors: data.errors || [data.message || 'An error occurred'],
                };
            }

            return {
                success: true,
                data: data.data || data,
            };
        } catch (error) {
            console.error('API Error:', error);
            return {
                success: false,
                data: null as T,
                errors: ['Network error. Please check your connection.'],
            };
        }
    }

    // Auth endpoints
    async login(credentials: LoginRequest): Promise<APIResponse<{ token: string }>> {
        return this.request('/api/v1/tokens', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    async register(data: RegisterRequest): Promise<APIResponse<User>> {
        return this.request('/api/v1/users', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getCurrentUser(): Promise<APIResponse<User>> {
        return this.request('/api/v1/users/me');
    }

    async logout(): Promise<void> {
        removeToken();
    }

    // Challenge endpoints
    async getChallenges(): Promise<APIResponse<Challenge[]>> {
        const response = await this.request<Challenge[]>('/api/v1/challenges');
        if (!response.success) {
            console.log('Using mock challenges data');
            return {
                success: true,
                data: MOCK_CHALLENGES,
            };
        }
        return response;
    }

    async getChallenge(id: number): Promise<APIResponse<Challenge>> {
        return this.request(`/api/v1/challenges/${id}`);
    }

    async submitFlag(data: AttemptRequest): Promise<APIResponse<AttemptResponse>> {
        return this.request('/api/v1/challenges/attempt', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Scoreboard endpoints
    async getScoreboard(): Promise<APIResponse<ScoreboardEntry[]>> {
        const response = await this.request<ScoreboardEntry[]>('/api/v1/scoreboard');
        if (!response.success) {
            console.log('Using mock scoreboard data');
            return {
                success: true,
                data: MOCK_SCOREBOARD,
            };
        }
        return response;
    }
}

// Export singleton instance
export const api = new APIClient(API_BASE_URL);
