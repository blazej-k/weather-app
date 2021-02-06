import React, { createContext, FC, useState } from 'react'


export const WeatherContext = createContext<Partial<OneCallWeatherObj>>({})
export const UpdateWeatherContext = createContext((weather: OneCallWeatherObj) => { })

const WeatherProvider: FC = ({ children }) => {

    const [weather, setWeather] = useState({} as OneCallWeatherObj)

    const changeWeather = (weather: OneCallWeatherObj) => {
        setWeather(weather)
    }

    return (
        <WeatherContext.Provider value={weather}>
            <UpdateWeatherContext.Provider value={changeWeather}>
                {children}
            </UpdateWeatherContext.Provider>
        </WeatherContext.Provider>

    );
}

export default WeatherProvider;