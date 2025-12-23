"use client"
import { usePathname, useSearchParams, useRouter} from 'next/navigation';
import { useState } from 'react';
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
            </div>
        </div>
        ) : null
    }
    </>
  )
}
