"use client";
import { useState, useEffect } from "react";
import "../adminpage.css";
import Image from 'next/image'
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function SendNotification() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [target, setTarget] = useState("ALL");
  const [message, setMessage] = useState("");

  function getCookie(name) {
    return document.cookie
      .split("; ")
      .find(row => row.startsWith(name + "="))
      ?.split("=")[1];
  }

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  searchParams.get("sendnotification");
    


  const sendNotification = async () => {
    try {
      // only works if token is accessible (NOT httpOnly)
      const token = getCookie("token");

      const res = await fetch(
        "https://quickpark-backend.vercel.app/api/admin/notifications/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            body,
            target, // "ALL" or "ADMIN" / "USER"
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to send notification");
        return;
      }

      setMessage("✅ Notification sent successfully");
      setTitle("");
      setBody("");
    } catch (err) {
      console.error(err);
      setMessage(" Network error");
    }
  };

  function getCookie(name) {
    return document.cookie
            .split("; ")
            .find(row => row.startsWith(name + "="))
            ?.split("=")[1];
  }
      
      let userApi = async () => {
          const token = getCookie("token"); // read JWT manually
          let res = await fetch("https://quickpark-backend.vercel.app/api/user/me", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
          });
      
          const data = await res.json();
          return data;
      };
      
      let [userData, setUserData] = useState({});
      
      useEffect(() => {
          userApi()
              .then(data => {
                setUserData(data);
                console.log("USER:", data);
              })
              .catch(err => console.log(err));
      }, []);

  return (
        <>
        {pathname === "/admin/adminpage" && searchParams.get("sendnotification") === "true" && (
            <div className="notificationContainer">
            <div className="admintitle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.4933 12.4382C11.4933 12.4382 -0.483351 9.96056 3.6786 7.55801C7.19075 5.53071 19.2947 2.04516 20.9857 2.94576C21.8863 4.63676 18.4007 16.7407 16.3734 20.2529C13.9709 24.4148 11.4933 12.4382 11.4933 12.4382Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.4934 12.4381L20.9858 2.94574" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2>send Notification</h2>
            </div>

            <div className="back">
                <Link href={"#"} onClick={ () => router.back() }>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19L5 12L12 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>Back</p>
                </Link>
            </div>
            
            <div className="input">
                <label htmlFor="title">
                <p>
                    Title
                </p>
                </label>
                <input
                placeholder="Title"
                value={title}
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="input">
                <label htmlFor="body">
                <p>
                    Body
                </p>
                </label>
                <textarea
                placeholder="Body"
                value={body}
                id="body"
                onChange={(e) => setBody(e.target.value)}
                />
            </div>

            <select value={target} onChange={(e) => setTarget(e.target.value)}>
                <option value="ALL">All Users</option>
                <option value="ADMIN">Admins</option>
                <option value="USER">Users</option>
            </select>
            <br />
            <button onClick={sendNotification}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.4933 12.4382C11.4933 12.4382 -0.483351 9.96056 3.6786 7.55801C7.19075 5.53071 19.2947 2.04516 20.9857 2.94576C21.8863 4.63676 18.4007 16.7407 16.3734 20.2529C13.9709 24.4148 11.4933 12.4382 11.4933 12.4382Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.4934 12.4381L20.9858 2.94574" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>
                Send Notification
                </p>
            </button>

            {
            message && 
            <div className="message">
                <p>{message}</p>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setMessage("")}>
                    <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            }
            </div>)}
        </>
  );
}
