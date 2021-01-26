import React, { FC } from 'react'

interface WeeklyProps {
    weather: Daily[],
}
 
const Weekly: FC<WeeklyProps> = ({weather}) => {


    return (
        <>
        <h1>Next days:</h1>
        <ul>
            {weather.map((day: any) => (
                <li key={day.dt}>{new Date(day.dt * 1000).getMonth() + 1}.{new Date(day.dt * 1000).getDate()}: {day.temp.day}</li>
            ))}
        </ul></>
    );
}
 
export default Weekly;