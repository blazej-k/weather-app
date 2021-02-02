import React, { CSSProperties, FC, useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import IconsComponent from './helpers/IconsComponent'


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
            setStyle({opacity: 1, transitionDuration: '.8s'})
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
                {weather.slice(index - 8, index).map(hour => <IconsComponent key={hour.dt} element={hour}/>)}
            </ul>
        </div>
    );
}

export default Hourly;