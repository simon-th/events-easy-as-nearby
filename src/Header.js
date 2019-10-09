import React from 'react'
import {Link} from 'react-router-dom';

function Header(){
    return(
        <header>
            <h1>Explocation</h1>
            <Link to="/">Map</Link> | <Link to="/about">About</Link>
        </header>
        
    )
}

export default Header;