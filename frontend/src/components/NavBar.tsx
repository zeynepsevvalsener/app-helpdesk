import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Button from './Button';

function showToast(message: string) {
  const toast = document.createElement('div');
  toast.className = 'custom-toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    top: '24px',
    right: '24px',
    background: '#222',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: 600,
    zIndex: 9999,
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
    opacity: 0,
    transition: 'opacity 0.3s',
  });
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '1'; }, 10);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 2000);
}

export default function NavBar() {
  const location = useLocation();
  const { user, logout, isCustomer } = useUser();

  const handleLogout = () => {
    logout();
    showToast('Başarıyla çıkış yaptınız!');
    setTimeout(() => { window.location.href = '/login'; }, 800);
  };

  return (
    <nav className="navbar fancy-navbar" style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--navbar-bg, #fff)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to={user ? "/" : "/login"} className="navbar-brand">
          🎫 HelpDesk
        </Link>
        {user && (
          <>
            <ul className="navbar-nav" style={{ display: 'flex', gap: 24, alignItems: 'center', margin: 0 }}>
              <li>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/tickets" className={location.pathname.startsWith('/tickets') && location.pathname !== '/tickets/new' ? 'active' : ''}>
                  Tickets
                </Link>
              </li>
              {isCustomer && (
                <li>
                  <Link to="/tickets/new" className={location.pathname === '/tickets/new' ? 'active' : ''}>
                    New Ticket
                  </Link>
                </li>
              )}
            </ul>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div style={{ textAlign: 'right', marginRight: 16 }}>
                <div style={{ fontSize: 'var(--font-size-md)', fontWeight: '600', color: 'var(--primary, #2563eb)' }}>
                  {user.username}
                </div>
                <div className={`role-badge role-${user.role}`} style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, textTransform: 'capitalize', display: 'inline-block', padding: '2px 8px', borderRadius: '12px', background: user.role === 'support' ? 'var(--blue-100)' : 'var(--green-100)', color: user.role === 'support' ? 'var(--blue-700)' : 'var(--green-700)' }}>
                  {user.role}
                </div>
              </div>
              <Button label={<><span style={{ marginRight: 6 }}>🚪</span>Logout</>} variant="danger" onClick={handleLogout} style={{ fontWeight: 700, fontSize: 16, padding: '8px 20px', borderRadius: 8 }} />
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
