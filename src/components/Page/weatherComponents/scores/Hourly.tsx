import React, { CSSProperties, FC, useEffect, useState } from 'react'


interface HourlyProps {
    weather: Hourly[],
}

const Hourly: FC<HourlyProps> = ({ weather }) => {

    const [index, setIndex] = useState(8) //this is the last index of showing array
    const [style, setStyle] = useState<CSSProperties>({opacity: 1})

    const handleButton = (type: string) => {
        setStyle({opacity: 0})
        if((type === 'next') && (index + 8 > weather.length)) setIndex(8)
        else if((type === 'prev') && (index - 8 <= 0)) setIndex(48)
        else{
            setIndex(prev => type === 'next' ? prev + 8 : prev - 8)
        }
    }
    
    useEffect(() => {
        if(style.opacity === 0){
            setStyle({opacity: 1, transitionDuration: '.4s'})
        }
    }, [style])

    // useEffect(() => {
    //     console.log(weather)
    // }, [])
    // console.log(index)

    return (
        <div className='Weather-hourly' data-aos="fade-up" data-aos-once={true}>
            <h1>Next hours:</h1>
            <button onClick={() => handleButton('next')}>+</button>
            <button onClick={() => handleButton('prev')}>-</button>
            <ul style={style}>
                {weather.slice(index - 8, index).map(hour => (
                    <li key={hour.dt}>
                        {new Date(hour.dt * 1000).getHours()}: {hour.temp},
                        <img style={{ width: '5%' }} src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="icon" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Hourly;