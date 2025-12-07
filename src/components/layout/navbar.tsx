'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/challenges', label: 'Challenges' },
    { href: '/scoreboard', label: 'Scoreboard' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { user, isAuthenticated, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 border-b border-white/10',
                isScrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo - Updated Branding */}
                    <Link href="/" className="flex items-center gap-3">
                        <span className="text-xl font-bold text-white font-display tracking-widest">
                            CYBERCOM <span className="text-primary">INFRA</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 border-b-2',
                                    pathname === link.href
                                        ? 'text-primary border-primary bg-primary/5'
                                        : 'text-muted border-transparent hover:text-white hover:bg-white/5'
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Section */}
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-6">
                                <span className="text-sm font-mono text-muted">
                                    USR: <span className="text-primary font-bold">{user?.name}</span>
                                </span>
                                <Button variant="secondary" size="sm" onClick={logout} className="clip-corner-1">
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login">
                                    <Button variant="ghost" size="sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button variant="primary" size="sm">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white hover:bg-white/10 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 flex flex-col items-end gap-1.5">
                            <span className={cn("h-0.5 bg-current transition-all", isMobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6")} />
                            <span className={cn("h-0.5 bg-current transition-all", isMobileMenuOpen ? "opacity-0" : "w-4")} />
                            <span className={cn("h-0.5 bg-current transition-all", isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-2")} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black border-b border-border overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'block py-3 px-4 text-sm font-bold uppercase tracking-wider',
                                        pathname === link.href
                                            ? 'text-black bg-primary clip-corner-1'
                                            : 'text-muted hover:text-white hover:bg-white/5'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-6 border-t border-border space-y-3">
                                {isAuthenticated ? (
                                    <>
                                        <p className="text-sm font-mono text-muted px-4">
                                            LOGGED AS: <span className="text-primary">{user?.name}</span>
                                        </p>
                                        <Button variant="secondary" size="md" onClick={logout} className="w-full">
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <Link href="/login" className="block">
                                            <Button variant="ghost" size="md" className="w-full border border-border">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link href="/register" className="block">
                                            <Button variant="primary" size="md" className="w-full">
                                                Register
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
