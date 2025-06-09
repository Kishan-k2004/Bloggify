import { OtpInput,ErrorMessage } from '../Input'
import Button from '../Button'
import { useContext, useRef, useState, useEffect } from 'react'
import {NextButtonContext} from './SignUpContainer'
import { useFormContext } from 'react-hook-form'
import { handleVerifyOTP } from '../../../api/ApiHandler'
import { toast } from 'react-toastify'
import {handleSendOTP} from '../../../api/ApiHandler.js'


function VerifyEmailContainer() {
  
  const GotoNextPage = useContext(NextButtonContext)

  const [error,setError] = useState('')
  const Inputref = useRef()
  const [loading,setLoading] = useState(false)

  const {watch} = useFormContext()
  const email = watch('email')


  async function VerifyOTP(){
    setError('')
    
    if(Inputref.current.value.length < 6){
      setError("Please enter 6 digit code")
      

    }else{
      setLoading(true)
      const otp = Inputref.current.value

      const verifyOtpPromise = handleVerifyOTP(email,otp)

      toast.promise(verifyOtpPromise,{
        pending : 'Verifying Code ...',
        success : 'Code Verified',
        error : 'Invalid Code'
      })

      try {
        const res = await verifyOtpPromise
  
        if(res.status === 200){
          GotoNextPage()
  
        }else{
          setError(res.data)
        }

      } catch (error) {
        setError(error.response.data.message)
      }finally{
        setLoading(false)
      }
      

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
    <p className='font-InterLight text-sm mt-2'>Note :- Sometime the mail is in spam section.</p>
    </div>

    <div> <Countdown/> </div>
    
    <div>
    <Button 
      name={'Verify'}
      lightThemeColor={'bg-base-100 text-white disabled:bg-gray-600'} 
      darkThemeColor={'dark:bg-white dark:text-black dark:disabled:bg-gray-200'} 
      CssClass={'p-3 w-32 mt-12'}
      event={VerifyOTP}
      disabled={loading}
      />
    </div>

    </div>
    
  )
}

function Countdown() {
  const [time, setTime] = useState(300); // 5 minutes = 300 seconds
  const timerRef = useRef(null);

  const {watch} = useFormContext()
  const email = watch('email')

  useEffect(() => {
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (time > 0) {
      timerRef.current = setInterval(() => {
        setTime(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [time]);


    async function ResendCode(){

      const sendOtpPromise = handleSendOTP(email)

      toast.promise(sendOtpPromise, {
        pending: 'Sending code...',
        success: 'Email sent! Check your inbox.',
        error: {
          render({ data }) {
          return data?.response?.data?.message || 'Invalid Email ID.'
        },
      },
    })

    try {
      const res = await sendOtpPromise

      if (res.status === 200) {
        setTime(300)

      } else {
        console.log("Unexpected response")

      }
    }catch (error) {}
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