import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userId');
    if (user) {
      setLogged(true); 
    } else {
      setLogged(false);
    }
  }, []);  

  const login = (name) => {
    localStorage.setItem('userId', name);
    setLogged(true); 
  };

  const logout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
    setLogged(false);  
  };

  return (
    <AuthContext.Provider value={{ logged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
