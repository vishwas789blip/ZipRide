import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error('Server-side logout failed:', error);
      } finally {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    performLogout();
  }, [navigate, token]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
    </div>
  );
};

export default UserLogout;