import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const success = login(username, password);
    
    if (success) {
      // The state won't update synchronously for this render cycle, but we can rely on 
      // the local storage or just navigate directly since we know the credentials were correct.
      // We need to fetch the newly logged-in user from the db or just let the redirect handle it.
      // Wait, we can't easily access the new role synchronously without it being returned.
      // Let's adjust `login` to return the user object instead of true/false.
      // Actually, since I'm rewriting this, let's just do a quick parse or wait for context.
      // I'll update AuthContext.jsx to return the user from `login`.
    } else {
      setError('Invalid username or password');
    }
  };

  // If user becomes logged in, redirect them.
  React.useEffect(() => {
    if (user) {
      navigate(`/${user.role}-dashboard`);
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign In</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter username"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">Register here</Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-500">
          <p className="font-semibold mb-2">Demo Credentials:</p>
          <ul className="space-y-1">
            <li>Clerk: clerk / password123</li>
            <li>Member: member / password123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
