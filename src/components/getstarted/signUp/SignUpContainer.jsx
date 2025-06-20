import React, { createContext, useState, useContext } from 'react';
import Steps from './Steps';
import StepsContainer from './StepsContainer';
import { useForm, FormProvider } from 'react-hook-form';
import Button from '../Button'
import {ModelContext} from '../../../pages/Navbar'
import { handleSendOTP } from '../../../api/ApiHandler';
import authService from '../../../appwrite/appwrite';
import { useDispatch } from 'react-redux';
import { Login } from '../../../store/authSlice';
import { toast } from 'react-toastify';
import profileService from '../../../appwrite/appwriteUserProfile';
import NextButtonContext from '../../../context/NextbuttonContext.js'



function SignUpContainer() {
  
  const [index,setIndex] = useState(0)
  const [temp, setTemp] = useState(false); // [Info, Verify, Secure,Special case]
  const [loading , setLoading] = useState(false)

  const methods = useForm({ defaultValues : { Gender : 'Select' } })
  const {handleSubmit,formState} = methods

  const dispatch = useDispatch()

  const CloseModel = useContext(ModelContext)
  

  function GotoNextPage(){
    
    if(index === 2){
      return

    }else{
      if(index+1 == 1){
        setTemp(true)
      }
      setIndex((prev)=> prev+1)

    }
  }

  function GotoPreviousPage(){
    if(index === 1 ){
      setIndex((prev)=>prev-1)
    }
    else{      
      return
    }
  }

  function onSubmit(data){
    if(index === 0){
      setLoading(true)
      SubmitInfo(data)

    }else{
      CreateAccount(data)

    }
  }

async function SubmitInfo(data) {
  setLoading(true)

  try {
    const checkEmail = await profileService.haveUser(data.email)
    if(checkEmail){
      toast.error("Email already exist.")
      setLoading(false)
      return
    }
  } catch (error) {
    console.log(error)
  }

  const sendOtpPromise = handleSendOTP(data.email)

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
      GotoNextPage()
    } else {
      console.log("Unexpected response")
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}


  async function CreateAccount(data){

    try {
      const session = await authService.createAccount(data)
      if(session){
        const userData = await authService.getUser()
        if(userData){
          
          await profileService.addAccount({
            fullname : data.fullName,
            dateofbirth : data.dateofbirth,
            gender : data.gender,
            email : data.email,
            userId : userData.$id
          })

          toast.success(`Welcome ${userData.name} !`)
          dispatch(Login(userData))
          CloseModel()

        }else{
          toast.warning("Can't get userData")
        }

      }else{
        toast.warning("Email is already Resgistered")
      }

    } catch (error) {
      toast.warning("Email is already Resgistered")
    }
  }


  return (
    <>
    {/* Steps bar */}
      <div className="flex justify-center mb-6">
        <Steps index={index} />
      </div>

      <div className="flex gap-5 items-center h-full">
        {/* Left Arrow */}
        <div className="flex items-center h-full">
          <svg
            className={`w-6 h-6 ${index === 1 ?"cursor-pointer text-base-100 dark:text-white":"text-gray-200 dark:text-base-100 pointer-events-none"}`}
            onClick={GotoPreviousPage}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </svg>
        </div>

        {/* Step Content */}
        <div className="grow min-h-90 text-center text-lg font-medium text-base-100 dark:text-white">

          <NextButtonContext.Provider value={GotoNextPage}>

            <FormProvider {...methods}>

            <form onSubmit={handleSubmit(onSubmit)}>

            <StepsContainer index={index} />

            {index === 2 && <Button 
              name={formState.isSubmitting? 'Creating ...':'Create Account'}
              lightThemeColor={'bg-base-100 text-white'} 
              darkThemeColor={'dark:bg-white dark:text-black'} 
              CssClass={'p-3 w-32 mt-10 disabled:bg-gray-500'}
              type={'submit'}
              disabled={formState.isSubmitting}
            />}
            {index === 0 && <div>
              <Button 
              name={loading? 'Sending ...':'Send OTP'}
              lightThemeColor={'bg-base-100 text-white'} 
              darkThemeColor={'dark:bg-white dark:text-black'} 
              CssClass={'p-3 w-32 mt-6 disabled:bg-gray-500'}
              type={'submit'}
              disabled={loading}
            /> </div>}

            </form>

            </FormProvider>

          </NextButtonContext.Provider>
        </div>

        {/* Right Arrow */}
        <div className='flex items-center h-full bg-gra'>
          <svg
            className={`w-6 h-6 ${(index === 0 && temp )?"cursor-pointer text-base-100 dark:text-white":"text-gray-200 dark:text-base-100 pointer-events-none"}`}
            onClick={GotoNextPage}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default SignUpContainer;
