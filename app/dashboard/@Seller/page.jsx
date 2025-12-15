"use client"
import {useEffect, useState} from 'react'
import './../style.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


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
    // const [randomList, setRandomList] = useState([]);
    useEffect(() =>{
    sellerApi().then((data) => {
          setSeller(shuffleArray(data))
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
          seller.slice(0,3).map((test)=>{
            return(
                <div key={test._id} className='divcat' onClick={() => router.push(`/dashboard?seller=${test.username}`)}>
                  { test.username ? (test.username.length > 11 ? test.username.slice(0,11) + "..." : test.username) : "No Name"}
                </div>
            )
          })
        }
        <div className='divcat'>
            View all
        </div>
      </div>
    </div>
  )
}
