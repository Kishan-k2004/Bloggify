import React from 'react'
import { Password } from '../Input'
import { useFormContext } from 'react-hook-form';


function SetPasswordContainer() {
  
  const {register} = useFormContext()
  
  
  return (
    <>

    <h1 className='font-InterBold text-3xl mb-10'>Set Your Key</h1>
    <Password 
    lable={'Password'}
    placeholder={'Enter Password'}
    type={'password'}
    {...register('SetPassword',{required: true})}
    />

    <p className='font-InterLight text-sm mt-5 pr-5 mb-6 text-left '>Passwords must be at least 6 characters and contain at least one letter and one number. Password are case sensitive.</p>

    <Password 
    label={'Confirm Password'}
    placeholder={'Confirm Password'}
    type={'password'}
    {...register('ConfirmPassword',{required: true})}
    />

    
    </>
  )
}


export default SetPasswordContainer