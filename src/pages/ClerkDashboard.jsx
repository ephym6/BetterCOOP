import React from 'react';
import { DashboardCard } from '../components/DashboardCard';
import { Users, DollarSign, Activity } from 'lucide-react';

export const ClerkDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clerk Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, system administrator.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard 
            title="Total Members" 
            value="1,248" 
            icon={<Users className="w-6 h-6" />} 
          />
          <DashboardCard 
            title="Total Savings" 
            value="$450,000" 
            icon={<DollarSign className="w-6 h-6" />} 
          />
          <DashboardCard 
            title="Active Loans" 
            value="342" 
            icon={<Activity className="w-6 h-6" />} 
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
              <span className="block font-medium text-gray-800 mb-1">Add Member</span>
              <span className="block text-sm text-gray-500">Register a new cooperative member</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
              <span className="block font-medium text-gray-800 mb-1">Record Deposit</span>
              <span className="block text-sm text-gray-500">Log a new savings deposit</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
              <span className="block font-medium text-gray-800 mb-1">Process Loan</span>
              <span className="block text-sm text-gray-500">Approve or reject applications</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
              <span className="block font-medium text-gray-800 mb-1">Generate Report</span>
              <span className="block text-sm text-gray-500">View financial summaries</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
