import React, { useContext } from 'react'
import Logo from './Logo'
import Button from './Button'
import {ModelContext} from '../../pages/Navbar'
function ModelContainer({setview}) {
    const CloseModel = useContext(ModelContext)
    

    const buttons = [
        {
            name: "Continue with email",
            lightThemeColor: "bg-base-100 text-white",
            darkThemeColor: "dark:bg-white dark:text-black",
            svg: false,
            event: ()=> setview("signup")
        },
        {
            name: "Continue with Google",
            lightThemeColor: "bg-white text-black",
            darkThemeColor: "dark:bg-base-100 dark:text-white",
            svg: true,
            event: ()=>{CloseModel()}
        }
    ]

    const Login = {
        name: "Login",
        lightThemeColor: "bg-white text-black",
        darkThemeColor: "dark:bg-base-100 dark:text-white",
        svg: false,
        event: ()=> setview("login")
    }
  return (
    <>
        <Logo/>

        <div className='pl-1 pr-1 sm:pl-15 sm:pr-15'>
            <h1 className="text-3xl text-center font-medium font-Inter-Regular mt-4 text-black dark:text-white">Unlock your space for untold Stories</h1>
        </div>
        <p className='text-center font-InterLight text-xs font-extralight mt-2 mb-5  text-black dark:text-white'>Sign up for more</p>

        <div>
        {buttons.map((btn)=>(
            <Button key={btn.name} 
            name={btn.name} 
            lightThemeColor={btn.lightThemeColor} 
            darkThemeColor={btn.darkThemeColor} 
            svg={btn.svg}
            event={btn.event}/>
        ))}
        <div className="divider text-black dark:text-white before:bg-gray-300 dark:before:bg-gray-600 after:bg-gray-300 dark:after:bg-gray-600 ">or</div>
        
        <p className='text-center font-InterLight text-xs font-extralight mt-1 mb-4  text-black dark:text-white'>Already Started? Continue here</p>
        {<Button key={Login.name}
        name={Login.name} 
            lightThemeColor={Login.lightThemeColor} 
            darkThemeColor={Login.darkThemeColor} 
            svg={Login.svg}
            event={Login.event}
        />}
        </div>
    </>
  )
}

export default ModelContainer