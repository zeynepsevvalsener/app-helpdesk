import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Button from '../components/Button';

export default function NewTicketForm() {
  const { isCustomer } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', priority: 'Orta' });
  const [loading, setLoading] = useState(false);

  if (!isCustomer) {
    return <div className="message error">Only customers can create new tickets.</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/tickets', form);
      navigate('/tickets');
    } catch (err) {
      // Kullanılmayan err değişkenini kaldır
    } finally {
      setLoading(false);
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
        boxShadow: '0 4px 24px 0 rgba(80,120,255,0.08), 0 1.5px 6px rgba(0,0,0,0.06)',
        padding: 64,
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        transition: 'box-shadow 0.3s',
      }}>
        <h1 style={{ fontWeight: 800, fontSize: 32, margin: 0, letterSpacing: -1, color: '#2d3a5a', textShadow: '0 1px 4px #e0e7ff', marginBottom: 32 }}>Yeni Ticket Oluştur</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label className="form-label" style={{ fontWeight: 600, fontSize: 16, color: '#374151', marginBottom: 2 }}>Title</label>
            <input className="form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required style={{ borderRadius: 10, border: '1.5px solid #d1d5db', padding: '12px 18px', fontSize: 16, background: '#f8fafc', color: '#222', boxShadow: '0 1px 4px #e0e7ff', outline: 'none' }} />
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label className="form-label" style={{ fontWeight: 600, fontSize: 16, color: '#374151', marginBottom: 2 }}>Description</label>
            <textarea className="form-input" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required style={{ borderRadius: 10, border: '1.5px solid #d1d5db', padding: '12px 18px', fontSize: 16, background: '#f8fafc', color: '#222', boxShadow: '0 1px 4px #e0e7ff', outline: 'none', minHeight: 80 }} />
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label className="form-label" style={{ fontWeight: 600, fontSize: 16, color: '#374151', marginBottom: 2 }}>Priority</label>
            <select className="form-select" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))} style={{ borderRadius: 10, border: '1.5px solid #d1d5db', padding: '12px 18px', fontSize: 16, background: '#f8fafc', color: '#222', boxShadow: '0 1px 4px #fef9c3', outline: 'none' }}>
              <option value="Yüksek">High</option>
              <option value="Orta">Medium</option>
              <option value="Düşük">Low</option>
      </select>
          </div>
          <Button label={<><span style={{ fontSize: 22, fontWeight: 900, marginRight: 8 }}>+</span>{loading ? 'Creating...' : 'Create Ticket'}</>} type="submit" className="btn-primary" disabled={loading} style={{ background: '#e0e7ff', color: '#6366f1', borderRadius: 10, fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px #e0e7ff', border: 'none', transition: 'box-shadow 0.2s, background 0.2s', padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} />
        </form>
    </section>
    </div>
  );
}
