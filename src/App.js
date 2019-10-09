import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import  MapContainer  from './EventMap';
import About from './About'
import Header from './Header'


function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
      <Header />
      <Route exact path ='/' render={props=>(
        <React.Fragment>
          <h1>Map</h1>
          <MapContainer/>

        </React.Fragment>
      )}/>
      <Route path='/about' component={About}/>
       
      </header>
    </div>
    </Router>
  );
}

export default App;
