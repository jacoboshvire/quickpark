"use server"


export  default async function locatingusing() {
    let success = (position) => console.log(position)
    let errorCallback = e => console.log(e)
    navigator.geolocation.getCurrentPosition(success, errorCallback)

    const watch = await navigator.geolocation.watchPosition(success, errorCallback)

    if(!e) {
     
    }
}
