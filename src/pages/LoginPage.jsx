import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { KeyRound, ShieldAlert, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { usersService } from '../services/api';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@bettercoop.agri');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const users = await usersService.getUsers();
      // Locate matching mock user
      const foundUser = users.find((u) => u.email.toLowerCase().trim() === email.toLowerCase().trim());
      
      if (!foundUser) {
        throw new Error('User not found. Try logging in with the default: admin@bettercoop.agri');
      }

      // Successful simulated database check - persist active session
      await usersService.loginUser(foundUser.email);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/dashboard');
      }, 800);
      
    } catch (err) {
      setIsLoading(false);
      setErrorMsg(err.message || 'Validation error. Please verify your credentials.');
    }
  };

  return (
    <div className="bg-slate-surface text-on-surface flex min-h-screen overflow-hidden text-left">
      {/* Left Column: Dark Emerald branding panel */}
      <aside className="hidden lg:flex w-5/12 bg-primary relative flex-col justify-between p-12 overflow-hidden text-white select-none">
        {/* Background visual curve */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <circle cx="400" cy="400" fill="none" r="300" stroke="white" strokeDasharray="10 20" strokeWidth="0.5"></circle>
            <path d="M0 400 Q 200 350 400 400 T 800 400" fill="none" stroke="white" strokeWidth="1"></path>
          </svg>
        </div>

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-secondary-container rounded-lg flex items-center justify-center cursor-pointer">
            <span className="text-xl">🚜</span>
          </div>
          <h1 className="font-headline-sm text-headline-sm font-bold text-white tracking-tight cursor-pointer">BetterCOOP</h1>
        </div>

        {/* Narrative highlights */}
        <div className="relative z-10 space-y-8">
          <div className="max-w-md">
            <h2 className="font-display-kpi text-display-kpi text-white leading-tight font-extrabold text-3xl md:text-4xl">
              Empowering Rural Prosperity through Precision Fintech.
            </h2>
            <p className="font-body-md text-body-md text-primary-fixed opacity-90 mt-4 leading-relaxed">
              Designed for agricultural cooperatives to manage savings, loans, and ledger accounts with industrial-grade security and a fully grounded user experience.
            </p>
          </div>

          {/* Bento grid characteristics */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-primary-container p-4 rounded-xl border border-white/10 flex flex-col gap-2">
              <ShieldAlert className="w-6 h-6 text-secondary-container" />
              <p className="font-label-md text-label-md text-on-primary">Tier-1 Encryption</p>
            </div>
            <div className="bg-primary-container p-4 rounded-xl border border-white/10 flex flex-col gap-2">
              <KeyRound className="w-6 h-6 text-secondary-container" />
              <p className="font-label-md text-label-md text-on-primary">Real-time Analytics</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="font-label-xs text-label-xs text-primary-fixed/60">
            © 2026 BetterCOOP Agri-Fintech Solutions. All rights reserved.
          </p>
        </div>
      </aside>

      {/* Right Column: Interactive Login form */}
      <main className="w-full lg:w-7/12 bg-surface flex items-center justify-center p-gutter-mobile md:p-gutter-desktop relative">
        <div className="max-w-[420px] w-full space-y-8">
          {/* Header section info */}
          <div className="space-y-3">
            <div className="lg:hidden flex justify-start mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center cursor-pointer" onClick={() => navigate('/')}>
                <span className="text-xl">🚜</span>
              </div>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Welcome Back</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Please enter your administrative credentials to access the BetterCOOP workspace.
            </p>
          </div>

          {/* Login Form body */}
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            {errorMsg && (
              <div className="p-4 bg-danger/10 text-danger rounded-lg border border-danger/15 flex gap-3 text-sm">
                <span className="font-bold">⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Email field */}
            <div className="space-y-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant block ml-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@bettercoop.agri"
                  className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="password">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("Coordinate with BetterCOOP Security Support to reset password limits.")}
                  className="font-label-md text-label-md text-primary font-bold hover:underline transition-all cursor-pointer bg-transparent border-none outline-none"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-primary transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember coordinates */}
            <div className="flex items-center gap-2 px-1">
              <input
                id="remember"
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary h-touch-target cursor-pointer"
              />
              <label htmlFor="remember" className="font-body-sm text-body-sm text-on-surface-variant select-none cursor-pointer">
                Keep me logged in for 30 days
              </label>
            </div>

            {/* Submission button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-touch-target bg-primary hover:bg-emerald-dark text-white rounded-xl font-headline-sm font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Validating Credentials...</span>
                </>
              ) : (
                <>
                  <span>Login to Dashboard</span>
                  <span className="font-bold">→</span>
                </>
              )}
            </button>
          </form>

          {/* New Register Redirect Info */}
          <div className="text-center pt-2">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Are you a new cooperative manager?{' '}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Create an account
              </Link>
            </p>
          </div>

          {/* Support helper */}
          <div className="pt-8 border-t border-slate-border text-center">
            <p className="font-body-sm text-body-sm text-on-surface-variant/80">
              Having trouble logging in? <br className="md:hidden" />
              <button
                onClick={() => alert("Please email hq-systems@bettercoop.agri for direct credential restoration.")}
                className="text-primary font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                Contact System Administrator
              </button>{' '}
              or visit the{' '}
              <a href="#" className="text-primary font-bold hover:underline">
                Help Center
              </a>
              .
            </p>
          </div>
        </div>

        {/* Global Security active stamp */}
        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-border shadow-xs select-none pointer-events-none">
          <div className="w-2.5 h-2.5 bg-success rounded-full animate-pulse" />
          <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider font-extrabold text-[10px]">
            Secured Server Active
          </span>
        </div>
      </main>
    </div>
  );
};
