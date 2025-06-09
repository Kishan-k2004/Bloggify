import React from 'react'
import { Password,ErrorMessage } from '../Input'
import { useFormContext } from 'react-hook-form';


function SetPasswordContainer() {
  
  const {register,watch,formState: { errors }} = useFormContext()
  
  const password = watch('password','')

  
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
    {...register('password',{
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
      pattern: {
        value: /^(?=.*[!@#$%^&*])/,
        message: "Must contain at least one special character",
      },
    })}
    />
    {errors.password && <ErrorMessage msg={errors.password.message}/>}
    </div>


    <p className='font-InterLight text-sm mt-5 pr-5 mb-6 text-left '>Passwords must be at least 8 characters and contain at least one special character. Password are case sensitive.</p>

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