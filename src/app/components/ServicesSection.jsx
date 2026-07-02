'use client';

import React from 'react';
import { motion } from 'framer-motion';

const iconMap = {
  Web: '💻',
  Android: '📱',
  Backend: '⚡',
  Scrapping: '🕷️',
};

export default function ServicesSection({ services, siteSettings }) {
  const serviceList = services || [];
  const { servicesSubtitle, servicesTitle } = siteSettings || {};

  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{servicesSubtitle || 'What I Offer'}</span>
          <h2 className="section-heading">{servicesTitle || 'Specialized Engineering Services'}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '28px' }}>
          {serviceList.map((srv, idx) => {
            const emoji = iconMap[srv.icon] || '✨';
            return (
              <motion.div
                key={srv.id || idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.12 }}
                className="bento-card"
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '18px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-active)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.2rem',
                      boxShadow: '0 8px 25px rgba(56, 189, 248, 0.15)',
                    }}
                  >
                    {emoji}
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-cyan)', background: 'rgba(56, 189, 248, 0.1)', padding: '6px 14px', borderRadius: '999px' }}>
                    0{idx + 1}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '4px' }}>{srv.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.02rem' }}>{srv.description}</p>

                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.9rem' }}>
                  <span>Explore Standards</span>
                  <span>→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
