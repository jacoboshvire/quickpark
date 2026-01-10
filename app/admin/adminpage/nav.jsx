"use client";
import { useState, useEffect } from "react";
import "./adminpage.css";
import Image from 'next/image'
import Link from 'next/link';
import { usePathname, useSearchParams  } from "next/navigation";

export default function nav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isActive = (path) => pathname === path;

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
        <header>
          <div className="adminnav">
            <Link className="logo" href={"/dashboard"}>
              <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="logoSvg">
                  <path d="M0 8.4375C0 3.7776 2.15863 0 4.82143 0H15.2679C19.2621 0 22.5 5.6664 22.5 12.6562V25.3125H0V8.4375Z" />
                  <path d="M0 8.4375L25.7143 8.4375C28.0812 8.4375 30 11.7954 30 15.9375V25.3125H0V8.4375Z" />
                  <path d="M25.1786 24.8438C25.1786 27.6915 23.8594 30 22.2321 30C20.6049 30 19.2857 27.6915 19.2857 24.8438C19.2857 21.996 20.6049 19.6875 22.2321 19.6875C23.8594 19.6875 25.1786 21.996 25.1786 24.8438Z" />
                  <path d="M8.03571 24.8438C8.03571 27.6915 6.71655 30 5.08929 30C3.46202 30 2.14286 27.6915 2.14286 24.8438C2.14286 21.996 3.46202 19.6875 5.08929 19.6875C6.71655 19.6875 8.03571 21.996 8.03571 24.8438Z" />
              </svg>
              <h1>
                Quickpark
              </h1>
            </Link>
            <Link className={pathname === "/admin/adminpage" && searchParams.get("sendnotification") === "true" ? "active sendNotification" : "sendNotification"} href={"/admin/adminpage?sendnotification=true"}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.4933 12.4382C11.4933 12.4382 -0.483351 9.96056 3.6786 7.55801C7.19075 5.53071 19.2947 2.04516 20.9857 2.94576C21.8863 4.63676 18.4007 16.7407 16.3734 20.2529C13.9709 24.4148 11.4933 12.4382 11.4933 12.4382Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.4934 12.4381L20.9858 2.94574" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>
                Send Notification
              </p>
            </Link>
            <Link className={pathname === "/admin/adminpage" && searchParams.get("users") === "true" ? "active users" : "users"} href={"/admin/adminpage?users=true"}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.9724 20.3682C8.73343 20.3682 5.96643 19.8782 5.96643 17.9162C5.96643 15.9542 8.71543 14.2462 11.9724 14.2462C15.2114 14.2462 17.9784 15.9382 17.9784 17.8992C17.9784 19.8602 15.2294 20.3682 11.9724 20.3682Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M11.9725 11.4487C14.0985 11.4487 15.8225 9.72569 15.8225 7.59969C15.8225 5.47369 14.0985 3.74969 11.9725 3.74969C9.84645 3.74969 8.12245 5.47369 8.12245 7.59969C8.11645 9.71769 9.82645 11.4417 11.9455 11.4487H11.9725Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.3622 10.3916C19.5992 10.0606 20.5112 8.9326 20.5112 7.5896C20.5112 6.1886 19.5182 5.0186 18.1962 4.7486"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.9431 13.5444C20.6971 13.5444 22.1951 14.7334 22.1951 15.7954C22.1951 16.4204 21.6781 17.1014 20.8941 17.2854"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.58372 10.3916C4.34572 10.0606 3.43372 8.9326 3.43372 7.5896C3.43372 6.1886 4.42772 5.0186 5.74872 4.7486"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.00176 13.5444C3.24776 13.5444 1.74976 14.7334 1.74976 15.7954C1.74976 16.4204 2.26676 17.1014 3.05176 17.2854" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>
                View Users
              </p>
            </Link>
            <Link className={isActive("/admin/adminser") ? "active adminuser" : "adminuser"} href={"/profile"}>
              <div className="adminuserimg">
                <Image 
                  alt="user"
                  src={userData.avatar ? userData.avatar : "https://res.cloudinary.com/dr0yyqvj6/image/upload/v1768045411/odljnvt8thtadwd27i5m.png"}
                  width={40}
                  height={40}
                />
              </div>
              <p>
                {userData.username ? userData.username : "Admin"}
              </p>
            </Link>
          </div>
        </header>
  );
}
