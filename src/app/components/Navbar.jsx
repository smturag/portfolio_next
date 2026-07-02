'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);
  const [brandName, setBrandName] = useState('SM Turag');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Experience', href: '#resume' },
    { label: 'Projects', href: '#projects' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled || mobileMenuOpen ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled || mobileMenuOpen ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled || mobileMenuOpen ? 'blur(16px)' : 'none',
        borderBottom: scrolled || mobileMenuOpen ? '1px solid var(--border-subtle)' : '1px solid transparent',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: scrolled || mobileMenuOpen ? '12px 0' : '20px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setMobileMenuOpen(false)}>
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
          <span style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
            {brandName}<span style={{ color: 'var(--accent-cyan)' }}>.</span>
          </span>
        </Link>

        {/* Floating Navigation Pill (Desktop Only) */}
        {!isAdmin ? (
          <nav
            className="nav-desktop"
            style={{
              gap: '6px',
              alignItems: 'center',
              background: 'var(--bg-card)',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {navLinks.map((item) => (
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
          <div className="status-pill nav-desktop">
            <span className="status-dot" />
            <span>⚡ Control Center Active</span>
          </div>
        )}

        {/* Actions (Desktop & Mobile) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Desktop Admin / Live Button */}
          {!isAdmin ? (
            <button
              onClick={() => {
                const token = typeof window !== 'undefined' ? localStorage.getItem('turag_admin_token') : null;
                window.location.href = token === 'authenticated' ? '/admin' : '/login';
              }}
              className="btn-outline admin-btn-desktop"
              style={{ padding: '8px 18px', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              ⚙️ Admin Panel
            </button>
          ) : (
            <Link href="/" className="btn-gradient admin-btn-desktop" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
              🌐 View Live Site
            </Link>
          )}

          {/* Mobile Hamburger Menu Toggle Button */}
          {!isAdmin && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="nav-mobile-btn"
              aria-label="Toggle Mobile Menu"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '1.3rem',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {!isAdmin && mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border-subtle)',
            marginTop: '14px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          }}
        >
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                display: 'block',
              }}
            >
              👉 {item.label}
            </a>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              const token = typeof window !== 'undefined' ? localStorage.getItem('turag_admin_token') : null;
              window.location.href = token === 'authenticated' ? '/admin' : '/login';
            }}
            className="btn-gradient"
            style={{ width: '100%', padding: '14px', fontSize: '0.95rem', marginTop: '6px' }}
          >
            ⚙️ Admin Panel
          </button>
        </div>
      )}
    </header>
  );
}

