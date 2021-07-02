import React, { FC, useEffect, useState, lazy, Suspense } from 'react'
import Browser from './search/Browser'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { useWeather } from './hooks/useWeather';
const Scores = lazy(() => import('./scores/Scores'))

const subject = new Subject<string>();
const subscription = subject.pipe(
    debounceTime(800),
    distinctUntilChanged()
)

const initState: WeatherState = {
    loading: false,
    error: false,
    weather: {} as WeatherObj | OneCallWeatherObj
}

const WEATHER_NOW = process.env.WEATHER_NOW
const FUTURE_WEATHER = process.env.FUTURE_WEATHER
const { language } = window.navigator

const WeatherWrapper: FC = () => {

    const [weatherState, setWeatherState] = useState(initState)
    const [weatherType, setWeatherType] = useState<'now' | 'hourly' | 'daily'>('now')

    const { changeWeather: updateWeather, changeCityName, cityName } = useWeather()

    const { loading, weather, error } = weatherState

    useEffect(() => {
        subscription.subscribe(val => {
            if (val.length > 0) {
                changeCityName(val)
                getWeather(val)
            }
            else {
                setWeatherState({ loading: false, error: false, weather: {} as WeatherObj })
            }
        })
        return () => subject.unsubscribe()
    }, [])

    useEffect(() => {
        if ('coord' in weather) {
            const { lat, lon } = weather.coord
            const ENDPOINT = `${FUTURE_WEATHER}lat=${lat}&lon=${lon}&lang=${language.slice(0, 2)}`
            lat && fetch(ENDPOINT)
                .then(res => res.json())
                .then((res: OneCallWeatherObj) => {
                    setWeatherState({ error: false, weather: res, loading: false })
                    updateWeather(res)
                })
                .catch(() => {
                    setWeatherState({ error: true, loading: false, weather: {} as WeatherObj })
                    throw new Error('Sorry, there is some problem. Try later')
                })
        }
    }, [weather])

    const handleInput = (city: string) => {
        weatherState.error && setWeatherState({ ...weatherState, error: false })
        subject.next(city)
    }

    const getWeather = (name: string) => {
        const ENDPOINT = `${WEATHER_NOW}${name.length > 1 ? name[0].toUpperCase() + name.slice(1, name.length) :
            name[0].toUpperCase()}&lang=${language.slice(0, 2)}`
        setWeatherState({ ...weatherState, loading: true })
        fetch(ENDPOINT)
            .then(res => {
                if (!res.ok) {
                    setWeatherState({ ...weatherState, loading: false, error: true })
                    throw new Error('Invalid name of city');
                }
                return res;
            })
            .then(res => res.json())
            .then((res: WeatherObj) => {
                setWeatherState({ error: false, weather: res, loading: true })
                changeCityName(res.name)
            })
    }

    return (
        <div className="content" data-aos="fade-up" data-aos-once="true">
            <h1>Search your area</h1>
            <Browser error={error} loading={loading} handleInputChange={handleInput} />
            {'daily' in weather && !loading && cityName && <Suspense fallback={<div className='loader'></div>}>
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
            </Suspense>}
        </div>
    );
}

export default WeatherWrapper;