import React, { useContext } from 'react'
import {Input,DateofBirth,Gender,ErrorMessage} from '../Input'
import {NextButtonContext} from './SignUpContainer'
import { useFormContext } from 'react-hook-form';

function YourInfoContainer() {

  const GotoNextPage = useContext(NextButtonContext)

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
      {...register('FullName',{
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
      {errors.FullName && <ErrorMessage msg={errors.FullName.message}/>}
      </div>

      <div>
      <Input 
      label={'Email'} 
      placeholder={'mail@site.com'} 
      type={'email'} 
      {...register('Email',{
        required: "Email is required",
        pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      }
      })}
      />
      {errors.Email && <ErrorMessage msg={errors.Email.message}/>}
      </div>

      <div>
      <DateofBirth
      {...register('DateofBirth',{required: true})}
      />
      </div>

      <div>
      <Gender
      {...register('Gender',{required: true})}
      />
      </div>

      

    </div>
  )
}

export default YourInfoContainer