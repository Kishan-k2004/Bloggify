import React, { useContext } from 'react'
import {Input,DateofBirth,Gender,ErrorMessage} from '../Input'
import {NextButtonContext} from './SignUpContainer'
import { useFormContext } from 'react-hook-form';

function YourInfoContainer() {

  const {register,formState: { errors }} = useFormContext()

  

  return (
    <div className='flex flex-col gap-5'>

      <div>
      <h1 className='font-InterBold text-3xl mb-2'>Introduction</h1>
      </div>

      <div>
      <Input 
      label={'Full Name'} 
      placeholder={'Full name'} 
      type={'text'} 
      {...register('fullName',{
        required: "Full Name is required",
        minLength: {
        value: 3,
        message: "Full Name must be at least 3 characters",
        },
        pattern: {
        value: /^[a-zA-Z\s]+$/,
        message: "Only letters and spaces are allowed",
        }
      })}
      />
      {errors.fullName && <ErrorMessage msg={errors.fullName.message}/>}
      </div>

      <div>
      <Input 
      label={'Email'} 
      placeholder={'mail@site.com'} 
      type={'email'} 
      {...register('email',{
        required: "Email is required",
        pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      }
      })}
      />
      {errors.email && <ErrorMessage msg={errors.email.message}/>}
      </div>

      <div>
      <DateofBirth
      {...register('dateofbirth',{required: "Date of birth is required"})}
      />
      {errors.dateofbirth && <ErrorMessage msg={errors.dateofbirth.message}/>}
      </div>

      <div>
      <Gender
      {...register('gender',{required: "Select your gender"})}
      />
      {errors.gender && <ErrorMessage msg={errors.gender.message}/>}
      </div>

      

    </div>
  )
}

export default YourInfoContainer