"use client"
// import React from 'react'
import './../style.css'
import { useRouter } from 'next/navigation'

export default function page() {
  const router = useRouter()
  return (
    <div className='dropDown'>
      <div className="list">
        <div className='divcat' onClick={()=>router.push("/dashboard")}>
            All
        </div>
        <div className='divcat' onClick={()=>router.push("/dashboard?distance=3")}>
          my location
        </div>
        <div className='divcat' onClick={()=>router.push(`/dashboard?distance=10`)}>
          1km - 10km
        </div>
        <div className='divcat' onClick={()=>router.push(`/dashboard?distance=200`)}>
          10km - 200km
        </div>
        <div className='divcat' onClick={()=>router.push(`/dashboard?distance=1000`)}>
          200km - 1000km
        </div>
      </div>
    </div>
  )
}
