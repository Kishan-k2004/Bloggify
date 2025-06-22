import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import blogService from '../appwrite/appriteBlog'
import { toast } from 'react-toastify'
import './Blog.css'
import profileService from '../appwrite/appwriteUserProfile'
import { useSelector } from 'react-redux'

function ViewBlog() {

    const {blogid,blogtitle} = useParams()
    const [blog , setBlog] = useState(null)
    const [auther, setauther] = useState('')
    const [isLiked, setIsLiked] = useState(false)
    const clickOnLikedOrDisliked = useRef(false)
    const navigate = useNavigate()
    const userData = useSelector((data)=> data.authentication.data)

    useEffect(()=>{
        const fetchBlogdata = async()=>{
            try {
                
                const blogInfo = await blogService.getBlog(blogid)
                if(blogInfo){
                    setBlog(blogInfo)
                    const auther = await profileService.getUserData(blogInfo.AutherId)
                    if(auther){
                        
                        setauther(auther)

                        if (userData) {
                            const like = blogInfo?.Likes?.includes(userData.$id);
                            const dislike = blogInfo?.Dislikes?.includes(userData.$id);
                            setIsLiked(like);
                            clickOnLikedOrDisliked.current = like || dislike;
                        }
                    }
                }

            } catch (error) {
                console.log(error)
                toast.error('Blog not found.')
                navigate('/')
            }
        }

        fetchBlogdata()
    },[blogid,userData])


    async function handleLike(){
        if(!userData){
            toast.error('Please login first.')
            return
        }
        if(isLiked){
            try {
                const updatedList = blog?.Likes?.filter((id)=> id !== userData.$id)
                const newdata = await blogService.toggleLikeDislike({blogId:blog.$id, Likes:updatedList})
                if(newdata){
                    setIsLiked(!isLiked)
                    clickOnLikedOrDisliked.current = false
                }

            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const updatedLikeList = [...blog?.Likes,userData.$id]
                const updatedDislikeList = blog?.Dislikes?.filter((id)=> id !== userData.$id) || []
                const newdata = await blogService.toggleLikeDislike({blogId:blog.$id, Likes:updatedLikeList,Dislikes:updatedDislikeList})
                if(newdata){
                    setIsLiked(!isLiked)
                    clickOnLikedOrDisliked.current = true
                }
            } catch (error) {
                
            }
        }
    }

    async function handleDislike(){
        if(!userData){
            toast.error('Please login first.')
            return
        }
        if(!isLiked){
            try {
                const updatedDislikeList = blog?.Dislikes?.filter((id)=> id !== userData.$id)
                const updatedLikeList = blog?.Likes?.filter((id)=> id !== userData.$id) || []
                const newdata = await blogService.toggleLikeDislike({blogId:blog.$id, Dislikes:updatedDislikeList, Likes:updatedLikeList})
                if(newdata){
                    setIsLiked(!isLiked)
                    clickOnLikedOrDisliked.current = false
                }

            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const updatedDislikeList = [...blog?.Dislikes,userData.$id]
                const updatedLikeList = blog?.Likes?.filter((id)=> id !== userData.$id) || []
                const newdata = await blogService.toggleLikeDislike({blogId:blog.$id, Dislikes:updatedDislikeList,Likes:updatedLikeList})
                if(newdata){
                    setIsLiked(!isLiked)
                    clickOnLikedOrDisliked.current = true
                }
            } catch (error) {
                
            }
        }
    }

    async function handleCopy(){
        try {
            await navigator.clipboard.writeText(`http://localhost:5173/blog/${blogid}/${blogtitle}`)
        } catch (error) {
            console.log(error)
            toast.error("can't copy the Link.")
        }
    }


  return (
    <div className='flex flex-col gap-5'>

        <div className='text-center'>
            <hr className='text-gray-500 w-full' />
            <h1 className='font-InterBold lg:text-9xl sm:text-8xl text-5xl text tracking-wide text-black dark:text-white'>{blog?.Title}</h1>
            <hr className='text-gray-500 w-full mt-3' />
      </div>

      {blog?.Image && <div className='flex justify-center w-full h-[200px] md:h-[400px] lg:h-[500px]'>
        <div className='w-[80%] rounded-sm h-full'
        style={{
            backgroundImage: `url(${blog?.Image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}
        ></div>
      </div>}

      <div className='tiptapContent' dangerouslySetInnerHTML={{__html:blog?.Content}}></div>

      <div className='flex justify-center items-center pl-4 gap-4 md:gap-8'>

        <div className='w-[80%] flex flex-row gap-4 md:gap-8'>
        <div onClick={handleCopy}>
            <svg xmlns="http://www.w3.org/2000/svg"
            className='h-3 w-3 md:h-5 md:w-5 cursor-pointer fill-current dark:text-gray-300 text-gray-500'
            viewBox="0 -960 960 960" 
            >
                <path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z"/>
            </svg>
        </div>

        <div onClick={handleLike}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            className={`h-3 w-3 md:h-5 md:w-5 cursor-pointer fill-current ${(isLiked && clickOnLikedOrDisliked.current)? 'text-blue-500' : 'dark:text-gray-300 text-gray-500'}`}
            viewBox="0 -960 960 960" 
            >
                <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/>
            </svg>
        </div>

        <div onClick={handleDislike}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            className={`h-3 w-3 md:h-5 md:w-5 cursor-pointer fill-current ${((!isLiked) && clickOnLikedOrDisliked.current)? 'text-red-500' : 'dark:text-gray-300 text-gray-500'}`}
            viewBox="0 -960 960 960" 
            width="24px"
            >
                <path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z"/>
            </svg>
        </div>

        <div className='ml-auto'>
            <p className='font-Inter-Regular cursor-pointer text-black dark:text-white' onClick={()=> navigate(`/profile/${auther?.$id}/${auther?.fullname}`)}>~ {auther?.fullname}</p>
        </div>

      </div>
      </div>

      <hr className='text-gray-500 w-full' />

      <div className='flex flex-col items-center'>
        <SimilarBlog keywords={blog?.keywords}/>
      </div>

    </div>
  )
}

export default ViewBlog


function SimilarBlog({keywords=[]}){

    const [similarBlogs, setSimilarBlogs] = useState([])
    const {blogid} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchSimilarBlog = async()=>{
            if(keywords.length === 0) return

            try {
                const blogList = await blogService.getSimilarBlog(keywords)
                const newBlogList =  blogList?.documents?.filter((blog)=> blog.$id !== blogid)?.filter((blog)=> blog.Status === true) || []
                setSimilarBlogs(newBlogList)

            } catch (error) {
                console.log(error)
            }
        }

        fetchSimilarBlog()
    },[keywords,blogid])

    return(
        <>
        <div className='flex w-[80%] justify-start'>
            <h2 className='font-InterMedium text-black dark:text-white text-2xl'>Similar Blogs</h2>
        </div>

        <div className='flex flex-row w-[80%] gap-4 md:gap-8 overflow-x-auto mb-15 p-4'>

            {similarBlogs?.length == 0? 

            similarBlogs?.map((blog)=>(

                <div className="card bg-white dark:bg-base-100 text-black dark:text-white font-Inter-Regular min-w-80 shadow-sm " key={blog.$id}>
                    <figure>
                        {blog.Image? (
                        <img
                        src={blog.Image}
                        alt="Cover Image"
                        className="w-full h-48 object-cover"
                        />):(
                        <div
                        alt="Cover Image"
                        className="w-full h-48 bg-gray-200 dark:bg-gray-500"
                        ></div>)}
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title truncate cursor-pointer" onClick={()=> navigate(`/blog/${blog.$id}/${blog.Title}`)}>
                        {blog.Title}
                        </h2>

                        <p className='truncate'>{ blog?.Content?.replace(/<[^>]*>/g,"")} </p>
          
                    </div>
                </div>
                
            ))
            :
            <div>
                <p className='font-Inter-Regular text-center text-black dark:text-white'>No similar blog available.</p>
            </div>}

        </div>
        </>
    )
}