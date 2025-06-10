import React, { useEffect, useState } from 'react'
import { ThemeProvider } from './context/theme.js'
import Router from './Router.jsx'
import authService from './appwrite/appwrite.js'
import { useDispatch } from 'react-redux'
import { Login, Logout } from './store/authSlice.js'
import { ToastContainer } from 'react-toastify'


function App() {

  const dispatch = useDispatch()

  const [darkMode, setdarkMode] = useState(()=>{
    const isDark = localStorage.getItem("darkMode")
    return isDark === "true"
  })

  const toggleDarkMode = ()=>{
    setdarkMode((prev)=> !prev)
  }

  useEffect(()=>{
    localStorage.setItem("darkMode", darkMode.toString())

    const bodyEl = document.body
    if(bodyEl){
      if(darkMode){
        bodyEl.classList.add("dark")
      }
      else{
        bodyEl.classList.remove("dark")
      }
    }
  },[darkMode])

  useEffect(()=>{
    try {
      authService.getUser().then((userData)=>{
        if(userData){
          dispatch(Login(userData))
        }else{
          dispatch(Logout())
        }
      })
    } catch (error) {
      console.log(error)
    }
  },[])

  return (
    <ThemeProvider value={{darkMode,toggleDarkMode}}>

      <ToastContainer
      stacked
      position='top-left'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      style={{ zIndex: 9999 }}
      theme={darkMode? 'dark':'light'}
      toastClassName={() =>
        "bg-white dark:bg-base-100 text-black dark:text-white border-0 dark:border-base-300 shadow-md flex flex-row pt-3 md:pt-6 pb-3 md:pb-6 pr-3 pl-3 font-Inter-Regular"
      }
      bodyClassName="text-sm p-3"
      progressClassName="bg-primary"
      />

      <Router/>

    </ThemeProvider>

    
  )
}

export default App