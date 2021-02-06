import React, { FC } from 'react'
import { useWeather } from '../hooks/weatherHooks';
import IconsComponent from './helpers/IconsComponent';


const Daily: FC = () => {

    const weather = useWeather().weather.daily

    return (
        <div className='Weather-daily' data-aos="fade-up" data-aos-once={true}>
            <h2>Next days:</h2>
            <div className="info">
                <ul>
                    {weather.map((day: Daily) => <IconsComponent key={day.dt} element={day}/>)}
                </ul>
            </div>
        </div>
    );
}

export default Daily;