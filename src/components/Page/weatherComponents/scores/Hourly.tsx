import React, { CSSProperties, FC, useEffect, useState } from 'react'
import { RiCelsiusLine } from 'react-icons/ri'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import getIconName from './helpers/getIconName'
import validateDate from './helpers/validateDate'


interface HourlyProps {
    weather: Hourly[],
}

const Hourly: FC<HourlyProps> = ({ weather }) => {

    const [index, setIndex] = useState(8) //this is the last index of showing array
    const [style, setStyle] = useState<CSSProperties>({opacity: 1})

    const handleButton = (type: string) => {
        setStyle({opacity: 0})
        if((type === 'next') && (index + 8 > weather.length)) setIndex(8)
        else if((type === 'prev') && (index - 8 <= 0)) setIndex(24)
        else setIndex(prev => type === 'next' ? prev + 8 : prev - 8)
    }
    
    useEffect(() => {
        if(style.opacity === 0){
            setStyle({opacity: 1, transitionDuration: '.4s'})
        }
    }, [style])

    return (
        <div className='Weather-hourly' data-aos="fade-up" data-aos-once={true}>
            <div className="navigation-wrapper">
                <button onClick={() => handleButton('prev')}><IoIosArrowBack/></button>
                <h2>Next hours:</h2>
                <button onClick={() => handleButton('next')}><IoIosArrowForward/></button>
            </div>
            <ul style={style}>
                {weather.slice(index - 8, index).map(hour => (
                    <li key={hour.dt}>
                        <b>{validateDate(new Date(hour.dt * 1000), 'HH:mm')}</b><br/>
                        {Math.round(hour.temp)} <RiCelsiusLine /><br/>
                        <img src={`../../../assets/icons/${getIconName(hour.weather[0].icon)}.png`} alt="" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Hourly;