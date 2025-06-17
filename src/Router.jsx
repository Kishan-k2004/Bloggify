import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import {Blogs, Failure, Success, Profile, CreateBlog, MySpace} from './pages/index.js'
import Source from './Source.jsx'


function Router() {

    const router = createBrowserRouter(
    createRoutesFromElements(
    <>
      <Route path='/' element={<Source/>}>
        <Route path='/' element={<Blogs/>}/>
        <Route path='/profile/:userid/:username' element={<Profile/>}/>
        <Route path='/add-blogs' element={<CreateBlog/>} />
        <Route path='/my-space' element={<MySpace/>} />

      </Route>,

      <Route path='/authentication-failed' element={<Failure/>} />
      <Route path='/authentication-successful' element={<Success/>} />

    </>))
    

  return (
    <RouterProvider router={router} />
  )


}

export default Router