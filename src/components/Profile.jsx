import React from 'react'
import react from '../assets/react.svg'
import {Dropdown} from './index.js'
function Profile(props) {
    
    const url = null
    return url?(
        //image profile
        <div className="dropdown dropdown-end cursor-pointer">
            <div tabIndex={0}  >
                <img class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={url} alt="Bordered avatar"/>
            </div>
            <Dropdown/>
        </div>

    ):(
    // default profile
    <div className="dropdown dropdown-end cursor-pointer">
        <div tabIndex={0}>
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">JL</span>
            </div>
        </div>
        <Dropdown/>
    </div>

    )
    
    
  
}

export default Profile