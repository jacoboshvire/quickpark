"use client"
import {useEffect, useState} from 'react'
import './../style.css'
import Image from 'next/image'
import Profile1 from "./../../Image/Group6.png"
import profile2 from './../../Image/Group6.png'

export default function page() {
  let sellerUrl = "https://quickpark-backend.vercel.app/api/sellerpost"

    async function sellerApi() {
        let res = await fetch(sellerUrl)
        let data = await res.json()
        console.log(data)
        return data
    }
    let [seller, setSeller] = useState([])
    useEffect(() =>{
    sellerApi().then((data) => {
          setSeller(data.Seller)
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
                  {test.user.fullname}
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
