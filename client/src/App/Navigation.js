import React from "react";
import "./App.css";
import { Navbar, NavbarBrand, Nav, NavLink } from "reactstrap";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { IndexLinkContainer } from "react-router-bootstrap";
import LogoutButton from "../Logout/Logout";
import { AuthUserContext } from "../Components/Session";

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
              authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = () => (
    <Navbar style={{backgroundColor: "#c1cadb"}} light expand="md">
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
            <IndexLinkContainer to="/myaccount" exact>
                <NavLink>My Account</NavLink>
            </IndexLinkContainer>
            <IndexLinkContainer to="/about" exact>
                <NavLink>About Us</NavLink>
            </IndexLinkContainer>
            <NavLink>
                <LogoutButton />
            </NavLink>
        </Nav>
    </Navbar>
);

const NavigationNonAuth = () => (
    <Navbar style={{backgroundColor: "#c1cadb"}} light expand="md">
        <IndexLinkContainer to="/" exact>
            <NavbarBrand>Explocation</NavbarBrand>
        </IndexLinkContainer>
        <Nav className="ml-auto" navbar>
            <IndexLinkContainer to="/" exact>
                <NavLink>Map</NavLink>
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
);

export default Navigation;
