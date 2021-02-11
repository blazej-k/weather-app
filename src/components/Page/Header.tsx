import React, { FC } from 'react'
import '../../style/main.scss'

const Header: FC = () => {
    return (
        <div className="header">
            <h1>
                <div className="logo-wrapper">
                    <span data-aos="fade-right" data-aos-duration="1000">Weather</span>
                    <span data-aos="fade-left" data-aos-duration="1000">Me</span>
                </div>
            </h1>
            <div className="desc">
                <span data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1200">Welcome to modern weather
                app, using open-source API to get current weather in every place in the world!
                </span>
            </div>
        </div>
    );
}

export default Header;