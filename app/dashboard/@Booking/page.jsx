"use client"
import { usePathname, useSearchParams, useRouter} from 'next/navigation';
import { useState, useEffect } from 'react';
import "./style.css"


export default function page() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
    const booking = searchParams.get("booking")
    function getCookie(name) {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith(name + "="))
            ?.split("=")[1];
    }

    const [message, setMessage] = useState("")

    const acceptBooking = async (booking) => {
        try {
            const token = getCookie("token");
            const res = await fetch(
            `https://quickpark-backend.vercel.app/api/booking/booking/${booking}/accept`,
            {
                method: "PUT",
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
            );

            const data = await res.json();

            if (!res.ok) {
            setMessage(data.message);
            return;
            }

            setMessage("Booking confirmed!");
        } catch (err) {
            console.error(err);
            setMessage("Failed to accept booking");
        }
    };

    const rejectBooking = async (booking) => {
    try {
        const token = getCookie("token");
        const res = await fetch(
        `https://quickpark-backend.vercel.app/api/booking/booking/${booking}/reject`,
        {
            method: "PUT",
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
        );

        const data = await res.json();

        if (!res.ok) {
        setMessage(data.message);
        return;
        }

        setMessage("Booking rejected");
    } catch (err) {
        console.error(err);
        setMessage("Failed to reject booking");
    }
    };

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(`QP${booking.slice(3, 9)}`);
        setCopied(true);

        // Hide the message after 2 seconds
        setTimeout(() => setCopied(false), 2000);
    };


    const [originalNode, setOriginalNode] = useState({});

    async function fetchBookingById(booking) {
    try {
        const token = getCookie("token"); 

        const res = await fetch(
        `https://quickpark-backend.vercel.app/api/booking/booking/${booking}`,
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        }
        );

        if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch booking");
        }

        const bookingData = await res.json();
        setOriginalNode(bookingData); // ✅ correct place
        console.log("BOOKING:", bookingData);
    } catch (err) {
        console.error("FETCH BOOKING ERROR:", err);
    }
    }

    useEffect(() => {
    if (booking) {
        fetchBookingById(booking); // booking is the bookingId
    }
    }, [booking]);




  return (
    <>
    {
        message &&
        <div className="messageBooking">
            <p>
                {message}
            </p>
            <div className="cancelBooking" onClick={()=>setMessage("")}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    }
    {
        booking && pathname === "/dashboard" && booking ? (
        <div className='bookingPage'>
            <div className="insideBookingPage">
                <div className="cancelBooking" onClick={()=>router.push("/dashboard")}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                { originalNode.status !== "CONFIRMED" &&
                <div className="bookingContainer">
                    <div className="bookingMessage">
                        <h2>
                            Accept Booking
                        </h2>
                    </div>
                    <div className="bookingPageBtu">
                        <div className="bookingAccept" onClick={()=>{acceptBooking(booking)}}>
                            <p>
                                Accept
                            </p>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Iconly/Curved/Light/Ticket">
                                <g id="Ticket">
                                <path id="Stroke 1" d="M13.3593 3.6001V6.25535"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path id="Stroke 3" d="M13.3593 17.5439V19.7641"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path id="Stroke 6" d="M13.3593 14.544V9.25537"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path id="Stroke 7" fillRule="evenodd" clipRule="evenodd" d="M21.5 14.0504C18.8093 14.0504 18.8093 9.94867 21.5 9.94867C21.5 5.19622 21.5 3.5 12 3.5C2.5 3.5 2.5 5.19622 2.5 9.94867C5.19074 9.94867 5.19074 14.0504 2.5 14.0504C2.5 18.8038 2.5 20.5 12 20.5C21.5 20.5 21.5 18.8038 21.5 14.0504Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                </g>
                            </svg>

                        </div>
                        <div className="bookingReject" onClick={() => rejectBooking(booking)}>
                            <p>
                                Reject
                            </p>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
                }
                {
                    originalNode.status=== "CONFIRMED" &&
                    <div className="bookingContainer">
                        <div className="bookingPageBtu">
                            <p>
                                Booking Accepted <b>QP{booking.slice(3, 9)}</b>
                            </p>
                            <div onClick={handleCopy} className="shareLink">
                                {copied ? 
                                    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="9"  strokeWidth="1.5"/>
                                    <path d="M6 10L9 13L14 7"  strokeWidth="1.5"/>
                                    </svg>
                                    : 
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 3H9C6.79086 3 5 4.79086 5 7V15" strokeWidth="1.5"/>
                                        <path d="M13.5 7C14.696 7 15.5096 7.00158 16.1279 7.07129C16.726 7.13873 17.0169 7.25897 17.2178 7.41309C17.3564 7.51946 17.4805 7.64361 17.5869 7.78223C17.741 7.98307 17.8613 8.274 17.9287 8.87207C17.9984 9.49043 18 10.304 18 11.5V15.5C18 16.696 17.9984 17.5096 17.9287 18.1279C17.8613 18.726 17.741 19.0169 17.5869 19.2178C17.4805 19.3564 17.3564 19.4805 17.2178 19.5869C17.0169 19.741 16.726 19.8613 16.1279 19.9287C15.5096 19.9984 14.696 20 13.5 20C12.304 20 11.4904 19.9984 10.8721 19.9287C10.274 19.8613 9.98307 19.741 9.78223 19.5869C9.64361 19.4805 9.51946 19.3564 9.41309 19.2178C9.25897 19.0169 9.13873 18.726 9.07129 18.1279C9.00158 17.5096 9 16.696 9 15.5V11.5C9 10.304 9.00158 9.49043 9.07129 8.87207C9.13873 8.274 9.25897 7.98307 9.41309 7.78223C9.51946 7.6436 9.6436 7.51946 9.78223 7.41309C9.98307 7.25897 10.274 7.13873 10.8721 7.07129C11.4904 7.00158 12.304 7 13.5 7Z" strokeWidth="1.5"/>
                                    </svg>
                                }
                            </div>                       
                        </div>
                    </div>  
                }
            </div>
        </div>
        ) : null
    }
    </>
  )
}
