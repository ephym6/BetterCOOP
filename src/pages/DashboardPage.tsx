import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatCard } from '../components/shared/StatCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { membersService, transactionsService } from '../services/api';
import { Member, Transaction } from '../types';
import {
  TrendingUp,
  Award,
  Sprout,
  Users,
  DollarSign,
  Briefcase,
  ChevronRight,
  PlusCircle,
  Calendar
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalCapital, setTotalCapital] = useState(0);

  useEffect(() => {
    // Collect stats from unified local database
    Promise.all([membersService.getMembers(), transactionsService.getTransactions()]).then(
      ([mList, txList]) => {
        setMembers(mList);
        setTransactions(txList.slice(0, 5)); // Feed only the most recent 5 records for dashboard preview
        
        let totalShare = mList.reduce((sum, member) => sum + member.shareCapital, 0);
        setTotalCapital(totalShare);
      }
    );
  }, []);

  // Format currency helpers
  const formatKsh = (num: number) => {
    return `Ksh ${num.toLocaleString('en-US')}`;
  };

  return (
    <DashboardLayout pageTitle="Cooperative Workspace">
      {/* Date banner coordinate */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 text-left">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface-variant font-bold text-lg">System Overview</h3>
          <p className="text-on-surface-variant/60 font-body-sm text-xs">Real-time agricultural credit indicators, Member registries, and ledger monitoring.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 border border-slate-border rounded-lg shadow-xs text-sm font-label-md">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-on-surface-variant font-medium">As of {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Cards grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-left">
        {/* KPI 1: Outstanding Loans */}
        <StatCard
          title="Total Outstanding Loans"
          value="KSh 8.42M"
          trend={{
            value: '+14% mom',
            direction: 'up',
            subtext: 'Calculated across active harvesting credit loops.'
          }}
          icon={<DollarSign className="w-6 h-6 shrink-0" />}
          iconBgColor="bg-amber-100"
          iconTextColor="text-amber-700"
        />

        {/* KPI 2: Share Capital / Savings */}
        <StatCard
          title="Share Capital &amp; Savings"
          value={formatKsh(totalCapital)}
          trend={{
            value: '+4.5% mom',
            direction: 'up',
            subtext: 'Current baseline pooled cash assets in database.'
          }}
          icon={<Award className="w-6 h-6 shrink-0" />}
          iconBgColor="bg-emerald-100"
          iconTextColor="text-emerald-700"
        />

        {/* KPI 3: Registered Farmer count */}
        <StatCard
          title="Total Farmer Members"
          value={`${members.length}`}
          trend={{
            value: `+12.4%`,
            direction: 'up',
            subtext: 'Verified smallholder and commercial cooperative profiles.'
          }}
          icon={<Users className="w-6 h-6 shrink-0" />}
          iconBgColor="bg-blue-100"
          iconTextColor="text-blue-700"
        />

        {/* KPI 4: Crop Turnover summary */}
        <StatCard
          title="Turnover Volume Focus"
          value="42.5 Tons"
          trend={{
            value: 'Stable season',
            direction: 'stable',
            subtext: 'Combined bulk cassava, rice, and coffee delivery tags.'
          }}
          icon={<Sprout className="w-6 h-6 shrink-0" />}
          iconBgColor="bg-purple-100"
          iconTextColor="text-purple-700"
        />
      </section>

      {/* Main interactive grid: Left Financial chart vs Right Recent ledger logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 text-left">
        {/* Visual interactive graph mockup (using premium inline CSS SVG vector graphics to ensure 100% responsiveness and no external chart library breaking) */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md border border-slate-border lg:col-span-2 flex flex-col gap-6">
          <div className="flex justify-between items-center border-b border-slate-border pb-4">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-lg">Financial Performance Overview</h3>
              <p className="text-on-surface-variant font-body-sm text-xs mt-0.5">Comparative review of Union Capital Savings vs. Loan Disbursements (last 6 months).</p>
            </div>
            {/* Legend controls */}
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 font-label-xs text-xs">
                <span className="w-3 h-3 bg-primary rounded-xs" />
                <span className="text-on-surface-variant">Savings (KSh)</span>
              </div>
              <div className="flex items-center gap-1.5 font-label-xs text-xs">
                <span className="w-3 h-3 bg-amber-dark rounded-xs" />
                <span className="text-on-surface-variant">Loans (KSh)</span>
              </div>
            </div>
          </div>

          <div className="h-64 relative flex items-center justify-center">
            {/* Custom high-fidelity inline SVG financial area visualization graph */}
            <svg viewBox="0 0 500 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary, #047857)" stopOpacity="0.25"/>
                  <stop offset="95%" stopColor="var(--color-primary, #047857)" stopOpacity="0.0"/>
                </linearGradient>
                <linearGradient id="loansGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity="0.25"/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity="0.0"/>
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="30" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="0.8" />
              <line x1="30" y1="60" x2="480" y2="60" stroke="#f1f5f9" strokeWidth="0.8" />
              <line x1="30" y1="100" x2="480" y2="100" stroke="#f1f5f9" strokeWidth="0.8" />
              <line x1="30" y1="140" x2="480" y2="140" stroke="#f1f5f9" strokeWidth="0.8" />
              <line x1="30" y1="160" x2="480" y2="160" stroke="#e2e8f0" strokeWidth="1" />

              {/* Grid Labels Left Side */}
              <text x="5" y="25" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">5.0M</text>
              <text x="5" y="65" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">3.0M</text>
              <text x="5" y="105" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">1.5M</text>
              <text x="5" y="145" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">0.5M</text>

              {/* Area 1: Savings Growth */}
              <path
                d="M 30,140 Q 120,100 210,80 T 390,45 T 480,30 L 480,160 L 30,160 Z"
                fill="url(#savingsGrad)"
              />
              <path
                d="M 30,140 Q 120,100 210,80 T 390,45 T 480,30"
                fill="none"
                stroke="var(--color-primary, #047857)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Area 2: Loans Disbursements */}
              <path
                d="M 30,150 Q 120,110 210,120 T 390,95 T 480,70 L 480,160 L 30,160 Z"
                fill="url(#loansGrad)"
              />
              <path
                d="M 30,150 Q 120,110 210,120 T 390,95 T 480,70"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="4 2"
                strokeLinecap="round"
              />

              {/* Grid Labels Bottom X Axis */}
              <text x="40" y="175" fill="#64748b" fontSize="8" fontFamily="sans-serif" fontWeight="bold">Harvest Jan</text>
              <text x="130" y="175" fill="#64748b" fontSize="8" fontFamily="sans-serif" fontWeight="bold">Feb</text>
              <text x="210" y="175" fill="#64748b" fontSize="8" fontFamily="sans-serif" fontWeight="bold">Mar</text>
              <text x="300" y="175" fill="#64748b" fontSize="8" fontFamily="sans-serif" fontWeight="bold">Apr</text>
              <text x="380" y="175" fill="#64748b" fontSize="8" fontFamily="sans-serif" fontWeight="bold">May</text>
              <text x="450" y="175" fill="#64748b" fontSize="8" fontFamily="sans-serif" fontWeight="bold">Jun</text>
            </svg>
          </div>

          {/* Quick Stats banner inside chart card */}
          <div className="grid grid-cols-2 gap-4 bg-surface-container p-4 rounded-xl border border-slate-border">
            <div>
              <p className="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider mb-1">Peak Contributor Month</p>
              <h5 className="font-headline-sm text-primary text-base font-bold">June (KSh 450,200 Deposit)</h5>
            </div>
            <div>
              <p className="text-on-surface-variant text-[11px] font-bold uppercase tracking-wider mb-1">Total Loan Approvals</p>
              <h5 className="font-headline-sm text-primary text-base font-bold">KSh 1.25M This Quarter</h5>
            </div>
          </div>
        </div>

        {/* Right Section: Recent Cooperative Transactions lists */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md border border-slate-border flex flex-col gap-6 justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-slate-border pb-4 mb-4">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-lg">Transaction Feed</h3>
              <button
                onClick={() => navigate('/members')}
                className="font-label-md text-label-md text-primary font-bold hover:underline inline-flex items-center gap-1 cursor-pointer bg-transparent border-none"
              >
                <span>View Ledgers</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated interactive list row loop */}
            <div className="space-y-4">
              {transactions.length === 0 ? (
                <p className="text-on-surface-variant/60 italic text-sm py-4">No recent financial logs.</p>
              ) : (
                transactions.map((tx) => (
                  <div key={tx._id} className="flex justify-between items-center gap-4 bg-slate-surface/45 hover:bg-slate-surface p-3 rounded-lg border border-slate-border/50 transition-colors duration-150">
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-xs select-none">
                        🚜
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-label-md text-label-md font-bold text-on-surface truncate max-w-[110px] sm:max-w-none">{tx.memberName}</p>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-extrabold leading-tight mt-0.5">{tx.type}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {tx.amount ? (
                        <p className={`font-label-md font-bold text-sm ${tx.amount > 0 ? 'text-success' : 'text-danger'}`}>
                          {tx.amount > 0 ? '+' : ''}{formatKsh(tx.amount)}
                        </p>
                      ) : tx.weightKg ? (
                        <p className="font-label-md font-bold text-sm text-primary">
                          {tx.weightKg} Kg
                        </p>
                      ) : null}
                      <p className="text-[10px] text-on-surface-variant/60 font-medium leading-none mt-0.5">{tx.date}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            onClick={() => {
              // Redirect to onboarding a member to test action coordination
              navigate('/members');
            }}
            className="w-full py-3 border border-dashed border-primary hover:bg-primary-fixed/30 text-primary rounded-lg font-bold text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <PlusCircle className="w-5 h-5 text-primary" />
            <span>Manage Member Ledgers</span>
          </button>
        </div>
      </div>

      {/* Bottom informational guidelines block */}
      <section className="bg-white p-6 rounded-xl border border-slate-border text-left shadow-xs">
        <h4 className="font-headline-sm text-primary font-bold text-base mb-2">Regional Hub Information Center</h4>
        <p className="text-on-surface-variant font-body-sm text-sm leading-relaxed">
          Welcome, Lead Administrator. As part of <strong>Increment 1 (Core System)</strong>, you can use the left navigation 
          sidebar to register and edit member details, monitor administrative credentials, or tune global interest guidelines. 
          The offline security system automatically persists changes inside local storage tables, allowing you to test entire onboarding flows before your development team binds actual MongoDB server APIs.
        </p>
      </section>
    </DashboardLayout>
  );
};
