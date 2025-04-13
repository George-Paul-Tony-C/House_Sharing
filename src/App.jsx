import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './pages/Auth/login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import HouseList from './pages/House/HouseList';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className='w-full'>
      <ToastContainer/>
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<Home />} />
        
        {/* Login page route */}
        <Route path="/login" element={<Login />} />
        
        {/* Sign up page route */}
        <Route path="/signup" element={<SignUp />} />

        {/* Houses page route */}
        <Route path='/houses' element={<HouseList />} />
      </Routes>
    </div>
  );
}

export default App;
