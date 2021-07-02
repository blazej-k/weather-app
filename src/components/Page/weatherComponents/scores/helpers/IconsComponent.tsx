import React, { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import { RiCelsiusLine } from 'react-icons/ri';
import { useWeather } from '../../hooks/useWeather';
import getIconName from './getIconName';
import useDateValidation from '../../hooks/useDateValidation';

interface IconWrapperProps {
    element: Daily | Hourly,
}

const IconWrapper: FC<IconWrapperProps> = ({ element }) => {

    const [iconName, setIconName] = useState('')

    const { temp } = useMemo(() => element, [element])
    const now = useMemo(() => new Date().getHours(), [])
    const apiTime = useMemo(() => new Date(element.dt * 1000), [element])
    const [show, setShow] = useState(false)

    const {iconLoader} = useWeather()
    const date = useDateValidation(apiTime, typeof temp === 'number' ? 'hourly' : 'daily')

    useEffect(() => {
        show === true && import(`../../../../../assets/icons/${getIconName(element.weather[0].icon)}.png`).then(res => setIconName(res.default))
    }, [show])

    //when temp is number it's hourly, if not - daily

    return (
        <li>
            {typeof temp === 'number' && apiTime.getHours() === now && <b className='now'>Now</b>}
            <br/>
            <b>{date}</b><br />
            {Math.round(typeof temp === 'number' ? temp : temp.day)} <RiCelsiusLine /><br />
            {iconName.length > 0 ? <img src={iconName} alt="weather" /> : <img onLoad={() => setShow(true)} src={iconLoader} alt='loader'/>}
        </li>
    );
}

export default memo(IconWrapper);