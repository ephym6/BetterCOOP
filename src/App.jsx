import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ClerkDashboard } from './pages/ClerkDashboard';
import { MemberDashboard } from './pages/MemberDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route 
            path="/clerk-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['clerk']}>
                <ClerkDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/member-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['member']}>
                <MemberDashboard />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
