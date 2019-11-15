import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'

import {Card} from 'reactstrap';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import {HeatMap} from './HeatMap';
import apiKeys from '../api-keys.json';
import popupStyle from './popupStyle.css'
import axios from 'axios';


class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        showParkingWindow: false,
        showRestaurantWindow: false,
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

      onMarkerClick = async (props, marker, e) =>{
        console.log(props);
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
            response.data.results.forEach(async (element) => {
              let address='';
               await axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+element.geometry.location.lat+','+element.geometry.location.lng+'&key='+apiKeys.googlePlaces).then(
                function(result){
                  console.log(result);
                    address=result.data.results[0].formatted_address;
                    console.log(address);
                    self.state.restaurantList.push(
                      {
                       place: element,
                       addressName: address
                      });

                }
              ).catch(error => (
                  console.log(error)
                ))


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
            response.data.results.forEach(async (element) => {
              let address='';
              await axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+element.geometry.location.lat+','+element.geometry.location.lng+'&key='+apiKeys.googlePlaces).then(
                function(result){
                  console.log(result);
                    address=result.data.results[0].formatted_address;
                    console.log(address);
                    self.state.parkingList.push(
                      {
                       place: element,
                       addressName: address
                      });
                }
              ).catch(error => (
                  console.log(error)
                ))


            });
          }
        ).catch(
          function(error){
            console.log(error);
          }
        );
        this.setState(
          {
            showingInfoWindow: true,
            showParkingWindow: false,
            showRestaurantWindow: false,
            restaurantList: this.state.restaurantList,
            parkingList: this.state.parkingList

          }
        )
        console.log(this.state.restaurantList);
        console.log(this.state.parkingList);



      }

      onParkingClick = (props, marker, e) => {
        this.setState({
          activeMarker: marker,
          showingInfoWindow: false,
          showParkingWindow: true,
          showRestaurantWindow: false,
          selectedPlace: props
        })
        console.log(this.state);
      }

      onRestaurantClick = (props, marker, e) => {
        this.setState({
          activeMarker: marker,
          showingInfoWindow: false,
          showParkingWindow: false,
          showRestaurantWindow: true,
          selectedPlace: props
        })
        console.log(this.state);
      }



      onClose = props => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            showParkingWindow: false,
            showRestaurantWindow: false,
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
          console.log(this.props.showRecs);
          if(!this.props.showRecs){
            this.setState({
              restaurantList:[],
              parkingList: []
            });
            console.log("clear");
            console.log(this.state);
            this.props.enableRecs();
          }
          console.log(this.state);
          

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
              gradient={["rgba(255, 254, 253, 0)",
              "rgba(153, 210, 255, 0.9)",
              "rgba(153, 187, 255, 1)",
              "rgba(153, 164, 255, 1)",
              "rgba(153, 142, 255, 1)",
              "rgba(153, 119, 255, 1)",
              "rgba(153, 96, 255, 1)",
              "rgba(153, 74, 255, 1)",
              "rgba(153, 51, 255, 1)"]}
              positions={this.props.eventList.map(item => { return { "lat": item.latitude, "lng": item.longitude, "weight": 1}})}
              opacity={0.7}
              radius={50}
            />

        {this.state.eventList.map(marker => (
                <Marker
                position={{ lat: marker.latitude, lng: marker.longitude }}
                key={marker.id}
                onClick={this.onMarkerClick}
                name={marker.name}
                venueName={marker.venue_name}
                venueAddress={marker.venue_address == null ? "(No given venue address)" : marker.venue_address}
                start={marker.start_time}
                end={marker.end_time}
                url={marker.url}
                image_url={marker.image_url == null ? 'https://www.se.com/us/shop-static/assets/images/brand/NoImageAvailable.png' : marker.image_url}
                description={marker.description == null ? "(No description available)" : marker.description}
                />
    ))}

{       this.state.parkingList.map(marker => (
 
                <Marker
                position={{ lat: marker.place.geometry.location.lat, lng: marker.place.geometry.location.lng }}
                key={marker.id}
                onClick={this.onParkingClick}
                />
  
    ))}

{this.state.restaurantList.map(marker => (
                <Marker
                position={{ lat: marker.place.geometry.location.lat, lng: marker.place.geometry.location.lng }}
                key={marker.id}
                onClick={this.onRestaurantClick}
                />
    ))}




    <InfoWindow
    marker={this.state.activeMarker}
    visible={this.state.showParkingWindow}
    onClose={this.onClose}
    onOpen={this.props.refresh}

    >
        <p6>DIS PERKING</p6>
    </InfoWindow>

    <InfoWindow
    marker={this.state.activeMarker}
    visible={this.state.showRestaurantWindow}
    onClose={this.onClose}
    onOpen={this.props.refresh}

    >
        <p6>DIS RESTRANT</p6>
    </InfoWindow>

    <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
          onOpen={this.props.refresh}
        >
          <Grid className="popup">
          <div>
            <h6 align="center">{this.state.selectedPlace.name}</h6>
            <Divider />
            <p>{this.state.selectedPlace.venueName} &nbsp; || &nbsp;
            {(new Date(this.state.selectedPlace.start).toUTCString()).slice(0, 22)} - {(new Date(this.state.selectedPlace.end).toUTCString()).slice(0, 22)}</p>
          </div>
          <div className="image">
            {console.log(this.state.image_url)}
            <a href={this.state.selectedPlace.url}><img width="100%" src={this.state.selectedPlace.image_url}/></a>
          </div>
          <div className="info">
            <p> {this.state.selectedPlace.venueAddress}</p>
            <p> {this.state.selectedPlace.description}</p>
            <br></br>
          </div>
          <div>{this.state.restaurantList.map((restaurant)=>(
            <p>{restaurant.addressName}</p>
          ))}</div>
          <div className="clear">
            <Divider />
          </div>

          </Grid>

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
