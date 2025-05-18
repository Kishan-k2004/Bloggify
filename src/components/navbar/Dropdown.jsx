
function Dropdown() {
  return (
    <ul tabIndex={0} className="dropdown-content menu bg-white dark:bg-base-100 text-base-100 dark:text-white rounded-box z-1 w-40 p-2 shadow-sm ">
        <li><a>Profile</a></li>
        <li><a>Logout</a></li>
    </ul>
  )
}

export default Dropdown