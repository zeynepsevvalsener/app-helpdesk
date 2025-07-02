import React from 'react';

export default function FilterSort({
  status, priority, sort, onChange
}: {
  status: string; 
  priority: string; 
  sort: string;
  onChange: (f: string, v: string) => void;
}) {
  return (
    <div className="filter-sort">
      <div className="form-group" style={{ margin: 0 }}>
        <label className="form-label">Status</label>
        <select 
          className="form-select"
          value={status} 
          onChange={e => onChange('status', e.target.value)}
        >
        <option value="">All Status</option>
          <option value="Yeni">New</option>
          <option value="Açık">Open</option>
          <option value="Kapalı">Closed</option>
      </select>
      </div>
      
      <div className="form-group" style={{ margin: 0 }}>
        <label className="form-label">Priority</label>
        <select 
          className="form-select"
          value={priority} 
          onChange={e => onChange('priority', e.target.value)}
        >
        <option value="">All Priority</option>
          <option value="Düşük">Low</option>
          <option value="Orta">Medium</option>
          <option value="Yüksek">High</option>
      </select>
      </div>
      
      <div className="form-group" style={{ margin: 0 }}>
        <label className="form-label">Sort</label>
        <select 
          className="form-select"
          value={sort} 
          onChange={e => onChange('sort', e.target.value)}
        >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
      </div>
    </div>
  );
}
