import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import Button from './Button';

export default function LoginForm() {
  const { login, loading, user } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (err) {
      console.error('Login failed. Please check your credentials.', err);
    }
  };

  console.log('Aktif kullanıcı:', user);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div className="fancy-card" style={{
        maxWidth: 400,
        width: '100%',
        padding: 36,
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
        borderRadius: 20,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* <div style={{ fontSize: 48, marginBottom: 8, color: '#6366f1' }}>🎫</div> */}
        <h1 style={{ textAlign: 'center', marginBottom: 24, fontWeight: 700, letterSpacing: -1 }}>Login</h1>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="form-group" style={{ marginBottom: 18 }}>
            <label className="form-label" style={{ fontWeight: 500 }}>Username</label>
            <input
              className="form-input"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #d1d5db',
                fontSize: 16,
                outline: 'none',
                transition: 'border 0.2s',
                marginTop: 4,
              }}
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus
              onFocus={e => (e.target.style.border = '1.5px solid #6366f1')}
              onBlur={e => (e.target.style.border = '1px solid #d1d5db')}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 18 }}>
            <label className="form-label" style={{ fontWeight: 500 }}>Password</label>
            <input
              className="form-input"
              type="password"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #d1d5db',
                fontSize: 16,
                outline: 'none',
                transition: 'border 0.2s',
                marginTop: 4,
              }}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              onFocus={e => (e.target.style.border = '1.5px solid #6366f1')}
              onBlur={e => (e.target.style.border = '1px solid #d1d5db')}
            />
          </div>
          <Button
            label={loading ? 'Logging in...' : 'Login'}
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: '100%', marginTop: 8, fontWeight: 600, fontSize: 18, borderRadius: 8 }}
          />
        </form>
      </div>
    </div>
  );
} 