import { useState } from "react"

export default function useGeoLocation() {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);


    function geoPosition() {
        if (!navigator.geolocation) return setError("Your Browser Does Not Support GeoLocation ");

        setIsLoading(true)
        navigator.geolocation.getCurrentPosition((pos) => {
            setPosition({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            })
            setIsLoading(false)
        }, (err) => {
            setError(err.message)
            setIsLoading(false)
        })
    }

    return { position, isLoading, error, geoPosition };
}