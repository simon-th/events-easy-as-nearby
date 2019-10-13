import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Row } from 'reactstrap';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';

class Header extends Component {
    render() {
        return (
          <Router>
              <div>
                  <Navbar color="black" light expand="md">
                      <NavbarBrand href="/">Explocation</NavbarBrand>
                      <Nav className="ml-auto" navbar>
                          <NavItem>
                              <NavLink href="/">Map</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink href="/myevents">My Events</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink href="/explore">Explore</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink href="/about">About Us</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink href="/login">Login</NavLink>
                          </NavItem>
                      </Nav>
                  </Navbar>
              </div>
          </Router>
        );
    }
}

export default Header;
