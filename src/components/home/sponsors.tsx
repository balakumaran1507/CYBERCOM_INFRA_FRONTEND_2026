'use client';

import React from 'react';

const sponsors = [
    'SECURECORP', 'OFFENSIVE_SECURITY', 'BLACK_HAT', 'DEF_CON',
    'WIRED', 'HACK_THE_BOX', 'TRY_HACK_ME', 'CROWDSTRIKE',
    'FIREEYE', 'PALANTIR', 'DARPA', 'NSE'
];

export function Sponsors() {
    return (
        <div className="w-full bg-black border-y border-white/10 overflow-hidden py-4 relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

            <div className="flex whitespace-nowrap animate-scroll hover:pause-animation">
                {/* Double the list to create seamless loop */}
                {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
                    <div
                        key={`${sponsor}-${index}`}
                        className="mx-8 flex items-center gap-2 group cursor-default"
                    >
                        <span className="w-2 h-2 bg-white/20 rotate-45 group-hover:bg-primary transition-colors" />
                        <span className="text-lg font-bold font-display text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                            {sponsor}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
