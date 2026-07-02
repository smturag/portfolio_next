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
  title: 'S M Turag | Executive Full Stack Engineer',
  description: 'Portfolio & Architecture Showcase of S M Turag - Full Stack Web & Mobile Applications Developer.',
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
