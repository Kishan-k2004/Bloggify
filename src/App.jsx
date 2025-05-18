import React, { useEffect, useState } from 'react'
import './App.css'
import { Navbar,Footer } from './pages/index.js'
import { ThemeProvider } from './context/theme.js'

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
      <div className="min-h-screen w-full flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {/* Other content here */}
        </main>
        <footer><Footer/></footer>
</div>

    </ThemeProvider>

    
  )
}

export default App