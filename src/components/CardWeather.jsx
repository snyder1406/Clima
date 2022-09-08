import axios from "axios"
import React, { useEffect, useState } from "react"
import LoadingScreen from "./LoadingScreen"




const CardWeather = ({lat, lon}) => {

  const [weather, setWeather] = useState() 
  const [temperture, setTemperture] = useState()
  const [isCelsius, setIsCelsius] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if(lat){
    const APIkey = '2ea8437851e4c87f254c6b2669a27f97'
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
    
      axios.get(URL)
        .then(res => {
            setWeather(res.data)
            const temp = {
                celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
                farenheit: `${Math.round(res.data.main.temp - 273.15) * 9 / 5 + 32} °F`
            }
            setTemperture(temp)
            setIsLoading(false)
        })
        .catch(err => console.log(err))
    }
  }, [lat, lon])

  console.log(weather)
  const handleClick = () => setIsCelsius(!isCelsius)

  if(isLoading){
    return <LoadingScreen />
    } else {
      return (
        <article>
            <h2>{`${weather?.name}, ${weather?.sys.country}`}</h2>
            <div>
              
              
               <img src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
            <div>
                <h3>"{weather?.weather[0].description}"</h3>
                <ul>
                    <li><span>Wind Speed </span>{weather?.wind.speed}</li>
                    <li><span>Clouds </span>{weather?.clouds.all}%</li>
                    <li><span>Pressure </span>{weather?.main.pressure} hPa</li>
                </ul>
            </div>
           </div>
           <h2>{isCelsius ? temperture?.celsius : temperture?.farenheit}</h2>
           <button onClick={handleClick}> {isCelsius ? `Change to °F`: `Change to °C`} </button>
        </article>    
    )    
   }
}

export default CardWeather