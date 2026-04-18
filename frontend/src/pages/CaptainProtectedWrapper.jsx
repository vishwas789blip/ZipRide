import { useEffect } from 'react';
import { CaptainDataContext } from '../context/captainContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [captain, setCaptain] = React.useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = React.useContext(CaptainDataContext);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
        }
    }, [token, navigate]);
    
    axios.get(`${import.meta.env.VITE_API_URL}/captains/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        if (res.status === 200) {
            setCaptain(res.data.captain);
            setIsLoading(false);
        }
        
    })
    .catch(err => {
        console.error('Failed to fetch captain data:', err.response?.data?.message || err.message);
        localStorage.removeItem('token');
        setIsLoading(false);
    });


    if (!token) return null; 
    
    return <>{children}</>;
};

export default UserProtectedWrapper;