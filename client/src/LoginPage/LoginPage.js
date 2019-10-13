import React from 'react';
//import './App.css';
import {Link}  from 'react-router-dom';

const loginStyles = {
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   padding:'50px'
  };
function Login(){
    return(
        <div className='Login' style={loginStyles}>
            <input type="text" placeholder="Username"/>
            <input type="text" placeholder="Password"/>
            <button>Login</button>
            <Link to='/register'>Register</Link>
        </div>
    )
}

export default Login;
