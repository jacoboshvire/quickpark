"use client"
import {useEffect, useState, useRef} from 'react'
import "./style.css"
import Image from 'next/image'
import Link from 'next/link'
import Profile1 from "./../Image/Group6.png"
import profile2 from './../Image/Group6.png'
// import {useSearchParams} from 'next/navigation'
import { clearPreviewData } from 'next/dist/server/api-utils'
import { useTheme } from 'next-themes'
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow
} from '@vis.gl/react-google-maps'



export default function layout({
 Price, Nav, Distance, Time, Seller
}) {
    // const searchParams = useSearchParams()
    
    // const id = searchParams.get('id')

     let Test = [
    {
    location : "Kiln House, Spark st, Stoke-on-trent",
    price: "5",
    postlat: 53.0854,
    postlog: -2.4339,
    id: 1,
    user: {
        username : "sarah_lovemoney",
        image: Profile1
    }

    },{
    location : "Holiday Inn London - Camden Lock by IHG",
    price: "10",
    postlat: 53.0111,
    postlog: -2.1506,
    id: 2,
    user:{
        username: "jane_cheap",
        image: profile2
    }   
    },{
    location : "Holiday Inn London - Camden Lock by IHG",
    price: "10",
    postlat: 52.994337,
    postlog: -2.18983,
    id: 3,
    user:{
        username: "jane_cheap",
        image: profile2
    }   
    },{
    location : "Holiday Inn London - Camden Lock by IHG",
    price: "10",
    postlat: 53.0111,
    postlog: -2.1506,
    id: 4,
    user:{
        username: "jane_cheap",
        image: profile2
    }   
    },{
    location : "Holiday Inn London - Camden Lock by IHG",
    price: "10",
    postlat: 53.0111,
    postlog: -2.1506,
    id: 5,
    user:{
        username: "jane_cheap",
        image: profile2
    }   
    },{
    location : "Holiday Inn London - Camden Lock by IHG",
    price: "10",
    postlat: 53.0111,
    postlog: -2.1506,
    id: 6,
    user:{
        username: "jane_cheap",
        image: profile2
    }   
    }]
    
    const {themes, setThemes} = useTheme()
    let [togglebtn, setTogglebtn] = useState(false)
    let [togglebtn1, setTogglebtn1] = useState(false)
    let [togglebtn2, setTogglebtn2] = useState(false)
    let [togglebtn3, setTogglebtn3] = useState(false)

    const togglefun = () =>{
        setTogglebtn1(false)
        setTogglebtn2(false)
        setTogglebtn3(false)
        setTogglebtn((togglebtn) => (!togglebtn))
    }

    const togglefun1 = () => {
        setTogglebtn(false)
        setTogglebtn2(false)
        setTogglebtn3(false)
        setTogglebtn1((togglebtn1) => (!togglebtn1))
    }

    const togglefun2 = () => {
        setTogglebtn(false)
        setTogglebtn1(false)
        setTogglebtn3(false)
        setTogglebtn2((togglebtn2) => (!togglebtn2))
    }

    const togglefun3 = () => {
        setTogglebtn(false)
        setTogglebtn1(false)
        setTogglebtn2(false)
        setTogglebtn3((togglebtn3) => (!togglebtn3))
    }

    //setting up geolocation
    const [lats, setLats] = useState(null);
    const [log, setLog] = useState(null);

    const { theme, setTheme } = useTheme()

    useEffect(()=>{
        if(!navigator.geolocation){
            console.log("null")
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLats(position.coords.latitude)
                    setLog(position.coords.longitude)
                    console.log([setLats, setLog])
                }
            )
        } 
    },[setLats, setLog])

    // let [pop, setPop] = useState(false)

    // const popUp = () =>{
    //     setPop(true)
    // }

    // const watchId = navigator.geolocation.watchPosition(success, errorCallback)
  return (
    <div className="Dashboard">
        {Nav}
        <div className="mainFcontainer">
            <div className="insideMainContainer">
            <nav>
                <div className="title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 5L10 5M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M14 5L20 5M4 12H16M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM8 19H20M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19Z" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h2>
                    Filter by
                </h2>
                </div>
                <div className="catagories">
                <li onClick={togglefun} className={togglebtn ? "newLi" : ""}>
                    <p>
                    Price
                    </p>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {togglebtn && Price}
                </li>
                
                <li onClick={togglefun1} className={togglebtn1 ? "newLi" : ""}>
                    <p>
                    Distance
                    </p>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {togglebtn1 && Distance}
                </li>
                
                <li onClick={togglefun2} className={togglebtn2 ? "newLi" : ""}>
                    <p>
                    Time
                    </p>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {togglebtn2 && Time}
                </li>
                
                <li onClick={togglefun3} className={togglebtn3 ? "newLi" : ""}>
                    <p>
                    Seller
                    </p>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {togglebtn3 && Seller}
                </li>
                </div>
            </nav>
            </div>
        </div>
        {/* {
        pop && <div>
            query: {Test[id].location}
        </div> || id != ''
        } */}

        <div className="mainBody">
            <div className="sellerSpace">
                {/* numebers of seller space */}
                <div className="numOfPost">
                    <p>
                        <b>"{Test.length}"</b> Car park available for grabs
                    </p>
                </div>
                {/* sellers spaces */}
                <div className="sellers">
                    {
                        Test.map((Tests)=>{
                            return(
                                <div className="post" key={Tests.id}>
                                    <div className="PostMap">
                                        <APIProvider apiKey='AIzaSyBHhvmsIAVbkqEelJxx5iB_K3OEVpuciwk'>
                                            <div className="postmaps">
                                                <Map className='mainMap' zoom={14} defaultCenter={{lat: Tests.postlat, lng: Tests.postlog}} mapId="3d1b9607105bf1d610120232">
                                                    <AdvancedMarker position={{lat: Tests.postlat, lng: Tests.postlog}}>
                                                        <Pin / >
                                                    </AdvancedMarker>
                                                </Map>
                                            </div>
                                        </APIProvider> 
                                    </div>
                                    <div className="postlocation">
                                        <h2>
                                            {Tests.location}
                                        </h2>
                                        <div className="priceL">
                                            <p>
                                            Price
                                            </p>
                                            <p>  
                                                £{Tests.price}
                                            </p>
                                        </div>
                                        <div className="postProfile">
                                            <Image 
                                            src={Tests.user.image}
                                            alt={Tests.user.username}
                                            height={"35"}
                                            width={"35"}
                                            />

                                            <p>{Tests.user.username}</p>
                                        </div>
                                    </div>
                                    <Link className="PostBtn" href={`?id=${Tests.id}`} >
                                        <p>book now</p>
                                    </Link>
                                    
                                </div>
                            )
                            
                        })
                    }
                </div>
            </div>
            <div className="map">
                <APIProvider apiKey={process.env.GOOGLE_KEY}>
                    <div className="maps" >
                        { lats ?
                        <Map defaultZoom={15} defaultCenter={{lat: lats, lng:log} } 
                        className='realMap'  mapId="3d1b9607105bf1d610120232">
                            <AdvancedMarker position={{lat:lats,lng:log}}>
                                <div className="yourLocation">
                                    <span className='dotLocation'></span>
                                </div> 
                            </AdvancedMarker>
                             {Test.map((locations) => (
                                <AdvancedMarker
                                key={locations.id}
                                position={{lat:locations.postlat , lng:locations.postlog}} >
                                <div className='sellerMapBtn'>
                                    <Image
                                        src={locations.user.image}
                                        alt={locations.user.username}
                                        height={"40"}
                                        width={"40"}
                                    />
                                    <span></span>
                                </div>
                                </AdvancedMarker>
                            ))}
                        </Map>
                        :
                        <Map zoom={7} defaultCenter={{lat: 55.3781, lng: -3.4360}} 
                        className='realMap'  mapId={"3d1b9607105bf1d610120232"}></Map>
                        }
                    </div>
                </APIProvider>
            </div>
        </div>
    </div>
  )
}

const test = ({ points }) => {
    return (
    <>
     
    </>
  );
};