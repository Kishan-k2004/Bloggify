import React from 'react'
import {Input,DateofBirth,Gender} from '../Input'
import Button from '../Button'

function YourInfoContainer({GotoNextPage}) {
  return (
    <form>
      <h1 className='font-InterBold text-3xl mb-6'>Introduction</h1>
      
      <Input name={'Full Name'} placeholder={'Full name'} type={'text'} />

      <Input name={'Email'} placeholder={'mail@site.com'} type={'email'} />
      
      <DateofBirth/>

      <Gender/>

      <Button 
      name={'Send OTP'}
      lightThemeColor={'bg-base-100 text-white'} 
      darkThemeColor={'dark:bg-white dark:text-black'} 
      CssClass={'p-3 w-32'}
      event={GotoNextPage}
      />

    </form>
  )
}

export default YourInfoContainer