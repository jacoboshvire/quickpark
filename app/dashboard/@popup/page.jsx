"use client"
import { usePathname, useSearchParams} from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
} from '@vis.gl/react-google-maps';
import Image from 'next/image'
import Profile1 from "../../Image/Group6.png"
import profile2 from '../../Image/Group6.png'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function popup() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const id = searchParams.get('id')

    const [post, setPost] = useState(null);

        //setting up geolocation
    const [lats, setLats] = useState(null);
    const [log, setLog] = useState(null);

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

    // calculating the Distance
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

    // ADDED — Compute Distance Safely
    let distanceKm = null;
    if (lats && log && post?.lat && post?.long) {
      distanceKm = getDistance(
        lats, log,
        post.lat, post.long
      );
    }
  return (
    <div>
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
    </div>
  )
}
