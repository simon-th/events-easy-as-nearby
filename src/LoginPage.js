import React from 'react';
import './App.css';


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
        </div>
    )
}

export default Login;