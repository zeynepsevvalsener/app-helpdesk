import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

interface Ticket { 
  id: number; 
  title: string; 
  created_at: string; 
  status: string; 
  priority: string;
  user_id: number;
  user?: {
    username: string;
    email: string;
  };
}

export default function TicketCard({ id, title, created_at, status, priority, user }: Ticket) {
  const { isSupport } = useUser();

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Yeni': return 'badge-status-new';
      case 'Açık': return 'badge-status-open';
      case 'Kapalı': return 'badge-status-closed';
      default: return 'badge-status-new';
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'Düşük': return 'badge-priority-low';
      case 'Orta': return 'badge-priority-medium';
      case 'Yüksek': return 'badge-priority-high';
      default: return 'badge-priority-medium';
    }
  };

  return (
    <div className="card">
      <div className="card-header">
      <Link to={`/tickets/${id}`}>
          <h3 className="card-title">{title}</h3>
      </Link>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <span className={`badge ${getStatusBadgeClass(status)}`}>
            {status}
          </span>
          <span className={`badge ${getPriorityBadgeClass(priority)}`}>
            {priority}
          </span>
        </div>
      </div>
      <div className="card-meta">
        <div>Created: {new Date(created_at).toLocaleDateString()}</div>
        <div>ID: #{id}</div>
        {isSupport && user && (
          <div>By: {user.username}</div>
        )}
      </div>
    </div>
  );
}
