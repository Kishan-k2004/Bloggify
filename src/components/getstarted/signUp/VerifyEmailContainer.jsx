import { OtpInput } from '../Input'
import Button from '../Button'
import { useRef } from 'react'

function VerifyEmailContainer({GotoNextPage}) {
  
  return (
    <>
    <h1 className='font-InterBold text-3xl mb-15 mt-8'>Verification</h1>
    <OtpInput/>
    <p className='font-InterLight text-sm mt-8'>Almost there — just enter the code we sent you.</p>
    <Countdown/>
    <Button 
      name={'Verify'}
      lightThemeColor={'bg-base-100 text-white'} 
      darkThemeColor={'dark:bg-white dark:text-black'} 
      CssClass={'p-3 w-32 mt-15'}
      event={GotoNextPage}

      />
    </>
    
  )
}

import React, { useEffect, useState } from 'react';

function Countdown() {
  const [time, setTime] = useState(300); // 5 minutes = 300 seconds

  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // cleanup on unmount or time change
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    (time === 0)?(
      <p className='font-InterLight text-sm mt-1 text-blue-500'> Resend code</p>
    ):(
      <p className='font-InterLight text-sm mt-1 text-red-500 cursor-pointer'>
      Code expires in {minutes}:{seconds < 10 ? '0' + seconds : seconds}
      </p>
    )
  );
}


export default VerifyEmailContainer