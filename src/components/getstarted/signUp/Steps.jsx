import React from 'react'
import '../Model.css'

function Steps({index}) {
    const cssName = "step-primary"
    
    
  return (
    <ul className="steps gap-x-8 custom-steps light dark:dark font-Inter-Regular">
        <li className="step step-primary text-black dark:text-white font-Inter-Regular">Intro</li>
        <li className={`step text-black dark:text-white ${ index === 1 && cssName} font-Inter-Regular`}>Verify</li>
        <li className={`step text-black dark:text-white ${ index === 2 && cssName} font-Inter-Regular`}>Secure</li>
    </ul>
  )
}

export default Steps