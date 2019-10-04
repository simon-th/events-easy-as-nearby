import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    data: null
  };

  componentDidMount() {
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

  render () {
    return (
      <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {this.state.data}
        </p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        </header>
      </div>
    );
  }
}

export default App;
