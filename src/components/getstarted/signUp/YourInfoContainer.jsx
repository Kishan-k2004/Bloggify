import React from 'react'
import Input from './Input'

function YourInfoContainer() {
  return (
    <div>
      <h1 className='font-InterBold text-3xl mb-6'>Introduction</h1>
      
      <Input name={'Full Name'} placeholder={'Full name'} type={'text'}/>

      <Input name={'Email'} placeholder={'mail@site.com'} type={'email'}/>
    </div>
  )
}

export default YourInfoContainer