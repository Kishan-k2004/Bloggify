import React from 'react';
import { Profile } from '../components/index.js';

function Navbar() {

    
  return (
    <div className="navbar bg-base-100 shadow-sm">
      
      {/* Left: Hamburger + Logo */}
      <div className="flex-1 flex items-center">
        {/* Hamburger - visible on small screens only */}
        <div className="dropdown md:hidden">
          <button tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Link</a></li>
            <li><a>Link2</a></li>
          </ul>
        </div>

        {/* Logo */}
        <a className="btn btn-ghost text-xl ml-2">Bloggify</a>
      </div>

      {/* Center: Horizontal Menu on md+ */}
      <div className="hidden md:flex">
        <ul className="menu menu-horizontal px-3">
          <li><a>Link</a></li>
          <li><a>Link2</a></li>
        </ul>
      </div>

      {/* Right: Profile always visible */}
      <div className="flex-none">
        <Profile />
      </div>
    </div>
  );
}

export default Navbar;
