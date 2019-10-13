import React from 'react';
//import './App.css';
import {Link}  from 'react-router-dom';

const loginStyles = {
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
  };
function Login(){
    return(
        <div className='Login' style={loginStyles}>
            <h1>Login</h1>
            <input type="text" placeholder="Username"/>
            <input type="text" placeholder="Password"/>
            <Link to ='/'><button>Login</button></Link>
           
            <Link to='/register'>Register here</Link>
        </div>
    )
}

export default Login;
