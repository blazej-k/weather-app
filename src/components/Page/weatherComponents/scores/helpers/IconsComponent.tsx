import React, { FC, memo, useEffect, useMemo, useState } from 'react'
import { RiCelsiusLine } from 'react-icons/ri';
import getIconName from './getIconName';
import useDateValidation from '../../hooks/useDateValidation';

interface IconWrapperProps {
    element: Daily | Hourly,
}

const IconWrapper: FC<IconWrapperProps> = ({ element }) => {

    const [iconName, setIconName] = useState('assets/icons/loader.png')

    const { temp } = useMemo(() => element, [element])
    const now = useMemo(() => new Date().getHours(), [])
    const apiTime = useMemo(() => new Date(element.dt * 1000), [element])

    const date = useDateValidation(apiTime, typeof temp === 'number' ? 'hourly' : 'daily')

    useEffect(() => {
        import(`../../../../../assets/icons/${getIconName(element.weather[0].icon)}.png`).then(res => setIconName(res.default))
    }, [])

    //when temp is number it's hourly, if not - daily

    return (
        <li>
            {typeof temp === 'number' && apiTime.getHours() === now && <b className='now'>Now</b>}
            <br />
            <b>{date}</b><br />
            {Math.round(typeof temp === 'number' ? temp : temp.day)} <RiCelsiusLine /><br />
            <img src={iconName} alt="weather" />
        </li>
    );
}

export default memo(IconWrapper);