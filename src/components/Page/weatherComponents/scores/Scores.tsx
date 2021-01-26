import React, { FC, useEffect, useState } from 'react'
import Hourly from './Hourly';
import Now from './Now';
import Weekly from './Weekly';

interface ScoresProps {
    weather: WeatherObj | OneCallWeatherObj,
    weatherType: string,
}

const Scores: FC<ScoresProps> = ({ weather, weatherType }) => {

    const { name } = weather as WeatherObj
    const [cityName, setCityName] = useState('')

    useEffect(() => {
        if((cityName !== undefined) && (cityName.length === 0)){
            setCityName(name)
        }
    }, [name])

    return (
        <>
            <h1>{cityName}</h1>
            {(weatherType === 'now' || weatherType === '') && <Now weather={'current' in weather && weather.current}/>}
            {weatherType === 'hourly' && <Hourly weather={'hourly' in weather && weather.hourly}/>}
            {weatherType === 'weekly' && <Weekly weather={'daily' in weather && weather.daily}/>}
        </>
    );
}

export default Scores;