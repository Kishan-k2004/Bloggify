import React, { useContext } from 'react'
import {Input,DateofBirth,Gender} from '../Input'
import {NextButtonContext} from './SignUpContainer'
import { useFormContext } from 'react-hook-form';

function YourInfoContainer() {

  const GotoNextPage = useContext(NextButtonContext)

  const {register} = useFormContext()

  

  return (
    <>
      <h1 className='font-InterBold text-3xl mb-6'>Introduction</h1>
      
      <Input 
      label={'Full Name'} 
      placeholder={'Full name'} 
      type={'text'} 
      {...register('FullName',{required: true})}
      />

      <Input 
      label={'Email'} 
      placeholder={'mail@site.com'} 
      type={'email'} 
      {...register('Email',{required: true})}
      />
      
      <DateofBirth
      {...register('DateofBirth',{required: true})}
      />

      <Gender
      {...register('Gender',{required: true})}
      />

      

    </>
  )
}

export default YourInfoContainer