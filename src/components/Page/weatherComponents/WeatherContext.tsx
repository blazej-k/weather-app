import React, { createContext, FC, useMemo, useState } from 'react'

interface Context {
    weather: OneCallWeatherObj,
    cityName: string
    changeWeather: (weather: OneCallWeatherObj, newCityName: string) => void,
    getCurrentWeather: (ENDPOINT: string) => Promise<OneCallWeatherObj>
}

const WeatherProvider: FC = ({ children }) => {

    const [weather, setWeather] = useState({} as OneCallWeatherObj)
    const [cityName, setCityName] = useState('')

    const changeWeather = (weather: OneCallWeatherObj, newCityName: string) => {
        setWeather(weather)
        setCityName(newCityName)
    }

    const getCurrentWeather = (ENDPOINT: string) => {
        const currentWeather = fetch(ENDPOINT)
            .then(res => res.json())
            .then((res: OneCallWeatherObj) => {
                return res
            })
        return currentWeather
    }

    const contextValues = useMemo(() => (
        { weather, changeWeather, getCurrentWeather, cityName }
    ), [weather, cityName])

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
    getCurrentWeather: () => null,
    cityName: ''
})