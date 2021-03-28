import React, { FC, useEffect, useRef, useState } from 'react'
import { RiCelsiusLine } from 'react-icons/ri';
import { useWeather } from '../../hooks/weatherHooks';
import getIconName from './getIconName';
import validateDate from './validateDate';

interface IconWrapperProps {
    element: Daily | Hourly,
}

const IconWrapper: FC<IconWrapperProps> = ({ element }) => {

    const [iconName, setIconName] = useState('')

    const { temp } = element
    const now = new Date().getHours()
    const apiTime = new Date(element.dt * 1000)
    const [show, setShow] = useState(false)

    const iconLoader = useWeather().iconLoader

    useEffect(() => {
        show === true && import(`../../../../../assets/icons/${getIconName(element.weather[0].icon)}.png`).then(res => setIconName(res.default))
    }, [show])

    //when temp is number it's hourly, if not - daily

    return (
        <li>
            {typeof temp === 'number' && apiTime.getHours() === now && <b className='now'>Now</b>}
            <br/>
            <b>{validateDate(apiTime, typeof temp === 'number' ? 'HH:mm' : 'DD/MM')}</b><br />
            {Math.round(typeof temp === 'number' ? temp : temp.day)} <RiCelsiusLine /><br />
            {iconName.length > 0 ? <img src={iconName} alt="weather" /> : <img onLoad={() => setShow(true)} src={iconLoader} alt='loader'/>}
        </li>
    );
}

export default IconWrapper;