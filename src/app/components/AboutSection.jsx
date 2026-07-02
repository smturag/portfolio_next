'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection({ personal, siteSettings }) {
  const { name, email, location, bio, avatar } = personal || {};
  const { aboutSubtitle, aboutTitle } = siteSettings || {};

  const aboutImg = avatar || '/aa.jpg';

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{aboutSubtitle || 'Know Me More'}</span>
          <h2 className="section-heading">{aboutTitle || 'About The Architect'}</h2>
        </div>

        {/* Left Text + Right Image Combination */}
        <div className="about-grid">
          
          {/* LEFT SIDE: BIO & CORE DETAILS */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            <div className="bento-card" style={{ padding: '36px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                ⚡ Executive Summary
              </span>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '12px 0 16px', lineHeight: 1.3 }}>
                Architecting High-Performance Web & Mobile Systems
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.8, marginBottom: '20px' }}>
                {bio || "I am a dedicated Full Stack Web and Mobile App Developer. I architect scalable web platforms and mobile applications using modern technologies including Laravel, React.js, Next.js, Node.js, React Native, and Flutter."}
              </p>

              {/* Quick Info Grid inside Left Card */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Full Name</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{name || 'S M Turag'}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Base Location</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{location || 'Dhaka, Bangladesh'}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Direct Contact</span>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-cyan)', wordBreak: 'break-all' }}>{email || 'smturag0@gmail.com'}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: IMAGE SHOWCASE WITH BADGES */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div
              className="bento-card"
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 11',
                borderRadius: '28px',
                overflow: 'hidden',
                padding: '0',
              }}
            >
              <img
                src={aboutImg}
                alt={name || 'About S M Turag'}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,7,18,0.85) 0%, transparent 60%)' }} />
              
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                <span style={{ fontSize: '0.8rem', background: 'var(--accent-cyan)', color: '#000', fontWeight: 800, padding: '4px 12px', borderRadius: '6px' }}>
                  Core Competency
                </span>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginTop: '6px' }}>
                  Laravel • React • Next.js • React Native
                </div>
              </div>
            </div>

            {/* Highlights Strip */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="bento-card" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>🏆</div>
                <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>PSR & SOLID</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Clean Architecture</div>
              </div>
              <div className="bento-card" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>⚡</div>
                <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>Real-Time Systems</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>WebRTC & Socket.IO</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style jsx>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 40px;
          align-items: stretch;
        }
        @media (max-width: 960px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
