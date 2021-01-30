import React, { FC } from 'react'

interface NowProps {
    weather: Current
}

const Now: FC<NowProps> = ({ weather }) => {

    return (
        <div className='Weather-now' data-aos="fade-up" data-aos-once={true}>
            <h1>{weather.temp}</h1>
            <img style={{ width: '3%' }} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="icon" />
        </div>
    );
}

export default Now;