import '@/styles/app.css';

import { Footer, Navbar } from '@tuwaio/docs-ui';
import NextTopLoader from 'nextjs-toploader';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Layout } from 'nextra-theme-docs';

import { navLinks } from '@/constants';

// --- Metadata Configuration ---
export const metadata = {
  title: {
    default: 'Orbit Utils Documentation',
    template: '%s – Orbit',
  },
  description:
    'The official documentation for Orbit Utils, your toolkit for easily building user interfaces for web3 applications.',

  keywords: [
    'headless',
    'state management',
    'transaction tracking',
    'web3 utils',
    'solana',
    'gill',
    'solanakit',
    'web3',
    'zustand',
    'wagmi',
    'viem',
    'typescript',
  ],
  authors: [{ name: 'TUWA', url: 'https://github.com/TuwaIO' }],

  openGraph: {
    title: 'Orbit Utils Documentation',
    description:
      'The official documentation for Orbit Utils, your toolkit for easily building user interfaces for web3 applications.',
    url: 'https://orbit.docs.tuwa.io/',
    siteName: 'Orbit Utils Docs',
    images: [
      {
        url: 'https://raw.githubusercontent.com/TuwaIO/workflows/refs/heads/main/preview/preview-logo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Orbit Utils Documentation',
    description:
      'The official documentation for Orbit Utils, your toolkit for easily building user interfaces for web3 applications.',
    images: ['https://raw.githubusercontent.com/TuwaIO/workflows/refs/heads/main/preview/preview-logo.png'],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="apple-mobile-web-app-title" content="Orbit Utils Docs" />
      </Head>
      <body>
        <Layout
          navbar={<Navbar key="navbar" links={navLinks} />}
          footer={<Footer key="footer" />}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/TuwaIO/orbit/tree/main/apps/docs"
          navigation={{ prev: true, next: true }}
        >
          <NextTopLoader color="#6366f1" showSpinner={false} />
          {children}
        </Layout>
      </body>
    </html>
  );
}
