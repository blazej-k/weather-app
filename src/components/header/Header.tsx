import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png'                       
      
const Header: FC = () => { 
    return (   
        <div className="header" id='header'>   
            <div className="logo">     
                <img src={logo} alt="logo"/>   
                <h1>Logo</h1>
            </div>
        </div>
    );
}
 
export default Header;