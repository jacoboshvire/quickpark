"use client"
import { usePathname, useSearchParams} from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
} from '@vis.gl/react-google-maps';
import Image from 'next/image';
import profile2 from '../../Image/Group6.png';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import "./style.css"

export default function popup() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()


    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(`https://quickparks.vercel.app/${pathname}?${searchParams.toString()}`);
        setCopied(true);

        // Hide the message after 2 seconds
        setTimeout(() => setCopied(false), 2000);
    };

    const id = searchParams.get('id')

    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [errorB, setErrorB] = useState("");
    const [success, setSuccess] = useState("")

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
            console.log(data.user)
            return setPost(data);
            
          } catch (err) {
            // console.error(err);
            return setError("Post has expired or does not exist");
          }
        };
    
        fetchSeller();
    }, [id]);

    function getCookie(name) {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith(name + "="))
            ?.split("=")[1];
    }

    const bookParking = async (id) => {
        try {
            const token = getCookie("token");
            const res = await fetch(
            `https://quickpark-backend.vercel.app/api/booking/book/${id}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );

            const data = await res.json();

            if (!res.ok) {
            setErrorB(data.message);
            return;
            }

            setSuccess("Booking request sent!");
            console.log("Booking:", data.booking);
        } catch (e) {
            console.error("Booking error:", e);
            setErrorB("Something went wrong");
        }
    };


    // ADDED — Compute Distance Safely
    let distanceKm = null;
    if (lats && log && post?.lat && post?.long) {
      distanceKm = getDistance(
        lats, log,
        post.lat, post.long
      );
    }
    
    // Remove error message
    const removeError = () => {
        setError(null);
    };
  return (
    <div>
        {
            success && 
             <div className="messageBooking">
                <p>
                    {success}
                </p>
                <div className="cancelBooking" onClick={()=>setSuccess("")}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        }
        {
            errorB && 
             <div className="messageBooking">
                <p className='errorColor'>
                    {errorB}
                </p>
                <div className="cancelBooking" onClick={()=>setErrorB("")}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        }
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
                                {post.locations.slice(0,30)} {post.locations.length > 30 ? "..." : ""}
                            </h2>
                            {/*Show Distance */}
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
                                    <div className="avatar">
                                        <Image 
                                        src={post?.user?.avatar || "https://res.cloudinary.com/dr0yyqvj6/image/upload/v1765055574/avatar_l6mc3s.png"}
                                        alt={"seller profile"}
                                        height={"30"}
                                        width={"30"}
                                        />
                                    </div>

                                    <p>{post?.user?.fullname&&(post.user.fullname.length > 20 ? post.user.fullname.substring(0, 10) + "..." : post.user.fullname) || "unknown user"}</p>
                                </div>
                                <div className="contactBtn">
                                    <a href={`tel:${post.phonenumber}`}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Iconly/Curved/Light/Calling">
                                        <g id="Calling">
                                        <path id="Stroke 1" d="M14.3525 2.75011C18.0535 3.16111 20.9775 6.08111 21.3935 9.78211"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path id="Stroke 3" d="M14.3525 6.29311C16.1235 6.63711 17.5075 8.02211 17.8525 9.79311"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path id="Stroke 5" fillRule="evenodd" clipRule="evenodd" d="M7.70049 16.299C0.802504 9.40022 1.78338 6.24115 2.51055 5.22316C2.60396 5.05862 4.90647 1.61188 7.37459 3.63407C13.5008 8.67945 5.7451 7.96611 10.8894 13.1113C16.0348 18.2554 15.3203 10.5 20.3659 16.6249C22.3882 19.094 18.9413 21.3964 18.7778 21.4888C17.7598 22.217 14.5995 23.1978 7.70049 16.299Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </g>
                                        </g>
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
                                <Link className="book" href={`#`} onClick={() => bookParking(id)}>
                                    <p>book now</p>
                                </Link>
                                <div onClick={handleCopy} className="shareLink">
                                    {copied ? 
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 14L9 17L18 6" strokeidth="2"/>
                                    </svg>
                                        : 
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 7C14 6.06812 14 5.60218 13.8478 5.23463C13.6448 4.74458 13.2554 4.35523 
                                        12.7654 4.15224C12.3978 4 11.9319 4 11 4H8C6.11438 4 5.17157 4 4.58579 4.58579C4 5.17157 
                                        4 6.11438 4 8V11C4 11.9319 4 12.3978 4.15224 12.7654C4.35523 13.2554 4.74458 13.6448 5.23463 
                                        13.8478C5.60218 14 6.06812 14 7 14" strokeWidth="1.5"/>
                                        <rect x="10" y="10" width="10" height="10" rx="2" strokeWidth="1.5"/>
                                    </svg>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : (
            post && pathname === "/dashboard?id=" && id === null ? (
                <div className="error">
                    <p>seller post has expired or does not exist</p>
                    <div className="cancelBtn" onClick={() => router.push('/dashboard')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            ) : error ? (
            <div className="error">
                <p>{error}</p>
                    <Link href={"/dashboard"} className="cancelBtn" onClick={removeError}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
            </div>
            ) : (null))
            } 
    </div>
  )
}
