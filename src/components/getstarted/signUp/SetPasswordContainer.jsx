import React from 'react'
import { Password,ErrorMessage } from '../Input'
import { useFormContext } from 'react-hook-form';


function SetPasswordContainer() {
  
  const {register,watch,formState: { errors }} = useFormContext()
  
  const password = watch('setPassword','')
  return (
    <div className='flex flex-col'>
    <div>
    <h1 className='font-InterBold text-3xl mb-10'>Set Your Key</h1>
    </div>

    <div>
    <Password 
    label={'Password'}
    placeholder={'Enter Password'}
    type={'password'}
    {...register('setPassword',{
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
      pattern: {
        value: /^(?=.*[!@#$%^&*])/,
        message: "Must contain at least one special character",
      },
    })}
    />
    {errors.setPassword && <ErrorMessage msg={errors.setPassword.message}/>}
    </div>


    <p className='font-InterLight text-sm mt-5 pr-5 mb-6 text-left '>Passwords must be at least 6 characters and contain at least one letter and one number. Password are case sensitive.</p>

    <div>
    <Password 
    label={'Confirm Password'}
    placeholder={'Confirm Password'}
    type={'password'}
    {...register('confirmPassword',{
      required: "Please cofirm your password",
      validate: (value)=> value === password || "Password do not match"
    })}
    />
    {errors.confirmPassword && <ErrorMessage msg={errors.confirmPassword.message}/>}
    </div>

    
    </div>
  )
}


export default SetPasswordContainer