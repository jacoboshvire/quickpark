"use client";
import { useState, useEffect, Suspense} from "react";
import "./adminpage.css";
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from "next/navigation";
import Nav from "./nav";

export default function SendNotificationLayout({
    sendnotification, seeuser
}) {
    const pathname = usePathname();
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
    <div className="adminPage">
      <div className="insideAdmin">
        <Suspense >
            <Nav />
        </Suspense>
        
        <div className="container">
            {sendnotification && sendnotification}
            {seeuser && seeuser}
        </div>
      </div>

      {
            userData.role !== "ADMIN" && (
        <div className="notAuthorized">
            <h2> You are not authorized to access this page.</h2>
            <Link href={"/dashboard"} className="backToDashboard">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19L5 12L12 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Back to Dashboard</span>
            </Link>
        </div>
      )
        }
    </div>
  );
}
