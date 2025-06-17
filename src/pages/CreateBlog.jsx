import React, { useState } from 'react'
import { toast } from 'react-toastify'
import bucket from '../appwrite/appwriteBucket'
import {TextEditor} from '../components/index.js'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'

function CreateBlog() {

  const methods = useForm()
  const {handleSubmit,register,formState: { errors }} = methods

  async function onSubmit(data){
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className='flex flex-col items-center w-full gap-8'>

      <div className='mb-10'>
        <hr className='text-gray-500 w-full' />
        <h1 className='font-InterBold lg:text-9xl sm:text-8xl text-5xl text tracking-wide text-black dark:text-white'>CREATE BLOG</h1>
        <hr className='text-gray-500 w-full' />
      </div>

      <div className='w-full pr-12 pl-12'>
        <label className="input focus-within:outline-none dark:focus-within:border-white focus-within:border-black w-full bg-white dark:bg-base-100 font-Inter-Regular text-black dark:text-white border-2 border-gray-300 dark:border-gray-500 " >
          <span className="label">Blog Title</span>
          <input type="text" 
          placeholder="Enter your blog title" 
          {...register('Title',
            {required: "Title is required"}
          )}
          />
        </label>
        {errors.Title && <p className='text-red-500 font-InterLight text-sm mt-1'>{errors.Title.message}</p>}
      </div>

      <div className='w-full pr-12 pl-12'>
        <BlogImage/>
      </div>

      <div className='w-full pr-12 pl-12'>
        <TextEditor/>
      </div>

      <div className='w-full pr-12 pl-12'>
        <label className="input focus-within:outline-none dark:focus-within:border-white focus-within:border-black w-full bg-white dark:bg-base-100 font-Inter-Regular text-black dark:text-white border-2 border-gray-300 dark:border-gray-500 " >
          <span className="label">Keywords</span>
          <input 
          type="text" 
          placeholder="Enter comma saparated keywords for your blog ex- science,technology,trendig"
          {...register('keywords',{
            required: "It's good to add keywords to your blog"
          })}
          />
        </label>
        {errors.keywords && <p className='text-orange-500 font-InterLight text-sm mt-1'>{errors.keywords.message}</p>}
      </div>

      <div className='grid grid-cols-2 gap-10 w-full pr-12 pl-12'>

        <div>
          <button type='button' className='btn font-InterLight w-full mb-5 p-6 bg-base-100 dark:bg-white text-white dark:text-black'>Save</button>
        </div>

        <div>
          <button type='submit' className='btn font-InterLight w-full mb-5 p-6 bg-base-100 dark:bg-white text-white dark:text-black'>Publish</button>
        </div>

      </div>

    </div>
    </form>
    </FormProvider>
  )
}


function BlogImage(){

  const [file,setfile] = useState(null)

  const {register,setValue} = useFormContext()


  async function handleFile(e){
    try {
      if(e.target.files[0]){
        const Imagefile = await bucket.uploadFile(e.target.files[0])
        const fileObj = {
          $id: Imagefile.$id,
          name: Imagefile.name,
        };
        setfile(fileObj)
        setValue('Image',Imagefile.$id)

      }else{
        toast.warning('Please select a Image')
      }

    } catch (error) {
      toast.error('Invalid image format')
    }
    
  }

  async function handleDelete(){
    try {
      if(file){
        await bucket.deleteFile(file.$id)
        setfile(null)
        setValue('Image','')
      }
    } catch (error) {
      toast.error('Failed to remove file')
    }
    setfile('')
  }

  return(
    <>
    <input type="hidden" {...register('Image')} />
    <label htmlFor='InputImage' className={`input focus-within:outline-none dark:focus-within:border-white focus-within:border-black w-full bg-white dark:bg-base-100 font-Inter-Regular text-black dark:text-white border-2 border-gray-300 dark:border-gray-500 ${file?'':'cursor-pointer'}`}>
      <span className="label">Cover Image</span>

      {file?
        <><p className='font-Inter-Regular'>{file.name}</p>
        <p className='font-InterBold text-sm text-end w-full cursor-pointer' onClick={handleDelete}>x</p></>
        :
        <><span className='text-gray-500 cursor-pointer truncate'>This image shown at the top of the blog</span>
        <input id='InputImage' type="file" className='hidden' onChange={(e)=> handleFile(e)} /></>
      }

      
    </label>
    </>
  )
}


export default CreateBlog