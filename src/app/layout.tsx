import './globals.css';
import { Inter } from 'next/font/google';
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider';
import { Toaster } from 'sonner';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IQ Sejawat',
  description: 'Platform Belajar Online untuk Tenaga Kesehatan',
  icons: {
    icon: [
      {
        url: '/favicon.ico?v=2',
        sizes: 'any',
        type: 'image/x-icon'
      }
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg'
      }
    ]
  },
  manifest: '/manifest.json'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
