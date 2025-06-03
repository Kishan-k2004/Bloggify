import './Model.css'
import IconShow from '../../assets/IconShow.png'
import IconHide from '../../assets/IconHide.png'
import { useRef } from 'react';


function Input({ name, placeholder, type, ...props }) {
  return (
    <div className='mb-6 flex justify-center'>
    <label className="floating-label dark:dark-label w-full border-black dark:border-white">

      <span className="text-black dark:text-white bg-gray-200 dark:bg-base-100">{name}</span>
      

      <input 
      type={type} 
      placeholder={placeholder} 
      required
      className="input input-md font-Inter-Regular w-full bg-gray-200 dark:bg-base-100 focus:outline-none border-black dark:border-white text-black dark:text-white" 
      />
      

    </label>
    </div>
  );
}



function DateofBirth(){

  
  
  return(
    <div className='mb-6 flex justify-center'>

    <label className="input w-full bg-gray-200 dark:bg-base-100 no-focus border-black dark:border-white">
      <span className="label font-Inter-Regular border-r-black">Date of Birth</span>
      <input type="date" required className='font-Inter-Regular bg-gray-200 dark:bg-base-100 text-black dark:text-white' />
    </label>

    </div>
  )
}

function Gender(){
  return(
    <div className='mb-6 flex justify-center'>
      <label className="select w-full bg-gray-200 dark:bg-base-100 no-focus border-black dark:border-white">
        <span className="label font-Inter-Regular bg-gray-200 dark:bg-base-100">Gender</span>
        <select required>
          <option className='font-Inter-Regular'>Male</option>
          <option className='font-Inter-Regular'>Female</option>
          <option className='font-Inter-Regular'>Other</option>
        </select>
      </label>
    </div>
  )
}

function OtpInput() {
  return(
    <input
          type="text"
          maxLength="6"
          // value={otp}
          // onChange={handleChange}
          className="font-Inter-Regular border-1 p-3 rounded-sm text-center text-2xl w-full bg-gray-200 dark:bg-base-100 focus:outline-none border-black dark:border-white text-black dark:text-white"
          placeholder="XXXXXX"
    />
  )
}

function Password({ name, placeholder, type, ...props }) {

  let Inputref = useRef()
  let Imageref = useRef()

  function PasswordToggle(){

    if(Inputref.current.type === 'password'){

      Inputref.current.type = 'text'
      Imageref.current.src = IconShow

    }else{

      Inputref.current.type = 'password'
      Imageref.current.src = IconHide

    }
  }
  return (
    <div className='flex justify-center'>
    <label className="floating-label dark:dark-label w-full border-black dark:border-white">

      <span className="text-black dark:text-white bg-gray-200 dark:bg-base-100">{name}</span>
      
      <div className='flex gap-2 justify-center items-center'>

      <input 
      type={type} 
      placeholder={placeholder} 
      ref={Inputref}
      required
      className="input input-md font-Inter-Regular w-full border-black dark:border-white bg-gray-200 dark:bg-base-100 focus:outline-none text-black dark:text-white" 
      />
      
      <img className='w-7 h-7 cursor-pointer hover:opacity-50 brightness-0 dark:brightness-100'
      onClick={PasswordToggle}
       src={IconHide} 
       ref={Imageref}
       alt="Show Key" />
      </div>
      

    </label>
    </div>
  );
}


export {Input,DateofBirth,Gender,OtpInput,Password}