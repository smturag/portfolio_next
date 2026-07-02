'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ResumeSection({ education = [], experience = [], skills = [], siteSettings }) {
  const { resumeSubtitle, resumeTitle } = siteSettings || {};

  return (
    <section id="resume" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{resumeSubtitle || 'Career & Summary'}</span>
          <h2 className="section-heading">{resumeTitle || 'Work Experience & Tech Stack'}</h2>
        </div>

        {/* Skills Marquee / Matrix */}
        <div style={{ marginBottom: '80px' }}>
          <h3 style={{ fontSize: '1.3rem', textAlign: 'center', marginBottom: '32px', color: 'var(--text-secondary)' }}>
            ⚡ Core Technical Competency Matrix
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center', maxWidth: '950px', margin: '0 auto' }}>
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.name || idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                whileHover={{ scale: 1.08, y: -3 }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-active)',
                  padding: '12px 24px',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  cursor: 'default',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />
                <span style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)' }}>{skill.name}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{skill.level}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience & Education Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '48px' }}>
          
          {/* Work Experience */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <span style={{ fontSize: '1.8rem' }}>💼</span>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>Work Experience</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {experience.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bento-card"
                  style={{ borderLeft: '4px solid var(--accent-cyan)', display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
                        {item.year}
                      </span>
                      <h4 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: '4px 0' }}>{item.title}</h4>
                    </div>
                    {item.companyUrl && item.companyUrl !== '#' ? (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: 'var(--accent-cyan)',
                          background: 'rgba(56, 189, 248, 0.1)',
                          padding: '6px 14px',
                          borderRadius: '999px',
                          border: '1px solid rgba(56, 189, 248, 0.3)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        🌐 {item.company} ↗
                      </a>
                    ) : (
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-secondary)' }}>🏢 {item.company}</span>
                    )}
                  </div>

                  {/* Bullet Responsibilities */}
                  {item.responsibilities && item.responsibilities.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {item.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
                          <span style={{ color: 'var(--accent-cyan)', fontWeight: 800, marginTop: '2px' }}>•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>{item.desc}</p>
                  )}

                  {/* Live Projects Shipped under this role */}
                  {item.liveProjects && item.liveProjects.length > 0 && (
                    <div style={{ marginTop: '8px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>
                        ⚡ Shipped & Managed Platforms:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {item.liveProjects.map((lp, pIdx) => (
                          lp.url && lp.url !== '#' ? (
                            <a
                              key={pIdx}
                              href={lp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                color: '#fff',
                                background: 'var(--bg-surface)',
                                border: '1px solid var(--border-active)',
                                padding: '6px 14px',
                                borderRadius: '8px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                transition: 'all 0.2s',
                              }}
                            >
                              🔗 {lp.name}
                            </a>
                          ) : (
                            <span
                              key={pIdx}
                              style={{
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                color: 'var(--text-secondary)',
                                background: 'var(--bg-surface)',
                                border: '1px solid var(--border-subtle)',
                                padding: '6px 14px',
                                borderRadius: '8px',
                              }}
                            >
                              ✨ {lp.name}
                            </span>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <span style={{ fontSize: '1.8rem' }}>🎓</span>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>Education</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {education.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bento-card"
                  style={{ borderLeft: '4px solid var(--accent-violet)' }}
                >
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-violet)', textTransform: 'uppercase' }}>
                    {item.year}
                  </span>
                  <h4 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: '8px 0 4px' }}>{item.background || item.degree}</h4>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '14px' }}>
                    🏛️ {item.institute || item.institution}
                  </div>
                  {item.location && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>📍 {item.location}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
