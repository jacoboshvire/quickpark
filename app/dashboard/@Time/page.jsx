import React from 'react'
import './../style.css'

export default function page() {
  return (
    <div className='dropDown'>
      <div className="list">
        <div>
            All
        </div>
        <div>
          1Hour - 5Hour
        </div>
        <div>
          5Hour - 24Hour
        </div>
        <div>
          24Hour - 5Days
        </div>
        <div>
          5Days - 4Weeks
        </div>
      </div>
    </div>
  )
}
