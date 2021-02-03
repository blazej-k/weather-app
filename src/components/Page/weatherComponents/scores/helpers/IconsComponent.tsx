import React, { FC } from 'react'
import { RiCelsiusLine } from 'react-icons/ri';
import getIconName from './getIconName';
import validateDate from './validateDate';

interface IconWrapperProps {
    element: Daily | Hourly,
}

const IconWrapper: FC<IconWrapperProps> = ({ element }) => {

    const { temp } = element
    const now = new Date().getHours()
    const apiTime = new Date(element.dt * 1000)
    const iconName = getIconName(element.weather[0].icon)

    //when temp is number it's hourly, if not - daily

    return (
        <li>    
            {typeof temp === 'number' && apiTime.getHours() === now && <b className='now'>Now</b>}
            <br/>
            <b>{validateDate(apiTime, typeof temp === 'number' ? 'HH:mm' : 'DD/MM')}</b><br />
            {Math.round(typeof temp === 'number' ? temp : temp.day)} <RiCelsiusLine /><br />
            <img src={`../../../../../assets/icons/${iconName}.png`} alt="" />
        </li>
    );
}

export default IconWrapper;