import React, { FC } from 'react'

interface NowProps {
    weather: any
}
 
const Now: FC<NowProps> = ({weather}) => {

    const {current} = weather

    return (
        <>{weather.current && <h1>Now: {current?.temp}</h1>}</>
    );
}
 
export default Now;