import React, { FC } from 'react'
import { WiCelsius } from "weather-icons-react";

interface ScoresProps {
    weather: WeatherObj,
    weatherType: string
}

const Scores: FC<ScoresProps> = ({ weather, weatherType }) => {

    const { name, main } = weather

    return (
        <>
            <span>{name}: {main.temp}</span><WiCelsius size={30} />
        </>
    );
}

export default Scores;