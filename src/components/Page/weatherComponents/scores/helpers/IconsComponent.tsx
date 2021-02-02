import React, { FC } from 'react'
import { RiCelsiusLine } from 'react-icons/ri';
import getIconName from './getIconName';
import validateDate from './validateDate';

interface IconWrapperProps {
    element: Daily | Hourly
}

const IconWrapper: FC<IconWrapperProps> = ({ element }) => {

    const { temp } = element

    return (
        <li>
            <b>{validateDate(new Date(element.dt * 1000), typeof temp === 'number' ? 'HH:mm' : 'DD/MM')}</b><br />
            {Math.round(typeof temp === 'number' ? temp : temp.day)} <RiCelsiusLine /><br />
            <img src={`../../../assets/icons/${getIconName(element.weather[0].icon)}.png`} alt="" />
        </li>
    );
}

export default IconWrapper;