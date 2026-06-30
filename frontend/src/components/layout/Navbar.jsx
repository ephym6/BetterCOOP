import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, HelpCircle, LogOut } from 'lucide-react';
export const Navbar = ({ pageTitle, user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 w-full sticky top-0 z-20 bg-white border-b border-slate-200 flex justify-between items-center px-8 shadow-xs">
      {/* Title */}
      <div className="flex items-center gap-4">
        <h2 className="font-headline text-lg font-bold text-slate-800 tracking-tight">{pageTitle}</h2>
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-4">
        {/* Support Gateway Live Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full border border-success/10">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="font-label-xs text-label-xs uppercase tracking-wider font-bold">Secure Gateway Live</span>
        </div>

        {/* Global Support Icon */}
        <button
          title="Help Center"
          onClick={() => alert("BetterCOOP Help Center is available 24/7. Contact us at support@bettercoop.agri")}
          className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors cursor-pointer"
        >
          <HelpCircle className="w-5 h-5 text-primary" />
        </button>

        <div className="h-8 w-[1px] bg-slate-border mx-1" />

        {/* Admin Info Profile Summary */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="font-label-md text-label-md font-bold text-on-surface leading-snug">
              {user?.fullName || 'Sarah Miller'}
            </p>
            <p className="font-label-xs text-label-xs text-on-surface-variant leading-none uppercase tracking-widest font-bold">
              {user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Lead Administrator'}
            </p>
          </div>
          
          <img
            alt="Lead Administrator Avatar"
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full border-2 border-primary-fixed shadow-xs hover:border-amber-dark transition-all cursor-pointer object-cover"
            src={user?.avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8IFvNdwUGbDubGYZvceYNTfcTYraCl4XWd2vM2MuM24yGSgLzvOxxHGoI_AQOGzskgktsODmTfr9b4k4th_VRJxA-6PLznzztQTwRIWPQVNwzgIlz6wPYDOncaGo3uecq--Zb1Rs0L804cqUtckzUeTcT8NGKHK41bEunx4WoqmYxzxE6i5SyhmwFAY-BTJ6S-XgRs1r8GFIFNh33dV0a3hMc38-2vp_SIvtgGqR2HSWsEzjoZ46UQPjWhGYCKf91uDteuS16fCE'}
          />

          <button
            title="Log Out"
            onClick={onLogout}
            className="p-2 text-on-surface-variant hover:text-danger hover:bg-red-50 rounded-full transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
          </button>
        </div>
      </div>
    </header>
  );
};
