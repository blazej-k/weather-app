import React, { FC, useState } from 'react'
import { WiCelsius } from "weather-icons-react";
import Hourly from './Hourly';
import Now from './Now';
import Weekly from './Weekly';

interface ScoresProps {
    weather: WeatherObj,
    weatherType: string,
    // name: string
}

const Scores: FC<ScoresProps> = ({ weather, weatherType }) => {

    const { name } = weather
    const [cityName, setCityName] = useState('')

    if((cityName !== undefined) && (cityName.length === 0)){
        setCityName(name)
    }

    return (
        <>
            <h1>{cityName}</h1>
            {(weatherType === 'now' || weatherType === '') && <Now weather={weather}/>}
            {weatherType === 'hourly' && <Hourly weather={weather}/>}
            {weatherType === 'weekly' && <Weekly weather={weather}/>}
        </>
    );
}

export default Scores;