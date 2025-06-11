import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import {Blogs, Failure, Success} from './pages/index.js'
import Source from './Source.jsx'

function Router() {

    const router = createBrowserRouter(
    createRoutesFromElements(
    <>
      <Route path='/' element={<Source/>}>
        <Route path='/' element={<Blogs/>}/>
      </Route>,

      <Route path='/authentication-failed' element={<Failure/>} />
      <Route path='/authentication-successful' element={<Success/>} />

    </>))
    

  return (
    <RouterProvider router={router} />
  )


}

export default Router