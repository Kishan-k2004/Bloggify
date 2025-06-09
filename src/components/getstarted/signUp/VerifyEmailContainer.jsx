import { OtpInput,ErrorMessage } from '../Input'
import Button from '../Button'
import { useContext, useRef, useState, useEffect } from 'react'
import {NextButtonContext} from './SignUpContainer'

function VerifyEmailContainer() {
  
  const GotoNextPage = useContext(NextButtonContext)

  const [error,setError] = useState('')
  const Inputref = useRef()

  function VerifyOTP(){
    setError('')
    if(Inputref.current.value.length < 6){
      setError("Please enter 6 digit code")

    }else{
      GotoNextPage()

    }
  }

  return (
    <div className='flex flex-col'>

    <div>
    <h1 className='font-InterBold text-3xl mb-15 mt-8'>Verification</h1>
    </div>

    <div> <OtpInput ref={Inputref}/> {error && <ErrorMessage msg={error} style={'text-center'}/>} </div>

    <div>
    <p className='font-InterLight text-sm mt-8'>Almost there — just enter the code we sent you.</p>
    </div>

    <div> <Countdown/> </div>
    
    <div>
    <Button 
      name={'Verify'}
      lightThemeColor={'bg-base-100 text-white'} 
      darkThemeColor={'dark:bg-white dark:text-black'} 
      CssClass={'p-3 w-32 mt-12'}
      event={VerifyOTP}
      />
    </div>

    </div>
    
  )
}

function Countdown() {
  const [time, setTime] = useState(300); // 5 minutes = 300 seconds

  useEffect(() => {

    const timer = setInterval(() => {
        setTime(prev => {
            if (prev <= 1) {
                clearInterval(timer);
                return 0;
            }
            return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(timer);
      
    }, []);

    function ResendCode(){

      setTime(300)
    }

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    (time === 0)?(
      <p className='font-InterLight text-sm mt-1 cursor-pointer text-blue-500' onClick={ResendCode}> Resend code</p>
    ):(
      <p className='font-InterLight text-sm mt-1 text-red-500 cursor-pointer'>
      Code expires in {minutes}:{seconds < 10 ? '0' + seconds : seconds}
      </p>
    )
  );
}


export default VerifyEmailContainer