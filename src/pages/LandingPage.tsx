import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Play, CheckCircle2, Shield, Globe, Heart, Mail } from 'lucide-react';
import { Modal } from '../components/ui/Modal';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden min-h-screen flex flex-col justify-between">
      {/* Header bar */}
      <header className="h-touch-target w-full sticky top-0 z-50 border-b border-slate-border bg-surface flex justify-between items-center px-gutter-desktop shadow-xs">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <span className="p-1.5 rounded-lg bg-primary text-white flex items-center justify-center font-bold">🚜</span>
          <span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">BetterCOOP</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-on-surface-variant hover:text-primary font-label-md transition-colors">Features</a>
          <a href="#about" className="text-on-surface-variant hover:text-primary font-label-md transition-colors">Solutions</a>
          <a href="#stats" className="text-on-surface-variant hover:text-primary font-label-md transition-colors">Impacts</a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="font-label-md px-5 h-10 text-primary hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="font-label-md px-5 h-10 bg-primary hover:bg-emerald-dark text-white rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            Register Profile
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Banner Grid Section */}
        <section className="relative min-h-[75vh] flex items-center py-12 md:py-20 bg-slate-surface/30">
          <div className="absolute inset-0 hero-pattern pointer-events-none opacity-5 scroll-py-8" />
          <div className="max-w-max-width mx-auto px-gutter-desktop grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
            
            {/* Left text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start gap-6 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full font-label-md border border-primary/10">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="font-bold">Leading Agri-Fintech for East Africa</span>
              </div>
              
              <h1 className="font-display-kpi text-display-kpi text-4xl md:text-5xl lg:text-[54px] lg:leading-[1.1] text-primary tracking-tight font-extrabold max-w-xl">
                Digitalizing Kenyan Agricultural Cooperatives for Financial Inclusivity
              </h1>
              
              <p className="text-on-surface-variant font-body-md text-base md:text-lg max-w-lg leading-relaxed">
                Empower your SACCO or cooperative with modern financial tools, real-time ledger management, and seamless member engagement. Built specifically for the unique needs of agricultural societies.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto">
                <button
                  onClick={() => navigate('/register')}
                  className="h-touch-target px-8 bg-secondary-container text-on-secondary-container hover:bg-amber-dark hover:text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="h-touch-target px-8 border border-primary text-primary hover:bg-primary-fixed/20 font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <Play className="w-5 h-5 text-primary" />
                  <span>Watch Demo Video</span>
                </button>
              </div>

              {/* Verified Trust stats */}
              <div className="flex items-center gap-4 pt-6">
                <div className="flex -space-x-3">
                  <img
                    alt="Trustee Farmer 1"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKnLyza3WkUC1-tmN7VohPVjnXBU2O1MnGLOEWq14C4ynklbBJYassYPXxyyPTK6v6MoXMpWUJpvHORPzArxHYzP6wew9DXCQboviLnx7AjrGq0eozDftLNRVHzZpKFBo8414jjj-Iqw_gOj55aCWiHqG2bjQK4-Yp_6D6t557m3P0FeIvA_QEfxAuNtSkM-fdjOoiBvFOSICxbzgESj2CA812YF7FxinwwwsKcG7KmnNPQ4Zjkd4EaxKPzgJCmzblLYLQZJdRFg8"
                  />
                  <img
                    alt="Trustee Farmer 2"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDOu8LkTRGZruwlgLBm1zFbMzppCxm8YWhaE0gXjr7GoGdPGr6wgvp2dynSoS2QY-A9V1JjyseeQ0sWLUuaLauvzos4HKTSOXEyG55cVst9nxvRg1_tskWOivX1ucw6df3doxoOxj8n0Zca802-Fo0n6qauP2K0l0Soj38O1SQrN_BERKfYDdeZHZy7pn6uk0z-HqVZROgIhqejlz55xr9Qbm-3q1-NUuPWTtgGc5vERO8h3RZ23dzzpKQGYEYx4ZCNT9h49vZbJ4"
                  />
                  <img
                    alt="Trustee Leader 3"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwippMDq5kzLUjqo33v4t2fHYVU23Qzrs101T2ZKKkB3PiJObjS_IglGYY3JxCDvt5-MOFvuU_VGKFQmlISjwG0hzSjplms5sIHl7fQIcUyXOd5G-4W8511RDdtny-oU90AQasLGJCv2ozJ2KoJYdPaaLxfSBSl-T0wRL3R0M1Sg3rP7ptreMkIidDpgo8aFbvxBJrsse95iWbMvCsc3G66cZnCHhpkZ1UDlQgXjo62uflU1pmMU0aJKkLvD3TmHmc7p1muiLGQR0"
                  />
                </div>
                <p className="font-label-md text-on-surface-variant font-medium text-sm">
                  Trusted by <span className="text-primary font-bold">500+</span> Cooperatives across East Africa
                </p>
              </div>
            </motion.div>

            {/* Right isometric mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="bg-white rounded-xl shadow-2xl p-4 transform lg:-rotate-3 lg:translate-x-4 hover:rotate-0 transition-transform duration-500 ease-out border border-slate-border max-w-lg w-full">
                <div className="rounded-lg overflow-hidden border border-slate-border shadow-inner">
                  <img
                    alt="Isometric financial dashboard description"
                    className="w-full h-auto object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoRXda4gVb0pt62OJq9HG6mwCq4gHLpvu0DVV-q-ys-0gW6nIICdC3kDfkg8yx7u0Rnx9BCDWL_mVrrT2fm0B6c5H-OKljbXxnt2NX4u_V8GVD1VraWlOZDhijU1cEhiAAdWIGX6jxzmb66t98NweF9oYqihAzMFNLroxNqNR78DsZ0ah7QOnpJ2KDmktajluvfUd9hJsGylTXhOF4DK_Vdj73FpEEafAvrcoGLmQkfugHQt5SJfKPU5CLslW0INEiya1BsqzV4fg"
                  />
                </div>

                {/* Floating Metric 1 */}
                <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-slate-border flex items-center gap-3 animate-bounce-slow">
                  <div className="w-10 h-10 rounded-full bg-success/20 text-success flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                  <div className="text-left">
                    <p className="font-label-xs text-on-surface-variant text-[10px] leading-tight font-medium">Total Savings</p>
                    <p className="font-headline-sm text-primary text-sm leading-none mt-0.5">KSh 4.2M</p>
                  </div>
                </div>

                {/* Floating Metric 2 */}
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-slate-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center">
                    <Heart className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="text-left">
                    <p className="font-label-xs text-on-surface-variant text-[10px] leading-tight font-medium">Active Members</p>
                    <p className="font-headline-sm text-primary text-sm leading-none mt-0.5">1,248 Farmers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature section */}
        <section id="features" className="py-20 bg-slate-surface">
          <div className="max-width mx-auto px-gutter-desktop">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-headline-lg text-display-kpi text-primary mb-2">Powerful Tools for Growth</h2>
              <p className="font-body-md text-on-surface-variant">
                Everything you need to manage your agricultural cooperative with precision, immutable transparency, and the speed of modern mobile banking.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature Box 1 */}
              <div className="bg-white p-8 rounded-xl shadow-xs border border-slate-border hover:shadow-md transition-all group hover:-translate-y-1 duration-300 text-left">
                <div className="w-14 h-14 bg-primary-fixed rounded-xl flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-2xl">🏦</span>
                </div>
                <h3 className="font-headline-sm text-primary mb-3">Savings &amp; Loans</h3>
                <p className="text-on-surface-variant font-body-sm leading-relaxed">
                  Automated tracking of member weekly contributions, flexible harvesting loans, dynamic interest calculations, and prompt, single-click board approvals.
                </p>
              </div>

              {/* Feature Box 2 */}
              <div className="bg-white p-8 rounded-xl shadow-xs border border-slate-border hover:shadow-md transition-all group hover:-translate-y-1 duration-300 text-left">
                <div className="w-14 h-14 bg-secondary-fixed rounded-xl flex items-center justify-center text-on-secondary-fixed-variant mb-6 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-2xl">📖</span>
                </div>
                <h3 className="font-headline-sm text-primary mb-3">Digital Ledger</h3>
                <p className="text-on-surface-variant font-body-sm leading-relaxed">
                  Replace slow, error-prone manual books with an immutable digital record. Streamlines audits, reduces double-entry fraud, and produces clean compliance maps.
                </p>
              </div>

              {/* Feature Box 3 */}
              <div className="bg-white p-8 rounded-xl shadow-xs border border-slate-border hover:shadow-md transition-all group hover:-translate-y-1 duration-300 text-left">
                <div className="w-14 h-14 bg-tertiary-fixed rounded-xl flex items-center justify-center text-on-tertiary-fixed-variant mb-6 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="font-headline-sm text-primary mb-3">Member SMS</h3>
                <p className="text-on-surface-variant font-body-sm leading-relaxed">
                  Broadcast instant SMS updates regarding payment schedules, weather alarms, dairy arrivals, or union meetings even in remote settings with poor internet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Banner Action Banner */}
        <section className="py-16 relative bg-primary-container overflow-hidden flex items-center justify-center text-center">
          <div className="absolute inset-0 bg-emerald-dark opacity-10 pointer-events-none" />
          <div className="relative z-10 px-gutter-desktop max-w-xl">
            <h3 className="font-display-kpi text-on-primary-container text-white mb-2 text-2xl md:text-3xl font-extrabold">
              Ready to transform your coop?
            </h3>
            <p className="text-white/80 font-body-md text-sm md:text-base mb-6 leading-relaxed">
              Join hundreds of progressive agricultural unions across East Africa that choose BetterCOOP to digitize their operations.
            </p>
            <button
              onClick={() => navigate('/register')}
              className="bg-secondary-container hover:bg-amber-dark text-on-secondary-container hover:text-white px-8 py-3.5 rounded-lg font-headline-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Get Your Free Trial
            </button>
          </div>
        </section>
      </main>

      {/* Footer bar */}
      <footer className="bg-emerald-dark text-on-primary py-16 text-left border-t border-primary-container">
        <div className="max-width mx-auto px-gutter-desktop">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-1 px-1.5 bg-secondary-container rounded font-bold text-base">🚜</span>
                <span className="font-headline-sm text-headline-sm font-bold text-white">BetterCOOP</span>
              </div>
              <p className="text-on-primary/70 font-body-sm leading-relaxed max-w-xs">
                Leading the digital transformation of agricultural financial services across Kenya and entire East Africa.
              </p>
            </div>

            <div>
              <h4 className="font-headline-sm text-white text-sm font-bold mb-4">Product</h4>
              <ul className="space-y-3 text-on-primary/70 font-body-sm">
                <li><a className="hover:text-secondary-container transition-colors" href="#">Savings Module</a></li>
                <li><a className="hover:text-secondary-container transition-colors" href="#">Credit Engines</a></li>
                <li><a className="hover:text-secondary-container transition-colors" href="#">Bulk SMS broadcast</a></li>
                <li><a className="hover:text-secondary-container transition-colors" href="#">Pricing Plans</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-headline-sm text-white text-sm font-bold mb-4">Company</h4>
              <ul className="space-y-3 text-on-primary/70 font-body-sm">
                <li><a className="hover:text-secondary-container transition-colors" href="#">About Our Mission</a></li>
                <li><a className="hover:text-secondary-container transition-colors" href="#">Agronomist Careers</a></li>
                <li><a className="hover:text-secondary-container transition-colors" href="#">Case Studies</a></li>
                <li><a className="hover:text-secondary-container transition-colors" href="#">Contact Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-headline-sm text-white text-sm font-bold mb-4">Connect</h4>
              <div className="flex gap-4 mb-6">
                <a className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center hover:bg-secondary-container transition-colors text-white" href="#">
                  <Globe className="w-5 h-5" />
                </a>
                <a className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center hover:bg-secondary-container transition-colors text-white" href="#">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <p className="text-on-primary/70 font-label-xs leading-normal">
                Nairobi headquarters, Kenya<br />
                Koinange Street, ABC Plaza
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-primary-container flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-on-primary/50 text-label-xs">
              © 2026 BetterCOOP Agri-Fintech. All rights reserved.
            </p>
            <div className="flex gap-6 text-on-primary/50 text-label-xs">
              <a href="#" className="hover:text-white transition-colors">Privacy Agreement</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Operations</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Demo Modal popup */}
      <Modal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} title="BetterCOOP Demo Tour">
        <div className="flex flex-col gap-6 text-center">
          <div className="aspect-video bg-inverse-surface rounded-lg relative overflow-hidden flex items-center justify-center border border-slate-border">
            {/* Ambient image or tea leaf background representing demo banner */}
            <img 
              alt="agri tech phone demo" 
              className="absolute inset-0 w-full h-full object-cover opacity-60" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIRSeaVpUzT8DZIdCV9R2GdsNpFYyYvUgMBnVEPThljmR6msX4QQcAwSr10eXWVCpnOUssWyMSg8CQZVgtDpkBh0y3VKnEVS3uev7zMUKzAE2xHzkIwiC8kaXzHEmuEP1xXA2opbOM4sSUwR5G3wyzZmhDE4nG2GaAcPuRbcVNjAAUCbYoore1Lga4KERTBOipM0hKyH7KBke0lNzbNiE-rNWQn3vcafzSBzr1s25jJvVzOrfk7nBy0YdUTz6v4g0jCiKAttqeqVM"
            />
            <div className="absolute inset-0 bg-emerald-dark/45" />
            <div className="relative z-10 w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center shadow-lg animate-pulse">
              <Play className="w-8 h-8 ml-1" />
            </div>
          </div>
          <div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface">Digitalizing Agriculture</h4>
            <p className="text-on-surface-variant text-body-sm mt-1">
              Watch how our automated workflows support and streamline member registrations, savings contributions, 
              and fertilizer subsidy dispatches directly on our secured full-stack workspace.
            </p>
          </div>
          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="w-full h-touch-target bg-primary text-white font-bold rounded-lg hover:bg-emerald-dark transition-all"
          >
            Close Viewer
          </button>
        </div>
      </Modal>
    </div>
  );
};
