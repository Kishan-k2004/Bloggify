import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import bucket from '../appwrite/appwriteBucket'
import {TextEditor} from '../components/index.js'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import blogService from '../appwrite/appriteBlog.js'


function UpdateBlog() {

  const user = useParams()
  const methods = useForm()
  const {handleSubmit,register,watch,reset,formState: { errors,isSubmitting }} = methods
  const userData = useSelector((data)=> data.authentication.data)
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [defaultcontent, setDefaultContent] = useState('')
  

  useEffect(()=>{
    if(!userData){ 
      navigate('/')
      return
    }
    
    const validateUser = async()=>{
      try {
        const docid = user.blogid
        const blog = await  blogService.getBlog(docid)
        if(userData?.$id === blog?.AutherId){
          reset({
            Title:blog.Title,
            Image:blog.Image,
            keywords:blog?.keywords?.join(',') || '',
            Content:blog.Content
          })
          setDefaultContent(blog.Content|| '')
          
        }
        
      } catch (error) {
        console.log(error)
      }
    }
    
    validateUser()
  },[userData,user.blogid])

  async function handleDraft(){
    setloading(true)

    const Title = watch('Title')
    const Content = watch('Content')
    const Image = watch('Image')
    const keywords = watch('keywords')
    const Status = false
    const blogId = user.blogid

    try {
      const blog = await blogService.updateBlog({blogId,Title,Content,Image,keywords,Status})
      if(blog){
        
        toast.success('Blog Updated Successfully.')
        navigate(`/profile/${userData.$id}/${userData.name}`)
      }
    } catch (error) {
      console.log(error)
      toast.error('Error, Please try again.')
    } finally{
      setloading(false)
    }
  }

  async function onSubmit(data){

    const blogId = user.blogid
    const Status = true

    try {
      const blog = await blogService.updateBlog({...data,blogId,Status})
      if(blog){
        
        toast.success('Blog Updated Successfully')
        navigate(`/blog/${blog.$id}/${blog.Title}`)
        
      }
    } catch (error) {
      console.log(error)
      toast.error('Error, Please try again.')
    }

  }

  return (
    <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className='flex flex-col items-center w-full gap-8'>

      <div className='mb-10'>
        <hr className='text-gray-500 w-full' />
        <h1 className='font-InterBold lg:text-9xl sm:text-8xl text-5xl text tracking-wide text-black dark:text-white'>EDIT BLOG</h1>
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
        <TextEditor name='Content' Initialcontent={defaultcontent}/>
        <input type="hidden" {...register('Content',{validate : (value)=> value !== '' || "Blog content should not be empty"})} />
        {errors.Content && <p className='text-red-500 font-InterLight text-sm mt-1'>{errors.Content.message}</p>}
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

      <div className='grid grid-cols-2 gap-10 w-full pr-12 pl-12 mb-20'>

        <div>
          <button type='button' className='btn font-InterLight w-full mb-5 p-6 bg-base-100 dark:bg-white text-white dark:text-black disabled:border-black disabled:text-black dark:disabled:text-white dark:disabled:border-white' onClick={handleDraft} disabled={loading}>Save</button>
        </div>

        <div>
          <button type='submit' className='btn font-InterLight w-full mb-5 p-6 bg-base-100 dark:bg-white text-white dark:text-black disabled:border-black disabled:text-black dark:disabled:text-white dark:disabled:border-white' disabled={isSubmitting}>Publish</button>
        </div>

      </div>

    </div>
    </form>
    </FormProvider>
  )
}


function BlogImage(){

  const [file,setfile] = useState(null)

  const {register,setValue,watch} = useFormContext()


  async function handleFile(e){
    try {
      if(e.target.files[0]){
        const Imagefile = await bucket.uploadFile(e.target.files[0])
        const fileObj = {
          $id: Imagefile.$id,
          name: Imagefile.name,
        };
        setfile(fileObj)
        const image = await bucket.getFilePreview(Imagefile.$id)
        setValue('Image',image.href)

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
        <><p className='font-Inter-Regular truncate'>{file?.name}</p>
        <p className='font-InterBold text-sm text-end w-full cursor-pointer' onClick={handleDelete}>x</p></>
        :
        <><span className={`${watch('Image')?'text-white':'text-gray-500'} cursor-pointer truncate`}>{watch('Image')? 'Change Cover Image' : 'This image shown at the top of the blog'}</span>
        <input id='InputImage' type="file" className='hidden' onChange={(e)=> handleFile(e)} /></>
      }

      
    </label>
    </>
  )
}


export default UpdateBlog