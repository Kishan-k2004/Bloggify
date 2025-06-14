import React, { useEffect, useState } from 'react'
import { ThemeProvider } from './context/theme.js'
import Router from './Router.jsx'
import authService from './appwrite/appwrite.js'
import { useDispatch } from 'react-redux'
import { Login, Logout, UpdateProfile } from './store/authSlice.js'
import { ToastContainer } from 'react-toastify'
import profileService from './appwrite/appwriteUserProfile.js'


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
    const fetchUser = async () => {
    try {
      const userData = await authService.getUser();
      if (userData) {
        dispatch(Login(userData));

        const data = await profileService.getUserData(userData.$id);
        if (data) {
          dispatch(UpdateProfile(data.profileImg));
        }
      } else {
        dispatch(Logout());
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }}

  fetchUser();
  },[])

  return (
    <ThemeProvider value={{darkMode,toggleDarkMode}}>

      <ToastContainer
      stacked
      position='top-left'
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      style={{ zIndex: 9999 }}
      theme={darkMode? 'dark':'light'}
      toastClassName={() =>
        "bg-white dark:bg-base-100 text-black dark:text-white border-0 dark:border-base-300 shadow-md flex flex-row pt-3 md:pt-5 pb-3 md:pb-5 pr-3 pl-3 font-Inter-Regular"
      }
      bodyClassName="text-sm p-3"
      progressClassName="bg-primary"
      />

      <Router/>

    </ThemeProvider>

    
  )
}

export default App