'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);
  const [brandName, setBrandName] = useState('SM Turag');
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll);

    fetch('/api/portfolio', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data?.siteSettings?.brandName) {
          setBrandName(data.siteSettings.brandName);
        }
      })
      .catch(() => {});

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const isAdmin = pathname?.startsWith('/admin');

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: scrolled ? '14px 0' : '24px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--gradient-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: '#fff',
              fontSize: '1.2rem',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)',
            }}
          >
            T
          </div>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
            {brandName}<span style={{ color: 'var(--accent-cyan)' }}>.</span>
          </span>
        </Link>

        {/* Floating Navigation Pill (Desktop) */}
        {!isAdmin ? (
          <nav
            style={{
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
              background: 'var(--bg-card)',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {[
              { label: 'Home', href: '#home' },
              { label: 'About', href: '#about' },
              { label: 'Services', href: '#services' },
              { label: 'Experience', href: '#resume' },
              { label: 'Projects', href: '#projects' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  padding: '6px 16px',
                  borderRadius: '999px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.background = 'var(--border-subtle)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : (
          <div className="status-pill">
            <span className="status-dot" />
            <span>⚡ Control Center Active</span>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {!isAdmin ? (
            <button
              onClick={() => {
                const token = typeof window !== 'undefined' ? localStorage.getItem('turag_admin_token') : null;
                window.location.href = token === 'authenticated' ? '/admin' : '/login';
              }}
              className="btn-outline"
              style={{ padding: '10px 20px', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              ⚙️ Admin Panel
            </button>
          ) : (
            <Link href="/" className="btn-gradient" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
              🌐 View Live Site
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

