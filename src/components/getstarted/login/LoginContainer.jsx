import React, { useContext, useState } from 'react'
import {Input,Password,ErrorMessage} from '../Input'
import Button from '../Button'
import Logo from '../Logo'
import ModelContext from '../../../context/ModelContext.js'
import { useForm } from 'react-hook-form'
import authService from '../../../appwrite/appwrite'
import { useDispatch } from 'react-redux'
import { Login, UpdateProfile } from '../../../store/authSlice'
import { toast } from 'react-toastify'
import profileService from '../../../appwrite/appwriteUserProfile'

function LoginContainer({setview}) {

  const [loading, setLoading] = useState(false)
  const CloseModel = useContext(ModelContext)
  const {register,handleSubmit,formState: { errors },formState} = useForm()

  const dispatch = useDispatch()


  async function onSubmit(data){

    setLoading(true)
    try {
      const session = await authService.userLogin(data)
      if(session){
        const userData = await authService.getUser()
        if(userData){
          dispatch(Login(userData))

          const data = await profileService.getUserData(userData.$id)
          if(data){
            dispatch(UpdateProfile(data.profileImg))
            CloseModel()
            toast.success(`Welcome ${userData.name} !`)
          }
          
        }else{
          toast.warning("Can't get user Data")
        }
      }else{
        toast.warning("Failed to create session")
      }
    } catch (err) {
      toast.error('Invalid credentials')
    }
    finally{
      setLoading(false)
    }
  }


  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='pr-10 pl-10 flex flex-col gap-5'>
        <Logo/>

        <div>
          <h1 className="font-InterBold text-3xl mb-10 text-center mt-1 text-base-100 dark:text-white">Login to your account</h1>
        </div>

        <div className=''>
          <Input 
            label={'Email'} 
            placeholder={'mail@site.com'} 
            type={'email'} 
            {...register('email',{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              }
            })}
          />
          {errors.email && <ErrorMessage msg={errors.email.message}/>}
        </div>
      
        <div>
        <Password 
          label={'Password'}
          placeholder={'Enter Password'}
          type={'password'}
          {...register('password',{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: /^(?=.*[!@#$%^&*])/,
              message: "Must contain at least one special character",
            },
          })}
        />
        {errors.password && <ErrorMessage msg={errors.password.message}/>}
        </div>

        <p className='text-right text-blue-500 cursor-pointer'>Forget Password</p>
      
        <div>
          <Button 
          name={'Login'}
          lightThemeColor={'bg-base-100 text-white'} 
          darkThemeColor={'dark:bg-white dark:text-black'} 
          CssClass={'p-3 w-full '}
          type={'submit'}
          disabled={formState.isSubmitting}
          />
        
          <Button 
          name={'Create Account'}
          lightThemeColor={'bg-white text-base-100'} 
          darkThemeColor={'dark:bg-base-100 dark:text-white'} 
          CssClass={'p-3 w-full mt-5'}
          event={()=> setview('signup')}
          disabled={loading}
          />
        </div>

      </div>
    </form>
    
  )
}

export default LoginContainer