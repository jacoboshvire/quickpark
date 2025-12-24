"use client"
import {useEffect, useState, use, Suspense} from 'react'
import "./style.css"
import { useTheme } from 'next-themes'
import Link from "next/link"
import Image from 'next/image'
import "./@Nav/styleNav.css"
import { useRouter} from 'next/navigation'


export default function layout({
 Price, Nav, Distance, Time, Seller, popup, Post, successMsg, Notifications, Booking
}) {

    const router = useRouter()

    //setting up geolocation
      const [lat, setLat] = useState(null);
      const [log, setLog] = useState(null);
      let [mapData, setMapDate] = useState("");
      let [err, setErr] = useState(false)

    useEffect(()=>{
          if(!navigator.geolocation){
              console.log("null")
          } else {

              navigator.geolocation.getCurrentPosition(
                  (position) => {
                    setLat(position.coords.latitude)
                    setLog(position.coords.longitude)
                    console.log([setLat, setLog])
                  }
              )
          } 
      },[setLat, setLog])

    function handleSearchChange(e) {
      const value = e.target.value;
      setSearchText(value);

      const url = new URL(window.location.href);

      if (value.trim() === "") {
          url.searchParams.delete("search");
      } else {
          url.searchParams.set("search", value);
      }

      router.replace(url.toString()); // ← triggers re-render
    }
  
      let apiKey = 'AIzaSyBHhvmsIAVbkqEelJxx5iB_K3OEVpuciwk'
      let googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${log}&key=${apiKey}`
  
      async function googleApi() {
          let res = await fetch(googleUrl)
          let data = await res.json()
          return data
      }
      useEffect(() =>{
      googleApi().then((data) => {
              let dataMap = data.results[0].formatted_address
              console.log(data)
              setMapDate(data.results[0].formatted_address)
             
          }).catch(e=>{
              setErr(true)
          })
      })

    function getCookie(name) {
      return document.cookie
        .split("; ")
        .find(row => row.startsWith(name + "="))
        ?.split("=")[1];
    }

    let userApi = async () => {
      const token = getCookie("token"); // read JWT manually

      let res = await fetch("https://quickpark-backend.vercel.app/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      return data;
    };

    let [userData, setUserData] = useState({});

    useEffect(() => {
      userApi()
        .then(data => {
          setUserData(data);
          console.log("USER:", data);
        })
        .catch(err => console.log(err));
    }, []);



    
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

    //small size screen

    let [togglebtnmin, setTogglebtnmin] = useState(false)
    let [togglebtnmin1, setTogglebtnmin1] = useState(false)
    let [togglebtnmin2, setTogglebtnmin2] = useState(false)
    let [togglebtnmin3, setTogglebtnmin3] = useState(false)

    const funBtu = () =>{
        setTogglebtnmin(togglebtnmin => !togglebtnmin)
    }

    const funBtu1 = () =>{
        setTogglebtnmin1(togglebtnmin1 => !togglebtnmin1)
    }
    const funBtu2 = () =>{
        setTogglebtnmin2(togglebtnmin2 => !togglebtnmin2)
    }
    const funBtu3 = () =>{
        setTogglebtnmin3(togglebtnmin3 => !togglebtnmin3)
    }

    let [toggleFilter, setToggleFilter] = useState(false)

    const funFilter = () => {
        setToggleFilter(toggleFilter => !toggleFilter)
    }

      let [unreadCount, setUnreadCount] = useState(0)
  const token =
  typeof window !== "undefined"
    ? document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]
    : null;


  useEffect(() => {
    if (!token);
    let intervalId
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch(
          "https://quickpark-backend.vercel.app/api/notification/unread-count",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) return;
        const data = await res.json();
        setUnreadCount(data.count || 0);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUnreadCount();

    // Auto refresh every 10 seconds
    intervalId = setInterval(fetchUnreadCount, 10000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [token]);
    
  return (
    <div className="Dashboard">
        {Nav}
        <div className="minNavSearch">
          <div className="minnav">
            <div className="sellerFilter">
              <Link href={"/seller"}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3V9M3 9H9M3 9C5.32744 6.91141 7.48287 4.54676 10.7453 4.08779C12.6777 3.81593 14.6461 4.17941 16.3539 5.12343C18.0617 6.06746 19.4164 7.54091 20.2139 9.32177M21 21V15M21 15H15M21 15C18.6725 17.0886 16.5171 19.4532 13.2547 19.9122C11.3223 20.1841 9.35391 19.8206 7.6461 18.8766C5.93829 17.9325 4.58356 16.4591 3.78604 14.6782" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>              
              </Link>
              <div className={ toggleFilter ? "filter addOn" : "filter"} onClick={funFilter}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 5L10 5M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M14 5L20 5M4 12H16M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM8 19H20M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19Z" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
              </div>
            </div>

            <div className="otherActivity">
                <div className={"notificaton"} onClick={()=>router.push("/dashboard?notification=true")}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17V18C9 18.394 9.0776 18.7841 9.22836 19.1481C9.37913 19.512 9.6001 19.8427 9.87868 20.1213C10.1573 20.3999 10.488 20.6209 10.8519 20.7716C11.2159 20.9224 11.606 21 12 21C12.394 21 12.7841 20.9224 13.1481 20.7716C13.512 20.6209 13.8427 20.3999 14.1213 20.1213C14.3999 19.8427 14.6209 19.512 14.7716 19.1481C14.9224 18.7841 15 18.394 15 18V17M18 9C18 12 20 17 20 17H4C4 17 6 13 6 9C6 5.732 8.732 3 12 3C15.268 3 18 5.732 18 9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {
                    unreadCount > 0 && 
                  <div className="redColors">
                    <p>
                      {unreadCount > 99 ? "+99" : unreadCount}
                    </p>
                  </div>   }
                </div> 
              <Link className="profile" id="addlinkStyle" href={"/profile"}>
                <Image src={userData.avatar ? userData.avatar : "https://res.cloudinary.com/dr0yyqvj6/image/upload/v1765055574/avatar_l6mc3s.png"}
                  alt={userData.username ? userData.username : "profile"}
                  height={150}
                  width={150}
                />
              </Link>
            </div>
          </div>
          <div className="minsearch">
            <form id="searchFrom" className='searchFrom' onChange={handleSearchChange}> 
                <label htmlFor="search">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 20L15.8033 15.8033M18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C14.6421 18 18 14.6421 18 10.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    {/* <p>search for location here...</p> */}
                  </label>
                <input type="search" name="search" id="seach" placeholder={mapData ? mapData.slice(0, 21)+(mapData.length <= 20 ? "" : "..."): "search for location here..."} defaultValue={mapData ? mapData.slice(0, 21)+(mapData.length <= 20 ? "" : "..."): "search for location here..."}/>
            </form>
          </div>
        </div>
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

            {
                toggleFilter && 
                <div className="minFilter">
                    <div className="inside">
                        <div className="titles">
                            <h2>
                                Filter
                            </h2>
                        </div>
                        <div className={ togglebtnmin ? "cart newCart" : "cart"} onClick={funBtu}>
                            <p>Price</p>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 10L12 15L17 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {togglebtnmin  && Price}
                        </div>
                        <div className={ togglebtnmin1 ? "cart newCart" : "cart"} onClick={funBtu1}>
                            <p>Distance</p>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 10L12 15L17 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {togglebtnmin1 && Distance}
                        </div>
                        <div className={ togglebtnmin2 ? "cart newCart" : "cart"} onClick={funBtu2}>
                            <p>Time</p>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 10L12 15L17 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {togglebtnmin2 && Time}
                        </div>
                        <div className={ togglebtnmin3 ? "cart newCart" : "cart"} onClick={funBtu3}>
                            <p>Seller</p>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 10L12 15L17 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {togglebtnmin3 && Seller}
                        </div>
                    </div>
                </div>
            }
        </div>
        <Suspense>
          {Booking}
        </Suspense>
        <Suspense>
          {Notifications}
        </Suspense>
        <Suspense>
            {successMsg}
        </Suspense>
        <Suspense fallback={<div className="loading">Loading seller post...</div>}>
            {popup}
        </Suspense>
        <Suspense>
            {Post}
        </Suspense>
    </div>
  )
}
