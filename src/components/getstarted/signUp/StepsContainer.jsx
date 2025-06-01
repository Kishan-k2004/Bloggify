import React from 'react'
import SetPasswordContainer from './SetPasswordContainer'
import YourInfoContainer from './YourInfoContainer'
import VerifyEmailContainer from './VerifyEmailContainer'

const StepsContainer = React.memo(({index,GotoNextPage})=>{
  
  return (
    <>
    {index === 0 && <YourInfoContainer GotoNextPage={GotoNextPage} />}
    {index === 1 && <VerifyEmailContainer GotoNextPage={GotoNextPage}/>}
    {index === 2 && <SetPasswordContainer/>}
    </>
  )
})

export default StepsContainer