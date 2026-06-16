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

interface SidebarProps {
  onFutureModuleClick: (moduleName: string, phase: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onFutureModuleClick }) => {
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

          {/* Placeholders for Future Modules (Increment 2 - Ledger Module) */}
          <div className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2 px-2 mt-4">Modules (Coming Soon)</div>

          <button
            onClick={() => onFutureModuleClick('Savings Management', 'Increment 2 (Ledger Module)')}
            className="flex items-center justify-between w-full text-left font-normal select-none relative group transition-colors duration-150 px-3 py-2 text-emerald-100/70 hover:bg-emerald-800/50 rounded-md text-sm cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-emerald-400/70" />
              <span>Savings</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider bg-white/10 px-1.5 py-0.5 rounded text-white group-hover:bg-amber-500 group-hover:text-emerald-950">
              Inc 2
            </span>
          </button>

          <button
            onClick={() => onFutureModuleClick('Loans Management', 'Increment 2 (Ledger Module)')}
            className="flex items-center justify-between w-full text-left font-normal select-none relative group transition-colors duration-150 px-3 py-2 text-emerald-100/70 hover:bg-emerald-800/50 rounded-md text-sm cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Coins className="w-5 h-5 text-emerald-400/70" />
              <span>Loans</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider bg-white/10 px-1.5 py-0.5 rounded text-white group-hover:bg-amber-500 group-hover:text-emerald-950">
              Inc 2
            </span>
          </button>

          <button
            onClick={() => onFutureModuleClick('General Ledger', 'Increment 2 (Ledger Module)')}
            className="flex items-center justify-between w-full text-left font-normal select-none relative group transition-colors duration-150 px-3 py-2 text-emerald-100/70 hover:bg-emerald-800/50 rounded-md text-sm cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-emerald-400/70" />
              <span>Ledger</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider bg-white/10 px-1.5 py-0.5 rounded text-white group-hover:bg-amber-500 group-hover:text-emerald-950">
              Inc 2
            </span>
          </button>

          <button
            onClick={() => onFutureModuleClick('Reporting Centre', 'Increment 2 (Ledger Module)')}
            className="flex items-center justify-between w-full text-left font-normal select-none relative group transition-colors duration-150 px-3 py-2 text-emerald-100/70 hover:bg-emerald-800/50 rounded-md text-sm cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <PieChart className="w-5 h-5 text-emerald-400/70" />
              <span>Reports</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider bg-white/10 px-1.5 py-0.5 rounded text-white group-hover:bg-amber-500 group-hover:text-emerald-950">
              Inc 2
            </span>
          </button>

          {/* Placeholders for Future Modules (Increment 3 - SMS Engine) */}
          <button
            onClick={() => onFutureModuleClick('SMS Broadcast Gateway', 'Increment 3 (SMS Engine)')}
            className="flex items-center justify-between w-full text-left font-normal select-none relative group transition-colors duration-150 px-3 py-2 text-emerald-100/70 hover:bg-emerald-800/50 rounded-md text-sm cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-emerald-400/70" />
              <span>SMS Hub</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider bg-white/10 px-1.5 py-0.5 rounded text-white group-hover:bg-amber-500 group-hover:text-emerald-950">
              Inc 3
            </span>
          </button>

          <div className="h-px bg-white/10 my-2 mx-4" />

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
