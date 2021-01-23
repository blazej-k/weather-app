import React, { FC } from 'react'

interface ScoresProps {
    weather: WeatherObj
}
 
const Scores: FC<ScoresProps> = ({weather}) => {

    const {name, main} = weather

    return (
        <span>{name}: {main.temp}</span>
    );
}
 
export default Scores;