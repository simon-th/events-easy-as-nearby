import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import MapContainer  from './EventMap';
import About from './About'
import Header from './Header'
import Login from './LoginPage'
import MyEvents from './MyEvents';
import Explore from './Explore';
import Register from './RegisterPage';

// import logo from './logo.svg';
// import styles from "./App.css"

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    console.log("Mounted");
    this.callBackendAPI()
    .then(res => this.setState({data: res.express}))
    .catch(err => console.log(err))
  }

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
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
              <p>
                {this.state.data}
              </p>
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
}

export default App;
