import React from 'react'
import './../style.css'
import Image from 'next/image'
import Profile1 from "./../../Image/Group6.png"
import profile2 from './../../Image/Group6.png'

export default function page() {
  let Test = [
    {
    location : "Kiln House, Spark st, Stoke-on-trent",
    price: "5",
    postlat: 53.0854,
    postlog: -2.4339,
    id: 1,
    user: {
        username : "sarah_lovemoney",
        image: Profile1
    }

    },{
    location : "Holiday Inn London - Camden Lock by IHG",
    price: "10",
    postlat: 53.0111,
    postlog: -2.1506,
    id: 2,
    user:{
        username: "jane_cheap",
        image: profile2
    }   
    },{
    location : "Holiday Inn London - Camden Lock by IHG",
    price: "10",
    postlat: 53.0111,
    postlog: -2.1506,
    id: 3,
    user:{
        username: "jane_cheap",
        image: profile2
    }   
    },{
    location : "Holiday Inn London - Camden Lock by IHG",
    price: "10",
    postlat: 53.0111,
    postlog: -2.1506,
    id: 4,
    user:{
        username: "jane_cheap",
        image: profile2
    }   
    },{
    location : "Holiday Inn London - Camden Lock by IHG",
    price: "10",
    postlat: 53.0111,
    postlog: -2.1506,
    id: 5,
    user:{
        username: "jane_cheap",
        image: profile2
    }   
    },{
    location : "Holiday Inn London - Camden Lock by IHG",
    price: "10",
    postlat: 53.0111,
    postlog: -2.1506,
    id: 2,
    user:{
        username: "jane_cheap",
        image: profile2
    }   
    }]
  return (
    <div className='dropDown'>
      <div className="list">
        <div>
            All
        </div>
        {
          Test.map((test)=>{
            return(
                <div key={test.id}>
                  {test.user.username}
                </div>
            )
          }).slice(0,3)
        }
        <div>
            View all
        </div>
      </div>
    </div>
  )
}
