import React, { FC } from 'react'

interface NowProps {
    weather: Current
}

const Now: FC<NowProps> = ({ weather }) => {

    return (
        <>
            <h1>Now: {weather.temp}</h1>
            <img style={{ width: '3%' }} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="icon" />
        </>
    );
}

export default Now;