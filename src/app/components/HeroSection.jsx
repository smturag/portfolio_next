'use client';

import React from 'react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';

export default function HeroSection({ personal, siteSettings }) {
  const { name, titles, bio, heroSubtitle, avatar, resumeUrl } = personal || {};
  const { heroGreeting } = siteSettings || {};

  const profileImg = avatar || '/aa.jpg';

  return (
    <section id="home" className="section" style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', paddingTop: '120px' }}>
      <div className="container">
        {/* Left Text + Right Image Combination Grid */}
        <div className="hero-grid">
          
          {/* LEFT SIDE: TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', justifyItems: 'flex-start' }}
          >
            {/* Status Pill */}
            <div style={{ marginBottom: '24px' }}>
              <div className="status-pill">
                <span className="status-dot" />
                <span>{heroGreeting || 'WELCOME TO MY PORTFOLIO'}</span>
              </div>
            </div>
            
            <h1 style={{ fontSize: 'clamp(2.6rem, 5.2vw, 4.8rem)', margin: '0 0 16px', letterSpacing: '-1.5px', fontWeight: 800, lineHeight: 1.1 }}>
              Hi, I Am <br />
              <span className="text-gradient">
                {name || 'S M Turag'}
              </span>
            </h1>

            <div style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '24px', minHeight: '44px' }}>
              <Typewriter
                options={{
                  strings: titles || ['Full Stack Web Developer', 'Mobile App Developer', 'Laravel & Node.js Architect', 'React & React Native Engineer'],
                  autoStart: true,
                  loop: true,
                  delay: 45,
                  deleteSpeed: 25,
                }}
              />
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '36px', maxWidth: '580px' }}>
              {heroSubtitle || bio || "Full Stack Web Developer specializing in front-end & back-end development. Experienced with all stages of the development cycle for dynamic web and cross-platform mobile applications."}
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '44px' }}>
              <a href={resumeUrl || '/Image/Resume_SMTurag.pdf'} target="_blank" rel="noopener noreferrer" download className="btn-gradient">
                📄 Download Resume
              </a>
              <a href="#projects" className="btn-outline">
                🚀 Explore Works
              </a>
            </div>

            {/* Quick Stats Bento Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                padding: '20px 24px',
                background: 'var(--bg-card)',
                borderRadius: '20px',
                border: '1px solid var(--border-subtle)',
                maxWidth: '520px',
              }}
            >
              <div>
                <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--text-primary)' }}>5+</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Years Exp.</div>
              </div>
              <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '16px' }}>
                <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>30+</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Projects Built</div>
              </div>
              <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '16px' }}>
                <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>100%</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Client Rating</div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: IMAGE CARD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
          >
            {/* Ambient Back Glow Ring */}
            <div
              style={{
                position: 'absolute',
                width: '420px',
                height: '420px',
                borderRadius: '50%',
                background: 'var(--gradient-accent)',
                filter: 'blur(80px)',
                opacity: 0.35,
                zIndex: -1,
              }}
            />

            <div
              className="float-anim"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '430px',
                aspectRatio: '1 / 1.08',
                borderRadius: '32px',
                background: 'var(--bg-card)',
                padding: '12px',
                border: '1px solid var(--border-active)',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.85)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'var(--bg-surface)',
                  position: 'relative',
                }}
              >
                <img
                  src={profileImg}
                  alt={name || 'S M Turag Profile Image'}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              {/* Floating Status Badge on Right Image */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  background: 'rgba(15, 23, 42, 0.92)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid var(--border-active)',
                  padding: '14px 20px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.6)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '1.5rem', padding: '8px', background: 'rgba(56, 189, 248, 0.15)', borderRadius: '12px' }}>⚡</div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#fff' }}>S M Turag</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>Full Stack Developer @ Pitor</div>
                  </div>
                </div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 10px #34d399' }} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      <style jsx>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: center;
          width: 100%;
        }
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
      `}</style>
    </section>
  );
}
