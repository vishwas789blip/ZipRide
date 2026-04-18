import axios from 'axios';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';

const UserProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('user'); 
    const navigate = useNavigate();
    const { setUser } = useContext(UserDataContext); 

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            if (res.status === 200) {
                setUser(res.data.user); 
            }
        })
        .catch(err => {
            console.error('Failed to fetch user data:', err.message);
            localStorage.removeItem('user'); 
            navigate('/login');
        });

    }, [token, navigate]); 

    if (!token) return null;

    return <>{children}</>;
};

export default UserProtectedWrapper;