"use client";
import "./adminpage.css";
import Image from 'next/image'
import Link from 'next/link';
import userIcon from "../../Image/nav.png";
import  NotificationIcon from '../../image/unsplash_zjptFYOvEm4.png';
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function dashboard() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    searchParams.get("sendnotification");

  return (
    <>
      {searchParams.get("sendnotification") !== "true" &&
      searchParams.get("users") !== "true" && (
        <div className="mainAdminDashboards">
          <Link href="/admin/adminpage?sendnotification=true">
            <div className="backToAdminPage">
              <div className="title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.4933 12.4382C11.4933 12.4382 -0.483351 9.96056 3.6786 7.55801C7.19075 5.53071 19.2947 2.04516 20.9857 2.94576C21.8863 4.63676 18.4007 16.7407 16.3734 20.2529C13.9709 24.4148 11.4933 12.4382 11.4933 12.4382Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.4934 12.4381L20.9858 2.94574" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2>Send Notification</h2>
              </div>
              <div className="description">
                <Image src={userIcon} alt="notification" height={1000} width={1000}/>
              </div>
            </div>
          </Link>
          <Link href="/admin/adminpage?users=true">
            <div className="backToAdminPage">
              <div className="title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.9724 20.3682C8.73343 20.3682 5.96643 19.8782 5.96643 17.9162C5.96643 15.9542 8.71543 14.2462 11.9724 14.2462C15.2114 14.2462 17.9784 15.9382 17.9784 17.8992C17.9784 19.8602 15.2294 20.3682 11.9724 20.3682Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.9725 11.4487C14.0985 11.4487 15.8225 9.72569 15.8225 7.59969C15.8225 5.47369 14.0985 3.74969 11.9725 3.74969C9.84645 3.74969 8.12245 5.47369 8.12245 7.59969C8.11645 9.71769 9.82645 11.4417 11.9455 11.4487H11.9725Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.3622 10.3916C19.5992 10.0606 20.5112 8.9326 20.5112 7.5896C20.5112 6.1886 19.5182 5.0186 18.1962 4.7486"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.9431 13.5444C20.6971 13.5444 22.1951 14.7334 22.1951 15.7954C22.1951 16.4204 21.6781 17.1014 20.8941 17.2854"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.58372 10.3916C4.34572 10.0606 3.43372 8.9326 3.43372 7.5896C3.43372 6.1886 4.42772 5.0186 5.74872 4.7486"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.00176 13.5444C3.24776 13.5444 1.74976 14.7334 1.74976 15.7954C1.74976 16.4204 2.26676 17.1014 3.05176 17.2854" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2>View user</h2>
              </div>
              <div className="description">
                <Image src={NotificationIcon} alt="notification" height={1000} width={1000}/>
              </div>
            </div>
          </Link>

        </div>
      )}
    </>
  )
}
