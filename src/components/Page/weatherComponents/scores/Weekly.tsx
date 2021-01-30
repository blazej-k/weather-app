import React, { FC } from 'react'

interface DailyProps {
    weather: Daily[],
}

const Daily: FC<DailyProps> = ({ weather }) => {

    return (
        <div className='Weather-daily' data-aos="fade-up" data-aos-once={true}>
            <h1>Next days:</h1>
            <ul>
                {weather.map((day: any) => (
                    <li key={day.dt}>
                        {new Date(day.dt * 1000).getMonth() + 1}.{new Date(day.dt * 1000).getDate()}: {day.temp.day}
                        <img style={{ width: '5%' }} src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="icon" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Daily;