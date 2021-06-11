import React, { FC, lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { useWeather } from '../hooks/weatherHooks';
import { useMediaQuery } from 'react-responsive';
const Now = lazy(() => import('./Now'))
const FutureWeather = lazy(() => import('./helpers/FutureWeather'))

interface ScoresProps {
    weatherType: string,
    cityName: string
}

const Scores: FC<ScoresProps> = ({ weatherType, cityName }) => {

    const [name, setName] = useState('')
    const mobileDevice = useMediaQuery({ query: '(max-width: 750px)' })
    const hourlyWeatherLength = useMemo(() => mobileDevice ? 4 : 8, [mobileDevice])
    const { weather } = useWeather()

    useEffect(() => {
        if (cityName?.length !== 0) {
            setName(cityName)
        }
    }, [cityName])

    return (
        <Suspense fallback={null}>
            <h1>{name}</h1>
            {'id' in weather && <div className="loader">Loading...</div>}
            {(weatherType === 'now' || weatherType === '') && 'current' in weather && <Now />}
            {weatherType === 'hourly' && 'hourly' in weather && <FutureWeather
                type='hourly'
                showingArrayLength={hourlyWeatherLength}
                fullLengthOfArray={24}
            />}
            {weatherType === 'daily' && 'daily' in weather && <FutureWeather
                type='daily'
                showingArrayLength={4}
                fullLengthOfArray={8}
            />}
        </Suspense>
    );
}

export default Scores;