import { Analytics } from '@vercel/analytics/react';
import CookiePopup from 'components/cookie-popup';
import Navbar from 'components/layout/navbar';
import { Toaster } from 'components/ui/sonner';
import { ensureStartsWith } from 'lib/utils';
import { Metadata } from 'next';
import { Manrope, Margarine } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--manrope'
});

const margarine = Margarine({
  subsets: ['latin'],
  variable: '--margarine',
  weight: '400'
});

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sv" className={`${manrope.variable} ${margarine.variable}`}>
      <body className="font-manrope">
        <Navbar />
        <Suspense>
          <main>{children}</main>
        </Suspense>
        <Toaster />
        <CookiePopup />
        <Analytics />
      </body>
    </html>
  );
}
