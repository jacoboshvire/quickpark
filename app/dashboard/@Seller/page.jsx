"use client"
import {useEffect, useState} from 'react'
import './../style.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function page() {
  let router = useRouter()
  let sellerUrl = "https://quickpark-backend.vercel.app/api/user"

    async function sellerApi() {
        let res = await fetch(sellerUrl)
        let data = await res.json()
        console.log(data)
        return data
    }
    let [seller, setSeller] = useState([])
    useEffect(() =>{
    sellerApi().then((data) => {
          setSeller(data)
          console.log(data)
        }).catch(e=>{
          console.log(e)
        })
    }, [setSeller])

  return (
    <div className='dropDown'>
      <div className="list">
        <div className='divcat' onClick={() => router.push('/dashboard')}>
            All
        </div>
        {
          seller.map((test)=>{
            return(
                <div key={test._id} className='divcat' onClick={() => router.push(`/dashboard?seller=${test.username}`)}>
                  {test.fullname.length > 11 ? test.fullname.slice(0,11) + "..." : test.fullname}
                </div>
            )
          }).slice(0,3)
        }
        <div className='divcat'>
            View all
        </div>
      </div>
    </div>
  )
}
