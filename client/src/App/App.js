import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import  MapContainer  from "../EventMap/EventMap";
import About from "../About/About"
import Login from "../Login/Login"
import MyEvents from "../MyEvents/MyEvents";
import Explore from "../Explore/Explore";
import Signup from "../Signup/Signup";
import PasswordForget from "../ForgotPassword/ForgotPassword";
import EventMap  from "../EventMap/EventMap";
import MyAccount from "../MyAccount/MyAccount";
import { withAuthentication } from "../Components/Session";



const App = () => (
    <Router>
        <div>
            <Navigation />
            <Switch>
                <Route exact path ="/" render={props=>(
                  <React.Fragment>
                  
                    <div className='Map'>
                      <EventMap />
                    </div>
                    </React.Fragment>
                  
                )}/>
                <Route path="/about" component={About}/>
                <Route path="/login" component={Login}/>
                <Route path="/myevents" component={MyEvents}/>
                <Route path="/explore" component={Explore}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/forgotpassword" component={PasswordForget}/>
                <Route path="/myaccount" component={MyAccount}/>
            </Switch>
        </div>
    </Router>
);

export default withAuthentication(App);
