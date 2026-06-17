import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext(null);

const DEFAULT_USERS = [
  { username: 'clerk', password: 'password123', role: 'clerk' },
  { username: 'member', password: 'password123', role: 'member' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('demo_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('demo_users_db');
    return savedUsers ? JSON.parse(savedUsers) : DEFAULT_USERS;
  });

  useEffect(() => {
    localStorage.setItem('demo_users_db', JSON.stringify(users));
  }, [users]);

  const login = (username, password) => {
    const existingUser = users.find(u => u.username === username && u.password === password);
    if (existingUser) {
      const { password, ...userWithoutPassword } = existingUser;
      setUser(userWithoutPassword);
      localStorage.setItem('demo_user', JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    }
    return null;
  };

  const register = (username, password, role) => {
    if (users.find(u => u.username === username)) {
      return { success: false, error: 'Username already exists' };
    }
    const newUser = { username, password, role };
    setUsers([...users, newUser]);
    
    // Auto-login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('demo_user', JSON.stringify(userWithoutPassword));
    return { success: true, role };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('demo_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
