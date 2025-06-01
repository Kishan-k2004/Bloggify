import React from 'react'
import { Input } from '../Input'

function SetPasswordContainer() {
  return (
    <>
    <h1 className='font-InterBold text-3xl mb-6'>Set Your Key</h1>
    <Input 
    name={'Password'}
    placeholder={'Enter your Password'}
    type={'password'}
    />
    </>
  )
}

export default SetPasswordContainer