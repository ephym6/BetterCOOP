import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { usersService } from '../../services/api';
import { Modal } from '../common/Modal';
import { Info, AlertCircle } from 'lucide-react';

export const DashboardLayout = ({
  pageTitle,
  children
}) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [futureModuleInfo, setFutureModuleInfo] = useState(null);

  useEffect(() => {
    // Sync with active session profile
    usersService.getCurrentUser().then((user) => {
      if (!user) {
        // Redirection check for unprotected direct loads
        navigate('/login');
      } else {
        setCurrentUser(user);
      }
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('bettercoop_current_user');
    navigate('/login');
  };

  const triggerFutureModuleAlert = (moduleName, phase) => {
    setFutureModuleInfo({ name: moduleName, phase });
  };

  return (
    <div className="bg-slate-surface min-h-screen">
      {/* Sidebar Navigation */}
      <Sidebar onFutureModuleClick={triggerFutureModuleAlert} />

      {/* Main Container Area */}
      <div className="ml-sidebar-width min-h-screen flex flex-col justify-between">
        <div>
          {/* Header/Navbar bar */}
          <Navbar
            pageTitle={pageTitle}
            user={currentUser}
            onLogout={handleLogout}
          />

          {/* Render Active Children Page */}
          <main className="p-gutter-desktop max-w-max-width mx-auto w-full">
            {children}
          </main>
        </div>

        {/* Cohesive Footer disclosures */}
        <footer className="p-6 border-t border-slate-border text-center text-body-sm text-on-surface-variant bg-surface">
          <div className="max-w-max-width mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-label-md text-label-md">
              © 2026 BetterCOOP Agri-Fintech. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-label-xs text-label-xs text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="font-label-xs text-label-xs text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="font-label-xs text-label-xs text-on-surface-variant hover:text-primary transition-colors">Support Portal</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Future Increments Disclosure Modal */}
      <Modal
        isOpen={!!futureModuleInfo}
        onClose={() => setFutureModuleInfo(null)}
        title="Future Release Coordinate"
      >
        <div className="flex flex-col gap-5 text-center items-center">
          <div className="w-16 h-16 bg-primary-fixed text-primary rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              {futureModuleInfo?.name}
            </h4>
            <p className="text-on-surface-variant text-body-sm">
              As planned in the system architecture, the <strong>{futureModuleInfo?.name}</strong> module 
              is scheduled under <strong>{futureModuleInfo?.phase}</strong>.
            </p>
          </div>
          <div className="p-4 bg-surface-container-low rounded-lg border border-primary/10 flex gap-3 text-left w-full">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-body-sm text-on-surface-variant">
              Increment 1 (Core System Foundation) successfully supports member registrations, credential management, 
              and dynamic dashboard statistics. Ledger balances, loan audits, and automatic Africa’s Talking SMS broadcasts 
              will roll out in future phases.
            </p>
          </div>
          <button
            onClick={() => setFutureModuleInfo(null)}
            className="w-full h-touch-target bg-primary text-white rounded-lg font-bold hover:bg-emerald-dark transition-all"
          >
            Acknowledge Guidelines
          </button>
        </div>
      </Modal>
    </div>
  );
};
