import React, { ChangeEvent, FC, useEffect, useState, lazy, Suspense } from 'react'
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

    const [cityName, setCityName] = useState('')
    const [weatherState, setWeatherState] = useState(initState)
    const [weatherType, setWeatherType] = useState('now')
    const { loading, weather, error } = weatherState
    const { changeWeather: updateWeather } = useWeather()


    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setWeatherState({ ...weatherState, error: false })
        const { value } = e.target
        setCityName(value)
        subject.next(value)
    }

    const getWeather = async (name: string) => {
        const ENDPOINT = `${WEATHER_NOW}${name.length > 1 ? name[0].toUpperCase() + name.slice(1, name.length) :
            name[0].toUpperCase()}&lang=${language.slice(0, 2)}`
        await fetch(ENDPOINT)
            .then(res => {
                setWeatherState({ ...weatherState, loading: false })
                if (!res.ok) {
                    setWeatherState({ ...weatherState, error: true, weather: {} as WeatherObj })
                    throw new Error('Invalid name of city');
                }
                return res;
            })
            .then(res => res.json())
            .then(res => setWeatherState({ ...weatherState, weather: res }))
            .catch(() => {
                throw new Error('Invalid name of city')
            })
    }

    useEffect(() => {
        subscription.subscribe(val => {
            if (val.length > 0) {
                getWeather(val)
                setWeatherState({ ...weatherState, loading: true })
            }
            else {
                setWeatherState({ ...weatherState, weather: {} as WeatherObj })
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
                    setWeatherState({ ...weatherState, weather: res })
                    updateWeather(res)
                })
        }
    }, [weather])

    console.log('current' in weather, weather)

    return (
        <div className="content" data-aos="fade-up" data-aos-once="true">
            <h1>Search your area</h1>
            <Browser cityName={cityName} error={error} loading={loading} handleInputChange={handleInput} />
            {Object.entries(weather).length > 0 && <Suspense fallback={null}>
                <div className='Weather'>
                    <div className="Weather-nav">
                        <ul>
                            <li onClick={() => setWeatherType('now')}>Now</li>
                            <li onClick={() => setWeatherType('hourly')}>Hourly</li>
                            <li onClick={() => setWeatherType('daily')}>Daily</li>
                        </ul>
                    </div>
                    <div className="Weather-scores">
                        {'current' in weather && <Scores cityName={cityName} weatherType={weatherType} />}
                    </div>
                </div>
            </Suspense>}
        </div>
    );
}

export default WeatherWrapper;