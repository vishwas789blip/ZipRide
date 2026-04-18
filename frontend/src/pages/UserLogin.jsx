import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';
import axios from 'axios';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) return setError('All fields are required.');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        { email, password }
      );
      if (response.status === 200) {
        setUser(response.data);
        localStorage.setItem('user', response.data.token);
        setEmail('');
        setPassword('');
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between bg-white max-w-md mx-auto'>
      <div>

        {/* Brand Header */}
        <div className='flex items-center gap-2 mb-8'>
          <div className='w-9 h-9 bg-[#111] rounded-lg flex items-center justify-center'>
            <span className='text-[#d5622d] font-bold text-sm'>Z</span>
          </div>
          <h1 className='text-xl font-medium'>
            Zip<span className='text-[#d5622d]'>Ride</span>
          </h1>
        </div>

        <h2 className='text-2xl font-medium mb-1'>Welcome back</h2>
        <p className='text-sm text-gray-500 mb-6'>Sign in to your account</p>

        {/* Error Banner */}
        {error && (
          <div className='bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1.5'>Email</label>
            <input
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className='bg-gray-100 rounded-lg px-4 py-2.5 border border-gray-200 w-full text-base placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors'
              type='email'
              placeholder='email@example.com'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1.5'>Password</label>
            <input
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className='bg-gray-100 rounded-lg px-4 py-2.5 border border-gray-200 w-full text-base placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors'
              type='password'
              placeholder='••••••••'
            />
          </div>

          <button
            type='submit'
            className='bg-[#111] text-white font-medium rounded-lg px-4 py-3 w-full text-base mt-1 hover:bg-[#333] transition-colors'
          >
            Login
          </button>

        </form>

        <p className='text-center text-sm text-gray-500 mt-5'>
          New here?{' '}
          <Link to='/signup' className='text-[#d5622d] font-medium hover:underline'>
            Create an account
          </Link>
        </p>
      </div>

      <div className='border-t border-gray-100 pt-5'>
        <Link
          to='/captain-login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-medium rounded-lg px-4 py-3 w-full text-base hover:bg-[#c0541f] transition-colors'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}