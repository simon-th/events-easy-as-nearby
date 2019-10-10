import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import styles from "./App.css"
import {BrowserRouter as Router, Route} from 'react-router-dom'
import  MapContainer  from './EventMap';
import About from './About'
import Header from './Header'
import Login from './LoginPage'
import MyEvents from './MyEvents';
import Explore from './Explore';
import Register from './RegisterPage';


function App() {
  return (
    <Router>
    <div className="App">
    
      <Header  />
      <Route exact path ='/' render={props=>(
        <React.Fragment>
          <h1>Map</h1>
          <div className='Map'>
          <MapContainer />
          </div>
        </React.Fragment>
      )}/>
      <Route path='/about' component={About}/>
      <Route path='/login' component={Login}/>
      <Route path='/myevents' component={MyEvents}/>
      <Route path='/explore' component={Explore}/>
     <Route path = '/register' component={Register}/>
     
       
    
    </div>
    </Router>
    
    
    
  );
}

export default App;
