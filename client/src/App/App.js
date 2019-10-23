import React from 'react';
import './App.css';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Row } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';
import Navigation from './Navigation';
import  MapContainer  from '../EventMap/EventMap';
import About from '../About/About'
import Login from '../Login/Login'
import MyEvents from '../MyEvents/MyEvents';
import Filters from '../EventMap/Filters';
import Explore from '../Explore/Explore';
import Signup from '../Signup/Signup';
import EventMap  from '../EventMap/EventMap';
import LogoutButton from '../Logout/Logout';
import { withAuthentication } from '../Components/Session';


const App = () => (
    <Router>
        <div>
            <Navigation />
            <Switch>
                <Route exact path ='/' render={props=>(
                  <React.Fragment>
                    <h1>Map</h1>
                    <div className='Map'>
                    <MapContainer />
                    <Filters />
                    </div>
                  </React.Fragment>
                )}/>
                <Route path="/about" component={About}/>
                <Route path="/login" component={Login}/>
                <Route path="/myevents" component={MyEvents}/>
                <Route path="/explore" component={Explore}/>
                <Route path="/map" component={EventMap}/>
                <Route path="/signup" component={Signup}/>
            </Switch>
        </div>
    </Router>
);

export default withAuthentication(App);
