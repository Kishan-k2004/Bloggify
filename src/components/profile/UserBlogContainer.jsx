import React, { useContext, useEffect, useState } from 'react'
import UserInfoContext from '../../context/UserInfoContext.js';
import blogService from '../../appwrite/appriteBlog.js';
import { toast } from 'react-toastify';
import profileService from '../../appwrite/appwriteUserProfile.js';
import EmptyVector from '../../assets/emptyVector.png'
import { useNavigate } from 'react-router';

function UserBlogContainer() {

  const [option, toggleOption] = useState('publish')  // [publish , draft]
  const {permission,userInfo} = useContext(UserInfoContext)
  const navigate = useNavigate()
  const [blogList, setblogList] = useState([])

  async function fetchAllDocument(docList){
    try {
      const documentPromises = docList.map((docId)=> blogService.getBlog(docId))

      const documents = await Promise.all(documentPromises)
      return documents

    } catch (error) {
      console.log(error)
    }
  }

  async function handleDelete(blogId) {
    try {
      await blogService.deleteBlog(blogId)
      
      const updatedList = userInfo.blogs.filter((blog)=> blog !== blogId)
      await profileService.updateUserData({userId:userInfo.$id,blogs:updatedList})

      toast.success("Blog Deleted")

      const updatedBlog = blogList.filter((blog)=> blog.$id !== blogId)
      setblogList(updatedBlog)

    } catch (error) {
      console.log(error)
    }
  }

  async function toggleBlogStatus(blogId,Status){
    try {
      const updatedblog = await blogService.updateBlog({blogId,Status})
      if(updatedblog){
        const newBlog = await blogService.getBlog(blogId)
        const updatedList = blogList.map((blog)=> blog.$id === blogId? newBlog:blog )

        setblogList(updatedList)
        if(Status){
          toast.success('Blog published Successfully')
        }else{
          toast.success('Blog moved to the Draft')
        }
        
      }
       
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
    if(!userInfo) return

    fetchAllDocument(userInfo.blogs).then((Blogs)=>{setblogList(Blogs)})
  },[userInfo])


  return (
    <div className='flex flex-col gap-10 w-full font-InterMedium'>

      <div>
        <div className='flex flex-row'>

          <div className={`w-[30%] md:w-[20%] text-center cursor-pointer p-2 ${option === 'publish'? 'dark:text-black dark:bg-white text-white bg-base-100':'text-black dark:text-white'}`} onClick={()=> toggleOption('publish')}>Published</div>

          {permission && <div className={`w-[30%] md:w-[20%] text-center p-2 cursor-pointer ${option === 'draft'? 'dark:text-black dark:bg-white text-white bg-base-100':'text-black dark:text-white'}`} onClick={()=> toggleOption('draft')}>Draft</div>}

        </div>
        <hr className='text-gray-500'/>
      </div>

      <div className='flex justify-center'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 gap-5 mb-15'>

        {option !== 'publish' || blogList.filter((blog)=> blog.Status).map((blog)=>(

          <div className="card bg-white dark:bg-base-100 text-black dark:text-white font-Inter-Regular w-80 shadow-sm " key={blog.$id}>
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
              <h2 className="card-title truncate">
                {blog.Title}
              </h2>

              <div className='flex '>

              <p className='truncate'>{ blog?.Content?.replace(/<[^>]*>/g,"")} </p>
                
                {permission &&<div className='dropdown dropdown-end'>
                <div role='button' tabIndex={0} className='p-1 rounded-3xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'> <svg xmlns="http://www.w3.org/2000/svg"
                className='h-5 w-5 fill-current'
                viewBox="0 -960 960 960">
                  <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
                </svg> </div>
                <ul tabIndex={0} className="dropdown-content menu bg-white dark:bg-base-100 rounded-box z-1 w-30 p-2 shadow-sm font-InterMedium">
                  <li className='p-2 cursor-pointer' onClick={()=> toggleBlogStatus(blog.$id,false)}>UnPublish</li>
                  <li className='p-2 cursor-pointer text-red-500' onClick={()=> handleDelete(blog.$id)}>Delete</li>
                </ul>
                </div>}
          
              </div>
          
            </div>
          </div>

        ))}

        {option !== 'draft' || blogList.filter((blog)=> !blog.Status).map((blog)=>(

          <div className="card bg-white dark:bg-base-100 text-black dark:text-white font-Inter-Regular w-80 shadow-sm" key={blog.$id}>
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
              <h2 className="card-title truncate">
                {blog.Title}
              </h2>
              <div className='flex '>

              <p className='truncate'>{ blog.Content.replace(/<[^>]*>/g,"")} </p>
                
                {permission && <div className='dropdown dropdown-end'>
                <div role='button' tabIndex={0} className='p-1 rounded-3xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'> <svg xmlns="http://www.w3.org/2000/svg"
                className='h-5 w-5 fill-current'
                viewBox="0 -960 960 960">
                  <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
                </svg> </div>
                <ul tabIndex={0} className="dropdown-content menu bg-white dark:bg-base-100 rounded-box z-1 w-30 p-2 shadow-sm font-InterMedium">
                  <li className='p-2 cursor-pointer' onClick={()=> toggleBlogStatus(blog.$id,true)}>Publish</li>
                  <li className='p-2 cursor-pointer'>Edit</li>
                  <li className='p-2 cursor-pointer text-red-500' onClick={()=> handleDelete(blog.$id)}>Delete</li>
                </ul>
                </div>}
          
              </div>
          
            </div>
          </div>

        ))}
      </div>
      </div>

      {((blogList.length === 0 || blogList.filter((blog)=> blog.Status).length === 0) && option === 'publish') && 
      <div className='flex flex-col gap-5 items-center mb-20'>
        <img src={EmptyVector} alt="Bloggify" className="w-full h-[200px] object-contain" />
        <p className='font-InterMedium text-center text-black dark:text-white'>Publish folder is empty.</p>
        {permission && <button className='btn bg-base-100 dark:bg-white text-white dark:text-black font-Inter-Regular w-30' onClick={()=>navigate('/add-blogs')}>Create Blog</button>}
      </div>
      }


      {((blogList.length === 0 || blogList.filter((blog)=> !blog.Status).length === 0) && option === 'draft') && 
      <div className='flex flex-col gap-5 items-center mb-20'>
        <img src={EmptyVector} alt="Bloggify" className="w-full h-[200px] object-contain" />
        <p className='font-InterMedium text-center text-black dark:text-white'>Draft folder is empty.</p>
        {permission && <button className='btn bg-base-100 dark:bg-white text-white dark:text-black font-Inter-Regular w-30' onClick={()=>navigate('/add-blogs')}>Create Blog</button>}
      </div>
      }

    </div>
  )
}

export default UserBlogContainer