import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';


export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { User , setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!email || !password) return setError('All fields are required');

    // Filhaal ke liye hum bina backend ke data console kar rahe hain
    console.log("Logging in with:", { email, password });

    // Yahan hum context update kar sakte hain login success par
    setUser({ email, fullName: { firstName: 'Vansh', lastName: '' } });

    // Reset fields and navigate
    setEmail('');
    setPassword('');
    navigate('/'); // Ya phir '/home'
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between max-w-md mx-auto">
      <div>
        <Link to="/" className="text-3xl font-bold italic tracking-tighter mb-10 block">ZipRide</Link>

        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-6">Welcome back</h1>
          
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
          <input
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password'
          />

          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg active:scale-95 transition-all'>
            Login
          </button>
        </form>

        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600 font-medium'>Create new Account</Link></p>
      </div>

      <div className='pb-5'>
        <Link
          to='/captain/login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold rounded px-4 py-2 w-full text-lg'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}