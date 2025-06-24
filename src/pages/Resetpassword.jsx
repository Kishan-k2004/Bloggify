import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import authService from '../appwrite/appwrite'
import { toast } from 'react-toastify'

function Resetpassword() {

    const [urlParams] = useSearchParams()
    const userId = urlParams.get('userId')
    const secret = urlParams.get('secret')
    const {register,handleSubmit,watch,formState:{errors}} = useForm()
    const password = watch('password')
    const navigate = useNavigate()

    async function onsubmit(){
        try {
            
            const res = await authService.resetPassword(userId,secret,password)
            if(res){
                toast.success('Password Reset successfully.')
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
    <div className='flex justify-center items-center w-full h-screen'>
        <fieldset className="fieldset bg-white dark:bg-base-100 border-base-300 rounded-box w-xs border p-5">
            <form onSubmit={handleSubmit(onsubmit)}>
            <legend className="fieldset-legend text-black text-xl mb-5">Reset Password</legend>

            <label className="label text-black">New Password</label>
            <input 
            type="password" 
            className="input text-black bg-white border-2 border-gray-500" 
            placeholder="New Password" 
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
            })}/>

            <label className="label text-black mt-5">Confirm Password</label>
            <input 
            type="password" 
            className="input text-black bg-white border-2 border-gray-500" 
            placeholder="Confirm Password" 
            {...register('confirmPassword',{
            required: "Please cofirm your password",
                validate: (value)=> value === password || "Password do not match"
            })}/>

            <button type='submit' className="btn btn-neutral mt-8 mb-4">Reset password</button>

            <p className='text-red-500 font-Inter-Regular text-sm'>{errors?.password?.message || errors?.confirmPassword?.message}</p>
            </form>
        </fieldset>
    </div>
    </>
  )
}

export default Resetpassword