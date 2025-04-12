import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Auth/login';
import SignUp from './pages/Auth/SignUp';
import Dashboard from './pages/Dashboard/dashboard';

function App() {
  const [logged, setLogged] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
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
        <Route path="/" element={logged ? <Dashboard logged={logged}/> : <Login logged={logged} setLogged={setLogged} />} />
        <Route path="/login" element={<Login logged={logged} setLogged={setLogged} />} />
        <Route path="/signup" element={<SignUp logged={logged} setLogged={setLogged} />} />
      </Routes>
    </Router>
  );
}

export default App;
