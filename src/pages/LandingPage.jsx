import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">BetterCOOP</h1>
        <p className="text-gray-600 mb-8">
          Welcome to the Cooperative Management System demo. This is a simplified version of our application to demonstrate core flows.
        </p>
        <Link
          to="/login"
          className="inline-block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Proceed to Login
        </Link>
      </div>
    </div>
  );
};
