import React, { FC, useEffect, useState } from 'react'
import IconsComponent from './helpers/IconsComponent';

interface DailyProps {
    weather: Daily[],
}

const Daily: FC<DailyProps> = ({ weather }) => {

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