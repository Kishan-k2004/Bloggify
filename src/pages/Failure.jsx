import React from 'react'
import FailureImage from '../assets/failureImage.png'
import { Link } from 'react-router'

function Failure() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>

        <div className="w-25 h-25 overflow-hidden">
            <img src={FailureImage} alt="Failed" className="object-contain" />
        </div>

        <div>
            <p className='font-Inter-Regular mt-3 text-red-500'>Google authentication failed. Please try again or choose a different login option.</p>
        </div>

        <div>
            <Link className='mt-3 text-black dark:text-white font-InterBold' to={'/'}>Go Back</Link>
        </div>
    </div>
  )
}

export default Failure