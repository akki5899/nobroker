import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PropDirect - Discover Your Perfect Space',
  description: 'Direct property marketplace connecting owners, tenants, buyers, and agents. Find residential & commercial properties without hassle.',
  keywords: 'property, real estate, rent, buy, sell, commercial, plots, projects, direct property, PropDirect',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'PropDirect - Discover Your Perfect Space',
    description: 'Direct property marketplace for residential & commercial properties',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}