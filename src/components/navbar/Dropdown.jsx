import React from "react"
import authService from "../../appwrite/appwrite"
import { useDispatch, useSelector } from "react-redux"
import { Logout } from "../../store/authSlice"
import { Link } from "react-router"

function Dropdown() {

  const userData = useSelector((data)=> data.authentication.data)

  const dispatch = useDispatch()

  function handleLogout(){
    
    authService.userLogout().then(()=> dispatch(Logout()))

  }

  return (
    <ul tabIndex={0} className="dropdown-content menu bg-white dark:bg-base-100 text-base-100 dark:text-white rounded-box z-1 w-40 p-2 shadow-sm ">
        <li><Link to={`/profile/${userData.$id}/${userData.name}`}>Profile</Link></li>
        <li><Link onClick={handleLogout}>Logout</Link></li>
    </ul>
  )
}

export default Dropdown