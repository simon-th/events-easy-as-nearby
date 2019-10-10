import React from 'react'
import {Link} from 'react-router-dom';
import styles from "./App.css"

function Header(){
    return(
        <header>
            <h1>Explocation</h1>
            <Link to="/">Map</Link> | <Link to="/about">About</Link> | <Link to="/login">Login </Link>|
            <Link to="/myevents">My Events</Link>|
            <Link to="/explore">Explore</Link>
        </header>
    )
}

export default Header;