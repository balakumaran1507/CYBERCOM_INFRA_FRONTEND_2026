export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative bg-black overflow-hidden">
            {/* === COMPLEX BACKGROUND === */}

            {/* 1. Base Grid (Perspective Floor) */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)',
                    transformOrigin: 'top center'
                }}
            />

            {/* 2. Vertical Data Lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute left-[10%] top-0 bottom-0 w-[1px] bg-primary" />
                <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-primary" />
                <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-white dashed" />
            </div>

            {/* 3. Random measurement markers (simulated) */}
            <div className="absolute top-10 left-10 text-[10px] font-mono text-primary/40">
                SYS.RDY // 0x4421
            </div>
            <div className="absolute bottom-10 right-10 text-[10px] font-mono text-primary/40">
                SECURE_LINK // ESTABLISHED
            </div>

            {/* === CONTENT CONTAINER === */}
            <div className="w-full max-w-md relative z-10">
                {/* Decorative Brackets */}
                <div className="absolute -top-6 -left-6 w-12 h-12 border-l-2 border-t-2 border-primary/50" />
                <div className="absolute -bottom-6 -right-6 w-12 h-12 border-r-2 border-b-2 border-primary/50" />

                {children}
            </div>
        </div>
    );
}
