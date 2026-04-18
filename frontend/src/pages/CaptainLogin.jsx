import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/captainContext.jsx';

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    const captain = {
      email: email,
      password: password
    }

    axios.post(`${import.meta.env.VITE_API_URL}/captains/login`, captain)
      .then(res => {
        if (res.status === 200) {
          setCaptain(data.captain)  
          localStorage.setItem('token', res.data.token)
          navigate('/captain/home')
        }
      })
      .catch(err => {
        console.error('Login failed:', err.response?.data?.message || err.message)
        alert('Login failed. Please check your credentials and try again.')
      })

    setEmail('')
    setPassword('')
    setCaptain(captain)
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between bg-white'>
      <div>
        {/* Brand Header */}
        <div className='flex items-center gap-2 mb-8'>
          <div className='w-9 h-9 bg-[#111] rounded-lg flex items-center justify-center'>
            <span className='text-[#d5622d] font-bold text-sm'>Z</span>
          </div>
          <h1 className='text-xl font-medium'>
            ZipRide <span className='text-[#d5622d]'>Captain</span>
          </h1>
        </div>

        <p className='text-sm text-gray-500 mb-6'>Sign in to your captain dashboard</p>

        <form onSubmit={submitHandler} className='flex flex-col gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1.5'>
              Captain email
            </label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-gray-100 rounded-lg px-4 py-2.5 border border-gray-200 w-full text-base placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors'
              type='email'
              placeholder='captain@example.com'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1.5'>
              Password
            </label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          New captain?{' '}
          <Link to='/captain-signup' className='text-[#d5622d] font-medium hover:underline'>
            Register here
          </Link>
        </p>
      </div>

      <div className='border-t border-gray-100 pt-5'>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-medium rounded-lg px-4 py-3 w-full text-base hover:bg-[#c0541f] transition-colors'
        >
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin