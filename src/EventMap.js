import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './App.css'


const mapStyles = {
  width: '70%',
  height: '60%',
  margin: 'auto',
  'margin-top': 0
};

export class MapContainer extends Component {
  render() {
    return (
      <div>
        <Map 
          google={this.props.google}
          style={mapStyles}
          zoom={14}
          initialCenter={{
          lat: 30.2862,
          lng: -97.7394
          }}
        />
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey:'AIzaSyCuUrDpuRA0jKNivljJ_pcNHAZQPoeUkwc'
})(MapContainer);