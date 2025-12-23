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
            alert(data.message);
            return;
            }

            alert("Booking request sent!");
            console.log("Booking:", data.booking);
        } catch (err) {
            console.error("Booking error:", err);
            alert("Something went wrong");
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
                                        <path d="M14.353 2.5C18.054 2.911 20.978 5.831 21.393 9.532"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M14.353 6.043C16.124 6.387 17.508 7.772 17.853 9.543" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.0315 12.4724C15.0205 16.4604 15.9254 11.8467 18.4653 14.3848C20.9138 16.8328 22.3222 17.3232 19.2188 20.4247C18.8302 20.737 16.3613 24.4943 7.68447 15.8197C-0.993406 7.144 2.76157 4.67244 3.07394 4.28395C6.18377 1.17385 6.66682 2.58938 9.11539 5.03733C11.6541 7.5765 7.04254 8.48441 11.0315 12.4724Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                                    // <div className="copyicon">
                                    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="9"  strokeWidth="1.5"/>
                                    <path d="M6 10L9 13L14 7"  strokeWidth="1.5"/>
                                    </svg>

                                    // </div> 
                                    : 
                                    // <div className="sharelink">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 3H9C6.79086 3 5 4.79086 5 7V15" strokeWidth="1.5"/>
                                            <path d="M13.5 7C14.696 7 15.5096 7.00158 16.1279 7.07129C16.726 7.13873 17.0169 7.25897 17.2178 7.41309C17.3564 7.51946 17.4805 7.64361 17.5869 7.78223C17.741 7.98307 17.8613 8.274 17.9287 8.87207C17.9984 9.49043 18 10.304 18 11.5V15.5C18 16.696 17.9984 17.5096 17.9287 18.1279C17.8613 18.726 17.741 19.0169 17.5869 19.2178C17.4805 19.3564 17.3564 19.4805 17.2178 19.5869C17.0169 19.741 16.726 19.8613 16.1279 19.9287C15.5096 19.9984 14.696 20 13.5 20C12.304 20 11.4904 19.9984 10.8721 19.9287C10.274 19.8613 9.98307 19.741 9.78223 19.5869C9.64361 19.4805 9.51946 19.3564 9.41309 19.2178C9.25897 19.0169 9.13873 18.726 9.07129 18.1279C9.00158 17.5096 9 16.696 9 15.5V11.5C9 10.304 9.00158 9.49043 9.07129 8.87207C9.13873 8.274 9.25897 7.98307 9.41309 7.78223C9.51946 7.6436 9.6436 7.51946 9.78223 7.41309C9.98307 7.25897 10.274 7.13873 10.8721 7.07129C11.4904 7.00158 12.304 7 13.5 7Z" strokeWidth="1.5"/>
                                        </svg>
                                    // </div>
                                    }
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
