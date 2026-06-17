import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Wallet,
  Coins,
  BookOpen,
  PieChart,
  MessageSquare,
  Settings,
  UserCircle2,
  AlertCircle
} from 'lucide-react';

export const Sidebar = ({ onFutureModuleClick }) => {
  const navigate = useNavigate();

  // Active styles for real active routes
  const activeClass = 'flex items-center gap-3 px-3 py-2 bg-emerald-800 text-white rounded-md transition-all duration-150 font-semibold text-sm';
  const inactiveClass = 'flex items-center gap-3 px-3 py-2 text-emerald-100 hover:bg-emerald-800 rounded-md transition-all duration-150 text-sm';

  return (
    <aside className="w-sidebar-width fixed left-0 top-0 h-screen overflow-y-auto bg-emerald-900 text-white border-r border-emerald-800 shadow-xl z-30 flex flex-col justify-between">
      {/* Brand Header */}
      <div>
        <div className="p-6 flex flex-col gap-1 border-b border-emerald-800 bg-emerald-950">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 bg-amber-500 rounded flex items-center justify-center font-bold text-emerald-950 select-none">
              B
            </span>
            <h1 className="font-headline-sm text-headline-sm font-bold text-white tracking-tight animate-pulse">BetterCOOP</h1>
          </div>
          <p className="font-label-md text-label-md text-emerald-400 tracking-wider">Agri-Fintech Management</p>
        </div>

        {/* Navigation Items */}
        <nav className="mt-4 flex flex-col gap-1 px-4">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 px-2">Core System</div>
          {/* Active Router Paths (Increment 1 Core) */}
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            <LayoutDashboard className="w-5 h-5 flex-shrink-0 text-emerald-300" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/members" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            <Users className="w-5 h-5 flex-shrink-0 text-emerald-300" />
            <span>Members</span>
          </NavLink>

          <NavLink to="/users" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            <UserCheck className="w-5 h-5 flex-shrink-0 text-emerald-300" />
            <span>Users</span>
          </NavLink>

          {/* Future module placeholders removed */}

          {/* Settings and Profile links */}
          <NavLink to="/profile" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            <UserCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-300" />
            <span>Profile Settings</span>
          </NavLink>

          <NavLink to="/admin/settings" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            <Settings className="w-5 h-5 flex-shrink-0 text-emerald-300" />
            <span>Admin Settings</span>
          </NavLink>
        </nav>
      </div>

      {/* Admin User Footer Coordinate */}
      <div className="mt-auto p-4 bg-emerald-950 border-t border-emerald-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center font-bold text-emerald-900 border-2 border-white/20">EM</div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate text-white">Ephraim M.</p>
            <p className="text-xs text-emerald-400">System Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
