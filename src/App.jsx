import React, { useEffect, useState } from 'react'
import { ThemeProvider } from './context/theme.js'
import Router from './Router.jsx'
import authService from './appwrite/appwrite.js'
import { useDispatch } from 'react-redux'
import { Login, Logout } from './store/authSlice.js'


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

      <Router/>

    </ThemeProvider>

    
  )
}

export default App