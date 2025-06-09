import React, { useEffect, useState } from 'react'
import { ThemeProvider } from './context/theme.js'
import Router from './Router.jsx'


function App() {

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


  return (
    <ThemeProvider value={{darkMode,toggleDarkMode}}>

      <Router/>

    </ThemeProvider>

    
  )
}

export default App