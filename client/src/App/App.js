import React, { Component } from 'react';
import './App.css';
//import styles from "./App.css"
import  MapContainer  from '../EventMap/EventMap';
import About from '../About/About'
import Header from './Header'
import Login from '../LoginPage/LoginPage'
import MyEvents from '../MyEvents/MyEvents';
import Explore from '../Explore/Explore';
import Register from '../LoginPage/RegisterPage';
import {BrowserRouter as Router, Route} from 'react-router-dom'



// import logo from './logo.svg';
// import styles from "./App.css"

class App extends Component {
  state = {
    data: [{
      id:0,
      title: 'Yash bday'
    },
    {
      id:1,
      title: 'Wood Chopping Contest'
    },
    {
      id:2,
      title: 'Snakes and Ladders Night'
    }]
  };

  componentDidMount() {
    console.log("Mounted");
    /*
    this.callBackendAPI()
    .then(res => this.setState({data: res.express}))
    .catch(err => console.log(err))
    */
  }

  callBackendAPI = async () => {
    const response = await fetch('/backend');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
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
          <Route path='/explore' render={(props) => <Explore {...props} events={this.state.data} />}/>
        <Route path = '/register' component={Register}/>
        </div>
      </Router>
    );
  }
}

export default App;
