import React, { FC, useEffect, useState } from 'react'
import { RiCelsiusLine } from 'react-icons/ri';
import getIconName from './helpers/getIconName';
import validateDate from './helpers/validateDate';

interface DailyProps {
    weather: Daily[],
}

const Daily: FC<DailyProps> = ({ weather }) => {

    return (
        <div className='Weather-daily' data-aos="fade-up" data-aos-once={true}>
            <h2>Next days:</h2>
            <div className="info">
                <ul>
                    {weather.map((day: Daily) => (
                        <li key={day.dt}>
                            <b>{validateDate(new Date(day.dt * 1000), 'MM.DD')}</b><br/>
                            {Math.round(day.temp.day)} <RiCelsiusLine /><br/>
                            <img src={`../../../assets/icons/${getIconName(day.weather[0].icon)}.png`} alt="" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Daily;