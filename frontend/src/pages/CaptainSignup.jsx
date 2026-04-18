import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/captainContext.jsx';

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const [error, setError] = useState('');

  const { setCaptain } = useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !email || !password || !vehicleColor || !vehiclePlate || !vehicleCapacity) {
      return setError('All fields are required.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/captains/register`,
        {
          fullName: { firstName, lastName },
          email,
          password,
          vehicle: {
            color: vehicleColor,
            plate: vehiclePlate,
            capacity: Number(vehicleCapacity),
            vehicleType,
          },
        }
      );

      if (response.status === 201) {
        setCaptain(response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/captain/home');
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
          ZipRide <span className='text-[#d5622d]'>Captain</span>
        </h1>
      </div>

      <h2 className='text-2xl font-medium mb-1'>Create your account</h2>
      <p className='text-sm text-gray-500 mb-6'>Start earning by driving with ZipRide</p>

      {/* Error Banner */}
      {error && (
        <div className='bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5'>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 pb-6'>

        {/* Name */}
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
            placeholder='captain@example.com'
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Vehicle Details */}
        <div className='border-t border-gray-100 pt-4'>
          <p className='text-xs font-medium text-gray-400 uppercase tracking-wide mb-3'>
            Vehicle details
          </p>

          <div className='grid grid-cols-2 gap-3 mb-3'>
            <div>
              <label className='block text-sm font-medium text-gray-600 mb-1.5'>Color</label>
              <input
                type='text'
                placeholder='e.g. White'
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-600 mb-1.5'>Plate no.</label>
              <input
                type='text'
                placeholder='e.g. DL01AB1234'
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label className='block text-sm font-medium text-gray-600 mb-1.5'>Capacity</label>
              <input
                type='number'
                placeholder='e.g. 4'
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-600 mb-1.5'>Type</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className={inputCls}
              >
                <option value='car'>Car</option>
                <option value='bike'>Bike</option>
                <option value='auto'>Auto</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type='submit'
          className='bg-[#111] text-white font-medium rounded-lg px-4 py-3 w-full text-base mt-1 hover:bg-[#333] transition-colors'
        >
          Register as captain
        </button>

      </form>

      <p className='text-center text-sm text-gray-500 pb-4'>
        Already a captain?{' '}
        <Link to='/captain-login' className='text-[#d5622d] font-medium hover:underline'>
          Log in
        </Link>
      </p>

      <div className='border-t border-gray-100 pt-5'>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-medium rounded-lg px-4 py-3 w-full text-base hover:bg-[#c0541f] transition-colors'
        >
          Sign in as User
        </Link>
      </div>

    </div>
  );
};

export default CaptainSignup;