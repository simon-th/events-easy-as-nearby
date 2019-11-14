import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
import {HeatMap} from './HeatMap';
import apiKeys from '../api-keys.json'
import axios from 'axios';


class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        activeRestaurant: {},
        activeParking: {},
        selectedPlace: {},
        eventList: this.props.eventList,
        restaurantList: [],
        parkingList: [],
        restaurantIcon: {
          url:'./restaurantIcon.png'
        }

      };

      onMarkerClick =async (props, marker, e) =>{
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          restaurantList: [],
          parkingList: []
        });
        let self=this;
        await axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+props.position.lat+','+props.position.lng+'&radius=1500&type=restaurant&key='+apiKeys.googlePlaces).then(
          function(response){
            console.log(response.data.results);
            response.data.results.forEach(element => {
              let address='';
              axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+element.geometry.location.lat+','+element.geometry.location.long+'&key='+apiKeys.googlePlaces).then(
                function(result){
                  console.log(result);
                    address=result.data.results[0].formatted_address;
                    console.log(address);

                }
              ).catch(error => (
                  console.log(error)
                ))
              self.state.restaurantList.push(
                {
                 place: element,
                 addressName: address
                });
        
            });
          }
        ).catch(
          function(error){
            console.log(error);
          }
        );
        await axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+props.position.lat+','+props.position.lng+'&radius=1500&type=parking&key='+apiKeys.googlePlaces).then(
          function(response){
            console.log(response);
            response.data.results.forEach(element => {
              let address='';
              axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+element.geometry.location.lat+','+element.geometry.location.long+'&key='+apiKeys.googlePlaces).then(
                function(result){
                  console.log(result);
                    address=result.data.results[0].formatted_address;
                    console.log(address);

                }
              ).catch(error => (
                  console.log(error)
                ))
              self.state.parkingtList.push(
                {
                 place: element,
                 addressName: address
                });
        
            });
          }
        ).catch(
          function(error){
            console.log(error);
          }
        );
       this.setState(
         {
           showingInfoWindow: true
         }
       )
        console.log(this.state.restaurantList);
        console.log(this.state.parkingList);
      }

    
      onClose = props => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null,
            activeRestaurant: null,
            activeParking: null
          });
        }
      };

      componentDidUpdate(prevProps){
        if(prevProps.eventList!==this.props.eventList){
          this.setState({eventList:this.props.eventList})
        }
      }
      parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
      }


    render() {

        let restaurantIcon=this.state;
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
        <Map  google={this.props.google} zoom={14} initialCenter={{lat: 30.2862,
                lng: -97.7394}} key={this.props.eventList}>

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
          <div>
            {this.state.restaurantList.map(restaurant => (
              <div>
              <p>{restaurant.place.name}</p>
              <p>{restaurant.addressName}</p>
              </div>
              
            ))}
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
