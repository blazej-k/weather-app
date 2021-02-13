import React, { CSSProperties, FC, useEffect, useMemo, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useWeather } from '../hooks/weatherHooks'
import IconsComponent from './helpers/IconsComponent'
import { useMediaQuery } from 'react-responsive'


const Hourly: FC = () => {

    const [style, setStyle] = useState<CSSProperties>({ transform: 'translateX(0px)' })
    const weather = useWeather().weather.hourly.slice(0, 24)
    const mobileDevice = useMediaQuery({query: '(max-width: 750px)'})
    const iconsLength = useMemo(() => mobileDevice ? 4 : 8, [mobileDevice])
    // const iconsLength = mobileDevice ? 4 : 8
    const [index, setIndex] = useState(iconsLength) //this is the last index of showing array

    const handleButton = (buttonType: string) => {
        setStyle({ transform: `translateX(${buttonType === 'next' ? '60px' : '-60px'})`, opacity: 0, transition: '0s' })
        if ((buttonType === 'next') && (index + iconsLength  > weather.length)) setIndex(iconsLength)
        else if ((buttonType === 'prev') && (index - iconsLength  <= 0)) setIndex(24)
        else setIndex(prev => buttonType === 'next' ? prev + iconsLength  : prev - iconsLength)
    }

    useEffect(() => {
        if (style.opacity === 0) {
            setStyle({ opacity: 1, transitionDuration: '.8s', transform: 'translateX(0px)' })
        }
    }, [style])

    useEffect(() => {
       mobileDevice ? setIndex(4) : setIndex(8)
    }, [mobileDevice])

    return (
        <div className='Weather-hourly' data-aos="fade-up" data-aos-once={true}>
            <div className="navigation-wrapper">
                <button onClick={() => handleButton('prev')}><IoIosArrowBack /></button>
                <h2>Next hours:</h2>
                <button onClick={() => handleButton('next')}><IoIosArrowForward /></button>
            </div>
            <div className="info">
                <ul style={style}>
                    {weather.slice(index - iconsLength, index).map(hour => <IconsComponent key={hour.dt} element={hour} />)}
                </ul>
            </div>
        </div>
    );
}

export default Hourly;