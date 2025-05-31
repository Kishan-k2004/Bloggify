import React, { useCallback, useEffect, useState } from 'react'
import ModelContainer from './ModelContainer'
import SignUpContainer from './signUp/SignUpContainer'
import LoginContainer from './login/LoginContainer'

function Model({view,setview}) {
  

  return (
    <div className="modal " role="dialog">
      <div className="modal-box max-w-80 min-h-130 sm:max-w-125 bg-gray-200 dark:bg-base-100">

        {view === "default" && <ModelContainer key={view} setview={setview}/>}
        {view === "signup" && <SignUpContainer key={view} setview={setview}/>}
        {view === "login" && <LoginContainer key={view} setview={setview}/>}

      </div>
      <label className="modal-backdrop " htmlFor="modal"></label>
    </div>
  )
}

export default Model