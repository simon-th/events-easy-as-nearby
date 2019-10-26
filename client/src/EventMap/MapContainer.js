import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
import {HeatMap} from './HeatMap';
import apiKeys from '../api-keys.json'


class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        eventList: this.props.eventList
        
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

      componentDidUpdate(prevProps){
        if(prevProps.eventList!=this.props.eventList){
          this.setState({eventList:this.props.eventList})
        }
      }
      parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
      }
     
    render() {
  
      
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
                lng: -97.7456957}} key={this.props.eventList}>

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
              positions={this.props.eventList.map(item => { return { "lat": item.latitude, "lng": item.longitude, "weight": 1}})}
              opacity={0.6}
              radius={50}
            />
           
        <Marker onClick={this.onMarkerClick} name={'Current Location'}/>
        {this.state.eventList.map(marker => (
                <Marker
                position={{ lat: marker.latitude, lng: marker.longitude }}
                key={marker.id}
                onClick={this.onMarkerClick}
                name={marker.name}
                venueName={marker.venue_name}
                start={marker.start_time}
                end={marker.end_time}
                />
    ))}
        
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div className="text-center">
          <div>
            <h6>{this.state.selectedPlace.name}</h6>
          </div>
          <div>
            <p>{this.state.selectedPlace.venueName}</p>
          </div>
          <div>
            <p>{new Date(this.state.selectedPlace.start).toUTCString()} - {new Date(this.state.selectedPlace.end).toUTCString()}</p>
          </div>
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