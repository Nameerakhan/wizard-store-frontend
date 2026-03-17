import type { Metadata } from "next";
import { Cinzel_Decorative } from "next/font/google";
import "./globals.css";

const cinzelDecorative = Cinzel_Decorative({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-wizard',
  display: 'swap',
});
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "Wizard Store AI - Magical Shopping Assistant",
  description: "AI-powered assistant for wizard merchandise - wands, robes, scarves, collectibles, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={cinzelDecorative.variable}>
      <body className="antialiased bg-[var(--bg-primary)]">
        <ToastProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-20">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <PageTransition>{children}</PageTransition>
              </div>
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
