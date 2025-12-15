"use client"
import {useState, useTransition, useEffect, useActionState} from 'react'
import Link from 'next/link'
import "./../profile/styleP.css"
import "./style.css"
import { useFormStatus } from "react-dom";
import { useRouter } from 'next/navigation'

export default function seller({
    Nav
}) {
    const router = useRouter()
    //setting up geolocation
    const [lat, setLat] = useState(null);
    const [log, setLog] = useState(null);
    let [useLocal, setUseLocal] = useState(false)
    let [mapData, setMapDate] = useState("");

    //other data
    let [otherData, setOtherData] = useState("")
    let [err, setErr] = useState("")
    const [pending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);

      //use location 
      const useLocation = () => {
        setUseLocal((useLocal) => (!useLocal))
      } 
  
      useEffect(()=>{
          if(!navigator.geolocation){
              console.log("null")
          } else {

              navigator.geolocation.getCurrentPosition(
                  (position) => {
                    setLat(position.coords.latitude)
                    setLog(position.coords.longitude)
                    // console.log([setLat, setLog])
                  }
              )
          } 
      },[setLat, setLog])
  
      let apiKey = 'AIzaSyBHhvmsIAVbkqEelJxx5iB_K3OEVpuciwk'
      let googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${log}&key=${apiKey}`
     
  
    async function googleApi() {
          let res = await fetch(googleUrl)
          let data = await res.json()
          return data
    }
    useEffect(() =>{
      googleApi().then((data) => {
              let dataMap = data.results[0].formatted_address
            //   console.log(data.results[0].address_components)
              setMapDate(data.results[0].formatted_address)
              let portalData =  data.results[0].address_components
                portalData.forEach(component => {
                    if (component.types.includes("postal_code")) {
                        setOtherData(component.long_name);
                    }
                });

              if(portalData.types.test(postReg)){
                    console.log("postal code")
                    console.log(portalData)
                    setOtherData(portalData.long_name)
              } else{
                console.log("me")
              }
            //   })
              
             
          }).catch(e=>{
              setErr(true)
          })
    },)

    const [token, setToken] = useState("");    

    useEffect(() => {
        if (typeof document !== "undefined") {
        const cookieToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        setToken(cookieToken || "");
        }
    }, []);

    

  // FORM STATE
  const [locations, setLocationValue] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [price, setPrice] = useState("");
  const [sortcode, setSortcode] = useState("");
  const [accountnumber, setAccountnumber] = useState("");
  const [duration, setDuration] = useState("");
  const [timeNeeded, setTimeNeeded] = useState("");
  const [accountname, setAccountname] = useState("");
  const [imageFile, setImageFile] = useState();

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [removeError, setRemoveError] = useState(false);



  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!token) {
      setErrMsg("Not logged in!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("locations", locations);
      formData.append("postalcode", postalcode);
      formData.append("phonenumber", phonenumber);
      formData.append("price", price);
      formData.append("sortcode", sortcode);
      formData.append("accountnumber", accountnumber);
      formData.append("duration", duration);
      formData.append("timeNeeded", timeNeeded);
      formData.append("accountname", accountname);
      formData.append("image", imageFile); 

      const response = await fetch(
        "https://quickpark-backend.vercel.app/api/sellerpost",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const text = await response.text();
      console.log("Raw Response:", text);

      // Attempt JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        setErrMsg("Invalid server response");
        return;
      }

      if (!response.ok) {
        console.log(data.error)
        setErrMsg(data.error || "You may need to complete the form, if applicable.");
        return;
      }

      setSuccessMsg(data.message || "Successfully submitted!");
    } catch (err) {
      console.error("Submit error:", err);
      setErrMsg("something is wrong" );
    }finally {
        setLoading(false);
    }
  }

  return (
    <>
    {Nav}
    <div className='sellerMain'>
        <Link className="backBtn" href={"/"}>
            <svg width="25" height="25" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.16669 15.5L25.8334 15.5M5.16669 15.5L12.9167 7.75M5.16669 15.5L12.9167 23.25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>
             Seller page
            </p>
        </Link>
        {errMsg &&
        <div className="err">
            <p className='errorP'>
                {errMsg}
            </p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>setErrMsg("")}>
                <path d="M18 6L6 18M6 6L18 18" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" stroke="white"/>
            </svg>
        </div>
        }
        {successMsg &&
        <div className="err">
            <p className='success'>
                {successMsg}
            </p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>setSuccessMsg("")}>
                <path d="M18 6L6 18M6 6L18 18" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" stroke="white"/>
            </svg>
        </div>
        }
        {
        loading && 
         <div className="loadingProfile">
            <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="25.5" cy="25.5" rx="23" ry="23" transform="rotate(-90 25.5 25.5)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 11 1 11"/>
            </svg>
            <p>
                Updating Profile... this may take a while 🫣
            </p>
         </div>
        }
        {/* Form for seller */}
        <div className="sellerForm">
            <form  onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="emailInput">
                    <label htmlFor="email">
                        <p>Location</p>
                        <br/>
                    </label>
                    <div className="insideInput">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 21C16.4183 19 20 15.4183 20 11C20 6.58172 16.4183 3 12 3C7.58172 3 4 6.58172 4 11C4 15.4183 7.58172 19 12 21Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input
                        id="email"
                        name="locations"
                        placeholder="Location"
                        type="text"
                        defaultValue={ useLocal ? (mapData ? mapData : "") : ""}
                        onChange={(e) => setLocationValue(e.target.value)}
                        />
                    </div>
                    <div className={!useLocal ? "useLocation" : "useLocation locationActive"} onClick={useLocation}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3V21M3 12H21M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        <p>Use my location</p>
                        
                    </div>
                </div>
                <br />
                <div className="PostalOther">
                    <div className="emailInput postalCode">
                        <label htmlFor="email">
                            <p>Postal Code</p>
                            <br/>
                        </label>
                        <div className="insideInput">
                            <input
                                id="email"
                                name="postalcode"
                                placeholder="SW1A 5**"
                                type="text"
                                defaultValue={ useLocal ? (otherData ? otherData : "") : ""}
                                onChange={(e) => setPostalcode(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="emailInput postalCode">
                        <label htmlFor="email">
                            <p>Phone number</p>
                            <br/>
                        </label>
                        <div className="insideInput">
                            <input
                                id="email"
                                name="phonenumber"
                                placeholder="07123***"
                                type="tel"
                                value={phonenumber}
                                onChange={(e) => setPhonenumber(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="PostalOther">
                    <div className="emailInput postalCode">
                        <label htmlFor="email">
                            <p>Your price (£)</p>
                            <br/>
                        </label>
                        <div className="insideInput">
                            <input
                                id="email"
                                name="price"
                                placeholder="50"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="emailInput postalCode">
                        <label htmlFor="file" className='upload'>
                            {/* {!imgOfLocation.value && imgOfLocation.value} */}
                            <p>upload an image of the packing space</p>
                        </label>
                        <div className="insideInput file">
                            <input
                                id="file"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                setImageFile(e.target.files?.[0] || null)
                                }
                            />
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="PostalOther">
                    <div className="emailInput postalCode">
                        <label htmlFor="email">
                            <p>sort code</p>
                            <br/>
                        </label>
                        <div className="insideInput">
                            <input
                                id="email"
                                name="sortcode"
                                placeholder="21****"
                                type="number"
                                value={sortcode}
                                onChange={(e) => setSortcode(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="emailInput postalCode">
                        <label htmlFor="email">
                            <p>Account number</p>
                            <br/>
                        </label>
                        <div className="insideInput">
                             <input
                                id="email"
                                name="accountnumber"
                                placeholder="65123***"
                                type="number"
                                value={accountnumber}
                                onChange={(e) => setAccountnumber(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="PostalOther">
                    <div className="emailInput postalCode">
                        <label htmlFor="email">
                            <p>duration</p>
                            <br/>
                        </label>
                        <div className="insideInput">
                            <input
                                id="email"
                                name="duration"
                                placeholder="5"
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="emailInput postalCode">
                        <label htmlFor="email">
                            <p>when are you ready</p>
                            <br/>
                        </label>
                        <div className="insideInput">
                            <input
                                id="email"
                                name="timeNeeded"
                                placeholder="5 mins"
                                type="text"
                                value={timeNeeded}
                                onChange={(e) => setTimeNeeded(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="emailInput">
                    <label htmlFor="email">
                        <p>Account name</p>
                        <br/>
                    </label>
                    <div className="insideInput">
                        <input
                            id="email"
                            name="accountname"
                            placeholder="Jacob theG.O.A.T"
                            type="text"
                            value={accountname}
                            onChange={(e) => setAccountname(e.target.value)}
                        />
                    </div>
                </div>
                <br />
                    <button type="submit">
                    <p>
                        Let's go
                    </p>
                    </button>
            </form>
        </div>
        <br />
    </div>
    </>
  )
}
