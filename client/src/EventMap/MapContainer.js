import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './Geolocation';
import apiKeys from '../api-keys.json';
import MyEvents from '../MyEvents/MyEvents';
import CustomMarker from '../Components/CustomMarker/CustomMarker';
import Markers from './Markers';


export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    
  };

 

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  Markers = props => (
    this.props.eventList.map(marker =>
      <Marker 
        {...props}
        key={marker.id} 
        title={marker.name}
       />
    )
  );

  

  render() {
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}

      >
        
        <Marker onClick={this.onMarkerClick} name={'Current Location'}/>
        {this.props.eventList.map(marker => (
    <Marker
      position={{ lat: marker.lat, lng: marker.long }}
      key={marker.id}
      onClick={this.onMarkerClick}
      name={marker.title}
    />
    ))}
        
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}



export default GoogleApiWrapper({
  'apiKey': apiKeys.googleMaps
})(MapContainer);
