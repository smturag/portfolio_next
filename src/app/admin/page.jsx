'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });
  const [activeTab, setActiveTab] = useState('personal');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('turag_admin_token');
    if (token === 'authenticated') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/portfolio', { cache: 'no-store' });
      const json = await res.json();
      if (!json.siteSettings) {
        json.siteSettings = {
          brandName: "SM Turag",
          heroGreeting: "WELCOME TO MY PORTFOLIO",
          aboutSubtitle: "Know Me More",
          aboutTitle: "About Me",
          servicesSubtitle: "What I Do",
          servicesTitle: "Specialized Engineering Services",
          resumeSubtitle: "Career & Summary",
          resumeTitle: "Work Experience & Tech Stack",
          projectsSubtitle: "Live Showcase",
          projectsTitle: "Featured Projects & Live Systems",
          footerText: "© 2026 S M Turag. Crafted with Linear & Vercel Inspired Architecture.",
          socials: { github: "https://github.com", linkedin: "https://linkedin.com", facebook: "https://facebook.com" }
        };
      }
      setData(json);
    } catch (err) {
      showStatus('Failed to load portfolio data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showStatus = (text, type = 'success') => {
    setStatusMsg({ text, type });
    setTimeout(() => setStatusMsg({ text: '', type: '' }), 4500);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        showStatus('🎉 All changes saved successfully! Live website updated.');
      } else {
        showStatus('Failed to save changes.', 'error');
      }
    } catch (err) {
      showStatus('Error saving data.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('turag_admin_token');
    window.location.href = '/login';
  };

  const handleFileUpload = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (res.ok && result.success) {
        callback(result.url);
        showStatus(`📁 Uploaded successfully: ${file.name}. Click Save All Changes to publish!`);
      } else {
        showStatus(result.error || 'Upload failed', 'error');
      }
    } catch (err) {
      showStatus('File upload error', 'error');
    } finally {
      setUploading(false);
    }
  };

  if (isAuthenticated === false) {
    return (
      <div className="container" style={{ padding: '80px 24px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="bento-card" style={{ maxWidth: '460px', width: '100%', padding: '48px 36px', textAlign: 'center', border: '1px solid var(--border-active)' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🔒</div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '12px' }}>Security Authentication Required</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>
            You must be logged in to access the Admin Control Center, update CV documents, or modify portfolio data.
          </p>
          <button
            onClick={() => { window.location.href = '/login'; }}
            className="btn-gradient"
            style={{ width: '100%', padding: '16px', fontSize: '1.05rem', cursor: 'pointer', fontWeight: 700 }}
          >
            🔑 Go to Login Page
          </button>
        </div>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>⏳ Loading Admin Dashboard Data...</h2>
      </div>
    );
  }

  const tabs = [
    { id: 'personal', label: '👤 Personal & CV Upload' },
    { id: 'settings', label: '⚙️ Site Titles & Socials' },
    { id: 'skills', label: '⚡ Skills' },
    { id: 'experience', label: '💼 Work Experience' },
    { id: 'education', label: '🎓 Education' },
    { id: 'services', label: '🛠️ Services' },
    { id: 'projects', label: '🚀 Featured Projects' },
  ];

  return (
    <div className="container" style={{ padding: '40px 24px 100px' }}>
      {/* Header & Status Bar */}
      <div className="bento-card" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', gap: '20px', border: '1px solid var(--border-active)' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '1px' }}>⚡ Authenticated Control Center</span>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)', margin: '6px 0 6px' }}>Admin Management Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
            Modify any information below. Click <b>Save All Changes</b> to update your live portfolio.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-gradient"
            style={{ padding: '14px 28px', fontSize: '1rem', cursor: saving ? 'not-allowed' : 'pointer' }}
          >
            {saving ? '💾 Saving Live...' : '💾 Save All Changes'}
          </button>
          <button
            onClick={handleLogout}
            className="btn-outline"
            style={{ padding: '14px 24px', fontSize: '0.95rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }}
          >
            🔒 Logout
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {statusMsg.text && (
        <div
          style={{
            padding: '16px 24px',
            borderRadius: '14px',
            marginBottom: '24px',
            background: statusMsg.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
            border: `1px solid ${statusMsg.type === 'error' ? '#ef4444' : '#22c55e'}`,
            color: '#fff',
            fontWeight: 700,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          }}
        >
          {statusMsg.text}
        </div>
      )}

      {/* Tabs Bar */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '32px' }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '12px 22px',
              borderRadius: '999px',
              background: activeTab === t.id ? 'var(--text-primary)' : 'var(--bg-card)',
              color: activeTab === t.id ? 'var(--bg-main)' : 'var(--text-primary)',
              border: '1px solid var(--border-active)',
              fontWeight: 700,
              fontSize: '0.92rem',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: PERSONAL & CV UPLOAD */}
      {activeTab === 'personal' && (
        <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 style={{ fontSize: '1.6rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', color: 'var(--text-primary)' }}>
            👤 Personal Information & New CV Upload
          </h2>

          {/* CV File Upload Box Highlighted */}
          <div style={{ padding: '28px', background: 'rgba(56, 189, 248, 0.08)', borderRadius: '16px', border: '2px dashed var(--accent-cyan)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
              <label className="field-label" style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
                📄 Upload New CV / Resume Document (PDF or DOCX)
              </label>
              {data.personal.resumeUrl && (
                <a href={data.personal.resumeUrl} target="_blank" rel="noreferrer" className="btn-outline" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                  📥 View Current CV ↗
                </a>
              )}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '18px' }}>
              Choose a file from your computer. Once uploaded, click <b>Save All Changes</b> at the top right to make it live for visitors.
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <label className="btn-gradient" style={{ cursor: 'pointer', padding: '14px 28px', fontSize: '1rem', fontWeight: 800 }}>
                {uploading ? '⏳ Uploading File...' : '📁 Select New CV File From Computer'}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e, (url) => setData({ ...data, personal: { ...data.personal, resumeUrl: url } }))}
                />
              </label>
              <input
                type="text"
                className="input-field"
                style={{ flex: 1, minWidth: '250px' }}
                value={data.personal.resumeUrl || ''}
                placeholder="Or paste direct document URL..."
                onChange={(e) => setData({ ...data, personal: { ...data.personal, resumeUrl: e.target.value } })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '12px' }}>
            <div>
              <label className="field-label">Full Name</label>
              <input
                type="text"
                className="input-field"
                value={data.personal.name || ''}
                onChange={(e) => setData({ ...data, personal: { ...data.personal, name: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">Email Address</label>
              <input
                type="email"
                className="input-field"
                value={data.personal.email || ''}
                onChange={(e) => setData({ ...data, personal: { ...data.personal, email: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">Mobile / Phone Number</label>
              <input
                type="text"
                className="input-field"
                value={data.personal.phone || ''}
                onChange={(e) => setData({ ...data, personal: { ...data.personal, phone: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">Location</label>
              <input
                type="text"
                className="input-field"
                value={data.personal.location || ''}
                onChange={(e) => setData({ ...data, personal: { ...data.personal, location: e.target.value } })}
              />
            </div>
          </div>

          {/* Profile Picture Upload Box Highlighted */}
          <div style={{ padding: '28px', background: 'rgba(168, 85, 247, 0.08)', borderRadius: '16px', border: '2px dashed #a855f7' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
              <label className="field-label" style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
                🧑 Profile Picture / Avatar Image Upload
              </label>
              {data.personal.avatar && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={data.personal.avatar} alt="Avatar Preview" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #a855f7' }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Current Photo</span>
                </div>
              )}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '18px' }}>
              Choose a PNG, JPG, or WEBP photo from your device. Click <b>Save All Changes</b> above to update your hero image!
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <label className="btn-gradient" style={{ cursor: 'pointer', padding: '14px 28px', fontSize: '1rem', fontWeight: 800, background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)' }}>
                {uploading ? '⏳ Uploading Photo...' : '🖼️ Select Profile Photo From Computer'}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e, (url) => setData({ ...data, personal: { ...data.personal, avatar: url } }))}
                />
              </label>
              <input
                type="text"
                className="input-field"
                style={{ flex: 1, minWidth: '250px' }}
                value={data.personal.avatar || ''}
                placeholder="Or paste direct image URL..."
                onChange={(e) => setData({ ...data, personal: { ...data.personal, avatar: e.target.value } })}
              />
            </div>
          </div>

          <div>
            <label className="field-label">Typewriter Hero Titles (Comma separated)</label>
            <input
              type="text"
              className="input-field"
              value={Array.isArray(data.personal.titles) ? data.personal.titles.join(', ') : data.personal.titles || ''}
              onChange={(e) => setData({ ...data, personal: { ...data.personal, titles: e.target.value.split(',').map((s) => s.trim()) } })}
            />
          </div>

          <div>
            <label className="field-label">Hero Subtitle</label>
            <textarea
              className="input-field"
              rows="2"
              value={data.personal.heroSubtitle || ''}
              onChange={(e) => setData({ ...data, personal: { ...data.personal, heroSubtitle: e.target.value } })}
            />
          </div>

          <div>
            <label className="field-label">Full Biography / About Me Text</label>
            <textarea
              className="input-field"
              rows="5"
              value={data.personal.bio || ''}
              onChange={(e) => setData({ ...data, personal: { ...data.personal, bio: e.target.value } })}
            />
          </div>
        </div>
      )}

      {/* TAB 2: SITE TITLES & SOCIALS */}
      {activeTab === 'settings' && (
        <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 style={{ fontSize: '1.6rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', color: 'var(--text-primary)' }}>
            ⚙️ Section Headings & Social Links
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div>
              <label className="field-label">Brand / Navbar Logo Name</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings?.brandName || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, brandName: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">Hero Top Greeting</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings?.heroGreeting || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, heroGreeting: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">About Section Subtitle</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings?.aboutSubtitle || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, aboutSubtitle: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">About Section Main Title</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings?.aboutTitle || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, aboutTitle: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">Services Section Subtitle</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings?.servicesSubtitle || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, servicesSubtitle: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">Services Section Main Title</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings?.servicesTitle || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, servicesTitle: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">Experience Section Subtitle</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings?.resumeSubtitle || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, resumeSubtitle: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">Experience Section Main Title</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings?.resumeTitle || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, resumeTitle: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">Projects Section Subtitle</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings?.projectsSubtitle || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, projectsSubtitle: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">Projects Section Main Title</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings?.projectsTitle || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, projectsTitle: e.target.value } })}
              />
            </div>
          </div>

          <h3 style={{ fontSize: '1.3rem', marginTop: '16px', color: 'var(--text-primary)' }}>🌐 Social Profiles</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div>
              <label className="field-label">GitHub URL</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings?.socials?.github || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, socials: { ...data.siteSettings?.socials, github: e.target.value } } })}
              />
            </div>
            <div>
              <label className="field-label">LinkedIn URL</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings?.socials?.linkedin || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, socials: { ...data.siteSettings?.socials, linkedin: e.target.value } } })}
              />
            </div>
            <div>
              <label className="field-label">Footer Copyright Text</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings?.footerText || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, footerText: e.target.value } })}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SKILLS */}
      {activeTab === 'skills' && (
        <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)' }}>⚡ Technical Skills</h2>
            <button
              onClick={() => setData({ ...data, skills: [...(data.skills || []), { name: 'New Skill', level: 'Expert', category: 'Backend' }] })}
              className="btn-gradient"
              style={{ padding: '10px 20px' }}
            >
              + Add New Skill
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {(data.skills || []).map((skill, idx) => (
              <div key={idx} style={{ padding: '16px', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>Skill #{idx + 1}</span>
                  <button
                    onClick={() => {
                      const updated = [...data.skills];
                      updated.splice(idx, 1);
                      setData({ ...data, skills: updated });
                    }}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 800 }}
                  >
                    🗑️ Delete
                  </button>
                </div>
                <div>
                  <label className="field-label">Skill Name</label>
                  <input
                    type="text"
                    className="input-field"
                    value={skill.name || ''}
                    onChange={(e) => {
                      const updated = [...data.skills];
                      updated[idx].name = e.target.value;
                      setData({ ...data, skills: updated });
                    }}
                  />
                </div>
                <div>
                  <label className="field-label">Level</label>
                  <input
                    type="text"
                    className="input-field"
                    value={skill.level || ''}
                    onChange={(e) => {
                      const updated = [...data.skills];
                      updated[idx].level = e.target.value;
                      setData({ ...data, skills: updated });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: WORK EXPERIENCE */}
      {activeTab === 'experience' && (
        <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)' }}>💼 Work Experience</h2>
            <button
              onClick={() => setData({ ...data, experience: [{ title: 'New Role', company: 'Company Name', companyUrl: 'https://pitor.net/', year: '2024 - Present', responsibilities: ['Key responsibility 1'] }, ...(data.experience || [])] })}
              className="btn-gradient"
              style={{ padding: '10px 20px' }}
            >
              + Add Experience
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {(data.experience || []).map((exp, idx) => (
              <div key={idx} style={{ padding: '24px', background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-active)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: 'var(--accent-cyan)' }}>Role #{idx + 1}: {exp.title}</h3>
                  <button
                    onClick={() => {
                      const updated = [...data.experience];
                      updated.splice(idx, 1);
                      setData({ ...data, experience: updated });
                    }}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 800 }}
                  >
                    🗑️ Remove Role
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  <div>
                    <label className="field-label">Job Title</label>
                    <input
                      type="text"
                      className="input-field"
                      value={exp.title || ''}
                      onChange={(e) => {
                        const updated = [...data.experience];
                        updated[idx].title = e.target.value;
                        setData({ ...data, experience: updated });
                      }}
                    />
                  </div>
                  <div>
                    <label className="field-label">Company Name</label>
                    <input
                      type="text"
                      className="input-field"
                      value={exp.company || ''}
                      onChange={(e) => {
                        const updated = [...data.experience];
                        updated[idx].company = e.target.value;
                        setData({ ...data, experience: updated });
                      }}
                    />
                  </div>
                  <div>
                    <label className="field-label">Company URL</label>
                    <input
                      type="text"
                      className="input-field"
                      value={exp.companyUrl || ''}
                      onChange={(e) => {
                        const updated = [...data.experience];
                        updated[idx].companyUrl = e.target.value;
                        setData({ ...data, experience: updated });
                      }}
                    />
                  </div>
                  <div>
                    <label className="field-label">Duration / Years</label>
                    <input
                      type="text"
                      className="input-field"
                      value={exp.year || ''}
                      onChange={(e) => {
                        const updated = [...data.experience];
                        updated[idx].year = e.target.value;
                        setData({ ...data, experience: updated });
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="field-label">Responsibilities (One bullet per line)</label>
                  <textarea
                    className="input-field"
                    rows="4"
                    value={(exp.responsibilities || []).join('\n')}
                    onChange={(e) => {
                      const updated = [...data.experience];
                      updated[idx].responsibilities = e.target.value.split('\n').filter((l) => l.trim().length > 0);
                      setData({ ...data, experience: updated });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: EDUCATION */}
      {activeTab === 'education' && (
        <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)' }}>🎓 Academic Education</h2>
            <button
              onClick={() => setData({ ...data, education: [{ degree: 'New Degree', institute: 'University Name', year: '2020 - 2024' }, ...(data.education || [])] })}
              className="btn-gradient"
              style={{ padding: '10px 20px' }}
            >
              + Add Degree
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {(data.education || []).map((edu, idx) => (
              <div key={idx} style={{ padding: '20px', background: 'var(--bg-surface)', borderRadius: '14px', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>Degree #{idx + 1}</span>
                  <button
                    onClick={() => {
                      const updated = [...data.education];
                      updated.splice(idx, 1);
                      setData({ ...data, education: updated });
                    }}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 800 }}
                  >
                    🗑️ Delete
                  </button>
                </div>
                <div>
                  <label className="field-label">Degree Title</label>
                  <input
                    type="text"
                    className="input-field"
                    value={edu.degree || ''}
                    onChange={(e) => {
                      const updated = [...data.education];
                      updated[idx].degree = e.target.value;
                      setData({ ...data, education: updated });
                    }}
                  />
                </div>
                <div>
                  <label className="field-label">Institute / University</label>
                  <input
                    type="text"
                    className="input-field"
                    value={edu.institute || ''}
                    onChange={(e) => {
                      const updated = [...data.education];
                      updated[idx].institute = e.target.value;
                      setData({ ...data, education: updated });
                    }}
                  />
                </div>
                <div>
                  <label className="field-label">Academic Year</label>
                  <input
                    type="text"
                    className="input-field"
                    value={edu.year || ''}
                    onChange={(e) => {
                      const updated = [...data.education];
                      updated[idx].year = e.target.value;
                      setData({ ...data, education: updated });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SERVICES */}
      {activeTab === 'services' && (
        <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)' }}>🛠️ Engineering Services Offered</h2>
            <button
              onClick={() => setData({ ...data, services: [...(data.services || []), { title: 'New Service', description: 'Service details', icon: 'Web' }] })}
              className="btn-gradient"
              style={{ padding: '10px 20px' }}
            >
              + Add Service
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {(data.services || []).map((srv, idx) => (
              <div key={idx} style={{ padding: '20px', background: 'var(--bg-surface)', borderRadius: '14px', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>Service #{idx + 1}</span>
                  <button
                    onClick={() => {
                      const updated = [...data.services];
                      updated.splice(idx, 1);
                      setData({ ...data, services: updated });
                    }}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 800 }}
                  >
                    🗑️ Delete
                  </button>
                </div>
                <div>
                  <label className="field-label">Service Title</label>
                  <input
                    type="text"
                    className="input-field"
                    value={srv.title || ''}
                    onChange={(e) => {
                      const updated = [...data.services];
                      updated[idx].title = e.target.value;
                      setData({ ...data, services: updated });
                    }}
                  />
                </div>
                <div>
                  <label className="field-label">Icon Type (Web, Android, Backend, Scrapping)</label>
                  <input
                    type="text"
                    className="input-field"
                    value={srv.icon || ''}
                    onChange={(e) => {
                      const updated = [...data.services];
                      updated[idx].icon = e.target.value;
                      setData({ ...data, services: updated });
                    }}
                  />
                </div>
                <div>
                  <label className="field-label">Description</label>
                  <textarea
                    className="input-field"
                    rows="3"
                    value={srv.description || ''}
                    onChange={(e) => {
                      const updated = [...data.services];
                      updated[idx].description = e.target.value;
                      setData({ ...data, services: updated });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)' }}>🚀 Featured Projects & Live Platforms</h2>
            <button
              onClick={() => setData({ ...data, projects: [{ title: 'New Project', description: 'Project overview', link: 'https://trustpaybd.net/', tags: ['React', 'Node.js'] }, ...(data.projects || [])] })}
              className="btn-gradient"
              style={{ padding: '10px 20px' }}
            >
              + Add Project
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {(data.projects || []).map((proj, idx) => (
              <div key={idx} style={{ padding: '24px', background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-active)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: 'var(--accent-cyan)' }}>Project #{idx + 1}: {proj.title || proj.name}</h3>
                  <button
                    onClick={() => {
                      const updated = [...data.projects];
                      updated.splice(idx, 1);
                      setData({ ...data, projects: updated });
                    }}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 800 }}
                  >
                    🗑️ Remove Project
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  <div>
                    <label className="field-label">Project Title</label>
                    <input
                      type="text"
                      className="input-field"
                      value={proj.title || proj.name || ''}
                      onChange={(e) => {
                        const updated = [...data.projects];
                        updated[idx].title = e.target.value;
                        updated[idx].name = e.target.value;
                        setData({ ...data, projects: updated });
                      }}
                    />
                  </div>
                  <div>
                    <label className="field-label">Live Platform URL</label>
                    <input
                      type="text"
                      className="input-field"
                      value={proj.link || proj.url || ''}
                      onChange={(e) => {
                        const updated = [...data.projects];
                        updated[idx].link = e.target.value;
                        updated[idx].url = e.target.value;
                        setData({ ...data, projects: updated });
                      }}
                    />
                  </div>
                  <div>
                    <label className="field-label">Technologies / Tags (Comma separated)</label>
                    <input
                      type="text"
                      className="input-field"
                      value={Array.isArray(proj.tags || proj.technologies) ? (proj.tags || proj.technologies).join(', ') : ''}
                      onChange={(e) => {
                        const updated = [...data.projects];
                        const arr = e.target.value.split(',').map((s) => s.trim());
                        updated[idx].tags = arr;
                        updated[idx].technologies = arr;
                        setData({ ...data, projects: updated });
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="field-label">Project Description</label>
                  <textarea
                    className="input-field"
                    rows="3"
                    value={proj.description || ''}
                    onChange={(e) => {
                      const updated = [...data.projects];
                      updated[idx].description = e.target.value;
                      setData({ ...data, projects: updated });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
