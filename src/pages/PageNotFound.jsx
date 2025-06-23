import React from 'react'
import { useNavigate } from 'react-router'

function PageNotFound() {

    const navigate = useNavigate()
  return (
    <div className='w-full h-screen flex flex-col gap-8 justify-center items-center'>

        <div>
            <h1 className='text-8xl font-InterBold text-black dark:text-white'>404</h1>
        </div>

        <div>
            <p className='text-sm md:text-2xl font-InterSemibold text-black dark:text-white'>You've turned to a page that hasn't been written yet.</p>
        </div>

        <div>
            <p className='text-2xl font-InterSemibold text-blue-500 cursor-pointer' onClick={()=> navigate('/')}>Go Back</p>
        </div>

    </div>
  )
}

export default PageNotFound