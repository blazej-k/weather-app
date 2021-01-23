import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png' 
import '../../style/main.scss'                      
       
const Header: FC = () => {  
    return (   
        <div className="header" id='header'>   
            <div className="logo">     
                <img src={logo} alt="logo"/>   
                <h1>Logo</h1>
                <div className="nav">
                    <ul>
                        <NavLink to='/#header'>start</NavLink>
                        <NavLink to='/#weather'>weather</NavLink>
                        <NavLink to="/#info">info</NavLink>
                        <NavLink to="/#contact">footer</NavLink>
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default Header;