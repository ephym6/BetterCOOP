import React from 'react';
import { DashboardCard } from '../components/DashboardCard';
import { PiggyBank, CreditCard, User } from 'lucide-react';

export const MemberDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Member Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's a summary of your account.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <DashboardCard 
            title="My Savings" 
            value="$4,500.00" 
            icon={<PiggyBank className="w-6 h-6" />} 
          />
          <DashboardCard 
            title="My Active Loans" 
            value="$1,200.00" 
            icon={<CreditCard className="w-6 h-6" />} 
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-4">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">My Profile Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Personal Information</span>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Edit</button>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Notification Preferences</span>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Update</button>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Security & Password</span>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Change</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
