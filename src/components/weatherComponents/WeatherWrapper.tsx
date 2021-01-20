import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import * as env from 'process'
import Browser from './search/Browser'

 
const WeatherWrapper: FC = () => {

    const [cityName, setCityName] = useState('')
    const ENDPOINT = process.env.REACT_APP_API_KEY


    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setCityName(e.target.value)
    }

    const getWeather = async() => {
        // const res = await fetch(API_KEY).then(res => res.json()).catch(() => {
        //     throw new Error('ups')
        // })
        // console.log(res)
        console.log(ENDPOINT) 
    }

    useEffect(() => {
        getWeather()
    }, [])

    return (
        <Browser cityName={cityName} handleInputChange={handleInput}/>
    );
}
 
export default WeatherWrapper;