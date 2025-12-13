"use client"
import React from 'react'
import './../style.css'
import { useRouter } from 'next/navigation'

export default function page() {
  let router = useRouter()
  return (
    <div className='dropDown'>
      <div className="list">
        <div className='divcat' onClick={() => router.push('/dashboard')}>
            All
        </div>
        <div className='divcat' onClick={() => router.push('/dashboard?time=1-5')}>
          1Hour - 5Hour
        </div>
        <div className='divcat' onClick={() => router.push('/dashboard?time=5-24')}>
          5Hour - 24Hour
        </div>
        <div className='divcat' onClick={() => router.push('/dashboard?time=24-120')}>
          24Hour - 5Days
        </div>
        <div className='divcat' onClick={() => router.push('/dashboard?time=120-720')}>
          5Days - 4Weeks
        </div>
      </div>
    </div>
  )
}
