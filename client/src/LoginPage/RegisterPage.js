import React from 'react';
import {Link} from 'react-router-dom';
const regStyle ={
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}
function Register(){
    return(
        
        <div style={regStyle}>
            <h1>Register</h1>
            <input type="text" placeholder="Username"/>
            <input type="text" placeholder="Password"/>
            <input type="text" placeholder="Confirm Password"/>
            <input type="text" placeholder="Email Address"/>
            <Link to='/login'><button>Register</button></Link>
            <Link to='/login'>Back to Login</Link>
            
        </div>
    )
}

export default Register;