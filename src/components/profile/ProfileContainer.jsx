import React, { useContext, useEffect, useRef, useState } from 'react'
import UserInfoContext from '../../context/UserInfoContext.js'
import conf from '../../conf/conf'
import bucket from '../../appwrite/appwriteBucket'
import profileService from '../../appwrite/appwriteUserProfile'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateProfile } from '../../store/authSlice'
import { toast } from 'react-toastify'

function ProfileContainer() {

  const {permission,userInfo} = useContext(UserInfoContext)
  const [Info, setInfo] = useState({})
  const textbio = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati quidem commodi totam eum quo beatae doloribus, nulla facere saepe est in praesentium eaque? Nihil adipisci voluptatibus obcaecati dignissimos, ea dicta.'

  useEffect(()=>{
    if(userInfo) setInfo(userInfo)

  },[userInfo])
  
  return (
    <div className='flex w-full flex-row justify-start pl-4 gap-4 md:gap-8'>

      <div>
        <Avatar/>
        
      </div>

      <div className='flex flex-col mt-1 md:mt-3'>

        <div>
          <h1 className='font-InterSemibold text-1xl md:text-4xl text-black dark:text-white'>{Info?.fullname}</h1>
          <p className='font-InterLight text-sm text-gray-600 dark:text-gray-400'>{Info?.follower?.length} follower  |  {Info?.blogs?.length} blogs</p>
        </div>

        <div className='grow'>
          <Bio />
        </div>

      </div>

      <div className='ml-auto flex items-center pr-4 md:pr-10'>
        <Follow/>
      </div>

    </div>
  )
}



function Avatar(){

  
  const {permission, userInfo} = useContext(UserInfoContext)
  const AvatarmodelRef = useRef()
  const [profile, setProfile] = useState('')
  const [placeholder, setPlaceholder] = useState('')

  useEffect(()=>{
    if(userInfo?.profileImg){

      setProfile(userInfo.profileImg)
    }else{
      setPlaceholder(userInfo?.fullname)
    }
  },[userInfo])

  return(
    <>
    { profile? 
      <div className="avatar relative p-1">
        <div className="w-20 md:w-30 rounded-full">
          <img src={profile || ''} />
        </div>

        {permission && <label className='absolute inset-0 w-full h-full flex items-end justify-end'>
          <div className='bg-base-100 rounded-3xl cursor-pointer p-2 mr-2 mb-2' onClick={()=> AvatarmodelRef.current.showModal()}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            className='h-3 w-3 md:h-5 md:w-5 '
            viewBox="0 -960 960 960" 
            fill="white">
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
            </svg>
          </div>
        </label>}
        
      </div>
       :
      <div className="avatar avatar-placeholder relative p-1">
        <div className="text-neutral-content w-20 md:w-30 rounded-full bg-gray-300 dark:bg-gray-600">
          <span className="text-3xl md:text-5xl text-gray-700 dark:text-white">{placeholder?.charAt(0).toUpperCase() }</span>
        </div>

        {permission && <label className='absolute inset-0 w-full h-full flex items-end justify-end'>
          <div className='bg-base-100 rounded-3xl cursor-pointer p-2 mr-2 mb-2' onClick={()=> AvatarmodelRef.current.showModal()}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            className='h-3 w-3 md:h-5 md:w-5 '
            viewBox="0 -960 960 960" 
            fill="white">
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
            </svg>
          </div>
        </label>}

      </div>
    }

    <Model profile={profile} setProfile={setProfile} ref={AvatarmodelRef}/>
    </>
  )
}


const Model = React.forwardRef(({profile,setProfile},ref)=>{

    const dispatch = useDispatch()
    const {userInfo} = useContext(UserInfoContext)
    const DefaultAvatar = conf.defaultAvatar?.split(',') || []

    async function setAvatar(image){
      try {
          if(userInfo){
              
            const updatedData = await profileService.updateUserData({userId:userInfo.$id,profileImg:image})
            if(updatedData) setProfile(image),dispatch(UpdateProfile(image))
          }
      } catch (error) {
          console.log(error)
      }
    }

    async function handleProfileImageSubmit(e){
        try {

            const file = await bucket.uploadFile(e.target.files[0])
            if(file){
              const image = await bucket.getFilePreview(file.$id)
              setAvatar(image.href)
            }
        } catch (error) {
            console.log(error)
        }

    }

    
    return(
        <>
        <dialog id="avatar_model" className="modal" ref={ref}>
            <div className="modal-box h-80 w-90 bg-white dark:bg-base-100">

                <form method="dialog" className='float-right'>
                    <button className="cursor-pointer font-InterBold font-extrabold text-base-100 dark:text-white">✕</button>
                </form>

                <h3 className="font-bold text-lg font-InterSemibold text-base-100 dark:text-white">Choose Image.</h3>

                <div className='grid grid-cols-2 gap-3 mt-4'>
                    {DefaultAvatar.map((avatar,index)=>(
                        <div 
                        key={index}
                        onClick={()=>{setAvatar(avatar)}}
                        className={`h-[100px] bg-cover bg- bg-center rounded-xl cursor-pointer border-1 border-base-100 ${avatar === profile? 'opacity-50 pointer-events-none' :'hover:opacity-50'}`}
                        style={{ backgroundImage: `url(${avatar})` }}
                        ></div>
                    ))}
                    
                    <div className='relative rounded-xl border-1 border-dashed border-base-100 dark:border-white'>
                        <label htmlFor="chooseAvatar" className='absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer'>
                          <p className='font-Inter-Regular text-sm text-base-100 hover:text-gray-500 dark:text-white' >Choose Imgae <br/> <span className='text-xs font-InterLight'>250px X 140px</span> </p>
                          <input id='chooseAvatar' type="file" className='hidden' onChange={handleProfileImageSubmit} />
                        </label>
                    </div>

                </div>
            </div>
        </dialog>
        </>
    )
})


