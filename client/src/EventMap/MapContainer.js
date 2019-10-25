import React, { Component } from 'react';
import {HeatMap, Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
import apiKeys from '../api-keys.json'


class MapContainer extends Component {
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
  
      const positions = this.props.eventList.map(item => { return { "lat": item.lat, "lng": item.long}});
        console.log(this.props.eventList);
        if (!this.props.google) {
            return <div>Loading...</div>;
          }
      
      return (
        <div
        style={{
          position: "relative",
          height: "calc(100vh - 20px)"
        }}
      >
        <Map  google={this.props.google} zoom={14} initialCenter={{lat: 30.286358,
                lng: -97.7456957}}>

            <HeatMap
              gradient={["rgba(102, 255, 0, 0)",
              "rgba(102, 255, 0, 1)",
              "rgba(147, 255, 0, 1)",
              "rgba(193, 255, 0, 1)",
              "rgba(238, 255, 0, 1)",
              "rgba(244, 227, 0, 1)",
              "rgba(249, 198, 0, 1)",
              "rgba(255, 170, 0, 1)",
              "rgba(255, 113, 0, 1)",
              "rgba(255, 57, 0, 1)",
              "rgba(255, 0, 0, 1)"]}
              positions={positions}
              // opacity={1}
              radius={20}
            />
           
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

       
          </Map>
        </div>
      );
    }
  }

  export default GoogleApiWrapper({
    apiKey: apiKeys.googleMaps,
    libraries: ["visualization"]
    
  })(MapContainer);