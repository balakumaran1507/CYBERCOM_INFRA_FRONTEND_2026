'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, getToken, setToken, removeToken } from './api';
import type { User, LoginRequest, RegisterRequest } from './types';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (credentials: LoginRequest) => Promise<{ success: boolean; errors?: string[] }>;
    register: (data: RegisterRequest) => Promise<{ success: boolean; errors?: string[] }>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        const token = getToken();
        if (!token) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const response = await api.getCurrentUser();
            if (response.success) {
                setUser(response.data);
            } else {
                // Token is invalid, remove it
                removeToken();
                setUser(null);
            }
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    const login = async (credentials: LoginRequest) => {
        const response = await api.login(credentials);

        if (response.success && response.data?.token) {
            setToken(response.data.token);
            await refreshUser();
            return { success: true };
        }

        return { success: false, errors: response.errors };
    };

    const register = async (data: RegisterRequest) => {
        const response = await api.register(data);

        if (response.success) {
            // Auto-login after registration
            const loginResult = await login({ name: data.name, password: data.password });
            return loginResult;
        }

        return { success: false, errors: response.errors };
    };

    const logout = () => {
        api.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                register,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
