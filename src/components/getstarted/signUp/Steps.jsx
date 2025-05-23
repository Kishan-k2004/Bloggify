import React from 'react'
import './Steps.css'

function Steps({steps,setSteps}) {
    const cssName = "step-primary"
    console.log("step container")
  return (
    <ul className="steps gap-x-8 custom-steps light dark:dark font-Inter-Regular">
        <li className="step step-primary text-black dark:text-white font-Inter-Regular">Intro</li>
        <li className={`step text-black dark:text-white ${steps[1] && cssName} font-Inter-Regular`}>Verify</li>
        <li className={`step text-black dark:text-white ${steps[1] & steps[2] && cssName} font-Inter-Regular`}>Secure</li>
    </ul>
  )
}

export default Steps