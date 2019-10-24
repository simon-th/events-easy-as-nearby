import React, { Component } from 'react';
import { InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from '../EventMap/Geolocation';

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

  render() {
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker position={{lat: 30.286358, lng: -97.7456957}} onClick={this.onMarkerClick} name={'Yash Birthday'} />
        <Marker position={{lat: 30.2842331, lng: -97.7386967}} onClick={this.onMarkerClick} name={'Wood Chopping Contest'} />
        <Marker position={{lat: 30.2870417, lng: -97.7461794}} onClick={this.onMarkerClick} name={'Snakes and Ladders Night'} />
        <Marker position={{lat: 30.2900117, lng: -97.7445804}} onClick={this.onMarkerClick} name={'Smash Tournament'} />
        <Marker position={{lat: 30.2884957, lng: -97.7376979}} onClick={this.onMarkerClick} name={'IEEE GM #3'} />
        <Marker position={{lat: 30.2864807, lng: -97.743338}} onClick={this.onMarkerClick} name={'Spongebob Watch Party'} />
        <Marker position={{lat: 30.2834028, lng: -97.7412837}} onClick={this.onMarkerClick} name={'Gong Cha Profit Share'} />
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

export default MapContainer;