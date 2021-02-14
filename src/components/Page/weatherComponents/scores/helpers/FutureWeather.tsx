import React, { CSSProperties, FC, useEffect, useState } from 'react'
import { useWeather } from '../../hooks/weatherHooks';
import IconsComponent from './IconsComponent';
import { useMediaQuery } from 'react-responsive'
import NavWrapper from './NavWrapper';


//FutureWeather for daily and hourly weather

interface FutureWeatherProps {
    type: 'daily' | 'hourly',
    showingArrayLength: number,
    fullLengthOfArray: number
}

const FutureWeather: FC<FutureWeatherProps> = ({ type, showingArrayLength, fullLengthOfArray }) => {

    let weather = useWeather().weather[type]
    const mobileDevice = useMediaQuery({ query: '(max-width: 750px)' })
    const [index, setIndex] = useState(showingArrayLength) //this is the last index of showing array
    const [style, setStyle] = useState<CSSProperties>({ transform: 'translateX(0px)' })

    if(type === 'hourly') weather = weather.slice(0, 24)

    const handleButton = (buttonType: string) => {
        setStyle({ transform: `translateX(${buttonType === 'next' ? '60px' : '-60px'})`, opacity: 0, transition: '0s' })
        if ((buttonType === 'next') && (index + showingArrayLength > weather.length)) setIndex(showingArrayLength)
        else if ((buttonType === 'prev') && (index - showingArrayLength <= 0)) setIndex(fullLengthOfArray)
        else setIndex(prev => buttonType === 'next' ? prev + showingArrayLength : prev - showingArrayLength)
    }

    useEffect(() => {
        if (style.opacity === 0) {
            setStyle({ opacity: 1, transitionDuration: '.8s', transform: 'translateX(0px)' })
        }
    }, [style])

    return (
        <div className={`Weather-${type}`} data-aos="fade-up" data-aos-once={true}>
            {type === 'hourly' || (type === 'daily' && mobileDevice) ? <NavWrapper navType={type} handleButton={handleButton} /> :
                <h2>Next days:</h2>}
            <div className="info">
                <ul style={type === 'hourly' || (type === 'daily' && mobileDevice) ? style : {}}>
                    {type === 'hourly' ?
                        (weather as Hourly[]).slice(index - showingArrayLength, index).map((hour: Hourly) => <IconsComponent
                            key={hour.dt}
                            element={hour}
                        />) : mobileDevice ?
                        (weather as Daily[]).slice(index - showingArrayLength, index).map((day: Daily) => <IconsComponent
                            key={day.dt}
                            element={day}
                        />) :
                        (weather as Daily[]).map((day: Daily) => <IconsComponent
                            key={day.dt}
                            element={day}
                        />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default FutureWeather;