"use client"
import './../style.css'
import { useRouter } from 'next/navigation'

export default function Price() {
   const router = useRouter()
  return (
    <div className='dropDown'>
      <div className="list">
        <div className='divcat' onClick={() => router.push('/dashboard')}>
            All
        </div>
        <div className='divcat' onClick={() => router.push('?price=1-25')}>
          1£ - 25£
        </div>
        <div className='divcat' onClick={() => router.push('?price=25-50')}>
          25£ - 50£
        </div>
        <div className='divcat' onClick={() => router.push('?price=50-200')}>
          50£ - 100£
        </div>
        <div className='divcat' onClick={() => router.push('?price=200-5000')}>
          200£ - 5000£
        </div>
      </div>
    </div>
  )
}

