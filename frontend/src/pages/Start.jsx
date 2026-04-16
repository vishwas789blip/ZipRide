import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='h-screen flex justify-between flex-col w-full bg-slate-200'>
      {/* Background Image Container */}
      <div className='h-full w-full bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1964&auto=format&fit=crop)] flex flex-col justify-between'>
        
        {/* Logo Section */}
        <div className='p-8'>
          <h1 className='text-3xl font-extrabold text-white tracking-tighter'>ZipRide</h1>
        </div>

        {/* Bottom UI Card */}
        <div className='bg-white pb-8 py-5 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-3xl'>
            <h2 className='text-3xl font-bold leading-tight'>Get Started with ZipRide</h2>
            <p className='text-gray-500 text-sm mt-2'>Experience the safest way to travel in your city.</p>
            
            <div className='mt-6'>
                {/* Rider Button */}
                <Link 
                  to='/login' 
                  className='flex items-center justify-center w-full bg-black text-white py-4 rounded-xl text-xl font-semibold hover:bg-zinc-800 transition-all'
                >
                  Continue
                  <i className="ri-arrow-right-line ml-3"></i>
                </Link>

                {/* Captain Link */}
                <div className='flex items-center justify-center mt-6 gap-2'>
                  <span className='text-zinc-500 text-sm'>Wanna earn with us?</span>
                  <Link 
                    to='/captain-login' 
                    className='text-black font-bold text-sm border-b-2 border-black hover:text-zinc-600 transition-all'
                  >
                    Sign in as Captain
                  </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Start