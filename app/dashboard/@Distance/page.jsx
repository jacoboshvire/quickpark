// import React from 'react'
import './../style.css'

export default function page() {
  return (
    <div className='dropDown'>
      <div className="list">
        <div className='divcat'>
            All
        </div>
        <div className='divcat'>
          my location
        </div>
        <div className='divcat'>
          1km - 10km
        </div>
        <div className='divcat'>
          10km - 1mile
        </div>
        <div className='divcat'>
          1mile - 25mile
        </div>
      </div>
    </div>
  )
}
