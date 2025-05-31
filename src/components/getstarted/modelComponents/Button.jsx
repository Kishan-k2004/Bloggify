import React from 'react'
import GoogleSvg from './GoogleSvg'

function Button({name,lightThemeColor,darkThemeColor,svg,event}) {

  return (
    <button className={`btn ${lightThemeColor} ${darkThemeColor} border-[#e5e5e5] w-full mb-5 p-6`} onClick={event}>
    {svg && <GoogleSvg/>}
    {name}
    </button>

)}

export default Button
