import React, { forwardRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import feedbackService from '../appwrite/appwriteFeedback'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Loading from './Loading'

function AboutMe() {

  const [notSubmittedFeedback, setNotSubmittedFeedback] = useState(false)
  const data = useSelector((data)=> data.authentication.data)
  const [isloading, setIsloading] = useState(true)

  useEffect(()=>{

    if(!data){
      setIsloading(false)
      return
    }

    const fetchUserStatus = async()=>{
      try {
        setIsloading(true)
        const status =  await feedbackService.ValidateUser(data?.$id)
        if(!status){ setNotSubmittedFeedback(true)}

      } catch (error) {
        console.log(error)
      }finally{
        setIsloading(false)
      }
    }

    fetchUserStatus()
  },[data])


  return ( isloading? <Loading/> :
    <div className='flex flex-col items-center w-full pl-15 pr-15 gap-8'>

      <div className='mb-5'>
        <hr className='text-gray-500 w-full' />
        <h1 className='font-InterBold lg:text-8xl sm:text-6xl text-5xl text tracking-wide text-black dark:text-white'>ABOUT BLOGGIFY</h1>
        <hr className='text-gray-500 w-full' />
        <p className='font-InterSemibold text-sm text-right text-black dark:text-white'>~ Everyone has a story — Bloggify gives you the space to tell it.</p>
      </div>

      <p className='font-Inter-Regular text-sm md:text-xl text-black dark:text-white'>
        Bloggify is a minimalist, story-driven blogging platform designed to help writers, thinkers, and everyday storytellers express themselves freely. Whether it's your personal journal, a thought-provoking article, or a creative poem — Bloggify is your space to write, share, and inspire.
        Unlike complex platforms, Bloggify focuses on simplicity, clarity, and a distraction-free writing experience. Our mission is to unlock a platform where every untold story finds its voice.
      </p>

      <div className='flex justify-start w-full'>
      <h1 className='text-black dark:text-white font-InterMedium text-2xl md:text-4xl text-start'>✨ Why Bloggify?</h1>
      </div>

      <div className='flex justify-start w-full font-Inter-Regular text-sm md:text-xl text-black dark:text-white'>
        <ul>
          <li>🖊️ Focus on Writing: Clean, intuitive editor designed for writers.</li>
          <li>📚 Your Space, Your Stories: Create and manage your own blogs without clutter.</li>
          <li>🔐 Secure & Seamless: Login with Google or email and manage your posts easily.</li>
        </ul>
      </div>

      {!notSubmittedFeedback && <UserFeedbackScore/>}

      {notSubmittedFeedback && <UserFeedback setNotSubmittedFeedback={setNotSubmittedFeedback}/>}

    </div>
  )
}


function UserFeedbackScore(){

  const [feedbackScore, setFeedbackScore] = useState({})

  useEffect(()=>{
    
    const fetchScore = async()=>{
      try {
        const scorePints = await feedbackService.getFeedbackScore()
        if(scorePints){ 
          const score = {
            Design : Math.ceil((scorePints.Design/scorePints.total)*100) ,
            SmoothLogin : Math.ceil((scorePints.SmoothLogin/scorePints.total)*100),
            Responsive : Math.ceil((scorePints.Responsive/scorePints.total)*100),
            visuallyAppealing : Math.ceil((scorePints.visuallyAppealing/scorePints.total)*100),
          }
          setFeedbackScore(score)
        }else{
          toast.error("Can't able to fetch score")
        }

      } catch (error) {
        console.log(error)
      }
    }

    fetchScore()
  },[])

  return(
    <div className='w-full flex flex-col gap-10'>

      <div className='flex justify-start w-full'>
      <h1 className='text-black dark:text-white font-InterMedium text-2xl md:text-4xl text-start'>🏆 Our Scores</h1>
      </div>


    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 '>

      <div className='flex flex-col items-center justify-center mb-8 gap-5'>
          <div className="radial-progress text-green-500 font-InterBold text-xl" style={{ "--value": feedbackScore.Design, "--size": "8em" }} aria-valuenow={70} role="progressbar">{feedbackScore.Design}%</div>
          <h1 className='text-black dark:text-white text-xl font-InterMedium'>Overall Design</h1>
      </div>

      <div className='flex flex-col items-center justify-center mb-8 gap-5'>
          <div className="radial-progress text-green-500 font-InterBold text-xl" style={{ "--value": feedbackScore.SmoothLogin, "--size": "8em" }} aria-valuenow={70} role="progressbar">{feedbackScore.SmoothLogin}%</div>
          <h1 className='text-black dark:text-white text-xl font-InterMedium'>Smooth Login/Logout</h1>
      </div>

      <div className='flex flex-col items-center justify-center mb-8 gap-5'>
          <div className="radial-progress text-green-500 font-InterBold text-xl" style={{ "--value": feedbackScore.Responsive, "--size": "8em" }} aria-valuenow={70} role="progressbar">{feedbackScore.Responsive}%</div>
          <h1 className='text-black dark:text-white text-xl font-InterMedium'>Responsive</h1>
      </div>

      <div className='flex flex-col items-center justify-center mb-8 gap-5'>
          <div className="radial-progress text-green-500 font-InterBold text-xl" style={{ "--value": feedbackScore.visuallyAppealing, "--size": "8em" }} aria-valuenow={70} role="progressbar">{feedbackScore.visuallyAppealing}%</div>
          <h1 className='text-black dark:text-white text-xl font-InterMedium'>Visually Appealing</h1>
      </div>

    </div>
    </div>
  )
}




function UserFeedback({setNotSubmittedFeedback}){

  const {register,handleSubmit,formState: {errors,isSubmitting}} = useForm()
  const Userdata = useSelector((data)=> data.authentication.data)

  async function submit(data){
    try {
      const prevData = await feedbackService.getAllFeedback()
      if(prevData){
        const newdata = {
          userId : [...prevData.userId,Userdata.$id],
          Design : [...prevData.Design,parseInt(data.Design)],
          SmoothLogin : [...prevData.SmoothLogin, parseInt(data.SmoothLogin)],
          Responsive : [...prevData.Responsive, parseInt(data.Responsive)],
          visuallyAppealing : [...prevData.visuallyAppealing, parseInt(data.visuallyAppealing)],
          message : [...prevData.message, data.message]
        }
        const res = await feedbackService.updateFeedback({...newdata})
        if(res){
          toast.success('Thanks for your support.')
          setNotSubmittedFeedback(false)
        }else{
          toast.error('Cannot register your feedback.')
        }
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <div className='w-full flex flex-col gap-5'>

      <div className='flex flex-col justify-start w-full'>
        <h1 className='text-black dark:text-white font-InterMedium text-4xl text-start'>💬 We'd Love Your Feedback!</h1>
        <p className='font-Inter-Regular mt-5 text-sm md:text-xl text-black dark:text-white'>Your experience matters. Help us make Bloggify better by sharing your thoughts!</p>
      </div>

      <form onSubmit={handleSubmit(submit)}>

        <div className='flex flex-col justify-center mt-10 mb-10 w-full border-2 border-black dark:border-white p-4'>

          <div className='flex-row flex gap-10 justify-center items-center '>
            <label htmlFor="" className='font-Inter-Regular textsm md:text-xl text-black dark:text-white'>How would you rate the overall design and layout of Bloggify?</label>
            <div className='ml-auto'>
              <StarRatioInput
              name='Design'
              {...register('Design',{required:true})}
              />
            </div>
          </div>
          <hr className='text-gray-500 w-full mt-3 mb-3' />

          <div className='flex-row flex gap-10 justify-center items-center '>
            <label htmlFor="" className='font-Inter-Regular textsm md:text-xl text-black dark:text-white'>How smooth was the sign-up and login process?</label>
            <div className='ml-auto'>
              <StarRatioInput
              name = 'SmoothLogin'
              {...register('SmoothLogin',{required:true})}
              />
            </div>
          </div>
          <hr className='text-gray-500 w-full mt-3 mb-3' />

          <div className='flex-row flex gap-10 justify-center items-center '>
            <label htmlFor="" className='font-Inter-Regular textsm md:text-xl text-black dark:text-white'>Did Bloggify feel fast and responsive on your device?</label>
            <div className='ml-auto'>
              <StarRatioInput
              name = 'Responsive'
              {...register('Responsive',{required:true})}
              />
            </div>
          </div>
          <hr className='text-gray-500 w-full mt-3 mb-3' />

          <div className='flex-row flex gap-10 justify-center items-center '>
            <label htmlFor="" className='font-Inter-Regular textsm md:text-xl text-black dark:text-white'>How visually appealing do you find the website?</label>
            <div className='ml-auto'>
              <StarRatioInput
              name = 'visuallyAppealing'
              {...register('visuallyAppealing',{required:true})}
              />
            </div>
          </div>
          <hr className='text-gray-500 w-full mt-3 mb-3' />

          <div className='flex-row flex gap-10 justify-center items-center '>
            <label htmlFor="" className='font-Inter-Regular textsm md:text-xl text-black dark:text-white'>Any bugs or unexpected behavior you noticed?</label>
            <div className='ml-auto'>
              <textarea 
              className="textarea textarea-ghost focus-within:outline-black dark:focus-within:outline-white focus-within:bg-white dark:focus-within:bg-base-100 dark:focus-within:text-white focus-within:text-black text-black dark:text-white" 
              placeholder="Please write here."
              {...register('message',{required:true,pattern: {value: /^[A-Za-z\s]+$/, message: "Only alphabets and spaces are allowed",}})}
              ></textarea>
            </div>
          </div>
        </div>

        <div className='w-full flex-col flex items-center mb-15'>
          {errors.Design || errors.SmoothLogin || errors.Responsive || errors.visuallyAppealing || errors.message && <p className='text-red-500 mb-5 text-sm font-Inter-Regular'>{errors.message.message||'Each field is required'}</p>}
          <button className=' cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-200 w-40 p-2 bg-base-100 dark:bg-white text-white dark:text-black rounded-sm text-md font-InterMedium' disabled={isSubmitting}>Submit</button>
        </div>
      </form>

    </div>
  )
}




const StarRatioInput = forwardRef(({name,...props},ref)=>{

  return(
    <div className="rating rating-lg gap-3">
      <input type="radio" name={name} className="mask mask-star-2 bg-orange-400" value={1} aria-label="1 star" {...props} ref={ref}/>
      <input type="radio" name={name} className="mask mask-star-2 bg-orange-400" value={2} aria-label="2 star" {...props} ref={ref}/>
      <input type="radio" name={name} className="mask mask-star-2 bg-orange-400" value={3} aria-label="3 star" {...props} ref={ref}/>
    </div>
  )
})



export default AboutMe