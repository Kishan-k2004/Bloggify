import React, { useState } from 'react';
import Steps from './Steps';
import StepsContainer from './StepsContainer';

function SignUpContainer() {
  
  const [index,setIndex] = useState(0)
  const [steps, setSteps] = useState([true, false, false,false]); // [Info, Verify, Secure,Special case]

  function GotoNextPage(){
    if(index === 2){
      return

    }else{
      const newIndex = index+1
      if(index === 1){
        setIndex(newIndex)
        setSteps((prev)=>{
        const updated = [...prev]
        updated[newIndex] = true
        updated[3] = false
        return updated}
      )
      }else{

        setIndex(newIndex)
        setSteps((prev)=>{
          const updated = [...prev]
          updated[newIndex] = true
          return updated}
        )
      }
      
      
    }
  }

  function GotoPreviousPage(){
    if(index === 0 ){
      return
    }
    else{
      if(index === 2){
        setSteps((prev)=>{
        const updated = [...prev]
        updated[3] = true
        updated[index] = false
        return updated
        })
      }else{
        setSteps((prev)=>{
        const updated = [...prev]
        updated[index] = false
        return updated
        })
      }
      
      setIndex((prev)=>prev-1)
    }
  }


  return (
    <>
      <div className="flex justify-center mb-10">
        <Steps steps={steps} setSteps={setSteps} />
      </div>

      <div className="flex gap-5 items-center h-full">
        {/* Left Arrow */}
        <div className="flex items-center h-full">
          <svg
            className={`w-6 h-6 ${steps[1]?"cursor-pointer text-base-100 dark:text-white":"text-white dark:text-base-100"}`}
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
          <button onClick={GotoNextPage}>Next</button>
          <StepsContainer index={index} />
        </div>

        {/* Right Arrow */}
        <div className="flex items-center h-full">
          <svg
            className={`w-6 h-6 ${steps[3]?"cursor-pointer text-base-100 dark:text-white":"text-white dark:text-base-100"}`}
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
