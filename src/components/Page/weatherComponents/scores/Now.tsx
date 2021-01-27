import React, { FC } from 'react'

interface NowProps {
    weather: Current
}

const Now: FC<NowProps> = ({ weather }) => {

    console.log(weather)

    return (
        <>
            <h1>Now: {weather.temp}</h1>
            {weather &&<img style={{ width: '5%' }} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="icon" />}
        </>
    );
}

export default Now;