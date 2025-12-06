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


    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(`https://quickparks.vercel.app/${pathname}?${searchParams.toString()}`);
        setCopied(true);

        // Hide the message after 2 seconds
        setTimeout(() => setCopied(false), 2000);
    };

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
                                <Link className="book" href={`#`} >
                                    <p>book now</p>
                                </Link>
                                <div onClick={handleCopy} className="shareLink">
                                    {copied ? 
                                    // <div className="copyicon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="Iconly/Regular/Outline/Tick Square">
                                            <g id="Tick Square">
                                            <path id="Fill 1" fillRule="evenodd" clipRule="evenodd" d="M7.665 3.5C5.135 3.5 3.5 5.233 3.5 7.916V16.084C3.5 18.767 5.135 20.5 7.665 20.5H16.333C18.864 20.5 20.5 18.767 20.5 16.084V7.916C20.5 5.233 18.864 3.5 16.334 3.5H7.665ZM16.333 22H7.665C4.276 22 2 19.622 2 16.084V7.916C2 4.378 4.276 2 7.665 2H16.334C19.723 2 22 4.378 22 7.916V16.084C22 19.622 19.723 22 16.333 22Z" />
                                            <path id="Fill 3" fillRule="evenodd" clipRule="evenodd" d="M10.8134 15.1229C10.6224 15.1229 10.4294 15.0499 10.2834 14.9029L7.90945 12.5299C7.61645 12.2369 7.61645 11.7629 7.90945 11.4699C8.20245 11.1769 8.67645 11.1769 8.96945 11.4699L10.8134 13.3119L15.0294 9.09695C15.3224 8.80395 15.7964 8.80395 16.0894 9.09695C16.3824 9.38995 16.3824 9.86395 16.0894 10.1569L11.3434 14.9029C11.1974 15.0499 11.0054 15.1229 10.8134 15.1229Z"/>
                                            </g>
                                            </g>
                                        </svg>
                                    // </div> 
                                    : 
                                    // <div className="sharelink">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="Iconly/Regular/Outline/Send">
                                            <g id="Send">
                                            <mask id="mask0_33437_4693" maskUnits="userSpaceOnUse" x="2" y="3" width="20" height="20">
                                            <path id="Clip 2" fillRule="evenodd" clipRule="evenodd" d="M2 3.00037H21.499V22.4994H2V3.00037Z" fill="white"/>
                                            </mask>
                                            <g mask="url(#mask0_33437_4693)">
                                            <path id="Fill 1" fillRule="evenodd" clipRule="evenodd" d="M10.8049 14.8178L14.4619 20.7508C14.6219 21.0108 14.8719 21.0078 14.9729 20.9938C15.0739 20.9798 15.3169 20.9178 15.4049 20.6228L19.9779 5.17777C20.0579 4.90477 19.9109 4.71877 19.8449 4.65277C19.7809 4.58677 19.5979 4.44577 19.3329 4.52077L3.87695 9.04677C3.58394 9.13277 3.51994 9.37877 3.50594 9.47977C3.49194 9.58277 3.48794 9.83777 3.74695 10.0008L9.74794 13.7538L15.0499 8.39577C15.3409 8.10177 15.8159 8.09877 16.1109 8.38977C16.4059 8.68077 16.4079 9.15677 16.1169 9.45077L10.8049 14.8178ZM14.8949 22.4998C14.1989 22.4998 13.5609 22.1458 13.1849 21.5378L9.30794 15.2468L2.95194 11.2718C2.26694 10.8428 1.90894 10.0788 2.01994 9.27577C2.12994 8.47277 2.68094 7.83477 3.45494 7.60777L18.9109 3.08177C19.6219 2.87377 20.3839 3.07077 20.9079 3.59277C21.4319 4.11977 21.6269 4.88977 21.4149 5.60377L16.8419 21.0478C16.6129 21.8248 15.9729 22.3738 15.1719 22.4808C15.0779 22.4928 14.9869 22.4998 14.8949 22.4998Z"/>
                                            </g>
                                            </g>
                                            </g>
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
            post && pathname === "/dashboard?id=" && 
            <div className="error">
                <p>seller post has expired or does not exist</p>
            </div>
        
        )} 
    </div>
  )
}
