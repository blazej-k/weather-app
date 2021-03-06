import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { RiCelsiusLine } from 'react-icons/ri';
import getIconName from './getIconName';
import validateDate from './validateDate';
import iconLoader from '../../../../../assets/icons/loader.png'

interface IconWrapperProps {
    element: Daily | Hourly,
}

const IconWrapper: FC<IconWrapperProps> = ({ element }) => {

    const [iconName, setIconName] = useState('')

    const { temp } = element
    const now = new Date().getHours()
    const apiTime = new Date(element.dt * 1000)

    useEffect(() => {
        import(`../../../../../assets/icons/${getIconName(element.weather[0].icon)}.png`).then(res => setIconName(res.default))
    }, [])

    //when temp is number it's hourly, if not - daily

    return (
        <li>
            {typeof temp === 'number' && apiTime.getHours() === now && <b className='now'>Now</b>}
            <br/>
            <b>{validateDate(apiTime, typeof temp === 'number' ? 'HH:mm' : 'DD/MM')}</b><br />
            {Math.round(typeof temp === 'number' ? temp : temp.day)} <RiCelsiusLine /><br />
            {iconName.length > 0 ? <img src={iconName} alt="weather" /> : <img src={iconLoader} alt='loader'/>}
        </li>
    );
}

export default IconWrapper;