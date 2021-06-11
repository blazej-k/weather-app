import React, { FC, useEffect, useMemo, useState } from 'react'
import { RiCelsiusLine } from 'react-icons/ri'
import validateDate from './helpers/validateDate'
import getIconName from './helpers/getIconName'
import { useWeather } from '../hooks/weatherHooks'


const Now: FC = () => {

    const [iconName, setIconName] = useState('')
    const [showIcon, setShowIcon] = useState(false)
    const {weather, iconLoader} = useWeather()

    const { temp, sunset, sunrise, wind_speed, pressure, clouds, visibility, uvi, humidity } = useMemo(() => weather.current, [weather])
    const { main, description, icon } = useMemo(() => weather.current.weather[0], [weather])


    useEffect(() => {
        icon.length > 0 && showIcon && import(`../../../../assets/icons/${getIconName(icon)}.png`).then(res => setIconName(res.default))
    }, [icon, showIcon])

    return (
        <div className='Weather-now' data-aos="fade-up" data-aos-once={true}>
            <div className="main">
                <h1>{Math.round(temp)}<RiCelsiusLine /></h1>
                <div className='info-feels-temp'>
                    Feels like {Math.round(weather.current.feels_like)}<RiCelsiusLine />
                </div>
            </div>
            <h2 className="description">
                {description}
            </h2>
            <div className="icon">
                {iconName.length > 0 ? <img src={iconName} alt='weather-icon'/> : <img src={iconLoader} onLoad={() => setShowIcon(true)} alt='loader'/>}
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
            {'alerts' in weather &&
                <div className="alerts">
                    <h2>Alerts</h2>
                    <ul>
                        {weather.alerts.map(({ description, start }) => (
                            description.length > 0 && <li key={start}>{description}</li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
}

export default Now;