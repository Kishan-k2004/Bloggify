
import Dropdown from './Dropdown'
import { useSelector } from 'react-redux'


function Profile() {

    const userData = useSelector((state)=>(state.authentication.data))
    const profileImg = useSelector((img)=>(img.authentication.profileImage))
    
    
    const placeholder = userData?.name?.charAt(0)
    

    
    return profileImg?(
        //image profile
        <div className="dropdown dropdown-end cursor-pointer">
            <div tabIndex={0}  >
                <img class="w-10 h-10  rounded-full ring-2 ring-base-100 dark:ring-white" src={profileImg} alt="Bordered avatar"/>
            </div>
            <Dropdown/>
        </div>

    ):(
    // default profile
    <div className="dropdown dropdown-end cursor-pointer">
        <div tabIndex={0}>
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">{placeholder?.toUpperCase()}</span>
            </div>
        </div>
        <Dropdown/>
    </div>

    )
    
    
  
}

export default Profile