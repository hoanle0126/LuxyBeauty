import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Bella Beauty | Mỹ phẩm thiên nhiên cao cấp',
  description:
    'Khám phá bộ sưu tập mỹ phẩm cao cấp được chiết xuất từ thiên nhiên. Bella Beauty mang đến làn da khỏe mạnh và rạng rỡ mỗi ngày với các sản phẩm skincare, makeup và body care.',
  keywords: [
    'mỹ phẩm',
    'skincare',
    'chăm sóc da',
    'trang điểm',
    'makeup',
    'bella beauty',
    'mỹ phẩm thiên nhiên',
    'serum',
    'kem dưỡng',
  ],
  authors: [{ name: 'Bella Beauty' }],
  creator: 'Bella Beauty',
  publisher: 'Bella Beauty',
  metadataBase: new URL('https://bellabeauty.com'),
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://bellabeauty.com',
    siteName: 'Bella Beauty',
    title: 'Bella Beauty | Mỹ phẩm thiên nhiên cao cấp',
    description:
      'Khám phá bộ sưu tập mỹ phẩm cao cấp được chiết xuất từ thiên nhiên. Mang đến làn da khỏe mạnh và rạng rỡ mỗi ngày.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bella Beauty - Mỹ phẩm thiên nhiên cao cấp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bella Beauty | Mỹ phẩm thiên nhiên cao cấp',
    description:
      'Khám phá bộ sưu tập mỹ phẩm cao cấp được chiết xuất từ thiên nhiên.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
