import React from 'react';
import Link from 'next/link';

const footerLinks = {
    platform: [
        { href: '/challenges', label: 'CHALLENGES' },
        { href: '/scoreboard', label: 'SCOREBOARD' },
        { href: '/teams', label: 'TEAMS' },
    ],
    resources: [
        { href: '/about', label: 'ABOUT' },
        { href: '/rules', label: 'RULES' },
        { href: '/faq', label: 'FAQ' },
    ],
    legal: [
        { href: '/privacy', label: 'PRIVACY POLICY' },
        { href: '/terms', label: 'TERMS OF SERVICE' },
        { href: '/contact', label: 'CONTACT' },
    ],
};

const socialLinks = [
    { name: 'TWITTER', href: '#' },
    { name: 'DISCORD', href: '#' },
    { name: 'GITHUB', href: '#' },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-xl font-bold text-white font-display tracking-widest">
                                CYBERCOM <span className="text-primary">INFRA</span>
                            </span>
                        </div>
                        <p className="text-muted text-sm font-mono mb-8 max-w-xs">
                            Elite operational ground for cybersecurity professionals.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="text-xs font-bold text-white border border-white/20 px-3 py-1 hover:bg-primary hover:text-black hover:border-primary transition-colors uppercase tracking-wider"
                                >
                                    {social.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xs font-bold text-primary mb-6 uppercase tracking-widest">Platform</h3>
                            <ul className="space-y-4">
                                {footerLinks.platform.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-muted text-sm font-bold uppercase hover:text-white transition-colors tracking-wide"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-primary mb-6 uppercase tracking-widest">Resources</h3>
                            <ul className="space-y-4">
                                {footerLinks.resources.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-muted text-sm font-bold uppercase hover:text-white transition-colors tracking-wide"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-primary mb-6 uppercase tracking-widest">Legal</h3>
                            <ul className="space-y-4">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-muted text-sm font-bold uppercase hover:text-white transition-colors tracking-wide"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted text-xs font-mono">
                        &copy; {currentYear} CYBERCTF OPERATIONS. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        <span className="text-xs font-mono text-success">SYSTEM ONLINE</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
