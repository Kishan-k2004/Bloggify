import React,{createContext, useRef, useState} from 'react';
import { Model, Profile, ThemeSwitcher } from '../components/index.js';
import { useSelector } from 'react-redux';
import {startServer} from '../api/ApiHandler.js'

const ModelContext = createContext()

function Navbar() {

  const [view , setview] = useState("default") // default || signup || login

  const Modelref = useRef()
  
  function CloseModle(){
    Modelref.current.checked = false;
  }


  const authStatus = useSelector((state)=> state.authentication.status)


  const navItem = [
    {
      name : "Stories",
      status : true,
      slug : '/stories'
    },
    {
      name : "About Me",
      status : !authStatus,
      slug : '/about'
    },
    {
      name : "Get Started",
      status : !authStatus,
      slug : '/get-started',
      event : ()=> {
        startServer()
        Modelref.current.checked = true
        setview("default")
      }
    },
    {
      name : "Add Story",
      status : authStatus,
      slug : '/add-story'
    },
    {
      name : "My Space",
      status : authStatus,
      slug : '/my-space'
    }
  ]
    
  return (
    <ModelContext.Provider value={CloseModle}>
    <div className="navbar bg-white dark:bg-base-100 shadow-sm">
      
      {/* Left: Hamburger + Logo */}
      <div className="flex-1 flex items-center">
        {/* Hamburger - visible on small screens only */}
        <div className="dropdown md:hidden">
          <button tabIndex={0} className="p-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current text-base-100 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white dark:bg-base-100 text-base-100 dark:text-white rounded-box w-52">
            {navItem.map((item)=>(
              item.status && <li key={item.name}><a onClick={item.event && item.event}>{item.name}</a></li>
            ))}
          </ul>
        </div>

        {/* Logo */}
        <a className="p-2 text-xl ml-2 text-base-100 dark:text-white font-InterSemibold">Bloggify</a>
      </div>

      {/* Center: Horizontal Menu on md+ */}
      <div className="hidden md:flex text-base-100 dark:text-white">
        <ul className="flex gap-6 px-3">
          {
            navItem.map((item)=>(
              item.status && <li key={item.name}> <a href="#" onClick={item.event &&  item.event} className="text-base-100 dark:text-white hover:underline underline-offset-4 transition duration-200">{item.name}</a> </li>
            ))
          }
        </ul>

      </div>

      {/* Right: Profile always visible */}
      <div className="flex-none flex items-center">
         <div className='mt-0.2 ml-4'><ThemeSwitcher /></div>
        <div className="ml-5">
          {authStatus && <Profile />}
        </div>
      </div>
    </div>
    
    <input type="checkbox" id="modal" className="modal-toggle" ref={Modelref} />
    <Model view={view} setview={setview}/>


  </ModelContext.Provider>
    
  );
}

export default Navbar;
export {ModelContext}
