'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection({ personal, siteSettings }) {
  const { name, email, phone, location, bio, avatar } = personal || {};
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Full Name</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{name || 'S M Turag'}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Base Location</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{location || 'Dhaka, Bangladesh'}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Direct Email</span>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-cyan)', wordBreak: 'break-all' }}>{email || 'smturag01@gmail.com'}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Mobile / Phone</span>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{phone || '+8801605042408'}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: CORE EXPERTISE & HIGHLIGHTS (NO IMAGE) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'space-between' }}
          >
            {/* Core Competency Card (No Image) */}
            <div
              className="bento-card"
              style={{
                padding: '36px',
                background: 'linear-gradient(145deg, var(--bg-surface) 0%, rgba(56, 189, 248, 0.05) 100%)',
                border: '1px solid var(--border-active)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <span style={{ fontSize: '0.8rem', background: 'var(--accent-cyan)', color: '#000', fontWeight: 800, padding: '6px 14px', borderRadius: '999px', alignSelf: 'flex-start', marginBottom: '16px' }}>
                ⭐ Core Engineering Competency
              </span>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', lineHeight: 1.4 }}>
                Full Stack Mastery across Web & Mobile Platforms
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '22px' }}>
                Delivering robust backend architectures combined with seamless frontend user interfaces. Specialized in enterprise-grade web development and cross-platform native applications.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {['Laravel', 'Next.js 14', 'React.js', 'React Native', 'Flutter', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'REST APIs'].map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '12px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                    }}
                  >
                    ⚡ {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 4 Highlights Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="bento-card" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>🏆</div>
                <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.05rem' }}>PSR & SOLID</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Clean Architecture</div>
              </div>
              <div className="bento-card" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>⚡</div>
                <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.05rem' }}>Real-Time Systems</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>WebRTC & Socket.IO</div>
              </div>
              <div className="bento-card" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>🔒</div>
                <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.05rem' }}>Bank-Grade Security</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>JWT, OAuth2 & Encryption</div>
              </div>
              <div className="bento-card" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>🚀</div>
                <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.05rem' }}>High Scalability</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Cloud & Microservices</div>
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
