import React, { useRef, useState } from 'react'
import { Password } from '../Input'
import Button from '../Button'

function SetPasswordContainer() {
  
  return (
    <>

    <h1 className='font-InterBold text-3xl mb-10'>Set Your Key</h1>
    <Password 
    name={'Password'}
    placeholder={'Enter Password'}
    type={'password'}
    />

    <p className='font-InterLight text-sm mt-5 pr-5 mb-6 text-left '>Passwords must be at least 6 characters and contain at least one letter and one number. Password are case sensitive.</p>

    <Password 
    name={'Confirm Password'}
    placeholder={'Confirm Password'}
    type={'password'}
    />

    <Button 
      name={'Create Account'}
      lightThemeColor={'bg-base-100 text-white'} 
      darkThemeColor={'dark:bg-white dark:text-black'} 
      CssClass={'p-3 w-32 mt-10'}
      event={undefined}
    />
    </>
  )
}

export default SetPasswordContainer