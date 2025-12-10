"use client"
import {useEffect, useState} from 'react'
import "./../style.css"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams} from 'next/navigation';
import { useTheme } from 'next-themes'
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow
} from '@vis.gl/react-google-maps'

export default function page() {
    let sellerUrl = "https://quickpark-backend.vercel.app/api/sellerpost"

    const pathname = usePathname()
    const searchParams = useSearchParams()  

    // Extract multiple filters
    const price = searchParams.get("price"); // example "5-25"
    const distance = searchParams.get("distance"); // example "2000"
    const time = searchParams.get("time"); // example "morning"
    const sellerName = searchParams.get("seller"); // example "jacob"
    const searchQuery = searchParams.get("search"); // example "london"

    // USER LOCATION FOR DISTANCE FILTER
    const [lants, setLants] = useState(null);
    const [long, setLong] = useState(null);


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
    
    const {themes, setThemes} = useTheme()

    // PRICE RANGE PARSE
    let minPrice = null;
    let maxPrice = null;

    if (price) {
        const [min, max] = price.split("-");
        minPrice = Number(min);
        maxPrice = Number(max);
    }

    // MULTI-FILTER SYSTEM
    const filteredSellers = seller.filter((item) => {
        // 1️⃣ PRICE RANGE FILTER
        if (price) {
            if (!(item.price >= minPrice && item.price <= maxPrice)) {
                return false;
            }
        }

        // 2️⃣ SELLER NAME FILTER
        if (sellerName) {
            if (
                !item.user?.fullname
                    ?.toLowerCase()
                    .includes(sellerName.toLowerCase())
            ) {
                return false;
            }
        }

        // 3️⃣ TIME FILTER
        if (time) {
            const itemTime = item.timeNeeded?.toLowerCase();

            if (time === "morning" && !itemTime?.includes("am")) return false;
            if (time === "evening" && !itemTime?.includes("pm")) return false;
        }

        // 4️⃣ DISTANCE FILTER
        if (distance && lants && long) {
            const d = calculateDistance(lants, long, item.lat, item.long);
            if (d > Number(distance)) return false;
        }


        // 5️ REGEX LOCATION SEARCH 
        if (searchQuery) {
            // escape regex special characters
            const safe = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            const regex = new RegExp(safe, "i"); // i = ignore case

            if (!regex.test(item.locations)) {
                return false;
            }
        }


        return true; // passes all filters
    });

    //setting up geolocation
    const [lats, setLats] = useState(null);
    const [log, setLog] = useState(null);

    const { theme, setTheme } = useTheme()

    useEffect(()=>{
        if(!navigator.geolocation){
            console.log("null")
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLats(position.coords.latitude)
                    setLog(position.coords.longitude)
                    console.log([setLats, setLog])
                }
            )
        } 
    },[setLats, setLog])
  return (
           <div className="mainBody">
            <div className="sellerSpace">
                {/* numebers of seller space */}
                <div className="numOfPost">
                    <p>
                        <b>"{seller.length}"</b> Car park available for grabs
                    </p>
                </div>
                {/* sellers spaces */}
                <div className="sellers">
                    <div className="reloadpage" onClick={() => window.location.reload()}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 15L10 19L14 23"/>
                            <path d="M18.0622 8.5C18.7138 9.62862 19.0374 10.9167 18.9966 12.2193C18.9557 13.5219 18.5521 14.7872 17.8311 15.8728C17.11 16.9584 16.1003 17.8212 14.9155 18.364C13.7307 18.9067 12.4179 19.108 11.1249 18.9451"  strokeLinecap="round"/>
                            <path d="M10 9L14 5L10 1"/>
                            <path d="M5.93782 15.5C5.27676 14.355 4.95347 13.0462 5.0054 11.7251C5.05733 10.404 5.48234 9.12457 6.23124 8.03498C6.98013 6.9454 8.02229 6.09019 9.23708 5.56834C10.4519 5.04649 11.7896 4.87934 13.0955 5.08625" strokeLinecap="round"/>
                         </svg>
                         <p>
                            reload page
                         </p>
                    </div>
                    {
                        filteredSellers.length !== 0 ?
                  
                        filteredSellers.map((Tests)=>{
                            return(
                                <div className="post" key={Tests._id}>
                                    <div className="PostMap">
                                        <APIProvider apiKey='AIzaSyBHhvmsIAVbkqEelJxx5iB_K3OEVpuciwk'>
                                            <div className="postmaps">
                                                <Map className='mainMap' zoom={14} defaultCenter={{lat: Tests.lat, lng: Tests.long}} mapId="3d1b9607105bf1d610120232">
                                                    <AdvancedMarker position={{lat: Tests.lat, lng: Tests.long}}>
                                                        <Pin / >
                                                    </AdvancedMarker>
                                                </Map>
                                            </div>
                                        </APIProvider> 
                                    </div>
                                    <div className="postlocation">
                                        <h2>
                                            {Tests.locations}
                                        </h2>
                                        <div className="priceL">
                                            <p>
                                            Price
                                            </p>
                                            <p>  
                                                £{Tests.price}
                                            </p>
                                        </div>
                                        <div className="postProfile">
                                            <div className="avatar">
                                                <Image 
                                                src={Tests.user.avatar}
                                                alt={"seller profile"}
                                                height={1000}
                                                width={1000}
                                                />
                                            </div>

                                            <p>{Tests.user.fullname.substring(0, 20)}</p>
                                        </div>
                                    </div>
                                    <Link className="PostBtn" href={`?id=${Tests._id}`} >
                                        <p>book now</p>
                                    </Link>
                                    
                                </div>
                            )    
                        }).slice().reverse()
                        :
                        <div className='noPost'>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.0283 1.75H10.9714V10.9717H1.75V13.0288H10.9714V22.25H13.0283V13.0288H22.25V10.9717H13.0283V1.75Z" />
                                <path opacity="0.4" d="M19.9747 5.47934L18.5203 4.0249L11.9996 10.5456L5.47902 4.02507L4.02441 5.47968L10.545 12.0002L4.02459 18.5206L5.47902 19.975L11.9994 13.4547L18.5201 19.9754L19.9747 18.5208L13.454 12.0001L19.9747 5.47934Z" />
                            </svg>
                            <p>No seller available yet</p>
                        </div>
                    }
                </div>
            </div>
            <div className="map">
                <APIProvider apiKey='AIzaSyBHhvmsIAVbkqEelJxx5iB_K3OEVpuciwk'>
                    <div className="maps" >
                        { lats ?
                        <Map defaultZoom={15} defaultCenter={{lat: lats, lng:log} } 
                        className='realMap'  mapId="3d1b9607105bf1d610120232">
                            <AdvancedMarker position={{lat:lats,lng:log}}>
                                <div className="yourLocation">
                                    <span className='dotLocation'></span>
                                </div> 
                            </AdvancedMarker>
                             {seller.map((locations) => (
                                <AdvancedMarker
                                key={locations._id}
                                position={{lat:locations.lat , lng:locations.long}} >
                                <div className='sellerMapBtn'>
                                    <Link href={`?id=${locations._id}`}>
                                         <Image
                                        src={locations.user.avatar}
                                        alt={locations.user.fullname}
                                        height={"40"}
                                        width={"40"}
                                    />
                                    </Link>
                                   
                                    <span></span>
                                </div>
                                </AdvancedMarker>
                            ))}
                        </Map>
                        :
                        <Map zoom={7} defaultCenter={{lat: 55.3781, lng: -3.4360}} 
                        className='realMap'  mapId={"3d1b9607105bf1d610120232"}>
                             {seller.map((locations) => (
                                <AdvancedMarker
                                key={locations._id}
                                position={{lat:locations.lat , lng:locations.long}} >
                                <div className='sellerMapBtn'>
                                    <Link href={`?id=${locations._id}`}>
                                         <Image
                                        src={locations.user.avatar}
                                        alt={locations.user.fullname}
                                        height={"40"}
                                        width={"40"}
                                    />
                                    </Link>
                                   
                                    <span></span>
                                </div>
                                </AdvancedMarker>
                            ))}                          
                        </Map>
                        }
                    </div>
                </APIProvider>
            </div>
        </div>
  )
}