function Bio({}){

  const [bio,setBio] = useState('')
  const [isExpanded,setToExpand] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedBio, setEditedBio] = useState('')
  const {permission,userInfo} = useContext(UserInfoContext)

  
  const shouldTruncate = bio?.length > 20

  const displayText = isExpanded? bio : bio.slice(0,20)


  useEffect(()=>{setBio(userInfo?.bio || ''),setEditedBio(userInfo?.bio || '')},[userInfo])

  function toggleReadmore(){
    setToExpand(!isExpanded)
  }

  async function updateBio(){
    try {

      await profileService.updateUserData({userId:userInfo.$id , bio:editedBio})
    } catch (error) {
      console.log(error)
      toast.warning('Bio cannot exceed 255 characters.')
    }finally{

      setIsEditing(false)
      setBio(editedBio)
    }
    
  }

  function cancelUpdateBio(){
    console.log('cancel')
    setEditedBio(bio)
    setIsEditing(false)
  }

  function editBio(){
    console.log('editing')
    setIsEditing(true)
  }

  return(isEditing?
    (<div className='flex flex-row gap-5'>

      <div>
        <textarea 
        className="border-2 dark:border-gray-400 border-black rounded-sm w-full md:w-[580px] max-w-full text-black dark:text-white" 
        rows={4} 
        value={editedBio}
        onChange={(e)=> setEditedBio(e.target.value)}
        >
          
        </textarea>
      </div>

      <div className='flex flex-col gap-4'>

        <div className='p-2 rounded-3xl bg-green-500 cursor-pointer' onClick={updateBio}>

          <svg xmlns="http://www.w3.org/2000/svg"
          className='h-3 w-3 md:h-5 md:w-5 text-white'
          viewBox="0 -960 960 960" 
          fill="currentColor">
            <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
          </svg>

        </div>

        <div className='p-2 rounded-3xl bg-red-500 cursor-pointer' onClick={cancelUpdateBio}>

          <svg xmlns="http://www.w3.org/2000/svg" 
          className='h-3 w-3 md:h-5 md:w-5 text-white'
          viewBox="0 -960 960 960" 
          fill="currentColor">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
          </svg>

        </div>
      </div>

    </div>):
    (<div className='flex flex-row gap-5'>
      <div>
      <p className='font-InterMedium text-sm text-black dark:text-white'>
        {displayText}
        {shouldTruncate && (
          <>
          <button className='bg-none cursor-pointer border-none ml-4' onClick={toggleReadmore}>{!isExpanded? '...more':' Show less'}</button>
          </>
        )}
        </p>
      </div>
      
      {permission && <div className='pr-3 cursor-pointer' onClick={editBio}>

        <svg xmlns="http://www.w3.org/2000/svg" 
        className='h-3 w-3 md:h-5 md:w-5 text-base-100 dark:text-white'
        viewBox="0 -960 960 960" 
        fill="currentColor">
          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
        </svg>

      </div>}

    </div>)
  )

}


function Follow(){

  const [isFollowing, setIsFollowing] = useState(false)
  const {userInfo} = useContext(UserInfoContext)
  const data = useSelector((data)=> data.authentication.data)

  useEffect(()=>{
    if(data && userInfo){
      const state = userInfo.follower.filter((user)=> user === data.$id)
      if(state.length !== 0){
        setIsFollowing(true)
      }
    }
  },[data,userInfo])

  async function handleFollow(){
    try {
      const userData = await profileService.getUserData(userInfo.$id)
      if(userData){
        const updatedFollower = [...userData.follower,data.$id]

        const updatedUser =  await profileService.updateUserData({userId: userInfo.$id, follower: updatedFollower})
        if(updatedUser) setIsFollowing(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUnfollow(){
    try {
      const userData = await profileService.getUserData(userInfo.$id)
      if(userData){
        const updatedFollower = userData.follower.filter((id)=> id !== data.$id)

        const updatedUser =  await profileService.updateUserData({userId: userInfo.$id, follower: updatedFollower})
        if(updatedUser) setIsFollowing(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if(!data) return(<div></div>)

  return(isFollowing?
    (<div className='flex justify-end'>
      <button className='pr-4 pl-4 pt-2 pb-2 rounded-sm text-black dark:text-white font-InterMedium bg-none border-2 border-base-100 dark:border-white cursor-pointer' onClick={handleUnfollow}>Unfollow</button>
    </div>):(<div>
      <button className='pr-4 pl-4 pt-2 pb-2 rounded-sm font-InterMedium cursor-pointer bg-base-100 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-200 text-white dark:text-black' onClick={handleFollow}>Follow</button>
    </div>)
  )
}

export default ProfileContainer