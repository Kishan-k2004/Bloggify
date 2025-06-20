import React, { createContext, useEffect, useState } from 'react'
import {Banner,ProfileContainer,UserBlogContainer} from "../components/index";
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import profileService from '../appwrite/appwriteUserProfile';
import { toast } from 'react-toastify';
import UserInfoContext from '../context/UserInfoContext.js';

function Profile() {

  const user = useParams()
  const data = useSelector((data)=> data.authentication.data)
  const [permission, setPermission] = useState(false)
  const [userInfo,setUserInfo] = useState(null)
 
    
  useEffect(()=>{

    if(data && (data.$id === user.userid)){
      setPermission(true)
    }
     
  },[data,user.username])

  useEffect(()=>{
    const fetchUserData = async()=>{
      try {
        
        const userData = await profileService.getUserData(user.userid)
        setUserInfo(userData)
        
      } catch (error) {
        toast.error('User Not Found')
      }

    }

    fetchUserData()   
  },[user.username])

  return (
    <UserInfoContext.Provider value={{userInfo,permission}}>
    <div className='flex flex-col gap-5'>

      <div className='flex items-center justify-center'>
        <Banner />
      </div>

      <div>
        <ProfileContainer/>
      </div>

      <div className='mt-5'>
        <UserBlogContainer/>
      </div>

    </div>
    </UserInfoContext.Provider>
  )
}

export default Profile
