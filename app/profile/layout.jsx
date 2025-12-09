"use client"
import {useState, useTransition, useEffect} from 'react'
import { useFormStatus } from "react-dom";
import { logout } from "./../login/actions";
import Link from 'next/link'
import Image from 'next/image'
import Profile from "./../Image/Group6.png"
import "./styleP.css"


export default function 
({
    Nav
}) {
    let [typebtn, setTypebtn] = useState(true);

    const toggleTypeBtn = () =>{
        setTypebtn((typebtn) => (!typebtn))
    }

    let [setChngVa, chngVa] = useState(true)

    const changevalue = () =>{
        setChngVa(false)
    }

    const [pending, startTransition] = useTransition();
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

    <div className='mainProfile'>
        {Nav}
        <Link className="backBtn" href={"/"}>
            <svg width="25" height="25" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.16669 15.5L25.8334 15.5M5.16669 15.5L12.9167 7.75M5.16669 15.5L12.9167 23.25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>
              {userData.username ? userData.username : "Profile"}
            </p>
        </Link>
        <div className="mainselectionProfile">
            <form action="#">
                <div className="changeImg">
                    
                    <label htmlFor="upload" className='imageUpload'>
                        <span>
                            <svg width="25" height="25" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M41.6666 31.25V37.5C41.6666 39.8012 39.8012 41.6667 37.5 41.6667H12.5C10.1988 41.6667 8.33331 39.8012 8.33331 37.5L8.33331 31.25M16.6666 22.9167L25 31.25M25 31.25L33.3333 22.9167M25 31.25V6.25" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p>
                                Change Profile
                            </p>
                        </span>
                        <Image src={userData.avatar ? userData.avatar : Profile}
                            alt='profiles'
                            height={"150"}
                            width={"150"}
                        />
                    </label>
                    <input type="file" id="upload" name="avatar" accept="image/*" />
                </div>
                <div className="inputLogout">
                    <div className="inputForm">
                        <div className="emailInput">
                            <label htmlFor="email">
                                <p>Username</p>
                                <br/>
                            </label>
                            <div className="insideInput">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.8571 12C15.8571 14.1302 14.1302 15.8571 12 15.8571C9.86976 15.8571 8.14286 14.1302 8.14286 12C8.14286 9.86972 9.86976 8.14282 12 8.14282C14.1302 8.14282 15.8571 9.86972 15.8571 12ZM15.8571 12L15.8571 13.2857C15.8571 14.7059 17.0084 15.8571 18.4286 15.8571C19.3408 15.8571 20.1422 15.3821 20.5986 14.6658C20.8528 14.2671 21 13.7936 21 13.2857V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C13.9122 21 15.6851 20.4037 17.1429 19.3868" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <input id="email" name="username" placeholder="username" type='text' defaultValue={userData.username}/>
                            </div>
                        </div>
                        <br />
                        <div className="emailInput">
                            <label htmlFor="email">
                                <p>Fullname</p>
                                <br/>
                            </label>
                            <div className="insideInput">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 15H8C5.79086 15 4 16.7909 4 19V21H20V19C20 16.7909 18.2091 15 16 15Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                            <input id="email" name="fullname" placeholder="fullname" type='text' defaultValue={userData.fullname}/>
                            </div>
                            <br />
                            <div className="emailInput">
                            <label htmlFor="email">
                                <p>Email</p>
                                <br/>
                            </label>
                            <div className="insideInput">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="emailsvg">
                                <path d="M3.29289 5.29289C3.47386 5.11193 3.72386 5 4 5H20C20.2761 5 20.5261 5.11193 20.7071 
                                5.29289M3.29289 5.29289C3.11193 5.47386 3 5.72386 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 
                                21 18.5523 21 18V6C21 5.72386 20.8881 5.47386 20.7071 5.29289M3.29289 5.29289L10.5858 12.5857C11.3668 13.3668 12.6332 13.3668 13.4142 12.5857L20.7071 5.29289" 
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <input id="email" name="email" placeholder="Email" defaultValue={userData.email}/>
                            </div>
                            </div>
                            <br />
                            <div className="passwordInput">
                            <label htmlFor="password">
                                <p>
                                Password
                                </p>
                                <br/>
                            </label>
                            <div className="insideInput">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="passwordIcon">
                                <path d="M15.5 9.5L11 14L9.5 12.5M12 3L4 7C4 12.1932 6.78428 19.5098 12 21C17.2157 19.5098 20 12.1932 20 7L12 3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <input
                                id="password"
                                name="password"
                                type={typebtn ? "password" : "text"}
                                placeholder="Password"
                                />
                                <div className="changeTypeBtn" onClick={toggleTypeBtn}>
                                {
                                    typebtn ? 
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="hidePass">
                                    <path d="M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg> :
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"  className="hidePass"> 
                                    <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                                }
                                
                                </div>

                            </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit">
                        <p>
                            Save change
                        </p>
                    </button>
                    <div className="logoutBtn">
                        <div className='btnlog' onClick={() => logout()}>
                            <p>
                                {pending ? "Logging out..." : "Logout"}
                            </p> 
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 4H18C19.1046 4 20 4.89543 20 6L20 18C20 19.1046 19.1046 20 18 20H15M11 16L15 12M15 12L11 8M15 12H3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </form>

        </div>
      
    </div>
  )
}
