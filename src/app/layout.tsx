import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/lib/auth";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DemoLoader } from "@/components/ui/demo-loader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cybercom CTF Infra - Premier Capture The Flag Competition",
  description: "Join the premier Capture The Flag competition. Solve challenges in Web, Crypto, Forensics, Pwn, Reverse, and more. Compete with the best and prove your cybersecurity skills.",
  keywords: ["CTF", "Capture The Flag", "Cybersecurity", "Hacking", "Security"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <AuthProvider>
          <DemoLoader>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </DemoLoader>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              },
              success: {
                iconTheme: {
                  primary: '#00FF88',
                  secondary: '#1a1a1a',
                },
              },
              error: {
                iconTheme: {
                  primary: '#FF4444',
                  secondary: '#1a1a1a',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
