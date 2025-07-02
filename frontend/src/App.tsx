// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { UserProvider, useUser } from './contexts/UserContext';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import TicketList from './pages/TicketList';
import NewTicketForm from './pages/NewTicketForm';
import TicketDetail from './pages/TicketDetail';

function AppContent() {
  const { user, loading } = useUser();

  if (loading) return <div className="loading"></div>;

  return (
        <Routes>
      {!user ? (
        <>
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          {/* Protected routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/tickets/new" element={<NewTicketForm />} />
          <Route path="/tickets/:id" element={<TicketDetail />} />
          {/* Redirect /login and /register to dashboard if already logged in */}
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
        </Routes>
  );
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppContent />
    </BrowserRouter>
    </UserProvider>
  );
}
