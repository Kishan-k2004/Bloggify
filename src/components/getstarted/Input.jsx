import React, {  useState } from 'react';
import './Model.css'
import IconShow from '../../assets/IconShow.png'
import IconHide from '../../assets/IconHide.png'



const Input = React.forwardRef(({ label, placeholder, type, ...props },ref)=>{

  
  return (
    <div className='flex justify-center'>
    <label className="floating-label dark:dark-label w-full border-black dark:border-white">

      <span className="text-black dark:text-white bg-gray-200 dark:bg-base-100">{label}</span>

      <input
      type={type} 
      placeholder={placeholder} 
      {...props}
      ref={ref}
      className="input input-md font-Inter-Regular w-full bg-gray-200 dark:bg-base-100 focus:outline-none border-black dark:border-white text-black dark:text-white" 
      />
    </label>
    </div>
  );
})



const DateofBirth = React.forwardRef(({...props},ref)=>{

  return(
    <div className='flex justify-center'>
    <label className="input w-full bg-gray-200 dark:bg-base-100 no-focus border-black dark:border-white">
      <span className="label font-Inter-Regular border-r-black">Date of Birth</span>
      <input 
      type="date" 
      ref={ref}
      {...props}
      className='font-Inter-Regular bg-gray-200 dark:bg-base-100 text-black dark:text-white' />
    </label>

    </div>
  )
})

const Gender = React.forwardRef(({...props},ref)=>{
  return(
    <div className='flex justify-center'>
      <label className="select w-full bg-gray-200 dark:bg-base-100 no-focus border-black dark:border-white">
        <span className="label font-Inter-Regular bg-gray-200 dark:bg-base-100">Gender</span>
        <select {...props} ref={ref} >
          <option className='font-Inter-Regular' value={''} >-- Select --</option>
          <option className='font-Inter-Regular' value={'Male'}>Male</option>
          <option className='font-Inter-Regular' value={'Female'}>Female</option>
          <option className='font-Inter-Regular' value={'Other'}>Other</option>
        </select>
      </label>
    </div>
  )
})

const OtpInput = React.forwardRef((props,ref)=>{
  return(
    <input
          type="text"
          maxLength="6"
          ref={ref}
          required
          {...props}
          className="font-Inter-Regular border-1 p-3 rounded-sm text-center text-2xl w-full bg-gray-200 dark:bg-base-100 focus:outline-none border-black dark:border-white text-black dark:text-white"
          placeholder="XXXXXX"
    />
  )
})

const Password = React.forwardRef(({ label, placeholder, type, ...props },ref)=>{

  const [InputType, setInputType] = useState(type)

  function PasswordToggle(){

    if(InputType === 'password'){

      setInputType('text')

    }else{

      setInputType('password') 

    }
  }

  return (
    <div className='flex justify-center'>
    <label className="floating-label dark:dark-label w-full border-black dark:border-white">

      <span className="text-black dark:text-white bg-gray-200 dark:bg-base-100">{label}</span>
      
      <div className='flex gap-2 justify-center items-center'>

      <input
      type={InputType} 
      placeholder={placeholder} 
      {...props}
      ref={ref}
      className="input input-md font-Inter-Regular w-full border-black dark:border-white bg-gray-200 dark:bg-base-100 focus:outline-none text-black dark:text-white" 
      />
      
      <img className='w-7 h-7 cursor-pointer hover:opacity-50 brightness-0 dark:brightness-100'
      onClick={PasswordToggle}
       src={InputType === 'password'? IconHide:IconShow} 
       alt="Show Key" />
      </div>
      

    </label>
    </div>
  );
})

function ErrorMessage({msg,style}){
  return(
    <p className={`text-red-500 font-InterLight text-sm mt-1 ${style || 'text-left'}`}>{msg}</p>
  )
}

export {Input,DateofBirth,Gender,OtpInput,Password,ErrorMessage}