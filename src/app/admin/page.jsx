'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });
  const [activeTab, setActiveTab] = useState('personal');
  const router = useRouter();

  useEffect(() => {
    // Verify admin authentication
    const token = localStorage.getItem('turag_admin_token');
    if (token !== 'authenticated') {
      router.push('/login');
      return;
    }
    fetchData();
  }, [router]);

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
    setTimeout(() => setStatusMsg({ text: '', type: '' }), 4000);
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
    router.push('/login');
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
        showStatus(`📁 Uploaded successfully: ${file.name}`);
      } else {
        showStatus(result.error || 'Upload failed', 'error');
      }
    } catch (err) {
      showStatus('File upload error', 'error');
    } finally {
      setUploading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>⏳ Verifying Security Access & Loading Dashboard...</h2>
      </div>
    );
  }

  const tabs = [
    { id: 'personal', label: '👤 Personal & CV' },
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
        
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleSave}
            disabled={saving || uploading}
            className="btn-gradient"
            style={{ padding: '14px 32px', fontSize: '1rem', opacity: saving ? 0.7 : 1 }}
          >
            {saving ? '💾 Saving Changes...' : '💾 Save All Changes'}
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

      {/* TAB 1: PERSONAL & CV */}
      {activeTab === 'personal' && (
        <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 style={{ fontSize: '1.6rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', color: 'var(--text-primary)' }}>
            👤 Personal Information & CV Upload
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
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
              <label className="field-label">Location</label>
              <input
                type="text"
                className="input-field"
                value={data.personal.location || ''}
                onChange={(e) => setData({ ...data, personal: { ...data.personal, location: e.target.value } })}
              />
            </div>
          </div>

          {/* CV File Upload */}
          <div style={{ padding: '24px', background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-active)' }}>
            <label className="field-label" style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
              📄 Upload CV / Resume Document (PDF or Docx)
            </label>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '14px' }}>
              Current CV URL: <a href={data.personal.resumeUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: 'var(--accent-cyan)' }}>{data.personal.resumeUrl}</a>
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <label className="btn-outline" style={{ cursor: 'pointer', padding: '12px 20px' }}>
                {uploading ? '⏳ Uploading...' : '📁 Select New CV File'}
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
                placeholder="Or paste direct PDF URL..."
                onChange={(e) => setData({ ...data, personal: { ...data.personal, resumeUrl: e.target.value } })}
              />
            </div>
          </div>

          {/* Profile Picture Upload */}
          <div style={{ padding: '24px', background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-active)' }}>
            <label className="field-label" style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
              🧑 Profile Picture / Avatar
            </label>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '14px' }}>
              Upload a professional photo or paste an image path.
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <label className="btn-outline" style={{ cursor: 'pointer', padding: '12px 20px' }}>
                {uploading ? '⏳ Uploading...' : '🖼️ Select Profile Photo'}
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
                placeholder="Image path (/aa.jpg)"
                onChange={(e) => setData({ ...data, personal: { ...data.personal, avatar: e.target.value } })}
              />
            </div>
          </div>

          <div>
            <label className="field-label">Typewriter Hero Titles (Comma separated)</label>
            <input
              type="text"
              className="input-field"
              value={(data.personal.titles || []).join(', ')}
              placeholder="Full Stack Web Developer, Mobile App Developer..."
              onChange={(e) => setData({ ...data, personal: { ...data.personal, titles: e.target.value.split(',').map(s => s.trim()).filter(Boolean) } })}
            />
          </div>

          <div>
            <label className="field-label">Hero Introduction Subtitle</label>
            <textarea
              rows={3}
              className="input-field"
              value={data.personal.heroSubtitle || ''}
              onChange={(e) => setData({ ...data, personal: { ...data.personal, heroSubtitle: e.target.value } })}
            />
          </div>

          <div>
            <label className="field-label">Biography (About Me Page Content)</label>
            <textarea
              rows={5}
              className="input-field"
              value={data.personal.bio || ''}
              onChange={(e) => setData({ ...data, personal: { ...data.personal, bio: e.target.value } })}
            />
          </div>
        </div>
      )}

      {/* TAB 2: SETTINGS & SOCIALS */}
      {activeTab === 'settings' && (
        <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 style={{ fontSize: '1.6rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', color: 'var(--text-primary)' }}>
            ⚙️ Website Titles & Section Headings
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div>
              <label className="field-label">Navbar Brand Name</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings.brandName || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, brandName: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">Hero Top Greeting Tag</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings.heroGreeting || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, heroGreeting: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">About Subtitle</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings.aboutSubtitle || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, aboutSubtitle: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">About Title</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings.aboutTitle || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, aboutTitle: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">Services Subtitle</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings.servicesSubtitle || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, servicesSubtitle: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">Services Title</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings.servicesTitle || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, servicesTitle: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">Resume Subtitle</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings.resumeSubtitle || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, resumeSubtitle: e.target.value } })}
              />
            </div>
            <div>
              <label className="field-label">Resume Title</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings.resumeTitle || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, resumeTitle: e.target.value } })}
              />
            </div>
          </div>

          <h3 style={{ fontSize: '1.3rem', marginTop: '16px', color: 'var(--text-primary)' }}>🔗 Social Links & Footer Text</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div>
              <label className="field-label">GitHub URL</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings?.socials?.github || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, socials: { ...data.siteSettings.socials, github: e.target.value } } })}
              />
            </div>
            <div>
              <label className="field-label">LinkedIn URL</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings?.socials?.linkedin || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, socials: { ...data.siteSettings.socials, linkedin: e.target.value } } })}
              />
            </div>
            <div>
              <label className="field-label">Facebook URL</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings?.socials?.facebook || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, socials: { ...data.siteSettings.socials, facebook: e.target.value } } })}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="field-label">Footer Copyright Notice</label>
              <input
                type="text"
                className="input-field"
                value={data.siteSettings.footerText || ''}
                onChange={(e) => setData({ ...data, siteSettings: { ...data.siteSettings, footerText: e.target.value } })}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SKILLS */}
      {activeTab === 'skills' && (
        <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0 }}>⚡ Technical Competency Matrix</h2>
            <button
              onClick={() => setData({ ...data, skills: [...data.skills, { id: `sk-${Date.now()}`, name: 'New Skill', level: 'Expert' }] })}
              className="btn-outline"
            >
              + Add Skill
            </button>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {data.skills.map((sk, idx) => (
              <div key={sk.id || idx} style={{ display: 'flex', gap: '14px', alignItems: 'center', background: 'var(--bg-surface)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
                <input
                  type="text"
                  className="input-field"
                  style={{ flex: 2 }}
                  value={sk.name || ''}
                  placeholder="Skill Name (e.g. Laravel & PHP OOP)"
                  onChange={(e) => {
                    const newSkills = [...data.skills];
                    newSkills[idx].name = e.target.value;
                    setData({ ...data, skills: newSkills });
                  }}
                />
                <input
                  type="text"
                  className="input-field"
                  style={{ flex: 1, minWidth: '130px' }}
                  value={sk.level || ''}
                  placeholder="Proficiency (Expert/Advanced)"
                  onChange={(e) => {
                    const newSkills = [...data.skills];
                    newSkills[idx].level = e.target.value;
                    setData({ ...data, skills: newSkills });
                  }}
                />
                <button
                  onClick={() => setData({ ...data, skills: data.skills.filter((_, i) => i !== idx) })}
                  style={{ color: '#ef4444', fontWeight: 700, padding: '8px 14px', fontSize: '1.1rem' }}
                  title="Delete"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: WORK EXPERIENCE */}
      {activeTab === 'experience' && (
        <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0 }}>💼 Work Experience & Shipped Platforms</h2>
            <button
              onClick={() => setData({ ...data, experience: [...data.experience, { id: `exp-${Date.now()}`, year: '2024 - PRESENT', title: 'New Role', company: 'Company Name', companyUrl: 'https://pitor.net/', location: 'Remote', responsibilities: ['Key responsibility or achievement here...'], liveProjects: [] }] })}
              className="btn-outline"
            >
              + Add Work Experience
            </button>
          </div>

          {data.experience.map((exp, idx) => (
            <div key={exp.id || idx} style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--border-active)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>Experience #{idx + 1}</span>
                <button onClick={() => setData({ ...data, experience: data.experience.filter((_, i) => i !== idx) })} style={{ color: '#ef4444', fontWeight: 700 }}>Delete Role ✕</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div>
                  <label className="field-label">Job Title</label>
                  <input type="text" className="input-field" value={exp.title || ''} placeholder="Full Stack Developer" onChange={(e) => { const list = [...data.experience]; list[idx].title = e.target.value; setData({ ...data, experience: list }); }} />
                </div>
                <div>
                  <label className="field-label">Company Name</label>
                  <input type="text" className="input-field" value={exp.company || ''} placeholder="Pitor" onChange={(e) => { const list = [...data.experience]; list[idx].company = e.target.value; setData({ ...data, experience: list }); }} />
                </div>
                <div>
                  <label className="field-label">Company URL</label>
                  <input type="text" className="input-field" value={exp.companyUrl || ''} placeholder="https://pitor.net/" onChange={(e) => { const list = [...data.experience]; list[idx].companyUrl = e.target.value; setData({ ...data, experience: list }); }} />
                </div>
                <div>
                  <label className="field-label">Duration</label>
                  <input type="text" className="input-field" value={exp.year || ''} placeholder="2024 - PRESENT" onChange={(e) => { const list = [...data.experience]; list[idx].year = e.target.value; setData({ ...data, experience: list }); }} />
                </div>
              </div>

              <div>
                <label className="field-label">Responsibilities & Key Accomplishments (One bullet per line)</label>
                <textarea
                  rows={4}
                  className="input-field"
                  value={(exp.responsibilities || []).join('\n')}
                  placeholder="Developed scalable web apps using Laravel and React.js..."
                  onChange={(e) => {
                    const list = [...data.experience];
                    list[idx].responsibilities = e.target.value.split('\n').filter(s => s.trim().length > 0);
                    setData({ ...data, experience: list });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: EDUCATION */}
      {activeTab === 'education' && (
        <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0 }}>🎓 Educational History</h2>
            <button
              onClick={() => setData({ ...data, education: [...data.education, { id: `edu-${Date.now()}`, year: '2016 - 2020', background: 'B.Sc in Computer Science & Engineering', institute: 'Daffodil International University', location: 'Dhaka, Bangladesh' }] })}
              className="btn-outline"
            >
              + Add Education
            </button>
          </div>

          {data.education.map((edu, idx) => (
            <div key={edu.id || idx} style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '14px', border: '1px solid var(--border-active)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 800, color: 'var(--accent-violet)' }}>Education #{idx + 1}</span>
                <button onClick={() => setData({ ...data, education: data.education.filter((_, i) => i !== idx) })} style={{ color: '#ef4444', fontWeight: 700 }}>Delete ✕</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div>
                  <label className="field-label">Degree / Certificate</label>
                  <input type="text" className="input-field" value={edu.background || edu.degree || ''} placeholder="B.Sc in Computer Science & Engineering" onChange={(e) => { const list = [...data.education]; list[idx].background = e.target.value; setData({ ...data, education: list }); }} />
                </div>
                <div>
                  <label className="field-label">Institute Name</label>
                  <input type="text" className="input-field" value={edu.institute || edu.institution || ''} placeholder="Daffodil International University" onChange={(e) => { const list = [...data.education]; list[idx].institute = e.target.value; setData({ ...data, education: list }); }} />
                </div>
                <div>
                  <label className="field-label">Duration / Years</label>
                  <input type="text" className="input-field" value={edu.year || ''} placeholder="2016 - 2020" onChange={(e) => { const list = [...data.education]; list[idx].year = e.target.value; setData({ ...data, education: list }); }} />
                </div>
                <div>
                  <label className="field-label">Location</label>
                  <input type="text" className="input-field" value={edu.location || ''} placeholder="Dhaka, Bangladesh" onChange={(e) => { const list = [...data.education]; list[idx].location = e.target.value; setData({ ...data, education: list }); }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 6: SERVICES */}
      {activeTab === 'services' && (
        <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0 }}>🛠️ Offered Services</h2>
            <button
              onClick={() => setData({ ...data, services: [...data.services, { id: `srv-${Date.now()}`, icon: 'Web', title: 'New Service Engineering', description: 'Service description...' }] })}
              className="btn-outline"
            >
              + Add Service
            </button>
          </div>

          {data.services.map((srv, idx) => (
            <div key={srv.id || idx} style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '14px', border: '1px solid var(--border-active)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>Service #{idx + 1}</span>
                <button onClick={() => setData({ ...data, services: data.services.filter((_, i) => i !== idx) })} style={{ color: '#ef4444', fontWeight: 700 }}>Delete ✕</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '14px' }}>
                <div>
                  <label className="field-label">Category Icon</label>
                  <select
                    className="input-field"
                    value={srv.icon}
                    onChange={(e) => { const list = [...data.services]; list[idx].icon = e.target.value; setData({ ...data, services: list }); }}
                  >
                    <option value="Web">💻 Web Engineering</option>
                    <option value="Android">📱 Mobile Apps</option>
                    <option value="Backend">⚡ Backend & APIs</option>
                    <option value="Scrapping">⚙️ DevOps & Systems</option>
                  </select>
                </div>
                <div>
                  <label className="field-label">Service Title</label>
                  <input type="text" className="input-field" value={srv.title || ''} placeholder="Full Stack Web Engineering" onChange={(e) => { const list = [...data.services]; list[idx].title = e.target.value; setData({ ...data, services: list }); }} />
                </div>
              </div>
              <div>
                <label className="field-label">Service Description</label>
                <textarea rows={2} className="input-field" value={srv.description || ''} placeholder="Service Description..." onChange={(e) => { const list = [...data.services]; list[idx].description = e.target.value; setData({ ...data, services: list }); }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 7: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0 }}>🚀 Featured Projects & Systems</h2>
            <button
              onClick={() => setData({ ...data, projects: [...data.projects, { id: `prj-${Date.now()}`, title: 'New System', description: 'Description', tags: ['Laravel', 'React'], image: '/Image/gtshop.png', link: 'https://github.com' }] })}
              className="btn-outline"
            >
              + Add Project Showcase
            </button>
          </div>

          {data.projects.map((prj, idx) => (
            <div key={prj.id || idx} style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '14px', border: '1px solid var(--border-active)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>Project #{idx + 1}</span>
                <button onClick={() => setData({ ...data, projects: data.projects.filter((_, i) => i !== idx) })} style={{ color: '#ef4444', fontWeight: 700 }}>Delete ✕</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div>
                  <label className="field-label">Project Title</label>
                  <input type="text" className="input-field" value={prj.title || prj.name || ''} placeholder="TrustPay BD - FinTech System" onChange={(e) => { const list = [...data.projects]; list[idx].title = e.target.value; setData({ ...data, projects: list }); }} />
                </div>
                <div>
                  <label className="field-label">Live URL / Link</label>
                  <input type="text" className="input-field" value={prj.link || prj.url || ''} placeholder="https://trustpaybd.net/" onChange={(e) => { const list = [...data.projects]; list[idx].link = e.target.value; setData({ ...data, projects: list }); }} />
                </div>
              </div>

              {/* Project Image Upload */}
              <div>
                <label className="field-label">Project Screenshot Image</label>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <label className="btn-outline" style={{ cursor: 'pointer', padding: '10px 18px', fontSize: '0.88rem' }}>
                    {uploading ? '⏳ Uploading...' : '🖼️ Upload Image'}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileUpload(e, (url) => {
                        const list = [...data.projects];
                        list[idx].image = url;
                        setData({ ...data, projects: list });
                      })}
                    />
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    style={{ flex: 1 }}
                    value={prj.image || ''}
                    placeholder="Image path (/Image/gtshop.png)"
                    onChange={(e) => { const list = [...data.projects]; list[idx].image = e.target.value; setData({ ...data, projects: list }); }}
                  />
                </div>
              </div>

              <div>
                <label className="field-label">Project Description</label>
                <textarea rows={2} className="input-field" value={prj.description || ''} placeholder="Project Description..." onChange={(e) => { const list = [...data.projects]; list[idx].description = e.target.value; setData({ ...data, projects: list }); }} />
              </div>
              
              <div>
                <label className="field-label">Technology Tags (Comma separated)</label>
                <input
                  type="text"
                  className="input-field"
                  value={(prj.tags || prj.technologies || []).join(', ')}
                  placeholder="Laravel, React.js, REST API, MySQL"
                  onChange={(e) => { const list = [...data.projects]; list[idx].tags = e.target.value.split(',').map(s => s.trim()).filter(Boolean); setData({ ...data, projects: list }); }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Input Form Styling */}
      <style jsx>{`
        .field-label {
          display: block;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .input-field {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-card);
          color: var(--text-primary);
          font-size: 0.98rem;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .input-field:focus {
          outline: none;
          border-color: var(--accent-cyan);
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.2);
        }
      `}</style>
    </div>
  );
}
