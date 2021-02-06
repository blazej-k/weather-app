import React, { createContext, FC, useState } from 'react'

interface Context {
    weather: OneCallWeatherObj,
    changeWeather: (weather: OneCallWeatherObj) => void
}

const WeatherProvider: FC = ({ children }) => {

    const [weather, setWeather] = useState({} as OneCallWeatherObj)

    const changeWeather = (weather: OneCallWeatherObj) => {
        setWeather(weather)
    }

    return (
        <WeatherContext.Provider value={{weather, changeWeather}}>
            {children}
        </WeatherContext.Provider>

    );
}

export default WeatherProvider;
export const WeatherContext = createContext<Context>({weather: {} as OneCallWeatherObj, changeWeather: () => {}})