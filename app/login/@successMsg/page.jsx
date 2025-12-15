"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import "./style.css";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const successMsg = searchParams.get("successMsg");

  return (
    <>
      {pathname === "/login" && successMsg && (
        <div className="mainsuccess">
            <div className="successMsg">
            <div>
                <p> {successMsg} 🥳</p>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>router.push("/login")}>
                    <path d="M18 6L6 18M6 6L18 18" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>            
            </div>
            </div>
        </div>
      )}
    </>
  );
}
