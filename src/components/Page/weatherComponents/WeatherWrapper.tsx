import React, { FC, useEffect, useState, lazy, Suspense, useRef } from 'react'
import Browser from './search/Browser'
import { subject, subscription } from './rxjs-utils';
import { useWeather } from './hooks/useWeather';
import { useWeatherState, LOADING, CLEAR_STATE, ERROR, CLEAR_ERROR, SET_WEATHER } from './hooks/useWeatherState';

const loadScores = () => import('./scores/Scores')
const Scores = lazy(loadScores)

const WEATHER_NOW = process.env.WEATHER_NOW
const FUTURE_WEATHER = process.env.FUTURE_WEATHER
const { language } = window.navigator

const getWeatherNowEndpoint = (name: string) => `${WEATHER_NOW}${name.length > 1 ?
    name[0].toUpperCase() + name.slice(1, name.length) : name[0].toUpperCase()}&lang=${language.slice(0, 2)}`

const WeatherWrapper: FC = () => {
    const [weatherType, setWeatherType] = useState<'now' | 'hourly' | 'daily'>('now')

    const { cityName, changeWeather: updateWeather, getCurrentWeather } = useWeather()
    const { weatherState: { loading, error, isWeather }, setWeatherState } = useWeatherState()

    const cityNameRef = useRef(cityName)

    useEffect(() => {
        subscription.subscribe(cityNameVal => {
            cityNameRef.current = cityNameVal
            if (cityNameVal.length > 0) {
                fetchWeather(cityNameVal)
            }
            else {
                setWeatherState({ type: CLEAR_STATE })
            }
        })
        return () => subject.unsubscribe()
    }, [])

    const handleInput = (city: string) => {
        error && setWeatherState({ type: CLEAR_ERROR })
        subject.next(city)
    }

    const fetchWeather = (name: string) => {
        const ENDPOINT = getWeatherNowEndpoint(name)
        setWeatherState({ type: LOADING })
        fetch(ENDPOINT)
            .then(res => res.json())
            .then(async (res: WeatherObj) => {
                const ENDPOINT = `${FUTURE_WEATHER}lat=${res.coord.lat}&lon=${res.coord.lon}&lang=${language.slice(0, 2)}`
                const weather = await getCurrentWeather(ENDPOINT)
                if (weather) {
                    updateWeather(weather, res.name)
                    setWeatherState({ type: SET_WEATHER })
                    loadScores()
                }
            })
            .catch(() => {
                setWeatherState({
                    type: ERROR, payload: `It looks like we can't find this\n
                city: ${cityNameRef.current}. Check spelling.`
                })
                throw new Error(`Invalid city name: ${cityNameRef.current}`)
            })
    }

    return (
        <div className="content" data-aos="fade-up" data-aos-once="true">
            <h1>Search your area</h1>
            <Browser error={error} loading={loading} handleInputChange={handleInput} />
            <Suspense fallback={<div className='loader'></div>}>
                {isWeather && (
                    <div className='Weather'> 
                        <div className="Weather-nav">
                            <ul>
                                <li onClick={() => setWeatherType('now')}>Now</li>
                                <li onClick={() => setWeatherType('hourly')}>Hourly</li>
                                <li onClick={() => setWeatherType('daily')}>Daily</li>
                            </ul>
                        </div>
                        <Scores weatherType={weatherType} />
                    </div>
                )}
            </Suspense>
        </div>
    );
}

export default WeatherWrapper;