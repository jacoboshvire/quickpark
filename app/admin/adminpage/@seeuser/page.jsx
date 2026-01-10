"use client"
import {useEffect, useState} from 'react'
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import "../adminpage.css";

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function page() {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  let sellerUrl = "https://quickpark-backend.vercel.app/api/user"

    async function sellerApi() {
        let res = await fetch(sellerUrl)
        let data = await res.json()
        console.log(data)
        return data
    }
    let [seller, setSeller] = useState([])
    // const [randomList, setRandomList] = useState([]);
    useEffect(() =>{
    sellerApi().then((data) => {
          setSeller(shuffleArray(data))
          console.log(data)
        }).catch(e=>{
          console.log(e)
        })
    }, [setSeller])
  return (
    <>
      {pathname === "/admin/adminpage" && searchParams.get("users") === "true" && (
      <div className="notificationContainer">
      <div className="admintitle">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M11.9724 20.3682C8.73343 20.3682 5.96643 19.8782 5.96643 17.9162C5.96643 15.9542 8.71543 14.2462 11.9724 14.2462C15.2114 14.2462 17.9784 15.9382 17.9784 17.8992C17.9784 19.8602 15.2294 20.3682 11.9724 20.3682Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M11.9725 11.4487C14.0985 11.4487 15.8225 9.72569 15.8225 7.59969C15.8225 5.47369 14.0985 3.74969 11.9725 3.74969C9.84645 3.74969 8.12245 5.47369 8.12245 7.59969C8.11645 9.71769 9.82645 11.4417 11.9455 11.4487H11.9725Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.3622 10.3916C19.5992 10.0606 20.5112 8.9326 20.5112 7.5896C20.5112 6.1886 19.5182 5.0186 18.1962 4.7486"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.9431 13.5444C20.6971 13.5444 22.1951 14.7334 22.1951 15.7954C22.1951 16.4204 21.6781 17.1014 20.8941 17.2854"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.58372 10.3916C4.34572 10.0606 3.43372 8.9326 3.43372 7.5896C3.43372 6.1886 4.42772 5.0186 5.74872 4.7486"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.00176 13.5444C3.24776 13.5444 1.74976 14.7334 1.74976 15.7954C1.74976 16.4204 2.26676 17.1014 3.05176 17.2854" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2>View Users</h2>
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

        <div className="usersContainer">
          <div className="userLength">
            <div>
              <p>Total Users:</p>
            </div>
            <div>
              <p>"{seller.length}"</p>
            </div>
          </div>
          <div className="mainUserContainer">
            {seller.map((user) => (
              <div key={user._id} className='userCard'>
                <div className="userImg">
                  <Image 
                    alt="user"
                    src={user.avatar ? user.avatar : "https://res.cloudinary.com/dr0yyqvj6/image/upload/v1768045411/odljnvt8thtadwd27i5m.png"}
                    width={1000}
                    height={1000}
                  />
                </div>
                <div className="userDetail">
                  <p>{user.username}</p>
                  <p>{user.email}</p>
                  <p>{user.fullname}</p>
                  <p className='role'>{user.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
    </>
  
  )
}
