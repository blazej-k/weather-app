import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import * as env from 'process'
import Browser from './search/Browser'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

const subject = new Subject<string>();
const subscription = subject.pipe(
    debounceTime(800),
    distinctUntilChanged()
)

interface State{
    loading: boolean,
    error: boolean,
    weather: any
}

const initState: State = {
    loading: false,
    error: false,
    weather: {}
}

const WeatherWrapper: FC = () => {

    const [cityName, setCityName] = useState('')
    const [weatherState, setWeatherState] = useState(initState)
    let ENDPOINT = process.env.API_KEY

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        weatherState.error && setWeatherState({...weatherState, error: true})
        const { value } = e.target
        setCityName(value)
        subject.next(value)
    }

    const getWeather = async (name: string) => {
        const URL = `${ENDPOINT}${name.length > 1 ? name[0].toUpperCase() + name.slice(1, name.length) :
            name[0].toUpperCase()}`
        await fetch(URL)
            .then(res => {
                setWeatherState({...weatherState, loading: false})
                if (!res.ok) {
                    setWeatherState({...weatherState, error: true, weather: {}})
                    throw new Error('Wrong city');
                }
                return res;
            })
            .then(res => res.json())
            .then(res => setWeatherState({...weatherState, weather: res}))
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        subscription.subscribe(val => {
            if (val.length > 0) {
                getWeather(val)
                setWeatherState({...weatherState, loading: true})
            }
            else {
                setWeatherState({...weatherState, weather: {}})
            }
        })
        return () => subject.unsubscribe()
    }, [])

    const {loading, weather, error} = weatherState

    return (
        <>
            {loading && 'Loading...'}
            {error && "There's no such a city"}
            {weather.name && <h1>{weather.name}: {weather.main.temp}</h1>}
            <Browser cityName={cityName} handleInputChange={handleInput} />
        </>
    );
}

export default WeatherWrapper;