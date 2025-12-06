"use client"
import {useEffect, useState, useRef, use, Suspense} from 'react'
import "./style.css"
import Image from 'next/image'
import Link from 'next/link'
import Profile1 from "./../Image/Group6.png"
import profile2 from './../Image/Group6.png'
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams} from 'next/navigation'
import { clearPreviewData } from 'next/dist/server/api-utils'
import { useTheme } from 'next-themes'
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow
} from '@vis.gl/react-google-maps'
import { set } from 'zod'



export default function layout({
 Price, Nav, Distance, Time, Seller
}) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter();

    // ⭐ ADDED — Helpers for Distance
    function toRad(value) {
    return (value * Math.PI) / 180;
    }
    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
    }
    
    const prices = searchParams.get('price')
    const id = searchParams.get('id')

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

    function isBigEnough(value) {
        return value <= 25;
    }

    // if(Test.price.filter(isBigEnough)){

    // }
    
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

const [post, setPost] = useState(null);
// function SellerCardModal({ id }) {

  useEffect(() => {
    if (!id) return;

    const fetchSeller = async () => {
      try {
        const res = await fetch(`https://quickpark-backend.vercel.app/api/sellerpost/${id}`, { cache: "no-store" });
        const data = await res.json();
        console.log("post 1 seller",data)
        return setPost(data);
        
      } catch (err) {
        console.error(err);
      }
    };

    fetchSeller();
  }, [id]);

    // ⭐ ADDED — Compute Distance Safely
    let distanceKm = null;
    if (lats && log && post?.lat && post?.long) {
      distanceKm = getDistance(
        lats, log,
        post.lat, post.long
      );
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
            {post && pathname === "/dashboard" && id ? (
            <div className='postpage'>
                <div className="insidepostcard">
                    <div className="closeBtn" onClick={() => router.push('/dashboard')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="postCard">
                        <div className="postcardMap">
                            <APIProvider apiKey='AIzaSyBHhvmsIAVbkqEelJxx5iB_K3OEVpuciwk'>
                                <div className="postmapcards">
                                    <Map className='mainMap' defaultZoom={14} defaultCenter={{lat: post.lat, lng: post.long}} mapId="3d1b9607105bf1d610120232">
                                        <AdvancedMarker position={{lat: post.lat, lng: post.long}}>
                                            <Pin / >
                                        </AdvancedMarker>
                                    </Map>
                                </div>
                            </APIProvider> 
                        </div>
                        <div className="postDetails">
                            <h2>
                                {post.locations}
                            </h2>
                            {/* ⭐ ADDED — Show Distance */}
                            {distanceKm && (
                            <p className="distanceInfo">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 21C16.4183 19 20 15.4183 20 11C20 6.58172 16.4183 3 12 3C7.58172 3 4 6.58172 4 11C4 15.4183 7.58172 19 12 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                                {distanceKm.toFixed(2)} km from you
                            </p>
                            )}

                            <div className="postcardTime">
                                <p>
                                    Available from: <b>{post.timeNeeded}</b>
                                </p>
                            </div>
                            <div className="postcardPrice">
                                <p>Price</p>
                                <p>£{post.price}</p>
                            </div>
                            <div className="profileInfo">
                                <div className="postcardProfile">
                                    <Image 
                                    src={Profile1}
                                    alt={"seller profile"}
                                    height={"40"}
                                    width={"40"}
                                    />

                                    <p>{post.accountname}</p>
                                </div>
                                <div className="contactBtn">
                                    <a href={`tel:${post.phonenumber}`}>
                                        <svg  viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.375 14.375H19.3875M14.375 14.375H14.3875M9.375 14.375H9.3875M19.125 23.8751L26.25 26.2501L23.875 19.1251C23.875 19.1251 25 17.5 25 14.375C25 8.50697 20.243 3.75 14.375 3.75C8.50697 3.75 3.75 8.50697 3.75 14.375C3.75 20.243 8.50697 25 14.375 25C17.6059 25 19.125 23.8751 19.125 23.8751Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="postImage">
                                <Image 
                                src={post.image ? post.image : profile2}
                                alt={"seller post image"}
                                height={post.imagewidth ? post.imageheight : "300"}
                                width={post.imageheight ? post.imagewidth : "400"}
                                /> 
                            </div>
                            <div className="bookBtn">
                                <Link className="book" href={`#`} >
                                    <p>book now</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : (
            post && pathname === "/dashboard?id=" && 
            <div className="error">
                <p>seller post has expired or does not exist</p>
            </div>
            )}
        </Suspense>

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
                            <path d="M18.0622 8.5C18.7138 9.62862 19.0374 10.9167 18.9966 12.2193C18.9557 13.5219 18.5521 14.7872 17.8311 15.8728C17.11 16.9584 16.1003 17.8212 14.9155 18.364C13.7307 18.9067 12.4179 19.108 11.1249 18.9451" stroke="white" strokeLinecap="round"/>
                            <path d="M10 9L14 5L10 1"/>
                            <path d="M5.93782 15.5C5.27676 14.355 4.95347 13.0462 5.0054 11.7251C5.05733 10.404 5.48234 9.12457 6.23124 8.03498C6.98013 6.9454 8.02229 6.09019 9.23708 5.56834C10.4519 5.04649 11.7896 4.87934 13.0955 5.08625" strokeLinecap="round"/>
                         </svg>
                         <p>
                            reload page
                         </p>
                    </div>
                    {
                        seller.length !== 0 ?
                  
                        seller.map((Tests)=>{
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
                                            <Image 
                                            src={Profile1}
                                            alt={"seller profile"}
                                            height={"35"}
                                            width={"35"}
                                            />

                                            <p>{Tests.accountname}</p>
                                        </div>
                                    </div>
                                    <Link className="PostBtn" href={`?id=${Tests._id}`} >
                                        <p>book now</p>
                                    </Link>
                                    
                                </div>
                            )    
                        })
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
                                        src={locations.image}
                                        alt={locations.accountname}
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
                        className='realMap'  mapId={"3d1b9607105bf1d610120232"}></Map>
                        }
                    </div>
                </APIProvider>
            </div>
        </div>
    </div>
  )
}
