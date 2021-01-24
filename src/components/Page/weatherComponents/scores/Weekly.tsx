import React, { FC } from 'react'

interface WeeklyProps {
    weather: any,
}
 
const Weekly: FC<WeeklyProps> = ({weather}) => {

    const {daily} = weather

    return (
        <>
        {daily && <><h1>Next days:</h1>
        <ul>
            {daily.map((day: any) => (
                <li key={day.dt}>{new Date(day.dt * 1000).getMonth() + 1}.{new Date(day.dt * 1000).getDate()}: {day.temp.day}</li>
            ))}
        </ul></>}
        </>
    );
}
 
export default Weekly;