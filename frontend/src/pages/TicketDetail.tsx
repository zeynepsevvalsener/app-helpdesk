import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import Button from '../components/Button';

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  user_id: number;
  user?: {
    username: string;
    email: string;
    role: string;
  };
}

export default function TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<Ticket>(`/tickets/${id}`);
      setTicket(response.data);
    } catch (err: any) {
      console.error('Detail fetch error:', err);
      setError(err.response?.data?.detail || 'Failed to load ticket');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) return;
    try {
      await api.delete(`/tickets/${id}`);
      navigate('/tickets');
    } catch {
      alert('Failed to delete ticket.');
    }
  };

  if (loading) {
    return (
      <div className="loading"></div>
    );
  }

  if (error) {
    return (
      <div className="message error">{error}</div>
    );
  }

  if (!ticket) {
  return (
      <div className="message error">Ticket not found.</div>
    );
  }

  const save = async () => {
    try {
      setSaving(true);
      setError(null);
      await api.put(`/tickets/${id}`, {
        status: ticket?.status,
        priority: ticket?.priority,
      });
      setEditMode(false);
      fetchTicket();
    } catch (err: any) {
      console.error('Update error:', err);
      setError(err.response?.data?.detail || 'Failed to update ticket');
      setSaving(false);
    }
  };

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
        gap: 40,
        transition: 'box-shadow 0.3s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontWeight: 800, fontSize: 38, margin: 0, letterSpacing: -1, color: '#2d3a5a', textShadow: '0 1px 4px #e0e7ff' }}>{ticket.title}</h2>
          <button onClick={() => navigate(-1)} style={{ background: '#e0e7ff', color: '#6366f1', border: 'none', borderRadius: 10, padding: '12px 32px', fontWeight: 700, fontSize: 20, cursor: 'pointer', boxShadow: '0 2px 12px #e0e7ff', transition: 'box-shadow 0.2s, background 0.2s' }}>← Geri Dön</button>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', marginBottom: 16 }}>
          <span className={`status-badge status-${ticket.status.toLowerCase()}`} style={{ background: '#e0e7ff', color: '#6366f1', borderRadius: 10, padding: '6px 24px', fontWeight: 700, fontSize: 20 }}>{ticket.status}</span>
          <span className={`priority-badge priority-${ticket.priority.toLowerCase()}`} style={{ background: '#fef9c3', color: '#eab308', borderRadius: 10, padding: '6px 24px', fontWeight: 700, fontSize: 20 }}>{ticket.priority}</span>
          <span style={{ color: '#64748b', fontSize: 18 }}>Created: {new Date(ticket.created_at).toLocaleString()}</span>
        </div>
        <div style={{ color: '#64748b', fontSize: 20, marginBottom: 18 }}>By: <b>{ticket.user?.username}</b> ({ticket.user?.role})</div>
        <div style={{ fontSize: 22, color: '#222', background: '#f9fafb', borderRadius: 14, padding: 32, minHeight: 120, marginBottom: 12, boxShadow: '0 1px 8px #e0e7ff' }}>{ticket.description}</div>
        <div style={{ display: 'flex', gap: 24, marginTop: 24 }}>
          {!editMode ? (
            <Button label="Update" onClick={() => setEditMode(true)} style={{ background: '#e0e7ff', color: '#6366f1', borderRadius: 10, fontWeight: 700, fontSize: 20, boxShadow: '0 2px 12px #e0e7ff', border: 'none', transition: 'box-shadow 0.2s, background 0.2s', padding: '12px 32px' }} />
          ) : (
            <form onSubmit={e => { e.preventDefault(); save(); }} style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              <select value={ticket.status} onChange={e => setTicket(t => t && { ...t, status: e.target.value })} style={{ borderRadius: 10, padding: '10px 24px', border: '1.5px solid #d1d5db', boxShadow: '0 1px 6px #e0e7ff', fontWeight: 600, fontSize: 18 }}>
                <option value="Yeni">Yeni</option>
                <option value="Açık">Açık</option>
                <option value="Kapalı">Kapalı</option>
        </select>
              <select value={ticket.priority} onChange={e => setTicket(t => t && { ...t, priority: e.target.value })} style={{ borderRadius: 10, padding: '10px 24px', border: '1.5px solid #d1d5db', boxShadow: '0 1px 6px #fef9c3', fontWeight: 600, fontSize: 18 }}>
                <option value="Yüksek">Yüksek</option>
                <option value="Orta">Orta</option>
                <option value="Düşük">Düşük</option>
        </select>
              <Button label={saving ? 'Saving...' : 'Save'} type="submit" className="btn-primary" disabled={saving} style={{ background: '#e0e7ff', color: '#6366f1', borderRadius: 10, fontWeight: 700, fontSize: 20, boxShadow: '0 2px 12px #e0e7ff', border: 'none', transition: 'box-shadow 0.2s, background 0.2s', padding: '12px 32px' }} />
              <Button label="Cancel" type="button" variant="secondary" onClick={() => setEditMode(false)} style={{ background: '#f1f5f9', color: '#64748b', borderRadius: 10, fontWeight: 700, fontSize: 20, boxShadow: '0 2px 12px #f1f5f9', border: 'none', transition: 'box-shadow 0.2s, background 0.2s', padding: '12px 32px' }} />
            </form>
          )}
          <Button label="Delete" variant="danger" onClick={handleDelete} style={{ background: '#ffe0e0', color: '#e57373', borderRadius: 10, fontWeight: 700, fontSize: 20, boxShadow: '0 2px 12px #ffe0e0', border: 'none', transition: 'box-shadow 0.2s, background 0.2s', padding: '12px 32px' }} />
      </div>
    </section>
    </div>
  );
}
