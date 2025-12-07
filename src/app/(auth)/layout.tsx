export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative bg-black">
            {/* Subtle Background */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Clean Minimal Container */}
            <div className="w-full max-w-sm relative z-10">
                {/* Sharp Top/Bottom Lines */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mb-8" />

                {children}

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mt-8" />
            </div>
        </div>
    );
}
