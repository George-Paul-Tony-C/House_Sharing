import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Auth/login';
import SignUp from './pages/Auth/SignUp';
import Dashboard from './pages/Dashboard/dashboard';
import * as jwt_decode from 'jwt-decode';

function App() {
  const [logged, setLogged] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);  
    }
  }, []);

  
  if (logged === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={logged ? <Dashboard /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
