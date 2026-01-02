"use client"
import { usePathname, useSearchParams, useRouter} from 'next/navigation';
import { useState } from 'react';
import "./style.css"

export default function page() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
    const copyId = searchParams.get("copyId")
    function getCookie(name) {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith(name + "="))
            ?.split("=")[1];
    }
  return (
    <div>page</div>
  )
}
