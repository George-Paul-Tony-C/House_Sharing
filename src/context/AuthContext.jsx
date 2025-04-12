import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

// Create a Context for Auth
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(null);
  const navigate = useNavigate();

  // Check if the token exists and validate it on app mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token);
    } else {
      setLogged(false);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.VALIDATE_TOKEN, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.isValid) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    } catch (error) {
      console.log(error);
      setLogged(false);
    }
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    setLogged(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setLogged(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ logged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
