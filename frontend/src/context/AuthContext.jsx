import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On app load, check localStorage for a token
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setUser(null);
        } else {
          // Token is valid, set the user
          // This relies on your backend token having id, email, and role
          setUser({
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
          });
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false); // Done loading auth state
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    const decoded = jwtDecode(data.token);
    setUser({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('token', data.token);
    const decoded = jwtDecode(data.token);
    setUser({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  };


  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth (as in your file structure)
export const useAuth = () => {
  return useContext(AuthContext);
};