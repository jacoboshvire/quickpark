"use client";
import { usePathname, useSearchParams} from 'next/navigation';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import "./styleNotification.css"

export default function Page() {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const notification = searchParams.get("notification")

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  function getCookie(name) {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = getCookie("token");

        if (!token) {
          setError("Not authenticated");
          return;
        }

        const res = await fetch(
          "https://quickpark-backend.vercel.app/api/notification",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await res.json();

        // THIS WAS THE MAIN BUG
        console.log(data)
        setNotifications(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);



  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
    {
      notifications && pathname === "/dashboard" && notification ? (
        <div className="NotificationsPage">
          <div className="insideNotification">
            <div className="cancelNBtn">
              <div className="closeBtn" onClick={() => router.push('/dashboard')}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>          
            </div>
            <div className="mainNContainer">
              <h1>
                Notifications
              </h1>
              {notifications.length === 0 && (
                <p>No notifications yet.</p>
              )}

              <div className="notificationLenght">
                <p>
                  👀 You’ve <b>"{notifications.length}"</b> notification
                </p>
              </div>
              <ul>
                {notifications.map((n) => (
                  <div className="notificationPost" key={n._id} onClick={()=>router.push(`/dashboard?id=${n.data.sellerId}`)}>
                  <li>
                    <h3>{n.title}</h3>
                    <p className='notificationBody' >{n.body}</p>
                    <p className='notificationDate'>
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div> )
      : ""
    }
    </>
  );
}
