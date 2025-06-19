import React, { useContext, useEffect, useState } from 'react'
import UserInfoContext from '../../context/UserInfoContext.js';
import blogService from '../../appwrite/appriteBlog.js';

function UserBlogContainer() {

  const [option, toggleOption] = useState('publish')  // [publish , draft]
  const {permission,userInfo} = useContext(UserInfoContext)
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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-15'>

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
              <p className='truncate'>{ blog.Content.replace(/<[^>]*>/g,"")}</p>
          
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
              <p className='truncate'>{blog.Content.replace(/<[^>]*>/g,"")}</p>
          
            </div>
          </div>

        ))}
      </div>
      </div>

    </div>
  )
}

export default UserBlogContainer