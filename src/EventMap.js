import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './App.css'


const mapStyles = {
  width: '50%',
  height: '50%',
  left: '350px'
  
};

export class MapContainer extends Component {
  render() {
    return (
      <Map 
        google={this.props.google}
        style={mapStyles}
        zoom={14}
        initialCenter={{
         lat: -1.2884,
         lng: 36.8233
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey:'AIzaSyCuUrDpuRA0jKNivljJ_pcNHAZQPoeUkwc'
})(MapContainer);