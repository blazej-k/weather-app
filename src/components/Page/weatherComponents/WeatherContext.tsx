import React, { createContext, FC, useMemo, useState } from 'react'
import iconLoader from '../../../assets/icons/loader.png'

interface Context {
    weather: OneCallWeatherObj,
    iconLoader: string,
    cityName: string
    changeWeather: (weather: OneCallWeatherObj) => void,
    changeCityName: (input: string) => void,
    getCurrentWeather: (ENDPOINT: string) => Promise<OneCallWeatherObj>
}

const WeatherProvider: FC = ({ children }) => {

    const [weather, setWeather] = useState({} as OneCallWeatherObj)
    const [cityName, setCityName] = useState('')

    const changeWeather = (weather: OneCallWeatherObj) => setWeather(weather)

    const changeCityName = (input: string) => setCityName(input)

    const getCurrentWeather = (ENDPOINT: string) => {
        const currentWeather = fetch(ENDPOINT)
            .then(res => res.json())
            .then((res: OneCallWeatherObj) => {
                return res
            })
        return currentWeather
    }

    const contextValues = useMemo(() => (
        { weather, changeWeather, changeCityName, getCurrentWeather, iconLoader, cityName }
    ), [weather, iconLoader, cityName])

    return (
        <WeatherContext.Provider value={contextValues}>
            {children}
        </WeatherContext.Provider>

    );
}

export default WeatherProvider;
export const WeatherContext = createContext<Context>({
    weather: {} as OneCallWeatherObj,
    changeWeather: () => { },
    changeCityName: () => { },
    getCurrentWeather: () => null,
    iconLoader,
    cityName: ''
})