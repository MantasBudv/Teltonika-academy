import React from 'react';
import logo from '../images/teltonika-logo.png';

function Header() {

    return (
        <div className="header"> 
            <div className="header__navigation">
                <img src={logo} alt="Teltonika-Logo" className="header__navigation__logo"/>
            </div>
        </div>
        );
    }

export default Header;