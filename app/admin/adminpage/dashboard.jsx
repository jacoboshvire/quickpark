"use client";
import "../adminpage.css";
import Image from 'next/image'
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function dashboard() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();


  return (
  
    <>
      {
        pathname !== "/admin/adminpage?sendnotification=true" && pathname !== "/admin/adminpage?seeuser=true" ? (
            <div className="navDashboard">
                <h2>Dashboard</h2>
            </div>
                ) : null  
    }
    </>
  )
}
