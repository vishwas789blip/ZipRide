import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='h-screen w-full'>
      {/* Full-screen background image */}
      <div className='h-full w-full bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1964&auto=format&fit=crop)] flex flex-col justify-between'>

        {/* Logo */}
        <div className='p-8'>
          <div className='flex items-center gap-2'>
            <div className='w-9 h-9 bg-[#111] rounded-lg flex items-center justify-center'>
              <span className='text-[#d5622d] font-bold text-sm'>Z</span>
            </div>
            <h1 className='text-xl font-medium text-white'>
              Zip<span className='text-[#d5622d]'>Ride</span>
            </h1>
          </div>
        </div>

        {/* Bottom Card */}
        <div className='bg-white pb-10 pt-6 px-7 rounded-t-3xl'>

          <h2 className='text-2xl font-medium leading-snug text-gray-900'>
            Your ride, your way
          </h2>
          <p className='text-gray-500 text-sm mt-1.5'>
            Experience the safest way to travel in your city.
          </p>

          <div className='mt-6 flex flex-col gap-4'>

            {/* Primary CTA */}
            <Link
              to='/login'
              className='flex items-center justify-center w-full bg-[#111] text-white py-3.5 rounded-lg text-base font-medium hover:bg-[#333] transition-colors'
            >
              Get started
              <svg className='ml-2 w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
              </svg>
            </Link>

            {/* Captain CTA */}
            <Link
              to='/captain-login'
              className='flex items-center justify-center w-full bg-[#d5622d] text-white py-3.5 rounded-lg text-base font-medium hover:bg-[#c0541f] transition-colors'
            >
              Drive with ZipRide
            </Link>

          </div>

          <p className='text-center text-xs text-gray-400 mt-5'>
            By continuing, you agree to our{' '}
            <span className='text-gray-600 underline cursor-pointer'>Terms</span>
            {' '}&amp;{' '}
            <span className='text-gray-600 underline cursor-pointer'>Privacy Policy</span>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Start