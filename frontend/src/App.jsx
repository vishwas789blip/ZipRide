import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Start from './pages/Start';
import Home from './pages/Home'; 
import Riding from './pages/Riding';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import UserLogout from './pages/UserLogout';
import UserProtectedWrapper from './pages/UserProtectedWrapper'; 
import CaptainHome from './pages/CaptainHome';
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/captain/home' element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        } />
        
        
        {/* Protected User Routes */}
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />

        <Route path="/riding" element={
          <UserProtectedWrapper>
            <Riding />
          </UserProtectedWrapper>
        } />

        <Route path='/user/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />

      </Routes>
    </div>
  );
};

export default App;