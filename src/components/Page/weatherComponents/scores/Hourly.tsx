import React, { FC } from 'react'

interface HourlyProps {
    weather: Hourly[],
}
 
const Hourly: FC<HourlyProps> = ({weather}) => {


    return (
        <>
        <h1>Next hours:</h1>
        <ul>
            {weather.map((hour: any) => (
                <li key={hour.dt}>{new Date(hour.dt * 1000).getHours()}: {hour.temp}</li>
            ))}
        </ul></>
    );
}
 
export default Hourly;