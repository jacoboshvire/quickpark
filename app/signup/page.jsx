"use client";

import { useActionState , useState} from "react";
import { useFormStatus } from "react-dom";
import { signup } from "./actions";
import Image from "next/image";
//this are for next js link and navigation
import Link from 'next/link';
import "./../login/login.css";
import "./style.css";
import { useRouter } from 'next/navigation'

export default function signFrom() {
  const router = useRouter();
  const [state, signupAction] = useActionState(signup, undefined);
  let [typebtn, setTypebtn] = useState(true);

  const toggleTypeBtn = () =>{
    setTypebtn((typebtn) => (!typebtn))
  }

let [typebtn2, setTypebtn2] = useState(true);

  const toggleTypeBtn2 = () =>{
    setTypebtn2((typebtn2) => (!typebtn2))
  }

  return (
    <div className="maincontainer">
      <div className="insidemain">
      <div className="firstcontainer">
        <div className="welcomeAndLogo">
          <div className="logos">
            <div className="logoDesign">
              <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 8.4375C0 3.7776 2.15863 0 4.82143 0H15.2679C19.2621 0 22.5 5.6664 22.5 12.6562V25.3125H0V8.4375Z" />
                <path d="M0 8.4375L25.7143 8.4375C28.0812 8.4375 30 11.7954 30 15.9375V25.3125H0V8.4375Z" />
                <path d="M25.1786 24.8438C25.1786 27.6915 23.8594 30 22.2321 30C20.6049 30 19.2857 27.6915 19.2857 24.8438C19.2857 21.996 20.6049 19.6875 22.2321 19.6875C23.8594 19.6875 25.1786 21.996 25.1786 24.8438Z" />
                <path d="M8.03571 24.8438C8.03571 27.6915 6.71655 30 5.08929 30C3.46202 30 2.14286 27.6915 2.14286 24.8438C2.14286 21.996 3.46202 19.6875 5.08929 19.6875C6.71655 19.6875 8.03571 21.996 8.03571 24.8438Z" />
              </svg>

              <h1>
                QuickPark
              </h1>

            </div>
          </div>
          <div className="welcome">
            <div className="mainHeading">
              <h1 className="title">
                Create an account
              </h1>
            </div>
            <div className="detiledWelcome">
              <p>
                One more step, and stress is history
              </p>
            </div>
          </div>
        </div>
        <div className="formDiv">
          <form action={signupAction} className="form">
            <div className="emailInput">
              <label htmlFor="email">
                <p>Fullname</p>
                <br/>
              </label>
              <div className="insideInput">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="emailsvg">
                <path d="M16 15H8C5.79086 15 4 16.7909 4 19V21H20V19C20 16.7909 18.2091 15 16 15Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <input id="email" name="fullname" placeholder="Jame mark" className={ state?.errors?.fullname && "errorcls" }/>
              </div>
            {state?.errors?.fullname && (
              <p className="error">{state.errors.fullname}</p>
            )}
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
                <input id="email" name="email" placeholder="Jamemark@***.com" className={ state?.errors?.email && "errorcls" }/>
              </div>
            {state?.errors?.email && (
                <p className="error">{state.errors.email}</p>
            )}
            </div>
            <br />
            <div className="emailInput">
              <label htmlFor="email">
                <p>username</p>
                <br/>
              </label>
              <div className="insideInput">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="emailsvg">
                <path d="M15.8571 12C15.8571 14.1302 14.1302 15.8571 12 15.8571C9.86976 15.8571 8.14286 14.1302 8.14286 12C8.14286 9.86972 9.86976 8.14282 12 8.14282C14.1302 8.14282 15.8571 9.86972 15.8571 12ZM15.8571 12L15.8571 13.2857C15.8571 14.7059 17.0084 15.8571 18.4286 15.8571C19.3408 15.8571 20.1422 15.3821 20.5986 14.6658C20.8528 14.2671 21 13.7936 21 13.2857V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C13.9122 21 15.6851 20.4037 17.1429 19.3868" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input id="email" name="username" placeholder="jame_wealthy" className={ state?.errors?.username && "errorcls" }/>
              </div>
              {state?.errors?.username && (
                <p className="error">{state.errors.username}</p>
            )}
            </div>
            <div className="passwordInput">
              <label htmlFor="password">
                <br/>
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
                  placeholder="********"
                  // className={ state?.errors?.password && "errorcls"}
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
            {state?.errors?.password && (
                <p className="error">{state.errors.password}</p>
            )}
            </div>
            <div className="passwordInput">
              <label htmlFor="password">
                <br/>
                <p>
                  confirm Password
                </p>
                <br/>
              </label>
              <div className="insideInput">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="passwordIcon">
                  <path d="M15.5 9.5L11 14L9.5 12.5M12 3L4 7C4 12.1932 6.78428 19.5098 12 21C17.2157 19.5098 20 12.1932 20 7L12 3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  id="password"
                  name="confirmPassword"
                  type={typebtn ? "password" : "text"}
                  placeholder="********"
                  className={ state?.errors?.confirmPassword && "errorcls"}
                />
                <div className="changeTypeBtn" onClick={toggleTypeBtn2}>
                  {
                    typebtn2 ? 
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
              {state?.errors?.confirmPassword && <p className="error">{state.errors.confirmPassword}</p>}
            </div>
            <SubmitButton />
          </form>
          <div className="createAcc">
            <p>
              you already have an account? click on  <Link href={"/login"}>Login</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="secondcontainer">
        <div className="notetitle">
          <p>
            "Find, reserve, and park instantly stress-free parking made simple."
          </p>
        </div>
        <div className="animation">
          <svg width="72" height="72" viewBox="0 0 124 124" fill="none" xmlns="http://www.w3.org/2000/svg" className="car">
          <path d="M118.833 64.5835V85.2502C118.833 86.6204 118.289 87.9346 117.32 88.9035C116.351 89.8725 115.037 90.4168 113.667 90.4168H108.5C108.5 94.5277 106.867 98.4702 103.96 101.377C101.053 104.284 97.1109 105.917 93 105.917C88.8892 105.917 84.9467 104.284 82.0399 101.377C79.1331 98.4702 77.5 94.5277 77.5 90.4168H46.5C46.5 94.5277 44.867 98.4702 41.9602 101.377C39.0534 104.284 35.1109 105.917 31 105.917C26.8892 105.917 22.9467 104.284 20.0399 101.377C17.1331 98.4702 15.5 94.5277 15.5 90.4168H10.3334C8.96308 90.4168 7.64892 89.8725 6.67998 88.9035C5.71104 87.9346 5.1667 86.6204 5.1667 85.2502V33.5835C5.1667 29.4726 6.79973 25.5302 9.70654 22.6233C12.6134 19.7165 16.5558 18.0835 20.6667 18.0835H80.3934C83.6404 18.0896 86.8035 19.1152 89.4362 21.0156C92.069 22.916 94.0385 25.5953 95.0667 28.6752L102.507 50.9435L116.508 60.2952C117.219 60.7632 117.803 61.3995 118.209 62.1477C118.614 62.8958 118.829 63.7325 118.833 64.5835ZM15.5 49.0835H25.8334V28.4168H20.6667C19.2964 28.4168 17.9822 28.9612 17.0133 29.9301C16.0444 30.899 15.5 32.2132 15.5 33.5835V49.0835ZM36.1667 90.4168C36.1667 89.395 35.8637 88.396 35.296 87.5464C34.7282 86.6967 33.9213 86.0345 32.9772 85.6434C32.0331 85.2524 30.9943 85.1501 29.9921 85.3494C28.9898 85.5488 28.0692 86.0409 27.3466 86.7634C26.6241 87.486 26.132 88.4066 25.9326 89.4089C25.7333 90.4111 25.8356 91.4499 26.2267 92.394C26.6177 93.3381 27.2799 94.145 28.1296 94.7128C28.9792 95.2805 29.9782 95.5835 31 95.5835C32.3703 95.5835 33.6845 95.0392 34.6534 94.0702C35.6224 93.1013 36.1667 91.7871 36.1667 90.4168ZM46.5 59.4168H15.5V80.0835H19.53C20.9828 78.4852 22.7536 77.2081 24.7288 76.3342C26.7041 75.4603 28.8401 75.0089 31 75.0089C33.16 75.0089 35.296 75.4603 37.2712 76.3342C39.2465 77.2081 41.0173 78.4852 42.47 80.0835H46.5V59.4168ZM46.5 28.4168H36.1667V49.0835H46.5V28.4168ZM67.1667 59.4168H56.8334V80.0835H67.1667V59.4168ZM67.1667 28.4168H56.8334V49.0835H67.1667V28.4168ZM77.5 49.0835H90.985L85.3017 31.9302C84.9551 30.904 84.2947 30.0126 83.414 29.3822C82.5332 28.7517 81.4765 28.414 80.3934 28.4168H77.5V49.0835ZM98.1667 90.4168C98.1667 89.395 97.8637 88.396 97.296 87.5464C96.7282 86.6967 95.9213 86.0345 94.9772 85.6434C94.0332 85.2524 92.9943 85.1501 91.9921 85.3494C90.9898 85.5488 90.0692 86.0409 89.3467 86.7634C88.6241 87.486 88.132 88.4066 87.9326 89.4089C87.7333 90.4111 87.8356 91.4499 88.2267 92.394C88.6177 93.3381 89.2799 94.145 90.1296 94.7128C90.9792 95.2805 91.9782 95.5835 93 95.5835C94.3703 95.5835 95.6845 95.0392 96.6534 94.0702C97.6224 93.1013 98.1667 91.7871 98.1667 90.4168ZM108.5 67.1668L96.6167 59.4168H77.5V80.0835H81.53C82.9828 78.4852 84.7536 77.2081 86.7288 76.3342C88.7041 75.4603 90.8401 75.0089 93 75.0089C95.16 75.0089 97.296 75.4603 99.2712 76.3342C101.246 77.2081 103.017 78.4852 104.47 80.0835H108.5V67.1668Z"/>
          </svg>
          <svg width={"100%"} height={"100%"} viewBox="0 0 697 287" fill="none" xmlns="http://www.w3.org/2000/svg" className="run">
          <line y1="259" x2="697.006" y2="259" strokeWidth="15"/>
          <path d="M637.608 207.33L626.442 193.372C625.922 192.713 625.26 192.181 624.506 191.814C623.752 191.446 622.925 191.254 622.087 191.25H588.587V157.75C588.587 156.269 587.998 154.849 586.951 153.802C585.904 152.755 584.484 152.167 583.003 152.167C581.522 152.167 580.102 152.755 579.055 153.802C578.008 154.849 577.42 156.269 577.42 157.75V163.333H543.92C543.081 163.337 542.254 163.53 541.5 163.897C540.746 164.264 540.085 164.797 539.565 165.455L528.398 179.413C527.619 180.399 527.196 181.619 527.196 182.875C527.196 184.131 527.619 185.351 528.398 186.337L539.565 200.295C540.085 200.953 540.746 201.485 541.5 201.853C542.254 202.22 543.081 202.413 543.92 202.417H577.42V252.667H566.253C564.772 252.667 563.352 253.255 562.305 254.302C561.258 255.349 560.67 256.769 560.67 258.25C560.67 259.731 561.258 261.151 562.305 262.198C563.352 263.245 564.772 263.833 566.253 263.833H599.753C601.234 263.833 602.654 263.245 603.701 262.198C604.748 261.151 605.337 259.731 605.337 258.25C605.337 256.769 604.748 255.349 603.701 254.302C602.654 253.255 601.234 252.667 599.753 252.667H588.587V230.333H622.087C622.925 230.329 623.752 230.137 624.506 229.769C625.26 229.402 625.922 228.87 626.442 228.212L637.608 214.253C638.387 213.267 638.811 212.048 638.811 210.792C638.811 209.535 638.387 208.316 637.608 207.33ZM577.42 191.25H546.6L539.9 182.875L546.6 174.5H577.42V191.25ZM619.407 219.167H588.587V202.417H619.407L626.107 210.792L619.407 219.167Z"/>
          <path d="M396.316 59.7916C385.787 59.7832 375.454 62.6352 366.42 68.0428C359.87 53.0086 348.367 40.6719 333.828 33.0869C319.288 25.5019 302.589 23.1263 286.511 26.3559C270.434 29.5855 255.947 38.2252 245.464 50.8364C234.982 63.4476 229.135 79.2692 228.899 95.6666V143.5C228.916 160.443 234.929 176.834 245.873 189.769C256.816 202.705 271.984 211.35 288.691 214.174V251.125C288.691 254.296 289.951 257.338 292.193 259.581C294.436 261.823 297.478 263.083 300.649 263.083C303.821 263.083 306.862 261.823 309.105 259.581C311.347 257.338 312.607 254.296 312.607 251.125V214.174C324.79 212.06 336.232 206.874 345.852 199.106C350.121 205.958 355.734 211.875 362.351 216.499C368.969 221.123 376.455 224.359 384.357 226.012V251.125C384.357 254.296 385.617 257.338 387.86 259.581C390.103 261.823 393.144 263.083 396.316 263.083C399.487 263.083 402.529 261.823 404.772 259.581C407.014 257.338 408.274 254.296 408.274 251.125V226.012C421.779 223.256 433.917 215.917 442.634 205.24C451.351 194.562 456.11 181.2 456.107 167.417V119.583C456.107 103.725 449.808 88.5172 438.595 77.3041C427.382 66.091 412.173 59.7916 396.316 59.7916ZM336.524 119.583V167.417C336.638 169.7 336.878 171.976 337.242 174.233C330.846 181.85 322.235 187.284 312.607 189.779V155.458C312.607 152.287 311.347 149.245 309.105 147.002C306.862 144.76 303.821 143.5 300.649 143.5C297.478 143.5 294.436 144.76 292.193 147.002C289.951 149.245 288.691 152.287 288.691 155.458V189.659C278.449 187.015 269.372 181.05 262.881 172.698C256.39 164.346 252.85 154.078 252.816 143.5V95.6666C252.785 86.1904 255.569 76.9184 260.815 69.027C266.061 61.1355 273.534 54.9802 282.283 51.3419C291.033 47.7035 300.667 46.7461 309.962 48.5911C319.257 50.4361 327.794 55.0004 334.491 61.7049C340.965 68.2657 345.372 76.5811 347.167 85.6216C340.254 95.5993 336.542 107.445 336.524 119.583ZM432.191 167.417C432.17 174.818 429.86 182.032 425.578 188.069C421.297 194.107 415.252 198.672 408.274 201.139V155.458C408.274 152.287 407.014 149.245 404.772 147.002C402.529 144.76 399.487 143.5 396.316 143.5C393.144 143.5 390.103 144.76 387.86 147.002C385.617 149.245 384.357 152.287 384.357 155.458V201.139C377.379 198.672 371.335 194.107 367.053 188.069C362.771 182.032 360.462 174.818 360.441 167.417V119.583C360.441 110.069 364.22 100.944 370.948 94.2158C377.676 87.4879 386.801 83.7082 396.316 83.7082C405.83 83.7082 414.955 87.4879 421.683 94.2158C428.411 100.944 432.191 110.069 432.191 119.583V167.417Z"/>
          </svg>

        </div>
      </div>
      </div>
    
    </div>
   
   
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  const router = useRouter();
  if (pending) {
    return (
      <button disabled={pending} type="submit" className="submitBtn loading">
        <div className="loader">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" strokeWidth="4" strokeLinecap="round"/>
            </svg>
        </div>
      </button>
    );
  }
  return (
    <button disabled={pending} type="submit" className="submitBtn">
      <p>
        Create Account
      </p>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 12L4 12M20 12L14 18M20 12L14 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}