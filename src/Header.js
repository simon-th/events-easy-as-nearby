import React from 'react'
import {Link} from 'react-router-dom';
import styles from "./App.css"

function Header(){
    return(
        <header >
            <h1 className='head'>Explocation</h1>
            <Link to="/">Map</Link> | <Link to="/myevents">My Events</Link> | 
            <Link to="/about">About</Link> | <Link to="/login">Login</Link>
        </header>
        
    )
}

export default Header;