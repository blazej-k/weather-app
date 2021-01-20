import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import * as env from 'process'
import Browser from './search/Browser'


const WeatherWrapper: FC = () => {

    const [cityName, setCityName] = useState('')
    const [weather, setWeather] = useState<any>({})
    let ENDPOINT = process.env.API_KEY

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setCityName(value)
    }

    const getWeather = async () => {
        const URL = `${ENDPOINT}${cityName.length > 1 ? cityName[0].toUpperCase() + cityName.slice(1, cityName.length) :
            cityName[0].toUpperCase()}`
        await fetch(URL)
            .then(res => {
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
        cityName.length > 0 ? getWeather() : setWeather({})
    }, [cityName])

    return (
        <>
            <Browser cityName={cityName} handleInputChange={handleInput} />
            {weather?.main?.temp && <h1>{weather.name}: {weather.main.temp}</h1>}
        </>
    );
}

export default WeatherWrapper;