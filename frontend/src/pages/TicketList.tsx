import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const statusOptions = ["", "Yeni", "Açık", "Kapalı"];
const priorityOptions = ["", "Yüksek", "Orta", "Düşük"];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" }
];

export default function TicketList() {
  const { isSupport, isCustomer, user } = useUser();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '', priority: '', sort: 'newest' });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.get('/tickets', { params: filters })
      .then(res => {
        setTickets(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  if (loading) return <div className="loading"></div>;

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
        boxShadow: '0 10px 40px 0 rgba(80,120,255,0.13), 0 2px 12px rgba(0,0,0,0.08)',
        padding: 64,
        display: 'flex',
        flexDirection: 'column',
        gap: 38,
        transition: 'box-shadow 0.3s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h1 style={{ fontWeight: 800, fontSize: 32, margin: 0, letterSpacing: -1, color: '#2d3a5a', textShadow: '0 2px 8px #a1c4fd' }}>Tickets</h1>
          <button onClick={() => navigate(-1)} style={{ background: 'linear-gradient(90deg,#4f8cff,#38b6ff)', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 22px', fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #a1c4fd', transition: 'box-shadow 0.2s, background 0.2s' }}>← Geri Dön</button>
        </div>
        <div className="ticket-filters fancy-card" style={{ marginBottom: 0, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', background: 'rgba(241,245,249,0.95)', borderRadius: 16, padding: 18, boxShadow: '0 2px 8px #a1c4fd', transition: 'box-shadow 0.2s' }}>
          <label style={{ fontWeight: 600, color: '#4f8cff' }}>Status:
            <select name="status" value={filters.status} onChange={handleFilterChange} className="form-select" style={{ marginLeft: 8, borderRadius: 8, padding: '6px 12px', border: '1px solid #d1d5db', boxShadow: '0 1px 4px #a1c4fd', fontWeight: 500 }}>
              {statusOptions.map(opt => <option key={opt} value={opt}>{opt || 'All'}</option>)}
            </select>
          </label>
          <label style={{ fontWeight: 600, color: '#4f8cff' }}>Priority:
            <select name="priority" value={filters.priority} onChange={handleFilterChange} className="form-select" style={{ marginLeft: 8, borderRadius: 8, padding: '6px 12px', border: '1px solid #d1d5db', boxShadow: '0 1px 4px #a1c4fd', fontWeight: 500 }}>
              {priorityOptions.map(opt => <option key={opt} value={opt}>{opt || 'All'}</option>)}
            </select>
          </label>
          <label style={{ fontWeight: 600, color: '#4f8cff' }}>Sort:
            <select name="sort" value={filters.sort} onChange={handleFilterChange} className="form-select" style={{ marginLeft: 8, borderRadius: 8, padding: '6px 12px', border: '1px solid #d1d5db', boxShadow: '0 1px 4px #a1c4fd', fontWeight: 500 }}>
              {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </label>
        </div>
        <div className="ticket-list fancy-list" style={{ display: 'grid', gap: 28 }}>
          {tickets.length === 0 && <div style={{ textAlign: 'center', color: '#64748b', fontWeight: 600, fontSize: 20 }}>No tickets found.</div>}
          {tickets.map(ticket => (
            <Link to={`/tickets/${ticket.id}`} key={ticket.id} className="ticket-card fancy-card" style={{
              background: 'rgba(249,250,251,0.98)',
              borderRadius: 18,
              boxShadow: '0 6px 24px 0 #a1c4fd',
              padding: 28,
              display: 'block',
              textDecoration: 'none',
              color: '#222',
              transition: 'box-shadow 0.2s, transform 0.2s',
              border: '2px solid #e0e7ff',
              fontWeight: 600,
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px 0 #4f8cff'; e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 6px 24px 0 #a1c4fd'; e.currentTarget.style.transform = 'none'; }}
            >
              <div className="ticket-title" style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: '#2d3a5a', textShadow: '0 2px 8px #c2e9fb' }}>{ticket.title}</div>
              <div className="ticket-meta" style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 8 }}>
                <span className={`status-badge status-${ticket.status.toLowerCase()}`} style={{ background: '#e0e7ff', color: '#6366f1', borderRadius: 8, padding: '2px 10px', fontWeight: 700 }}>{ticket.status}</span>
                <span className={`priority-badge priority-${ticket.priority.toLowerCase()}`} style={{ background: '#fef9c3', color: '#eab308', borderRadius: 8, padding: '2px 10px', fontWeight: 700 }}>{ticket.priority}</span>
                <span className="ticket-date" style={{ color: '#64748b', fontSize: 15 }}>{new Date(ticket.created_at).toLocaleString()}</span>
              </div>
              <div className="ticket-user" style={{ color: '#64748b', fontSize: 16 }}>By: <b>{ticket.user?.username}</b> ({ticket.user?.role})</div>
              {isSupport && <span className="role-badge role-support" style={{ marginLeft: 8, background: '#dbeafe', color: '#2563eb', borderRadius: 8, padding: '2px 10px', fontWeight: 700 }}>Support View</span>}
              {isCustomer && ticket.user_id === user?.id && <span className="role-badge role-customer" style={{ marginLeft: 8, background: '#dcfce7', color: '#16a34a', borderRadius: 8, padding: '2px 10px', fontWeight: 700 }}>Your Ticket</span>}
            </Link>
      ))}
        </div>
    </section>
    </div>
  );
}
