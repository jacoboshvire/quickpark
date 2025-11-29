import React from 'react'
import './../style.css'

export default function page() {
  return (
    <div className='dropDown'>
      <div className="list">
        <div className='divcat'>
            All
        </div>
        <div className='divcat'>
          1Hour - 5Hour
        </div>
        <div className='divcat'>
          5Hour - 24Hour
        </div>
        <div className='divcat'>
          24Hour - 5Days
        </div>
        <div className='divcat'>
          5Days - 4Weeks
        </div>
      </div>
    </div>
  )
}
