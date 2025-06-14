import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserInfoContext } from '../../pages/Profile'
import conf from '../../conf/conf'
import bucket from '../../appwrite/appwriteBucket'
import profileService from '../../appwrite/appwriteUserProfile'
import { useDispatch } from 'react-redux'
import { UpdateProfile } from '../../store/authSlice'

function ProfileContainer() {
  
  return (
    <div className='flex w-full justify-start pl-4 '>

      <div>
        <Avatar/>
        
      </div>

      <div>

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
          <span className="text-3xl md:text-5xl">{placeholder?.charAt(0).toUpperCase() }</span>
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
                        className={`h-[100px] bg-cover bg- bg-center rounded-xl cursor-pointer ${avatar === profile? 'opacity-50 pointer-events-none' :'hover:opacity-50'}`}
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


export default ProfileContainer