import React from 'react'
import SetPasswordContainer from './SetPasswordContainer'
import YourInfoContainer from './YourInfoContainer'
import VerifyEmailContainer from './VerifyEmailContainer'

const StepsContainer = React.memo(({index})=>{
  
  return (
    <>
    {index === 0 && <YourInfoContainer/>}
    {index === 1 && <VerifyEmailContainer/>}
    {index === 2 && <SetPasswordContainer/>}
    </>
  )
})

export default StepsContainer