import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export default AuthContext;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('campusUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedUsers = localStorage.getItem('campusUsers');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    setLoading(false);
  }, []);
  const saveUsersToStorage = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem('campusUsers', JSON.stringify(updatedUsers));
  };

  const login = (email,password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setUser(user);
      localStorage.setItem('campusUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campusUser');
  };

  const register = (userData) => {
    const updatedUsers = [...users, userData];
    saveUsersToStorage(updatedUsers);
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('campusUser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    register,
    updateUser,
    loading,
    users
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
