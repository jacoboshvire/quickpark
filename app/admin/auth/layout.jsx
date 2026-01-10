"use client";

import { useActionState , useState, Suspense} from "react";
import { useFormStatus } from "react-dom";
import { loginAdmin } from "./actions";
import Wave from "./../../Image/Wave.png"
import Image from "next/image";
//this are for next js link and navigation
import Link from 'next/link';
import "./../../login/login.css"

export default function Layoutlogin({
    children, successMsg
}) {
  const [state, loginAction] = useActionState(loginAdmin, undefined);
  let [typebtn, setTypebtn] = useState(true);

  const toggleTypeBtn = () =>{
    setTypebtn((typebtn) => (!typebtn))
  }

  return (
    <div className="maincontainer">
    <Suspense>
        {successMsg}
    </Suspense>
      <div className="insidemain">
      <div className="firstcontainer">
        <div className="welcomeAndLogo">
          <div className="logos">
            <div className="logoDesign">
              <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 8.4375C0 3.7776 2.15863 0 4.82143 0H15.2679C19.2621 0 22.5 5.6664 22.5 12.6562V25.3125H0V8.4375Z" />
                <path d="M0 8.4375L25.7143 8.4375C28.0812 8.4375 30 11.7954 30 15.9375V25.3125H0V8.4375Z" />
                <path d="M25.1786 24.8438C25.1786 27.6915 23.8594 30 22.2321 30C20.6049 30 19.2857 27.6915 19.2857 24.8438C19.2857 21.996 20.6049 19.6875 22.2321 19.6875C23.8594 19.6875 25.1786 21.996 25.1786 24.8438Z" />
                <path  d="M8.03571 24.8438C8.03571 27.6915 6.71655 30 5.08929 30C3.46202 30 2.14286 27.6915 2.14286 24.8438C2.14286 21.996 3.46202 19.6875 5.08929 19.6875C6.71655 19.6875 8.03571 21.996 8.03571 24.8438Z" />
              </svg>

              <h1>
                QuickPark
              </h1>

            </div>
          </div>
          <div className="welcome">
            <div className="mainHeading">
              <h1 className="title">
                Welcome Back
              </h1>
              <Image 
              alt="wave"
              src={Wave}
              height={"50"}
              width={"50"}
              />
            </div>
            <div className="detiledWelcome">
              <p>
                Welcome back! Let’s get you parked in no time
              </p>
            </div>
          </div>
        </div>
        <div className="formDiv">
          <form action={loginAction} className="form">
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
            </div>
            {state?.errors?.email && (
              <p className="error">{state.errors.email}</p>
            )}

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
            </div>
            {/* {state?.errors?.password && (
              <p className="error">{state.errors.password}</p>
            )} */}
            <SubmitButton />
          </form>
          <div className="createAcc">
            <p>
              you don’t have an account? click on <Link href={"/signup"}>Create account</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="secondcontainer">
        <div className="animation">
          <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M246.761 451.29C169.848 451.29 104.167 439.321 104.167 391.388C104.167 343.455 169.432 299.206 246.761 299.206C323.674 299.206 389.356 343.026 389.356 390.959C389.356 438.873 324.091 451.29 246.761 451.29Z" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M246.61 232.784C297.084 232.784 337.993 191.875 337.993 141.402C337.993 90.928 297.084 50 246.61 50C196.137 50 155.209 90.928 155.209 141.402C155.038 191.705 195.663 232.614 245.966 232.784C246.194 232.784 246.402 232.784 246.61 232.784Z" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      </div>
    
    </div>
   
   
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      <p>
        Login
      </p>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 12L4 12M20 12L14 18M20 12L14 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

    </button>
  );
}