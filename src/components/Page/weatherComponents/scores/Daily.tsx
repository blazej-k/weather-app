import React, { CSSProperties, FC, useEffect, useState } from 'react'
import { useWeather } from '../hooks/weatherHooks';
import IconsComponent from './helpers/IconsComponent';
import { useMediaQuery } from 'react-responsive'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


const Daily: FC = () => {

    const weather = useWeather().weather.daily
    const mobileDevice = useMediaQuery({ query: '(max-width: 750px)' })
    const [index, setIndex] = useState(4)
    const [style, setStyle] = useState<CSSProperties>({ transform: 'translateX(0px)' })

    const handleButton = (buttonType: string) => {
        setStyle({ transform: `translateX(${buttonType === 'next' ? '60px' : '-60px'})`, opacity: 0, transition: '0s' })
        if ((buttonType === 'next') && (index + 4  > weather.length)) setIndex(4)
        else if ((buttonType === 'prev') && (index - 4  <= 0)) setIndex(8)
        else setIndex(prev => buttonType === 'next' ? prev + 4  : prev - 4)
    }

    useEffect(() => {
        if (style.opacity === 0) {
            setStyle({ opacity: 1, transitionDuration: '.8s', transform: 'translateX(0px)' })
        }
    }, [style])

    return (
        <div className='Weather-daily' data-aos="fade-up" data-aos-once={true}>
            {mobileDevice ? <div className="navigation-wrapper">
                <button onClick={() => handleButton('prev')}><IoIosArrowBack /></button>
                <h2>Next hours:</h2>
                <button onClick={() => handleButton('next')}><IoIosArrowForward /></button>
            </div> : <h2>Next days:</h2>}
            <div className="info">
                <ul style={mobileDevice ? style : {}}>
                    {mobileDevice ? weather.slice(index - 4, index).map((day: Daily) => <IconsComponent key={day.dt} element={day} />) :
                    weather.map((day: Daily) => <IconsComponent key={day.dt} element={day} />)}
                </ul>
            </div>
        </div>
    );
}

export default Daily;