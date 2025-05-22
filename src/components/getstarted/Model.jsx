import React from 'react'
import ModelContainer from './ModelContainer'

function Model() {
  return (
    <div className="modal" role="dialog">
      <div className="modal-box max-w-80 sm:max-w-125 bg-white dark:bg-base-100">
        <ModelContainer/>
      </div>
      <label className="modal-backdrop " htmlFor="modal" ></label>
    </div>
  )
}

export default Model