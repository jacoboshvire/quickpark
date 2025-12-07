"use client"
import {useEffect, useState, use, Suspense} from 'react'
import "./style.css"
import { useTheme } from 'next-themes'




export default function layout({
 Price, Nav, Distance, Time, Seller, popup, Post
}) {
    
    const {themes, setThemes} = useTheme()
    let [togglebtn, setTogglebtn] = useState(false)
    let [togglebtn1, setTogglebtn1] = useState(false)
    let [togglebtn2, setTogglebtn2] = useState(false)
    let [togglebtn3, setTogglebtn3] = useState(false)

    const togglefun = () =>{
        setTogglebtn1(false)
        setTogglebtn2(false)
        setTogglebtn3(false)
        setTogglebtn((togglebtn) => (!togglebtn))
    }

    const togglefun1 = () => {
        setTogglebtn(false)
        setTogglebtn2(false)
        setTogglebtn3(false)
        setTogglebtn1((togglebtn1) => (!togglebtn1))
    }

    const togglefun2 = () => {
        setTogglebtn(false)
        setTogglebtn1(false)
        setTogglebtn3(false)
        setTogglebtn2((togglebtn2) => (!togglebtn2))
    }

    const togglefun3 = () => {
        setTogglebtn(false)
        setTogglebtn1(false)
        setTogglebtn2(false)
        setTogglebtn3((togglebtn3) => (!togglebtn3))
    }
    
  return (
    <div className="Dashboard">
        {Nav}
        <div className="mainFcontainer">
            <div className="insideMainContainer">
            <nav>
                <div className="title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 5L10 5M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M14 5L20 5M4 12H16M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM8 19H20M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19Z" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h2>
                    Filter by
                </h2>
                </div>
                <div className="catagories">
                <li onClick={togglefun} className={togglebtn ? "newLi" : ""}>
                    <p>
                    Price
                    </p>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {togglebtn && Price}
                </li>
                
                <li onClick={togglefun1} className={togglebtn1 ? "newLi" : ""}>
                    <p>
                    Distance
                    </p>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {togglebtn1 && Distance}
                </li>
                
                <li onClick={togglefun2} className={togglebtn2 ? "newLi" : ""}>
                    <p>
                    Time
                    </p>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {togglebtn2 && Time}
                </li>
                
                <li onClick={togglefun3} className={togglebtn3 ? "newLi" : ""}>
                    <p>
                    Seller
                    </p>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {togglebtn3 && Seller}
                </li>
                </div>
            </nav>
            </div>
        </div>
        <Suspense fallback={<div className="loading">Loading seller post...</div>}>
            {popup}
        </Suspense>
        <Suspense>
            {Post}
        </Suspense>
    </div>
  )
}
