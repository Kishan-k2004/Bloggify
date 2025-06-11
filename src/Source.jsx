import React from 'react'
import { Navbar,Footer } from './pages/index'
import { Outlet, useParams } from 'react-router'

function Source() {

  

  return (
    <div className="min-h-screen w-full flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Outlet/>

        </main>

        <footer><Footer/></footer>
        
    </div>
  )
}

export default Source