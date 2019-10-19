import React, { Component } from 'react';
import './App.css';
//import styles from "./App.css"
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Row } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';
import  MapContainer  from '../EventMap/EventMap';
import About from '../About/About'
import Login from '../LoginPage/LoginPage'
import MyEvents from '../MyEvents/MyEvents';
import Explore from '../Explore/Explore';
import Register from '../LoginPage/RegisterPage';


class App extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <Router>
          <div>
              <Navbar style={{backgroundColor: '#c1cadb'}} light expand="md">
                  <IndexLinkContainer to="/" exact>
                      <NavbarBrand>Explocation</NavbarBrand>
                  </IndexLinkContainer>
                  <Nav className="ml-auto" navbar>
                      <IndexLinkContainer to="/" exact>
                          <NavLink>Map</NavLink>
                      </IndexLinkContainer>
                      <IndexLinkContainer to="/myevents" exact>
                          <NavLink>My Events</NavLink>
                      </IndexLinkContainer>
                      <IndexLinkContainer to="/explore" exact>
                          <NavLink>Explore</NavLink>
                      </IndexLinkContainer>
                      <IndexLinkContainer to="/about" exact>
                          <NavLink>About Us</NavLink>
                      </IndexLinkContainer>
                      <IndexLinkContainer to="/login" exact>
                          <NavLink>Login</NavLink>
                      </IndexLinkContainer>
                  </Nav>
              </Navbar>

              <Switch>
                  <Route exact path ='/' render={props=>(
                    <React.Fragment>
                      <h1>Map</h1>
                      <div className='Map'>
                      <MapContainer />
                      </div>
                    </React.Fragment>
                  )}/>
                  <Route path="/about" component={About}/>
                  <Route path="/login" component={Login}/>
                  <Route path="/myevents" component={MyEvents}/>
                  <Route path="/explore" component={Explore}/>
                  <Route path="/register" component={Register}/>
              </Switch>
          </div>
      </Router>

    );
  }
}

export default App;
