"use client"
import {useEffect, useState, useRef} from 'react'
import Link from 'next/link'
import "./../profile/styleP.css"
import "./style.css"
import { includes, regex } from 'zod'

export default function seller({
    Nav
}) {
      //setting up geolocation
      const [lat, setLat] = useState(null);
      const [log, setLog] = useState(null);
      let [useLocal, setUseLocal] = useState(false)
      let [mapData, setMapDate] = useState("");
      let [otherData, setOtherData] = useState("")
      let [err, setErr] = useState(false)


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
            //   portalData.map((portal)=>{
                let postReg = new RegExp(/^\bpostal-code\b$/)
                // console.log(includes())
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

        {/* Form for seller */}
        <div className="sellerForm">
            <form action="#">
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

                        <input id="email" name="email" placeholder="Location" type='text' defaultValue={ useLocal ? (mapData ? mapData : "") : ""}/>
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
                            <input id="email" name="postalCode" placeholder="SW1A 5**" type='text' defaultValue={ useLocal ? (otherData ? otherData : "") : ""}/>
                        </div>
                    </div>
                    <div className="emailInput postalCode">
                        <label htmlFor="email">
                            <p>Phone number</p>
                            <br/>
                        </label>
                        <div className="insideInput">
                            <input id="email" name="email" placeholder="07123***" type='number'/>
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
                            <input id="email" name="postalCode" placeholder="£50" type='text' defaultValue={"£"}/>
                        </div>
                    </div>
                    <div className="emailInput postalCode">
                        <label htmlFor="file" className='upload'>
                            {/* {!imgOfLocation.value && imgOfLocation.value} */}
                            <p>upload an image of the packing space</p>
                        </label>
                        <div className="insideInput file">
                            <input id="file" name="imgOfLocation" placeholder="number" type='file'/>
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
                            <input id="email" name="postalCode" placeholder="21 - ** - **" type='number' />
                        </div>
                    </div>
                    <div className="emailInput postalCode">
                        <label htmlFor="email">
                            <p>Account number</p>
                            <br/>
                        </label>
                        <div className="insideInput">
                            <input id="email" name="email" placeholder="65123***" type='number'/>
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
                        <input id="email" name="email" placeholder="Jacob theG.O.A.T" type='text'/>
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
