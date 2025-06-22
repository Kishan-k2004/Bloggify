import React, { useEffect, useRef, useState } from 'react'
import blogService from '../appwrite/appriteBlog'
import { useNavigate } from 'react-router'

function Blogs() {

  const [blogList, setBlogList] = useState(null)
  const navigate = useNavigate()
  const colorClass = [['text-red-600','bg-red-200'],['text-green-600','bg-green-200'],['text-blue-600','bg-blue-200'],['text-purple-600','bg-purple-200'],['text-pink-600','bg-pink-200']]

  useEffect(()=>{

    const fetchallBlogs = async()=>{
      try {
        const blogdata = await blogService.getRecentBlog()
        setBlogList(blogdata?.documents)

      } catch (error) {
        console.log(error)
      }
    }

    fetchallBlogs()
  },[])


  return (
    <div className='flex flex-col items-center pl-[2.5%] pr-[2.5%] gap-8'>

      <div className='mb-5'>
        <hr className='text-gray-500 w-full' />
        <h1 className='font-InterBold lg:text-9xl sm:text-8xl text-5xl text tracking-wide text-black dark:text-white'>THE BLOG</h1>
        <hr className='text-gray-500 w-full' />
      </div>

      <div className='flex w-full justify-start pl-5 pr-10'>
        <h1 className='font-InterSemibold text-2xl text-black dark:text-white'>Recent Blog posts</h1>
      </div>

      {/* For small screen */}
      <div className='w-full gap-5 flex-col flex sm:hidden mb-5 pl-5 pr-10'>

        <div className='flex flex-col h-[370px] gap-3'>

          <div className='bg-gray-500 h-1/2'
            style={
              blogList?.[0]?.Image ?{
                backgroundImage: `url(${blogList[0].Image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }:{}
            }
            >
          </div>

          <p className='font-InterSemibold text-purple-700'>
            {blogList?.[0]?.Date.replace(',',' ')}
          </p>

          <div className='flex flex-row text-base-100 dark:text-white'>

            <h1 className='font-InterBold text-2xl'>{blogList?.[0]?.Title}</h1>

            <div className='ml-auto mr-5'>
              <a href={`/blog/${blogList?.[0]?.$id}/${blogList?.[0]?.Title}`}><svg
              xmlns="http://www.w3.org/2000/svg" 
              className='h-6 w-6 fill-current hover:text-gray-500' 
              viewBox="0 -960 960 960" 
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
              </svg></a>
            </div>

          </div>

          <p className='font-Inter-Regular text-gray-500 line-clamp-2'>{blogList?.[0]?.Content?.replace(/<[^>]*>/g,"")}</p>

          <div>
            {blogList?.[0]?.keywords?.slice(0,3).map((keyword,index)=>{
              const randomColor = colorClass[Math.floor(Math.random()*colorClass.length)]
              return(
                <span
                 className={`pl-3 pt-1 pb-1 pr-3 ${randomColor?.[0]} ${randomColor?.[1]} rounded-2xl mr-2`}
                key={index}
                >{keyword}</span>
              )
            })}
          </div>

        </div>

        <div className='flex flex-col h-[350px] gap-3'>

          <div className='bg-gray-500 h-1/2'
            style={
              blogList?.[1]?.Image ?{
                backgroundImage: `url(${blogList[1].Image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }:{}
            }
            >
          </div>

          <p className='font-InterSemibold text-purple-700'>
            {blogList?.[1]?.Date.replace(',',' ')}
          </p>

          <div className='flex flex-row text-base-100 dark:text-white'>

            <h1 className='font-InterBold text-2xl'>{blogList?.[1]?.Title}</h1>

            <div className='ml-auto mr-5'>
              <a href={`/blog/${blogList?.[1]?.$id}/${blogList?.[1]?.Title}`}><svg
              xmlns="http://www.w3.org/2000/svg" 
              className='h-6 w-6 fill-current hover:text-gray-500' 
              viewBox="0 -960 960 960" 
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
              </svg></a>
            </div>

          </div>

          <p className='font-Inter-Regular text-gray-500 line-clamp-2'>{blogList?.[1]?.Content?.replace(/<[^>]*>/g,"")}</p>

          <div>
            {blogList?.[1]?.keywords?.slice(0,3).map((keyword,index)=>{
              const randomColor = colorClass[Math.floor(Math.random()*colorClass.length)]
              return(
                <span
                 className={`pl-3 pt-1 pb-1 pr-3 ${randomColor?.[0]} ${randomColor?.[1]} rounded-2xl mr-2`}
                key={index}
                >{keyword}</span>
              )
            })}
          </div>

        </div>

        <div className='flex flex-col h-[350px] gap-3'>

          <div className='bg-gray-500 h-1/2'
            style={
              blogList?.[2]?.Image ?{
                backgroundImage: `url(${blogList[2].Image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }:{}
            }
            >
          </div>

          <p className='font-InterSemibold text-purple-700'>
            {blogList?.[2]?.Date.replace(',',' ')}
          </p>

          <div className='flex flex-row text-base-100 dark:text-white'>

            <h1 className='font-InterBold text-2xl'>{blogList?.[2]?.Title}</h1>

            <div className='ml-auto mr-5'>
              <a href={`/blog/${blogList?.[2]?.$id}/${blogList?.[2]?.Title}`}><svg
              xmlns="http://www.w3.org/2000/svg" 
              className='h-6 w-6 fill-current hover:text-gray-500' 
              viewBox="0 -960 960 960" 
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
              </svg></a>
            </div>

          </div>

          <p className='font-Inter-Regular text-gray-500 line-clamp-2'>{blogList?.[2]?.Content?.replace(/<[^>]*>/g,"")}</p>

          <div>
            {blogList?.[2]?.keywords?.slice(0,3).map((keyword,index)=>{
              const randomColor = colorClass[Math.floor(Math.random()*colorClass.length)]
              return(
                <span
                 className={`pl-3 pt-1 pb-1 pr-3 ${randomColor?.[0]} ${randomColor?.[1]} rounded-2xl mr-2`}
                key={index}
                >{keyword}</span>
              )
            })}
          </div>

        </div>

        <div className='flex flex-col h-[350px] gap-3'>

          <div className='bg-gray-500 h-1/2'
            style={
              blogList?.[3]?.Image ?{
                backgroundImage: `url(${blogList[3].Image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }:{}
            }
            >
          </div>

          <p className='font-InterSemibold text-purple-700'>
            {blogList?.[3]?.Date.replace(',',' ')}
          </p>

          <div className='flex flex-row text-base-100 dark:text-white'>

            <h1 className='font-InterBold text-2xl'>{blogList?.[3]?.Title}</h1>

            <div className='ml-auto mr-5'>
              <a href={`/blog/${blogList?.[3]?.$id}/${blogList?.[3]?.Title}`}><svg
              xmlns="http://www.w3.org/2000/svg" 
              className='h-6 w-6 fill-current hover:text-gray-500' 
              viewBox="0 -960 960 960" 
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
              </svg></a>
            </div>

          </div>

          <p className='font-Inter-Regular text-gray-500 line-clamp-2'>{blogList?.[3]?.Content?.replace(/<[^>]*>/g,"")}</p>

          <div>
            {blogList?.[3]?.keywords?.slice(0,3).map((keyword,index)=>{
              const randomColor = colorClass[Math.floor(Math.random()*colorClass.length)]
              return(
                <span
                 className={`pl-3 pt-1 pb-1 pr-3 ${randomColor?.[0]} ${randomColor?.[1]} rounded-2xl mr-2`}
                key={index}
                >{keyword}</span>
              )
            })}
          </div>

        </div>
        
        
      </div>

      {/* For medium screen */}
      <div className=' w-full h-[1200px] flex-col gap-8 hidden sm:flex lg:hidden mb-10 pl-5 pr-5'>

        <div className='flex flex-col h-4/12 gap-3'>

          <div className='bg-gray-500 h-1/2'
            style={
              blogList?.[0]?.Image ?{
                backgroundImage: `url(${blogList[0].Image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }:{}
            }
            >
          </div>

          <p className='font-InterSemibold text-purple-700'>
            {blogList?.[0]?.Date.replace(',',' ')}
          </p>

          <div className='flex flex-row text-base-100 dark:text-white'>

            <h1 className='font-InterBold text-2xl'>{blogList?.[0]?.Title}</h1>

            <div className='ml-auto mr-5'>
              <a href={`/blog/${blogList?.[0]?.$id}/${blogList?.[0]?.Title}`}><svg
              xmlns="http://www.w3.org/2000/svg" 
              className='h-6 w-6 fill-current hover:text-gray-500' 
              viewBox="0 -960 960 960" 
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
              </svg></a>
            </div>

          </div>

          <p className='font-Inter-Regular text-gray-500 line-clamp-2'>{blogList?.[0]?.Content?.replace(/<[^>]*>/g,"")}</p>

          <div>
            {blogList?.[0]?.keywords?.slice(0,3).map((keyword,index)=>{
              const randomColor = colorClass[Math.floor(Math.random()*colorClass.length)]
              return(
                <span
                 className={`pl-3 pt-1 pb-1 pr-3 ${randomColor?.[0]} ${randomColor?.[1]} rounded-2xl mr-2`}
                key={index}
                >{keyword}</span>
              )
            })}
          </div>

        </div>

        <div className='flex flex-row gap-5 h-2/12'>
            
          <div className='w-1/2 bg-gray-500 '
          style={
            blogList?.[1]?.Image ?{
              backgroundImage: `url(${blogList[1].Image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }:{}
          }
          >
        </div>

        <div className='flex flex-col w-1/2 gap-5'>

          <p className='font-InterSemibold text-purple-700'>
            {blogList?.[1]?.Date.replace(',',' ')}
          </p>

          <div className='flex flex-row text-base-100 dark:text-white'>

            <h1 className='font-InterBold text-2xl'>{blogList?.[1]?.Title}</h1>

            <div className='ml-auto mr-5'>
              <a href={`/blog/${blogList?.[1]?.$id}/${blogList?.[1]?.Title}`}><svg
              xmlns="http://www.w3.org/2000/svg" 
              className='h-6 w-6 fill-current hover:text-gray-500' 
              viewBox="0 -960 960 960" 
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
              </svg></a>
            </div>
          </div>

          <p className='font-Inter-Regular text-gray-500 line-clamp-2'>{blogList?.[1]?.Content?.replace(/<[^>]*>/g,"")}</p> 

          <div>
            {blogList?.[1]?.keywords?.slice(0,3).map((keyword,index)=>{
              const randomColor = colorClass[Math.floor(Math.random()*colorClass.length)]
              return(
                <span
                className={`pl-3 pt-1 pb-1 pr-3 ${randomColor?.[0]} ${randomColor?.[1]} rounded-2xl mr-2`}
                key={index}
                >{keyword}</span>
              )
            })}
          </div>         

        </div>
        </div>

        <div className='flex flex-row gap-5 h-2/12'>
            
          <div className='w-1/2 bg-gray-500 '
          style={
            blogList?.[2]?.Image ?{
              backgroundImage: `url(${blogList[2].Image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }:{}
          }
          >
        </div>

        <div className='flex flex-col w-1/2 gap-5'>

          <p className='font-InterSemibold text-purple-700'>
            {blogList?.[2]?.Date.replace(',',' ')}
          </p>

          <div className='flex flex-row text-base-100 dark:text-white'>

            <h1 className='font-InterBold text-2xl'>{blogList?.[2]?.Title}</h1>

            <div className='ml-auto mr-5'>
              <a href={`/blog/${blogList?.[2]?.$id}/${blogList?.[2]?.Title}`}><svg
              xmlns="http://www.w3.org/2000/svg" 
              className='h-6 w-6 fill-current hover:text-gray-500' 
              viewBox="0 -960 960 960" 
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
              </svg></a>
            </div>
          </div>

          <p className='font-Inter-Regular text-gray-500 line-clamp-2'>{blogList?.[2]?.Content?.replace(/<[^>]*>/g,"")}</p> 

          <div>
            {blogList?.[2]?.keywords?.slice(0,3).map((keyword,index)=>{
              const randomColor = colorClass[Math.floor(Math.random()*colorClass.length)]
              return(
                <span
                className={`pl-3 pt-1 pb-1 pr-3 ${randomColor?.[0]} ${randomColor?.[1]} rounded-2xl mr-2`}
                key={index}
                >{keyword}</span>
              )
            })}
          </div>         

        </div>
        </div>

        <div className='flex flex-col h-4/12 gap-3'>

          <div className='bg-gray-500 h-1/2'
            style={
              blogList?.[3]?.Image ?{
                backgroundImage: `url(${blogList[3].Image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }:{}
            }
            >
          </div>

          <p className='font-InterSemibold text-purple-700'>
            {blogList?.[3]?.Date.replace(',',' ')}
          </p>

          <div className='flex flex-row text-base-100 dark:text-white'>

            <h1 className='font-InterBold text-2xl'>{blogList?.[3]?.Title}</h1>

            <div className='ml-auto mr-5'>
              <a href={`/blog/${blogList?.[3]?.$id}/${blogList?.[3]?.Title}`}><svg
              xmlns="http://www.w3.org/2000/svg" 
              className='h-6 w-6 fill-current hover:text-gray-500' 
              viewBox="0 -960 960 960" 
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
              </svg></a>
            </div>

          </div>

          <p className='font-Inter-Regular text-gray-500 line-clamp-2'>{blogList?.[3]?.Content?.replace(/<[^>]*>/g,"")}</p>

          <div>
            {blogList?.[3]?.keywords?.slice(0,3).map((keyword,index)=>{
              const randomColor = colorClass[Math.floor(Math.random()*colorClass.length)]
              return(
                <span
                 className={`pl-3 pt-1 pb-1 pr-3 ${randomColor?.[0]} ${randomColor?.[1]} rounded-2xl mr-2`}
                key={index}
                >{keyword}</span>
              )
            })}
          </div>

        </div>
        
      </div>

      {/* For large screen */}
      <div className='flex-col w-full gap-5 hidden lg:flex mb-2 pl-5 pr-5'>

        <div className='grid grid-cols-2 gap-5 w-full h-[600px] '>

          <div className='flex flex-col gap-5 cursor-pointer' onClick={()=> navigate(`/blog/${blogList?.[0]?.$id}/${blogList?.[0]?.Title}`)}>

            <div className='w-full bg-gray-500 h-4/7'
            style={
              blogList?.[0]?.Image ?{
                backgroundImage: `url(${blogList[0].Image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }:{}
            }
            >

            </div>

            <p className='font-InterSemibold text-purple-700'>
              {blogList?.[0]?.Date.replace(',',' ')}
            </p>

            <div className='flex flex-row text-base-100 dark:text-white'>
              <h1 className='font-InterBold text-2xl'>{blogList?.[0]?.Title}</h1>
              <div className='ml-auto mr-5'>
                <a href={`/blog/${blogList?.[0]?.$id}/${blogList?.[0]?.Title}`}><svg
                xmlns="http://www.w3.org/2000/svg" 
                className='h-6 w-6 fill-current hover:text-gray-500' 
                viewBox="0 -960 960 960" 
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                </svg></a>
              </div>
            </div>

            <p className='font-Inter-Regular text-gray-500 line-clamp-3'>{blogList?.[0]?.Content?.replace(/<[^>]*>/g,"")}</p>

            <div>
              {blogList?.[0]?.keywords?.slice(0,3).map((keyword,index)=>{
                const randomColor = colorClass[Math.floor(Math.random()*colorClass.length)]
                return(
                  <span
                  className={`pl-3 pt-1 pb-1 pr-3 ${randomColor?.[0]} ${randomColor?.[1]} rounded-2xl mr-2`}
                  key={index}
                  >{keyword}</span>
                )
              })}
            </div>

          </div>

          <div className='grid grid-rows-2  gap-5'>

            <div className='flex flex-row w-full gap-5 cursor-pointer' onClick={()=> navigate(`/blog/${blogList?.[1]?.$id}/${blogList?.[1]?.Title}`)}>

              <div className='w-4/7 bg-gray-500'
                style={
                  blogList?.[1]?.Image ?{
                    backgroundImage: `url(${blogList[1].Image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }:{}
                }>
              </div>


              <div className='flex flex-col w-3/7 gap-5'>
                
                <p className='font-InterSemibold text-md text-purple-700'>
                  {blogList?.[1]?.Date.replace(',',' ')}
                </p>

                <div className='flex flex-row text-base-100 dark:text-white'>

                  <h1 className='font-InterBold text-xl'>{blogList?.[1]?.Title}</h1>

                  <div className='ml-auto mr-5'>
                    <a href={`/blog/${blogList?.[1]?.$id}/${blogList?.[1]?.Title}`}><svg
                    xmlns="http://www.w3.org/2000/svg" 
                    className='h-6 w-6 fill-current hover:text-gray-500' 
                    viewBox="0 -960 960 960" 
                    >
                      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                    </svg></a>
                  </div>

                </div>

                <p className='font-Inter-Regular text-gray-500 line-clamp-6'>{blogList?.[1]?.Content?.replace(/<[^>]*>/g,"")}</p>

                <div>
                  {blogList?.[1]?.keywords?.slice(0,2).map((keyword,index)=>{
                  const randomColor = colorClass[Math.floor(Math.random()*colorClass.length)]
                    return(
                      <span
                      className={`pl-3 pt-1 pb-1 pr-3 ${randomColor?.[0]} ${randomColor?.[1]} rounded-2xl mr-2`}
                      key={index}
                      >{keyword}</span>
                    )
                  })}
                </div>

              </div>
            </div>
            
            <div className='flex flex-row w-full gap-5 cursor-pointer' onClick={()=> navigate(`/blog/${blogList?.[2]?.$id}/${blogList?.[2]?.Title}`)}>

              <div className='w-4/7 bg-gray-500'
                style={
                  blogList?.[2]?.Image ?{
                    backgroundImage: `url(${blogList[2].Image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }:{}
                }>
              </div>


              <div className='flex flex-col w-3/7 gap-5'>
                
                <p className='font-InterSemibold text-md text-purple-700'>
                  {blogList?.[2]?.Date.replace(',',' ')}
                </p>

                <div className='flex flex-row text-base-100 dark:text-white'>

                  <h1 className='font-InterBold text-xl'>{blogList?.[2]?.Title}</h1>

                  <div className='ml-auto mr-5'>
                    <a href={`/blog/${blogList?.[2]?.$id}/${blogList?.[2]?.Title}`}><svg
                    xmlns="http://www.w3.org/2000/svg" 
                    className='h-6 w-6 fill-current hover:text-gray-500' 
                    viewBox="0 -960 960 960" 
                    >
                      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                    </svg></a>
                  </div>

                </div>

                <p className='font-Inter-Regular text-gray-500 line-clamp-6'>{blogList?.[2]?.Content?.replace(/<[^>]*>/g,"")}</p>

                <div>
                  {blogList?.[2]?.keywords?.slice(0,2).map((keyword,index)=>{
                  const randomColor = colorClass[Math.floor(Math.random()*colorClass.length)]
                    return(
                      <span
                      className={`pl-3 pt-1 pb-1 pr-3 ${randomColor?.[0]} ${randomColor?.[1]} rounded-2xl mr-2`}
                      key={index}
                      >{keyword}</span>
                    )
                  })}
                </div>

              </div>
            </div>

          </div>

        </div>

        <div className='w-full h-[300px] flex flex-row gap-5 cursor-pointer' onClick={()=> navigate(`/blog/${blogList?.[3]?.$id}/${blogList?.[3]?.Title}`)}>

          <div className='w-1/2 bg-gray-500'
            style={
              blogList?.[3]?.Image ?{
                backgroundImage: `url(${blogList[3].Image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }:{}
            }
            >

          </div>

          <div className='flex flex-col w-1/2 gap-5'>

            <p className='font-InterSemibold text-purple-700'>
            {blogList?.[3]?.Date.replace(',',' ')}
            </p>

            <div className='flex flex-row text-base-100 dark:text-white'>

              <h1 className='font-InterBold text-2xl'>{blogList?.[3]?.Title}</h1>

              <div className='ml-auto mr-5'>
                <a href={`/blog/${blogList?.[3]?.$id}/${blogList?.[3]?.Title}`}><svg
                xmlns="http://www.w3.org/2000/svg" 
                className='h-6 w-6 fill-current hover:text-gray-500' 
                viewBox="0 -960 960 960" 
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                </svg></a>
              </div>
            </div>

            <p className='font-Inter-Regular text-gray-500 line-clamp-3'>{blogList?.[3]?.Content?.replace(/<[^>]*>/g,"")}</p>

            <div>
              {blogList?.[3]?.keywords?.slice(0,3).map((keyword,index)=>{
                const randomColor = colorClass[Math.floor(Math.random()*colorClass.length)]
                return(
                  <span
                  className={`pl-3 pt-1 pb-1 pr-3 ${randomColor?.[0]} ${randomColor?.[1]} rounded-2xl mr-2`}
                  key={index}
                  >{keyword}</span>
                )
              })}
            </div>

          </div>


        </div>


      </div>

      <hr className='text-gray-700 w-full'/>

      <div className='flex w-full justify-start pl-5 pr-10'>
        <h1 className='font-InterSemibold text-2xl text-black dark:text-white'>All Blog posts</h1>
      </div>
      
      {/* All post section */}
      <div className='flex flex-col justify-center'>
        <AllPostSection />
      </div>

    </div>
  )
}


function AllPostSection(){

  const [blogArray, setBlogArray] = useState(null)
  const [pageNo, setPageNo] = useState(1)
  const totalPages = useRef()

  const navigate = useNavigate()
  const colorClass = [['text-red-600','bg-red-200'],['text-green-600','bg-green-200'],['text-blue-600','bg-blue-200'],['text-purple-600','bg-purple-200'],['text-pink-600','bg-pink-200']]

  useEffect(()=>{
    const fetchBlog = async()=>{
      try {
        const res = await blogService.getallBlogs(pageNo)
        if(res) setBlogArray(res?.documents)
      } catch (error) {
        console.log(error)
      }
    }

    fetchBlog()
  },[pageNo])

  useEffect(()=>{
    const setpagecount = async()=>{
      try {
        const totalblog = await blogService.remainingBlogCount()
        const ans = Math.ceil(totalblog/6)
        totalPages.current = ans

      } catch (error) {
        console.log(error)
      }
    }

    setpagecount()
  },[])

  return(
    <>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-5 mb-10 pl-5 pr-5'>

      {
        blogArray?.map((blog)=>(
          <div className="card bg-white dark:bg-base-100 text-black dark:text-white font-Inter-Regular min-w-70 rounded-none " key={blog.$id} onClick={()=> navigate(`/blog/${blog.$id}/${blog.Title}`)}>
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

              <p className='font-InterSemibold text-purple-700'>{blog?.Date.replace(',',' ')}</p>
              
              <div className='flex flex-row text-black dark:text-white'>
                <h2 className="card-title truncate text-xl" >
                {blog.Title}
                </h2>

                <div className='ml-auto mr-5'>
                  <a href={`/blog/${blog?.$id}/${blog?.Title}`}><svg
                  xmlns="http://www.w3.org/2000/svg" 
                  className='h-6 w-6 fill-current hover:text-gray-500' 
                  viewBox="0 -960 960 960" 
                  >
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                  </svg></a>
                </div>

              </div>

              <p className='truncate'>{ blog?.Content?.replace(/<[^>]*>/g,"")} </p>

              <div>
                {blog?.keywords?.slice(0,3).map((keyword,index)=>{
                const randomColor = colorClass[Math.floor(Math.random()*colorClass.length)]
                return(
                  <span
                  className={`pl-3 pt-1 pb-1 pr-3 ${randomColor?.[0]} ${randomColor?.[1]} rounded-2xl mr-2`}
                  key={index}
                  >{keyword}</span>
                )})}
              </div>
      
            </div>
          </div>
        ))
      }
    </div>

    <div className='flex justify-center mb-10'>

      <div className='flex flex-row gap-0 items-center'>

        {pageNo !== 1 && <div className="bg-base-100 text-white dark:text-black dark:bg-white border-2 border-white dark:border-base-100 p-2 cursor-pointer" onClick={()=> setPageNo((prev)=>prev-1)}>
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className='w-5 h-5 fill-current'
          viewBox="0 -960 960 960" >
            <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/>
          </svg>
        </div>}

        <div className="bg-base-100 text-white dark:text-black dark:bg-white pl-5 pr-5 pt-2 pb-2 ">{pageNo}</div>

        {pageNo < totalPages.current && <div className="bg-base-100 text-white dark:text-black dark:bg-white border-2 border-white dark:border-base-100 p-2 cursor-pointer" onClick={()=> setPageNo((prev)=>prev+1)}>
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className='w-5 h-5 fill-current'
          viewBox="0 -960 960 960">
            <path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/>
          </svg>
        </div>}

      </div>
    </div>

    </>
  )
}

export default Blogs