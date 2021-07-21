import React, { FC, memo } from 'react'

 
const Footer: FC = () => {
    return (
        <div className="footer">
            <h2>Blazej Kania &#169; all rights reserved {new Date().getFullYear()}</h2>
            <span>This page are exist by openweathermap.org which share weather data and statistics to every 
                developer. Thank you!
            </span>
        </div>
    );
}
 
export default memo(Footer);