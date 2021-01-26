import React, { FC } from 'react'

interface NowProps {
    weather: Current
}
 
const Now: FC<NowProps> = ({weather}) => {


    return (
        <h1>Now: {weather.temp}</h1>
    );
}
 
export default Now;