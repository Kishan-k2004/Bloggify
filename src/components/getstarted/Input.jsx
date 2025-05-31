import './Model.css'


function Input({ name, placeholder, type, ...props }) {
  return (
    <div className='mb-6 flex justify-center'>
    <label className="floating-label dark:dark-label w-full border-black dark:border-white">

      <span className="text-black dark:text-white bg-gray-200 dark:bg-base-100">{name}</span>

      <input 
      type={type} 
      placeholder={placeholder} 
      autoFocus
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
      <input type="date" className='font-Inter-Regular bg-gray-200 dark:bg-base-100 text-black dark:text-white' />
    </label>

    </div>
  )
}

function Gender(){
  return(
    <div className='mb-6 flex justify-center'>
      <label className="select w-full bg-gray-200 dark:bg-base-100 no-focus border-black dark:border-white">
        <span className="label font-Inter-Regular bg-gray-200 dark:bg-base-100">Gender</span>
        <select>
          <option className='font-Inter-Regular'>Male</option>
          <option className='font-Inter-Regular'>Female</option>
          <option className='font-Inter-Regular'>Other</option>
        </select>
      </label>
    </div>
  )
}

export {Input,DateofBirth,Gender}