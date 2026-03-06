import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/lib/query-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '급할땐',
  description: '내 주변 공공화장실을 빠르게 찾아주는 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <header className="sticky top-0 z-50 border-b bg-background px-4 py-3">
            <h1 className="text-xl font-bold">급할땐</h1>
          </header>
          <main>{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
