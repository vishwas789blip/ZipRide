import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/userContext';

const UserSignUp = () => {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [error, setError]         = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !email || !password)
      return setError('All fields are required.');
    if (firstName.length < 3)
      return setError('First name must be at least 3 characters.');
    if (password.length < 6)
      return setError('Password must be at least 6 characters.');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        { fullName: { firstName, lastName }, email, password }
      );
      if (response.status === 201) {
        setUser(response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const inputCls =
    'bg-gray-100 rounded-lg px-4 py-2.5 border border-gray-200 w-full text-base placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors';

  return (
    <div className='min-h-screen bg-white flex flex-col max-w-sm mx-auto px-7 py-6'>

      {/* Brand Header */}
      <div className='flex items-center gap-2 mb-6'>
        <div className='w-9 h-9 bg-[#111] rounded-lg flex items-center justify-center'>
          <span className='text-[#d5622d] font-bold text-sm'>Z</span>
        </div>
        <h1 className='text-xl font-medium'>
          Zip<span className='text-[#d5622d]'>Ride</span>
        </h1>
      </div>

      <h2 className='text-2xl font-medium mb-1'>Create account</h2>
      <p className='text-sm text-gray-500 mb-6'>Sign up to start riding with ZipRide</p>

      {/* Error Banner */}
      {error && (
        <div className='bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5'>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 pb-6'>

        {/* Name Row */}
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1.5'>First name</label>
            <input
              type='text'
              placeholder='John'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1.5'>Last name</label>
            <input
              type='text'
              placeholder='Doe'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className='block text-sm font-medium text-gray-600 mb-1.5'>Email</label>
          <input
            type='email'
            placeholder='email@example.com'
            autoComplete='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Password */}
        <div>
          <label className='block text-sm font-medium text-gray-600 mb-1.5'>Password</label>
          <input
            type='password'
            placeholder='Min. 6 characters'
            autoComplete='new-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputCls}
          />
        </div>

        <button
          type='submit'
          className='bg-[#111] text-white font-medium rounded-lg px-4 py-3 w-full text-base mt-1 hover:bg-[#333] transition-colors'
        >
          Create account
        </button>

      </form>

      <p className='text-center text-sm text-gray-500'>
        Already have an account?{' '}
        <Link to='/login' className='text-[#d5622d] font-medium hover:underline'>
          Log in
        </Link>
      </p>

      <div className='border-t border-gray-100 pt-5 mt-5'>
        <Link
          to='/captain/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-medium rounded-lg px-4 py-3 w-full text-base hover:bg-[#c0541f] transition-colors'
        >
          Sign in as Captain
        </Link>
      </div>

    </div>
  );
};

export default UserSignUp;