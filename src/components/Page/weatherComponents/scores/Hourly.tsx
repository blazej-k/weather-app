import React, { FC } from 'react'

interface HourlyProps {
    weather: any,
}
 
const Hourly: FC<HourlyProps> = ({weather}) => {

    const {hourly} = weather

    return (
        <>
        {hourly && <><h1>Next hours:</h1>
        <ul>
            {hourly.map((hour: any) => (
                <li key={hour.dt}>{new Date(hour.dt * 1000).getHours()}: {hour.temp}</li>
            ))}
        </ul></>}
        </>
    );
}
 
export default Hourly;