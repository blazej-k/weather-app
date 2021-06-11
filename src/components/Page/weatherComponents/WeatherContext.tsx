import React, { createContext, FC, useMemo, useState } from 'react'
import iconLoader from '../../../assets/icons/loader.png'

interface Context {
    weather: OneCallWeatherObj,
    changeWeather: (weather: OneCallWeatherObj) => void
    iconLoader: string
}

const WeatherProvider: FC = ({ children }) => {

    const [weather, setWeather] = useState({} as OneCallWeatherObj)

    const changeWeather = (weather: OneCallWeatherObj) => {
        setWeather(weather)
    }
    const contextValues = useMemo(() => ({weather, changeWeather, iconLoader}), [weather, changeWeather, iconLoader])

    return (
        <WeatherContext.Provider value={contextValues}>
            {children}
        </WeatherContext.Provider>

    );
}

export default WeatherProvider;
export const WeatherContext = createContext<Context>({weather: {} as OneCallWeatherObj, changeWeather: () => {}, iconLoader})