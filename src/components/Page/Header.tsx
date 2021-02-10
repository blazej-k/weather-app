import React, { FC } from 'react'
import '../../style/main.scss'

const Header: FC = () => {
    return (
        <div className="header">
            <h1>Weather<span>Me</span></h1>
            <div className="desc">
                <span>Welcome to modern weather app, using open-source API to get current weather in every place
                in the world!
                </span>
            </div>
        </div>
    );
}

export default Header;