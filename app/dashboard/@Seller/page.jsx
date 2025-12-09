"use client"
import {useEffect, useState} from 'react'
import './../style.css'
import Image from 'next/image'

export default function page() {
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
        <div className='divcat'>
            All
        </div>
        {
          seller.map((test)=>{
            return(
                <div key={test._id} className='divcat'>
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
