import React from 'react'
import './../style.css'
import Link from 'next/link'

export default function Price() {
  return (
    <div className='dropDown'>
      <div className="list">
        <div >
            All
        </div>
        <div>
          5£ - 25£
        </div>
        <div>
          25£ - 50£
        </div>
        <div>
          50£ - 100£
        </div>
        <div>
          200£ - 5000£
        </div>
      </div>
    </div>
  )
}

