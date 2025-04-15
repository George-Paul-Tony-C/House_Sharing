import React, { useContext, useEffect } from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Login from './pages/Auth/login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import { ToastContainer } from 'react-toastify';
import UserPage from './pages/User/UserPage';
import UserBookings from './pages/Booking/UserBookings';
import UserHouses from './pages/House/UserHouses';
import UserHousePage from './pages/House/UserHousePage';
import AllHousePage from './pages/House/AllHousePage';
import UserRoom from './pages/Room/User_Room';
import RoomPage from './pages/Room/RoomPage';
import { AuthContext } from './context/AuthContext';

function App() {
  const navigate = useNavigate();

  const {logged} = useContext(AuthContext);

  useEffect(() => {
    if(logged){
      navigate('/');
    } else {
      navigate('/login')
    }
  },[logged])

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
        <Route path='/houses' element={<UserHouses />} />

        <Route path="/houses/:houseId" element={<UserHousePage />} />

        <Route path="/house/:houseId" element={<AllHousePage/>} />

        <Route path='/profile' element={<UserPage/>} />

        <Route path='/rooms/:roomId' element={<RoomPage />} />
      
        <Route path='/room/:roomId' element={<UserRoom />} />

        <Route path='/bookings' element={<UserBookings/>} />
      
      </Routes>
    </div>
  );
}

export default App;
