import React, { FC, lazy, useMemo } from 'react'
import { useWeather } from '../hooks/useWeather';
import { useMediaQuery } from 'react-responsive';
const Now = lazy(() => import('./Now'))
const FutureWeather = lazy(() => import('./FutureWeather'))

interface ScoresProps {
    weatherType: string,
}

const Scores: FC<ScoresProps> = ({ weatherType }) => {

    const mobileDevice = useMediaQuery({ query: '(max-width: 750px)' })
    const hourlyWeatherLength = useMemo(() => mobileDevice ? 4 : 8, [mobileDevice])
    const { cityName } = useWeather()

    return (
        <div className="Weather-scores">
            <h1>{cityName}</h1>
            {(weatherType === 'now') && <Now />}
            {weatherType === 'hourly' && <FutureWeather
                type='hourly'
                showingArrayLength={hourlyWeatherLength}
                fullLengthOfArray={24}
            />}
            {weatherType === 'daily' && <FutureWeather
                type='daily'
                showingArrayLength={4}
                fullLengthOfArray={8}
            />}
        </div>
    );
}

export default Scores;