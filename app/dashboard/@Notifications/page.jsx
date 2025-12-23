"use client";
import { usePathname, useSearchParams} from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import "./styleNotification.css"

export default function Page() {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const notification = searchParams.get("notification")

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const observerRef = useRef(null);
  const observedIds = useRef(new Set()); 
  const [message, setMessage] = useState("")

  
  function getCookie(name) {
    return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
  }
  
  useEffect(() => {
    let intervalId;
    const fetchNotifications = async () => {
      try {
        const token = getCookie("token")
        const res = await fetch(
          "https://quickpark-backend.vercel.app/api/notification",
           {
          headers: {
          Authorization: `Bearer ${token}`,
          }}
        );

        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();
        setNotifications(data || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load notifications");
      } finally {
        setLoading(false);
      }
    };

    // Initial load
    fetchNotifications();

    // Auto refresh every 10 seconds
    intervalId = setInterval(fetchNotifications, 10000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);


    // ✅ Delete notification
  const deleteNotification = async (id) => {
    try {
      const token = getCookie("token")
      await fetch(
        `https://quickpark-backend.vercel.app/api/notification/${id}`,
        {
          method: "DELETE",
          headers: {
          Authorization: `Bearer ${token}`,
          }
        }
      );

      // Remove from UI instantly
      setNotifications((prev) =>
        prev.filter((n) => n._id !== id)
      );

      setMessage("notification has being deleted")

    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = useCallback(async (id) => {
    try {
      const token = getCookie("token")
      await fetch(
        `https://quickpark-backend.vercel.app/api/notification/${id}/read`,
        {
          method: "PUT",
          headers: {
          Authorization: `Bearer ${token}`,
          }
        }
      );

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Mark as read failed", err);
    }
  }, []);
  if (loading) {
      <div className="loadingNotification">
        loading
      </div> 
  }

  return (
    <>
    {
      error &&  pathname === "/dashboard" && notification ?
      <div className="errNofication">
        error
      </div>
      :
      null
    }
    {
      message && 
      <div className="message">
        <p>
          {message}
        </p>
        <div className="closeMessage" onClick={() => setMessage("")}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>  
      </div>
    }
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
                  🔔 <b>{notifications.length}</b> new update{notifications.length !== 1 && "s"} waiting for you
                </p>
              </div>
              <ul>
                {notifications.map((n) => ( 
                  <>
                  {
                    n.data.sellerId ? 
                    <div className="notificationPost" key={n._id}  onClick={()=>router.push(`/dashboard?id=${n.data.sellerId}`)} onMouseEnter={()=>markAsRead(n._id)}>
                      <li >
                        <h3>{n.title}</h3>
                        <p className='notificationBody' >{n.body}</p>
                        <p className='notificationDate'>
                          {new Date(n.createdAt).toLocaleString()}
                        </p>
                      </li>
                      <div className="deleteNotification" onClick={(e) => {
                            e.stopPropagation(); // prevent mark-as-read
                            deleteNotification(n._id);
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>                      
                      </div>
                    </div> : 
                    <div className="notificationPost" key={n._id}  onClick={()=>router.push(`/dashboard?booking=${n.data.bookingId}`)} onMouseEnter={()=>markAsRead(n._id)}>
                      <li >
                        <h3>{n.title}</h3>
                        <p className='notificationBody' >{n.body}</p>
                        <p className='notificationDate'>
                          {new Date(n.createdAt).toLocaleString()}
                        </p>
                      </li>
                      <div className="deleteNotification" onClick={(e) => {
                            e.stopPropagation(); // prevent mark-as-read
                            deleteNotification(n._id);
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>                      
                      </div>
                    </div>
                  }
                  </>
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
