import React, { useContext, useEffect, useRef, useState } from 'react'
import bucket from '../../appwrite/appwriteBucket'
import conf from '../../conf/conf'
import UserInfoContext from '../../context/UserInfoContext.js'
import profileService from '../../appwrite/appwriteUserProfile'


function Banner() {

    const {permission,userInfo} = useContext(UserInfoContext)

    const BannermodelRef = useRef()
    const [bgImageUrl, setBgImageUrl] = useState('')


    useEffect(() => {
        if (userInfo?.coverImage) {
            setBgImageUrl(userInfo.coverImage);

        }
    }, [userInfo]);
    
    
  return (
    <>
    <div className={`relative min-w-full  h-[250px] md:h-[340px] bg-gray-300 dark:bg-gray-500`}
    style={
    bgImageUrl? {
          backgroundImage: `url(${bgImageUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }
      : {}
    }
    >
        {permission && <label className='absolute inset-0 w-full h-full flex items-end justify-end'>
            <div className='bg-base-100 rounded-3xl cursor-pointer p-2 mr-2 mb-2' onClick={()=> BannermodelRef.current.showModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" 
                className='h-3 w-3 md:h-5 md:w-5 '
                viewBox="0 -960 960 960" 
                fill="white">
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                </svg>
                
            </div>
            
        </label>}
    </div>

    <Model ref={BannermodelRef} bg={bgImageUrl} setbg={setBgImageUrl} />
    </>
  )
}



const Model = React.forwardRef(({bg,setbg},ref)=>{

    const {userInfo} = useContext(UserInfoContext)
    const DefaultImages = conf.defaultBanner?.split(',') || []

    async function setdefaultBG(image){
        try {

            if(userInfo){
                
                const updatedData = await profileService.updateUserData({userId:userInfo.$id,coverImage:image})
                if(updatedData) setbg(image)
            }
        } catch (error) {

            console.log(error)
        }
    }

    async function handleImageSubmit(e){
        try {

            const file = await bucket.uploadFile(e.target.files[0])
            if(file){
                const image = await bucket.getFilePreview(file.$id)
                setdefaultBG(image.href)
            }
        } catch (error) {
            console.log(error)
        }

    }

    
    return(
        <>
        <dialog id="banner_model" className="modal" ref={ref}>
            <div className="modal-box h-80 w-90 bg-white dark:bg-base-100">

                <form method="dialog" className='float-right'>
                    <button className="cursor-pointer font-InterBold font-extrabold text-base-100 dark:text-white">✕</button>
                </form>

                <h3 className="font-bold text-lg font-InterSemibold text-base-100 dark:text-white">Choose Image.</h3>

                <div className='grid grid-cols-2 gap-3 mt-4'>
                    {DefaultImages.map((image,index)=>(
                        <div 
                        key={index}
                        onClick={()=>{setdefaultBG(image)}}
                        className={`h-[100px] bg-cover bg- bg-center rounded-xl cursor-pointer ${image === bg? 'opacity-50 pointer-events-none' :'hover:opacity-50'}`}
                        style={{ backgroundImage: `url(${image})` }}
                        ></div>
                    ))}
                    
                    <div className='relative rounded-xl border-1 border-dashed border-base-100 dark:border-white'>
                        <label htmlFor="chooseBannerImage" className='absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer'>
                            <p className='font-Inter-Regular text-sm text-base-100 hover:text-gray-500 dark:text-white' >Choose Imgae <br/> <span className='text-xs font-InterLight'>2560px X 1440px</span> </p>
                            <input id='chooseBannerImage' type="file" className='hidden' onChange={handleImageSubmit} />
                        </label>
                    </div>

                </div>
            </div>
        </dialog>
        </>
    )
})

export default Banner