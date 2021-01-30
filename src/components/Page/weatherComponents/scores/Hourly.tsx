import React, { FC } from 'react'


interface HourlyProps {
    weather: Hourly[],
}

const Hourly: FC<HourlyProps> = ({ weather }) => {

    return (
        <div className='Weather-hourly' data-aos="fade-up" data-aos-once={true}>
            <h1>Next hours:</h1>
            <ul>
                {weather.map(hour => (
                    <li key={hour.dt}>
                        {new Date(hour.dt * 1000).getHours()}: {hour.temp},
                        <img style={{ width: '5%' }} src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="icon" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Hourly;