import React from 'react'
import Bloggify from '../../../assets/Logo.png'

function Logo() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-10 h-10 overflow-hidden">
        <img src={Bloggify} alt="Bloggify" className="w-full h-full object-contain" />
      </div>
    </div>
  )
}

export default Logo
