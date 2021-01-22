import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import * as env from 'process'
import Browser from './search/Browser'
import {Subject} from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

const subject = new Subject<string>();
const subscription = subject.pipe(
    debounceTime(800),
    distinctUntilChanged()
)


const WeatherWrapper: FC = () => {

    const [cityName, setCityName] = useState('')
    const [weather, setWeather] = useState<any>({})
    const [loadnig, setLoadnig] = useState(false)
    let ENDPOINT = process.env.API_KEY

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setCityName(value)
        subject.next(value)
    }

    const getWeather = async (name: string) => {
        const URL = `${ENDPOINT}${name.length > 1 ? name[0].toUpperCase() + name.slice(1, name.length) :
            name[0].toUpperCase()}`
        await fetch(URL)
            .then(res => {
                setLoadnig(false)
                if (!res.ok) {
                    setWeather({})
                    throw new Error('Wrong city');
                }
                return res;
            })
            .then(res => res.json())
            .then(res => setWeather(res))
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        subscription.subscribe(val => {
            if(val.length > 0) {
                getWeather(val)
                setLoadnig(true)
            }
            else{
                setWeather({})
            }
        })
        return () => subject.unsubscribe()
    }, [])

    return (
        <>
            {loadnig && 'Loading...'}
            {weather?.main?.temp && <h1>{weather.name}: {weather.main.temp}</h1>}
            <Browser cityName={cityName} handleInputChange={handleInput} />
        </>
    );
}

export default WeatherWrapper;