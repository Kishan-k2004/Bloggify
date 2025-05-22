import React from 'react'
import GoogleSvg from './GoogleSvg'

function Button({name,lightThemeColor,darkThemeColor,svg}) {

  return (
    <button className={`btn ${lightThemeColor} ${darkThemeColor} border-[#e5e5e5] w-full mb-5 rounded-3xl p-6`}>
    {svg && <GoogleSvg/>}
    {name}
    </button>

)}

export default Button
