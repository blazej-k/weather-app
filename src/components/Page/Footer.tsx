import React, { FC } from 'react'

 
const Footer: FC = () => {
    return (
        <div className="footer" data-aos="fade-up" data-aos-once="true">
            <h2>Blazej Kania &#169; all rights reserved {new Date().getFullYear()}</h2>
            <span>This page are exist by openweathermap.org which share weather data and statistics to every 
                developer. Thank you!
            </span>
        </div>
    );
}
 
export default Footer;