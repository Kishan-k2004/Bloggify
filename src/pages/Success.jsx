import React, { useEffect,useState } from 'react'
import SuccessImage from "../assets/successImage.png"
import { useNavigate } from 'react-router'
import authService from '../appwrite/appwrite.js'
import { useDispatch } from 'react-redux'
import { Login, UpdateProfile } from '../store/authSlice.js'
import profileService from '../appwrite/appwriteUserProfile.js'


function Success() {

    const dispatch = useDispatch()

    useEffect(()=>{

        const fetchUser = async()=>{
        try {
            const userData = await authService.getUser()
            if(userData){
                await profileService.addAccount({
                    fullname: userData.name,
                    email: userData.email,
                    userId: userData.$id
                })

                dispatch(Login(userData))
                
                const data = await profileService.getUserData(userData.$id)
                if(data){

                    dispatch(UpdateProfile(data.profileImg))
                    
                }
                
            }

        } catch (error) {
            console.log(error)
            
        }}

        fetchUser()
    },[])


  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>

        <div className="w-25 h-25 overflow-hidden">
            <img src={SuccessImage} alt="Failed" className="object-contain" />
        </div>

        <div>
            <p className='font-Inter-Regular mt-3 pl-20 pr-20 text-black dark:text-white'>Google authentication successful. {<Countdown/>} </p>
        </div>
    </div>
  )
}

function Countdown() {
  const [time, setTime] = useState(3); 
  const navigate = useNavigate()
  

  useEffect(() => {
  const timer = setInterval(() => {
        setTime(prev => {
            if (prev <= 1) {
                clearInterval(timer);
                navigate('/')
                return 0;

            }
            return prev - 1;
        });
    }, 1000);

    return () => clearInterval(timer);

  }, []);


  return (

    <span className='font-InterBold text-blue-500'>Redirecting you to your dashboard in {time} seconds.</span>
    
    );
}


export default Success