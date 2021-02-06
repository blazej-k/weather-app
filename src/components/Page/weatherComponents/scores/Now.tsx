import React, { FC, useEffect, useState } from 'react'
import { RiCelsiusLine } from 'react-icons/ri'
import validateDate from './helpers/validateDate'
import getIconName from './helpers/getIconName'
import { useWeather } from '../hooks/weatherHooks'

// interface NowProps {
//     weather: Current
// }

const Now: FC = () => {

    const [iconName, setIconName] = useState('')
    const weather = useWeather().weather.current

    const { temp, sunset, sunrise, wind_speed, pressure, clouds, visibility, uvi, humidity } = weather
    const { main, description, icon } = weather.weather[0]


    useEffect(() => {
        setIconName(getIconName(icon))
    }, [icon])

    return (
        <div className='Weather-now' data-aos="fade-up" data-aos-once={true}>
            <div className="main">
                <h1>{Math.round(temp)}<RiCelsiusLine /></h1>
                <div className='info-feels-temp'>
                    Feels like {Math.round(weather.feels_like)}<RiCelsiusLine />
                </div>
            </div>
            <h2 className="description">
                {description}
            </h2>
            <div className="icon">
                {iconName.length > 0 && <img src={`../../../assets/icons/${iconName}.png`} alt="" />}
            </div>
            <div className='rest-info'>
                <div className='info-container'>
                    <span>Sunrise:&nbsp; 
                        {validateDate(new Date(sunrise * 1000), 'HH:mm')}
                    </span>
                    <span>Sunset:&nbsp;
                        {validateDate(new Date(sunset * 1000), 'HH:mm')}
                    </span>
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
        </div>
    );
}

export default Now;