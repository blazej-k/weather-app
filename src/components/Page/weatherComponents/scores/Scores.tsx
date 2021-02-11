import React, { FC, useEffect, useMemo, useState } from 'react'
import Hourly from './Hourly';
import Now from './Now';
import Daily from './Daily';
import { useWeather } from '../hooks/weatherHooks';

interface ScoresProps {
    weatherType: string,
    cityName: string
}

const Scores: FC<ScoresProps> = ({ weatherType, cityName }) => {

    const [name, setName] = useState('')
    const weather = useWeather().weather

    useEffect(() => {
        if (cityName?.length !== 0) {
            setName(cityName)
        }
    }, [cityName])

    return (
        <>
            <h1>{name}</h1>
            {'id' in weather && <div className="loader">Loading...</div>}
            {(weatherType === 'now' || weatherType === '') && 'current' in weather && <Now />}
            {weatherType === 'hourly' && 'hourly' in weather && <Hourly />}
            {weatherType === 'daily' && 'daily' in weather && <Daily />}
        </>
    );
}

export default Scores;