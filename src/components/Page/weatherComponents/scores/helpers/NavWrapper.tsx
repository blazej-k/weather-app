import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface NavWrapperProps {
    navType: 'daily' | 'hourly'
    handleButton: (type: 'next' | 'prev') => void
}
 
const NavWrapper: React.FC<NavWrapperProps> = ({ navType, handleButton }) => {
    return (
        <div className="navigation-wrapper">
            <button onClick={() => handleButton('prev')}><IoIosArrowBack /></button>
            <h2>Next {navType === 'daily' ? 'days' : 'hours'}:</h2>
            <button onClick={() => handleButton('next')}><IoIosArrowForward /></button>
        </div>
    );
}
 
export default NavWrapper;