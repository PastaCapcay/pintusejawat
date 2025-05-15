import Providers from '@/components/layout/providers';
import { fontVariables } from '@/lib/font';
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';
import './theme.css';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import Head from 'next/head';

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
};

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'PintuSejawat',
    template: '%s | PintuSejawat'
  },
  description:
    'Platform all-in-one buat belajar, tryout, dan mentoring UKAI secara online.',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any'
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      }
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    shortcut: ['/favicon.ico'],
    other: [
      {
        rel: 'icon',
        url: '/favicon.ico'
      },
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png'
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png'
      }
    ]
  },
  manifest: '/site.webmanifest'
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get('active_theme')?.value;
  const isScaled = activeThemeValue?.endsWith('-scaled');

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `
          }}
        />
      </head>
      <body
        className={cn(
          'bg-background font-sans antialiased',
          activeThemeValue ? `theme-${activeThemeValue}` : '',
          isScaled ? 'theme-scaled' : '',
          fontVariables,
          inter.className
        )}
      >
        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <Providers activeThemeValue={activeThemeValue as string}>
              <Toaster />
              {children}
            </Providers>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
