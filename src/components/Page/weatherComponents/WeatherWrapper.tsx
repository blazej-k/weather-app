import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import * as env from 'process'
import Browser from './search/Browser'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import Scores from './search/Scores';

const subject = new Subject<string>();
const subscription = subject.pipe(
    debounceTime(800),
    distinctUntilChanged()
)


const initState: WeatherState = {
    loading: false,
    error: false,
    weather: {} as WeatherObj
}

const WeatherWrapper: FC = () => {

    const [cityName, setCityName] = useState('')
    const [weatherState, setWeatherState] = useState(initState)
    let ENDPOINT = process.env.API_KEY

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        weatherState.error && setWeatherState({ ...weatherState, error: true })
        const { value } = e.target
        setCityName(value)
        subject.next(value)
    }

    const getWeather = async (name: string) => {
        const URL = `${ENDPOINT}${name.length > 1 ? name[0].toUpperCase() + name.slice(1, name.length) :
            name[0].toUpperCase()}`
        await fetch(URL)
            .then(res => {
                setWeatherState({ ...weatherState, loading: false })
                if (!res.ok) {
                    setWeatherState({ ...weatherState, error: true, weather: {} as WeatherObj })
                    throw new Error('Wrong city');
                }
                return res;
            })
            .then(res => res.json())
            .then(res => setWeatherState({ ...weatherState, weather: res }))
            .catch((err) => {
                console.log(err)
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

    const { loading, weather, error } = weatherState

    return (
        <>
            <Browser cityName={cityName} error={error} loading={loading} handleInputChange={handleInput} />
            {Object.entries(weather).length > 0 && <Scores weather={weather}/>}
        </>
    );
}

export default WeatherWrapper;