import React, { FC, useEffect, useState } from 'react'
import Hourly from './Hourly';
import Now from './Now';
import Daily from './Daily';

interface ScoresProps {
    weather: WeatherObj | OneCallWeatherObj,
    weatherType: string,
}

const Scores: FC<ScoresProps> = ({ weather, weatherType }) => {

    const { name } = weather as WeatherObj
    const [cityName, setCityName] = useState('')

    useEffect(() => {
        if ((cityName?.length === 0)) {
            setCityName(name)
        }
    }, [name])

    return (
        <>
            <h1>{cityName}</h1>
            {'id' in weather && 'Loading...'}
            {(weatherType === 'now' || weatherType === '') && 'current' in weather && <Now weather={weather.current} />}
            {weatherType === 'hourly' && 'hourly' in weather && <Hourly weather={weather.hourly.slice(0, 24)} />}
            {weatherType === 'daily' && 'daily' in weather && <Daily weather={weather.daily} />}
        </>
    );
}

export default Scores;