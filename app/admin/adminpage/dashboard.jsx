"use client";
import "./adminpage.css";
import Image from 'next/image'
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function dashboard() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    searchParams.get("sendnotification");

  return (
    <>
    {pathname !== "/admin/adminpage" && searchParams.get("sendnotification") && searchParams.get("users") !== "true" && (
        <div className="backToAdminPageContainer">
            me
        </div>
    )}
    </>
  )
}
