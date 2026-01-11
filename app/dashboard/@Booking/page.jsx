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
        await navigator.clipboard.writeText(`Your bookingId: QP${booking.slice(3, 9)}`);
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
                <div className="bookingContainer">
                { originalNode.status === "PENDING" &&
                    <>
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
                </> }
                { originalNode.status=== "CONFIRMED" &&
                    <div className="bookingPageBtu">
                        <p>
                            Booking Accepted <b>QP{booking.slice(3, 9)}</b>
                        </p>
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
                    </div> }
                </div>
            </div>
        </div>
        ) : null
    }
    </>
  )
}
