import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import api from '../api/api';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function Dashboard() {
  const { user, isCustomer, logout } = useUser();
  const [stats, setStats] = useState({ total: 0, new: 0, open: 0, closed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/stats')
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
  return (
    <section>
        <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
          <div className="loading"></div>
        </div>
    </section>
  );
}

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)',
      fontFamily: 'Inter, sans-serif',
      padding: '60px 0',
      backdropFilter: 'blur(2px)',
    }}>
      <section style={{
        maxWidth: 900,
        margin: '0 auto',
        background: 'rgba(255,255,255,0.96)',
        borderRadius: 28,
        boxShadow: '0 4px 24px 0 rgba(80,120,255,0.08), 0 1.5px 6px rgba(0,0,0,0.06)',
        padding: 64,
        display: 'flex',
        flexDirection: 'column',
        gap: 38,
        transition: 'box-shadow 0.3s',
      }}>
        <div className="dashboard-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h1 style={{ fontWeight: 800, fontSize: 38, margin: 0, letterSpacing: -1, color: '#2d3a5a', textShadow: '0 1px 4px #e0e7ff' }}>HelpDesk</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(243,244,246,0.97)', borderRadius: 16, padding: '8px 20px', boxShadow: '0 1px 4px #e0e7ff', minWidth: 0, height: 44 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 9, fontWeight: 700, color: '#6366f1', fontSize: 15 }}>
                    {user?.username?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1, minWidth: 0 }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: '#374151', letterSpacing: 0, marginBottom: 0 }}>{user?.username}</span>
                    <span style={{ display: 'inline-block', marginTop: 2, padding: '3px 10px', borderRadius: 8, background: '#e0e7ff', color: '#6366f1', fontWeight: 600, fontSize: 11, letterSpacing: 0.2, textTransform: 'capitalize', lineHeight: 1 }}>{user?.role}</span>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/tickets" state={{ fromDashboard: false }} className="fancy-btn btn-primary" style={{ boxShadow: '0 2px 8px #a1c4fd', fontWeight: 700, fontSize: 16, borderRadius: 10, background: 'linear-gradient(90deg,#4f8cff,#38b6ff)', color: '#fff', border: 'none', transition: 'box-shadow 0.2s, background 0.2s', height: 40, padding: '0 24px', display: 'flex', alignItems: 'center' }}>Tickets</Link>
            <Button label={<><span style={{ marginRight: 6 }}>🚪</span>Logout</>} variant="danger" onClick={() => { logout(); window.location.href = '/login'; }} style={{ fontWeight: 700, fontSize: 16, borderRadius: 10, boxShadow: '0 2px 8px #a1c4fd', background: 'linear-gradient(90deg,#ff6a6a,#ffb347)', color: '#fff', border: 'none', transition: 'box-shadow 0.2s, background 0.2s', height: 40, padding: '0 24px', display: 'flex', alignItems: 'center' }} />
          </div>
        </div>
        <div className="stats-grid fancy-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          <div className="stat-card" style={{ background: 'rgba(241,245,249,0.97)', borderRadius: 16, padding: 28, textAlign: 'center', boxShadow: '0 2px 8px 0 #b6c6e6', transition: 'box-shadow 0.2s', fontWeight: 700, fontSize: 30, color: '#4f8cff', position: 'relative', overflow: 'hidden' }}>
            <div className="stat-number" style={{ fontSize: 32, fontWeight: 800, color: '#6366f1', textShadow: '0 1px 4px #e0e7ff' }}>{stats.total}</div>
            <div className="stat-label" style={{ color: '#64748b', fontWeight: 600, fontSize: 18 }}>Total</div>
          </div>
          <div className="stat-card" style={{ background: 'rgba(241,245,249,0.97)', borderRadius: 16, padding: 28, textAlign: 'center', boxShadow: '0 2px 8px 0 #b6c6e6', transition: 'box-shadow 0.2s', fontWeight: 700, fontSize: 30, color: '#22d3ee', position: 'relative', overflow: 'hidden' }}>
            <div className="stat-number" style={{ fontSize: 32, fontWeight: 800, color: '#22d3ee', textShadow: '0 1px 4px #e0e7ff' }}>{stats.new}</div>
            <div className="stat-label" style={{ color: '#64748b', fontWeight: 600, fontSize: 18 }}>New</div>
          </div>
          <div className="stat-card" style={{ background: 'rgba(241,245,249,0.97)', borderRadius: 16, padding: 28, textAlign: 'center', boxShadow: '0 2px 8px 0 #b6c6e6', transition: 'box-shadow 0.2s', fontWeight: 700, fontSize: 30, color: '#facc15', position: 'relative', overflow: 'hidden' }}>
            <div className="stat-number" style={{ fontSize: 32, fontWeight: 800, color: '#facc15', textShadow: '0 1px 4px #fef9c3' }}>{stats.open}</div>
            <div className="stat-label" style={{ color: '#64748b', fontWeight: 600, fontSize: 18 }}>Open</div>
          </div>
          <div className="stat-card" style={{ background: 'rgba(241,245,249,0.97)', borderRadius: 16, padding: 28, textAlign: 'center', boxShadow: '0 2px 8px 0 #b6c6e6', transition: 'box-shadow 0.2s', fontWeight: 700, fontSize: 30, color: '#22c55e', position: 'relative', overflow: 'hidden' }}>
            <div className="stat-number" style={{ fontSize: 32, fontWeight: 800, color: '#22c55e', textShadow: '0 1px 4px #dcfce7' }}>{stats.closed}</div>
            <div className="stat-label" style={{ color: '#64748b', fontWeight: 600, fontSize: 18 }}>Closed</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {isCustomer && <Link to="/tickets/new" className="fancy-btn btn-primary" style={{ fontWeight: 700, fontSize: 18, borderRadius: 10, boxShadow: '0 2px 8px #a1c4fd', background: 'linear-gradient(90deg,#4f8cff,#38b6ff)', color: '#fff', border: 'none', transition: 'box-shadow 0.2s, background 0.2s', margin: '24px 0', display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 22, fontWeight: 900, marginRight: 4 }}>+</span> Add Ticket</Link>}
        </div>
      </section>
    </div>
  );
}


