import React, { FC, useEffect, useState } from 'react'
import { RiCelsiusLine } from 'react-icons/ri'
import date from 'date-and-time';

interface NowProps {
    weather: Current
}

const Now: FC<NowProps> = ({ weather }) => {

    console.log(weather)
    const [iconName, setIconName] = useState('')

    const { temp, sunset, sunrise, wind_speed, pressure, clouds, visibility, uvi, humidity, } = weather
    const { main, description, icon } = weather.weather[0]


    useEffect(() => {
        switch(icon){
            case '01d': 
                setIconName('sun')
                break;
            case '01n':
                setIconName('moon')
                break;
            case '02d': 
                setIconName('cloudy_d')
                break;
            case '02n': 
                setIconName('cloudy_n')
                break;
            case '03d':
            case '03n':  
                setIconName('cloud')
                break;
            case '04d':
            case '04n': 
                setIconName('broken_clouds')
                break;
            case '09d':
            case '09n':
            case '10d':
            case '10n': 
                setIconName('rain')
                break;
            case '11d':
            case '11n': 
                setIconName('storm')
                break;
            case '13d':
            case '13n': 
                setIconName('snow')
                break;
            case '50d':
            case '50n': 
                setIconName('mist')
                break;
            default:    
                setIconName('')
                break;
        }
    }, [icon])

    const validateDate = (dateToFormat: Date, unit: string) => date.format(dateToFormat, unit)

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
                        {validateDate(new Date(sunrise * 1000), 'HH')}:{validateDate(new Date(sunrise * 1000), 'mm')}
                    </span>
                    <span>Sunset:&nbsp;
                        {validateDate(new Date(sunset * 1000), 'HH')}:{validateDate(new Date(sunset * 1000), 'mm')}
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
            {/* <img style={{ width: '3%' }} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="icon" /> */}
        </div>
    );
}

export default Now;