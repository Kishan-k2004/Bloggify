import React, { createContext, useState, useContext } from 'react';
import Steps from './Steps';
import StepsContainer from './StepsContainer';
import { useForm, FormProvider } from 'react-hook-form';
import Button from '../Button'
import {ModelContext} from '../../../pages/Navbar'

const NextButtonContext = createContext()

function SignUpContainer() {
  
  const [index,setIndex] = useState(0)
  const [temp, setTemp] = useState(false); // [Info, Verify, Secure,Special case]

  const methods = useForm()
  const {handleSubmit} = methods

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
      SubmitInfo(data)

    }else{
      CreateAccount(data)

    }
  }

  function SubmitInfo(data){
    console.log(data)
    GotoNextPage()
  }

  function CreateAccount(data){
    console.log(data)
    CloseModel()
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
              name={'Create Account'}
              lightThemeColor={'bg-base-100 text-white'} 
              darkThemeColor={'dark:bg-white dark:text-black'} 
              CssClass={'p-3 w-32 mt-10'}
              type={'submit'}
            />}
            {index === 0 && <Button 
              name={'Send OTP'}
              lightThemeColor={'bg-base-100 text-white'} 
              darkThemeColor={'dark:bg-white dark:text-black'} 
              CssClass={'p-3 w-32'}
              type={'submit'}
            />}

            </form>

            </FormProvider>

          </NextButtonContext.Provider>
        </div>

        {/* Right Arrow */}
        <div className='flex items-center h-full'>
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

export {NextButtonContext}