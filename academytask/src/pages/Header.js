import React from 'react';
import { withRouter } from 'react-router';
import logo from '../images/teltonika-logo.png';

function Header({history}) {

    const handleRedirect = (page) => {
        history.push(page);
    }
    
    return (
        <div className="header"> 
            <div className="header__navigation">
                <img src={logo} alt="Teltonika-Logo" className="header__navigation__logo" onClick={() => handleRedirect('/')}/>
            </div>
        </div>
        );
    }

export default withRouter(Header);