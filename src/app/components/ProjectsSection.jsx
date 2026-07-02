'use client';

import React from 'react';
import { motion } from 'framer-motion';

const getProjectMetadata = (title = '', tags = []) => {
  const tLower = title.toLowerCase();
  if (tLower.includes('pay') || tLower.includes('fintech') || tLower.includes('payment')) {
    return { icon: '💳', category: 'FinTech & Payment Gateway', color: '#38bdf8' };
  }
  if (tLower.includes('store') || tLower.includes('shop') || tLower.includes('commerce')) {
    return { icon: '🛒', category: 'E-Commerce Marketplace', color: '#a855f7' };
  }
  if (tLower.includes('recharge') || tLower.includes('utility') || tLower.includes('bill')) {
    return { icon: '⚡', category: 'Automated Utility Portal', color: '#eab308' };
  }
  if (tLower.includes('food') || tLower.includes('sushi') || tLower.includes('restaurant')) {
    return { icon: '🍱', category: 'Food Ordering System', color: '#ec4899' };
  }
  if (tLower.includes('stream') || tLower.includes('webrtc') || tLower.includes('video')) {
    return { icon: '📡', category: 'Real-Time Streaming Engine', color: '#10b981' };
  }
  if (tLower.includes('game') || tLower.includes('ludo') || tLower.includes('multiplayer')) {
    return { icon: '🎮', category: 'Multiplayer Gaming Backend', color: '#f97316' };
  }
  if (tLower.includes('mentor') || tLower.includes('education') || tLower.includes('learn')) {
    return { icon: '📚', category: 'LMS & Tutoring Platform', color: '#6366f1' };
  }
  if (tLower.includes('blood') || tLower.includes('donor') || tLower.includes('health')) {
    return { icon: '🏥', category: 'Healthcare Community Portal', color: '#ef4444' };
  }
  return { icon: '🚀', category: 'Full Stack Web Architecture', color: '#38bdf8' };
};

export default function ProjectsSection({ projects = [], siteSettings }) {
  const { projectsSubtitle, projectsTitle } = siteSettings || {};

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{projectsSubtitle || 'Live Systems & Showcase'}</span>
          <h2 className="section-heading">{projectsTitle || 'Featured Projects Architecture'}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
          {projects.map((proj, idx) => {
            const meta = getProjectMetadata(proj.title || proj.name, proj.tags || proj.technologies);

            return (
              <motion.div
                key={proj.id || idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className="bento-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0',
                  overflow: 'hidden',
                  border: '1px solid var(--border-active)',
                  background: 'var(--bg-surface)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                }}
              >
                {/* Glowing Icon Header Banner */}
                <div
                  style={{
                    padding: '36px 28px',
                    background: `linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 22, 0.98) 100%)`,
                    borderBottom: '1px solid var(--border-subtle)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  {/* Ambient Colored Glow inside header */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-40%',
                      right: '-10%',
                      width: '180px',
                      height: '180px',
                      background: meta.color,
                      opacity: 0.15,
                      filter: 'blur(45px)',
                      borderRadius: '50%',
                      pointerEvents: 'none',
                    }}
                  />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px', zIndex: 1 }}>
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '18px',
                        background: 'var(--bg-card)',
                        border: `1px solid ${meta.color}44`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.4rem',
                        boxShadow: `0 8px 25px ${meta.color}22`,
                      }}
                    >
                      {meta.icon}
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          color: meta.color,
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          display: 'block',
                          marginBottom: '4px',
                        }}
                      >
                        {meta.category}
                      </span>
                      <h3 style={{ fontSize: '1.45rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
                        {proj.title || proj.name}
                      </h3>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      color: 'var(--text-muted)',
                      background: 'var(--bg-main)',
                      padding: '6px 12px',
                      borderRadius: '999px',
                      border: '1px solid var(--border-subtle)',
                      zIndex: 1,
                    }}
                  >
                    0{idx + 1}
                  </span>
                </div>

                {/* Project Body Details */}
                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1, gap: '18px' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.7, margin: 0, flex: 1 }}>
                    {proj.description}
                  </p>

                  {/* Technology Tags */}
                  {((proj.tags || proj.technologies) && (proj.tags || proj.technologies).length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {(proj.tags || proj.technologies).map((t, i) => (
                        <span
                          key={i}
                          style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                            padding: '5px 14px',
                            borderRadius: '8px',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                          }}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Links */}
                  <div style={{ display: 'flex', gap: '12px', paddingTop: '18px', borderTop: '1px solid var(--border-subtle)' }}>
                    {(proj.link || proj.url) && (proj.link || proj.url) !== '#' ? (
                      <a
                        href={proj.link || proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gradient"
                        style={{ flex: 1, padding: '14px 20px', fontSize: '0.95rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                      >
                        🌐 Visit Live Platform ↗
                      </a>
                    ) : (
                      <span
                        className="btn-outline"
                        style={{ flex: 1, padding: '14px 20px', fontSize: '0.9rem', textAlign: 'center', color: 'var(--text-muted)', cursor: 'default' }}
                      >
                        🔒 Private / Internal Architecture
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
