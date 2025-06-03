import React from 'react'
import {Input,Password} from '../Input'
import Button from '../Button'
import Logo from '../Logo'

function LoginContainer({setview}) {
  return (
    <div className='pr-10 pl-10'>
      <Logo/>

      <h1 className="font-InterBold text-3xl mb-15 text-center mt-6 text-base-100 dark:text-white">Login to your account</h1>
      
      <div className='mb-8'>
      <Input name={'Email'} placeholder={'Enter your E-mail'} type={'email'}  />
      </div>
      
      <Password 
      name={'Password'}
      placeholder={'Enter Password'}
      type={'password'}
      />

      <p className='text-right text-blue-500 mt-5 cursor-pointer'>Forget Password</p>

      <Button 
      name={'Login'}
      lightThemeColor={'bg-base-100 text-white'} 
      darkThemeColor={'dark:bg-white dark:text-black'} 
      CssClass={'p-3 w-full mt-6'}
      event={undefined}
      />

      <Button 
      name={'Create Account'}
      lightThemeColor={'bg-white text-base-100'} 
      darkThemeColor={'dark:bg-base-100 dark:text-white'} 
      CssClass={'p-3 w-full mt-5'}
      event={()=> setview('signup')}
      />
    </div>
  )
}

export default LoginContainer