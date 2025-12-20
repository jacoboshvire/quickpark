"use client"
import {useEffect, useState, useRef, use} from 'react'
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams} from 'next/navigation';
import "./styleNav.css"
import "./../../globals.css"
//this are for next js link and navigation
import Link from 'next/link';
import Image from 'next/image';
import Profile from "./../../Image/Group6.png"

function page() {
      //setting up geolocation
      const [lat, setLat] = useState(null);
      const [log, setLog] = useState(null);
      let [mapData, setMapDate] = useState("");
      let [err, setErr] = useState(false)
      const router = useRouter()
      const pathname = usePathname()
      const searchParams = useSearchParams()   

      const searchQuery = searchParams.get("search")?.toLowerCase() || "";
      const [searchText, setSearchText] = useState(searchQuery);
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

    let [unreadCount, setUnreadCount] = useState(0)

  const token =
  typeof window !== "undefined"
    ? document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]
    : null;


  useEffect(() => {
    if (!token) return;

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
  }, [token]);

  return (
    <div className="navBar">
        <nav>
          <div className="logo_searchBar">
            <div className="logoDesign">
                <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 8.4375C0 3.7776 2.15863 0 4.82143 0H15.2679C19.2621 0 22.5 5.6664 22.5 12.6562V25.3125H0V8.4375Z" />
                <path d="M0 8.4375L25.7143 8.4375C28.0812 8.4375 30 11.7954 30 15.9375V25.3125H0V8.4375Z" />
                <path d="M25.1786 24.8438C25.1786 27.6915 23.8594 30 22.2321 30C20.6049 30 19.2857 27.6915 19.2857 24.8438C19.2857 21.996 20.6049 19.6875 22.2321 19.6875C23.8594 19.6875 25.1786 21.996 25.1786 24.8438Z" />
                <path d="M8.03571 24.8438C8.03571 27.6915 6.71655 30 5.08929 30C3.46202 30 2.14286 27.6915 2.14286 24.8438C2.14286 21.996 3.46202 19.6875 5.08929 19.6875C6.71655 19.6875 8.03571 21.996 8.03571 24.8438Z" />
                </svg>

                <h1>
                    QuickPark
                </h1>

            </div>

            <div className="searchBar">
              <form id="searchFrom" className='searchFrom' onChange={handleSearchChange}> 
                <label htmlFor="search">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 20L15.8033 15.8033M18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C14.6421 18 18 14.6421 18 10.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>

                  {/* <p>search for location here...</p> */}
                </label>
                <input type="search" name="search" id="seach" placeholder={mapData ? mapData: "search for location here..."} defaultValue={mapData ? mapData: "search for location here..."}/>
              </form>
            </div>
          </div>
          <div className="otherActivity">
            <div className="sellSpace">
              <Link href={"/seller"} className='sellLink'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3V9M3 9H9M3 9C5.32744 6.91141 7.48287 4.54676 10.7453 4.08779C12.6777 3.81593 14.6461 4.17941 16.3539 5.12343C18.0617 6.06746 19.4164 7.54091 20.2139 9.32177M21 21V15M21 15H15M21 15C18.6725 17.0886 16.5171 19.4532 13.2547 19.9122C11.3223 20.1841 9.35391 19.8206 7.6461 18.8766C5.93829 17.9325 4.58356 16.4591 3.78604 14.6782" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>
                Sell your space
              </p>
              </Link>
            </div>
              <div className="notificaton" onClick={()=>router.push("/dashboard?notification=true")}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 17V18C9 18.394 9.0776 18.7841 9.22836 19.1481C9.37913 19.512 9.6001 19.8427 9.87868 20.1213C10.1573 20.3999 10.488 20.6209 10.8519 20.7716C11.2159 20.9224 11.606 21 12 21C12.394 21 12.7841 20.9224 13.1481 20.7716C13.512 20.6209 13.8427 20.3999 14.1213 20.1213C14.3999 19.8427 14.6209 19.512 14.7716 19.1481C14.9224 18.7841 15 18.394 15 18V17M18 9C18 12 20 17 20 17H4C4 17 6 13 6 9C6 5.732 8.732 3 12 3C15.268 3 18 5.732 18 9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {
                  unreadCount > 0 && 
                <div className="redColors">
                  <p>
                    {unreadCount}
                  </p>
                </div>   }
              </div> 
           
            <Link className="profile" href={"/profile"}>
              <Image src={userData.avatar ? userData.avatar : "https://res.cloudinary.com/dr0yyqvj6/image/upload/v1765055574/avatar_l6mc3s.png"}
                alt='profile'
                height={"50"}
                width={"50"}
              />
            </Link>
          </div>
          
        </nav>
    </div>
  )
}

export default page