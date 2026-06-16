import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages import coordinates
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { MemberManagementPage } from './pages/MemberManagementPage';
import { MemberDetailPage } from './pages/MemberDetailPage';
import { UserManagementPage } from './pages/UserManagementPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';

// Simple Route Guard to protect admin console pages
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentSessionUser = localStorage.getItem('bettercoop_current_user');
  
  if (!currentSessionUser) {
    // Redirect unauthenticated guests to the login gate
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Core Public Views (Increment 1) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Private Administrative Dashboard Views (Protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <MemberManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/members/:id"
          element={
            <ProtectedRoute>
              <MemberDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileSettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <AdminSettingsPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all unknown paths - fallback gracefully to brand landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
