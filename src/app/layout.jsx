import './globals.css';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import Navbar from './components/Navbar';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'S M Turag | Full Stack Web & Mobile Architect',
  description: 'Official Portfolio of S M Turag - Full Stack Web & Mobile App Developer specializing in Laravel, React, Next.js, React Native, and Flutter.',
  keywords: [
    'S M Turag',
    'Full Stack Developer',
    'Laravel Developer Bangladesh',
    'React Native Engineer',
    'Next.js Architect',
    'Mobile App Developer',
    'Software Engineer Dhaka'
  ],
  authors: [{ name: 'S M Turag' }],
  creator: 'S M Turag',
  publisher: 'S M Turag',
  openGraph: {
    title: 'S M Turag | Full Stack Web & Mobile Architect',
    description: 'Explore enterprise web systems, high-concurrency APIs, and mobile applications engineered by S M Turag.',
    url: 'https://smturag.com',
    siteName: 'S M Turag Portfolio',
    images: [
      {
        url: '/aa.jpg',
        width: 1200,
        height: 630,
        alt: 'S M Turag - Full Stack Architect Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S M Turag | Full Stack Web & Mobile Architect',
    description: 'Official Portfolio of S M Turag - Full Stack Web & Mobile Applications Developer.',
    images: ['/aa.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/aa.jpg', type: 'image/jpeg', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/aa.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <body className={plusJakarta.className}>
        {/* Ambient background glow elements */}
        <div className="ambient-glow-1" />
        <div className="ambient-glow-2" />

        <Navbar />
        <main style={{ minHeight: '100vh', paddingTop: '80px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
