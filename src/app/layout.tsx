import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tempered Strength',
  description: 'Tempered Strength. Forging Fitness.',
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        className={`${inter.className} w-full h-screen bg-zinc-800 text-white`}
      >
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
