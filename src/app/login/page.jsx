'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If already authenticated, redirect to admin
    const token = localStorage.getItem('turag_admin_token');
    if (token === 'authenticated') {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      // Accept admin/admin or smturag/turag2026 or any non-empty standard match
      if (
        password === 'turag123.@' ||
        (username.trim().toLowerCase() === 'admin' && password === 'turag123.@') ||
        (username.trim().toLowerCase() === 'smturag' && password === 'turag123.@') ||
        password === 'admin'
      ) {
        localStorage.setItem('turag_admin_token', 'authenticated');
        router.push('/admin');
      } else {
        setError('Invalid credentials! Hint: Use Username: admin and Password: turag123.@');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="bento-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '44px 36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          border: '1px solid var(--border-active)',
          boxShadow: '0 25px 60px rgba(56, 189, 248, 0.2)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'var(--gradient-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              margin: '0 auto 16px',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.4)',
            }}
          >
            🔒
          </div>
          <h1 style={{ fontSize: '1.8rem', margin: '0 0 8px', color: 'var(--text-primary)' }}>
            Admin Control Center
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: 0 }}>
            Enter your credentials to manage S M Turag portfolio architecture.
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#f87171',
              fontSize: '0.85rem',
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Username or Email
            </label>
            <input
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '14px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Security Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '14px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gradient"
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '1rem',
              marginTop: '8px',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Verifying Access...' : '⚡ Unlock Dashboard'}
          </button>
        </form>

        <div
          style={{
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
            textAlign: 'center',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
          }}
        >
          💡 Login Hint: Username: <strong style={{ color: 'var(--accent-cyan)' }}>admin</strong> | Password: <strong style={{ color: 'var(--accent-cyan)' }}>turag123.@</strong>
        </div>
      </motion.div>
    </div>
  );
}
