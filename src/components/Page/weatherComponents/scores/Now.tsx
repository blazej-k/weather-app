import React, { FC } from 'react'
import {RiCelsiusLine} from 'react-icons/ri'

interface NowProps {
    weather: Current
}

const Now: FC<NowProps> = ({ weather }) => {

    console.log(weather)

    const {temp, sunset, sunrise, wind_speed, pressure, clouds, visibility, uvi, humidity, } = weather
    const {main, description} = weather.weather[0]

    return (
        <div className='Weather-now' data-aos="fade-up" data-aos-once={true}>
            <div className="main">
                <h1>{Math.round(temp)}<RiCelsiusLine/></h1>
                <div className='info-feels-temp'>
                    Feels like {Math.round(weather.feels_like)}<RiCelsiusLine/>
                </div>
            </div>
            <h2 className="description">{description}</h2>
            <div className='rest-info'>
                <div className='info-container'>
                    <span>Sunrise: {new Date(sunrise * 1000).getHours()}:{new Date(sunrise * 1000).getMinutes()}</span>
                    <span>Sunset: {new Date(sunset * 1000).getHours()}:{new Date(sunset * 1000).getMinutes()}</span>
                    <span>Pressure: {pressure} hPa</span>
                </div>
                <div className="info-container">
                    <span>Wind speed: {wind_speed} km/h</span>
                    <span>Clouds: {clouds} %</span>
                    <span>Visiblity: {(visibility / 1000)} km</span>
                </div>
                <div className="info-container">
                    <span>Main: {main}</span>
                    <span>UVI index: {uvi}</span>
                    <span>Humidity: {humidity} %</span>
                </div>
            </div>
            {/* <img style={{ width: '3%' }} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="icon" /> */}
        </div>  
    );
}

export default Now;