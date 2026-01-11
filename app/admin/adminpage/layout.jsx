"use client";
import { useState, useEffect, Suspense} from "react";
import "./adminpage.css";
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from "next/navigation";
import Nav from "./nav";
import Dashboard from "./dashboard";

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
           <Suspense >
            <Dashboard/>
        </Suspense>
            <Suspense >
                {sendnotification && sendnotification}
            </Suspense>
            <Suspense >
                {seeuser && seeuser}
            </Suspense>
            
        </div>
      </div>
    </div>
  );
}
