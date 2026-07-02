'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ResumeSection from './components/ResumeSection';
import ProjectsSection from './components/ProjectsSection';
import { motion } from 'framer-motion';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio', { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load portfolio:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            border: '4px solid var(--border-subtle)',
            borderTopColor: 'var(--accent-cyan)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Loading Portfolio Architecture...</div>
      </div>
    );
  }

  const { personal, services, education, experience, skills, projects, siteSettings } = data || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <HeroSection personal={personal} siteSettings={siteSettings} />
      <AboutSection personal={personal} siteSettings={siteSettings} />
      <ServicesSection services={services} siteSettings={siteSettings} />
      <ResumeSection education={education} experience={experience} skills={skills} siteSettings={siteSettings} />
      <ProjectsSection projects={projects} siteSettings={siteSettings} />

      {/* Jaw-Dropping Bottom CTA Banner */}
      <section className="section" style={{ padding: '40px 0 100px' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bento-card"
            style={{
              padding: '64px 40px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%)',
              border: '1px solid var(--border-active)',
              boxShadow: '0 20px 60px rgba(56, 189, 248, 0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
              }}
            />

            <span className="section-tag">Start a Collaboration</span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', margin: '12px 0 20px', letterSpacing: '-1px' }}>
              Have a Project in Mind? Let&apos;s Build <br />
              <span className="text-gradient">Something Extraordinary Together.</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.8 }}>
              Whether you need a full-scale enterprise web platform or a high-converting mobile architecture, I am ready to turn your vision into reality.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`mailto:${personal?.email || 'smturag01@gmail.com'}`} className="btn-gradient" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
                ✉️ {personal?.email || 'smturag01@gmail.com'}
              </a>
              {personal?.phone && (
                <a href={`tel:${personal.phone}`} className="btn-outline" style={{ padding: '16px 36px', fontSize: '1.05rem', borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}>
                  📞 {personal.phone}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface)',
          padding: '48px 0',
          textAlign: 'center',
          color: 'var(--text-secondary)',
        }}
      >
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {siteSettings?.brandName || 'SM Turag'}<span style={{ color: 'var(--accent-cyan)' }}>.</span>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            {siteSettings?.footerText || `© ${new Date().getFullYear()} S M Turag. All rights reserved.`}
          </p>
        </div>
      </footer>
    </div>
  );
}
