import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
import {Card} from 'reactstrap';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import {HeatMap} from './HeatMap';
import apiKeys from '../../api-keys.json';
import popupStyle from './popupStyle.css'
import axios from 'axios';
import { AuthUserContext } from '../../Components/Session';
import firebase from 'firebase/app';

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
        savedEvents: [],
        restaurantIcon: {
          url:'./restaurantIcon.png'
        }
      };

      onMarkerClick = async (props, marker, e) =>{
        //console.log(props);
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          restaurantList: [],
          parkingList: []
        });
        let self=this;
        await axios.get('api/events/restaurants/?latitude='+props.position.lat+'&longitude='+props.position.lng).then(
          function(response){
           console.log(response);
            response.data.data.forEach(async (element) => {
              let address='';
               await axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+element.latitude+','+element.longitude+'&key='+apiKeys.googlePlaces).then(
                function(result){
                 // console.log(result);
                    address=result.data.results[0].formatted_address;
                  //  console.log(address);
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
            //console.log(response);
            response.data.results.forEach(async (element) => {
              let address='';
              await axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+element.geometry.location.lat+','+element.geometry.location.lng+'&key='+apiKeys.googlePlaces).then(
                function(result){
                  //console.log(result);
                    address=result.data.results[0].formatted_address;
                   // console.log(address);
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
        this.props.refresh();
      }

      onParkingClick = (props, marker, e) => {
        this.setState({
          activeMarker: marker,
          showingInfoWindow: false,
          showParkingWindow: true,
          showRestaurantWindow: false,
          selectedPlace: props
        })
        //console.log(this.state);
      }

      onRestaurantClick = (props, marker, e) => {
        this.setState({
          activeMarker: marker,
          showingInfoWindow: false,
          showParkingWindow: false,
          showRestaurantWindow: true,
          selectedPlace: props
        })
        //console.log(this.state);
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


      async componentDidMount() {
        let self = this;
        await axios.get('/api/events/')
          .then(function (response) {
            console.log(response);

            response.data.data.forEach(element => {
              self.state.savedEvents.push(element);

            });
            self.props.reRender();
          })
      }

      componentDidUpdate(prevProps){
        if(prevProps.eventList!==this.props.eventList){
          this.setState({eventList:this.props.eventList})
        }
      }
      parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
      }

      saveEvent = (email, id) => {
        // console.log(email);
        // console.log(id);
        axios.post('/api/events/save', {
          email: email,
          event_id: id,
        });
      };

    render() {

        let restaurantIcon=this.state;
        if (!this.props.google) {
            return <div>Loading...</div>;
          }
          //console.log(this.props.showRecs);
          if(!this.props.showRecs){
            this.setState({
              restaurantList:[],
              parkingList: []
            });
            //console.log("clear");
            //console.log(this.state);
            this.props.enableRecs();
          }
          //console.log(this.state);


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
              positions={this.state.savedEvents.map(item => { return { "lat": item.latitude, "lng": item.longitude, "weight": item.saved_users.length}})}
              opacity={0.9}
              radius={50}
            />

        {this.state.eventList.map(marker => (
                <Marker
                position={{ lat: marker.latitude, lng: marker.longitude }}
                key={marker.id}
                onClick={this.onMarkerClick}
                name={marker.title}
                venueName={marker.venue_name}
                venueAddress={marker.address == null ? "(No given venue address)" : marker.venue_address}
                start={marker.start_time}
                // end={marker.stop_time}
                url={marker.url}
                image={marker.image === null ? 'https://www.se.com/us/shop-static/assets/images/brand/NoImageAvailable.png' : marker.image.medium.url}
                description={marker.description === null || marker.description === '<br> ' ? "(No description available)" : marker.description}
                />
    ))}

{       this.state.parkingList.map(marker => (

                <Marker
                icon='https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png'
                position={{ lat: marker.place.geometry.location.lat, lng: marker.place.geometry.location.lng }}
                name={marker.place.name}
                address={marker.addressName}
                key={marker.id}
                onClick={this.onParkingClick}
                />

    ))}

{this.state.restaurantList.map(marker => (
                <Marker
                icon='http://maps.google.com/mapfiles/kml/shapes/dining_maps.png'
                position={{ lat: marker.place.latitude, lng: marker.place.longitude }}
                key={marker.id}
                name={marker.place.name}
                address={marker.addressName}
                price={marker.place.price_level === 4 ? "$$$$" : marker.place.price_level === 3 ? "$$$" : marker.place.price_level === 2 ? "$$" : "$"}
                rating={marker.place.rating}
                key={marker.id}
                onClick={this.onRestaurantClick}
                address={marker.addressName}
                />
    ))}

    <InfoWindow
    marker={this.state.activeMarker}
    visible={this.state.showParkingWindow}
    onClose={this.onClose}
    className="popup"
    >
      {console.log(this.state.selectedPlace)}
      <h6>{this.state.selectedPlace.name}</h6>
      <Divider />
    <p6>Address : {this.state.selectedPlace.address}</p6>
    <br></br>
    </InfoWindow>

    <InfoWindow
    marker={this.state.activeMarker}
    visible={this.state.showRestaurantWindow}
    onClose={this.onClose}
    className="popup"
    >
      <h6>{this.state.selectedPlace.name}</h6>
      <Divider />
        <p6>Address :{this.state.selectedPlace.address}</p6>
        <br></br>
        <p6>Rating : {this.state.selectedPlace.rating} / 5</p6>
        <br></br>
        <p6>Price Level : {this.state.selectedPlace.price} </p6>
        <br></br>
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
            {(new Date(this.state.selectedPlace.start).toUTCString()).slice(0, 22)}</p>
          </div>
          <div className="image">
            <a href={this.state.selectedPlace.url}><img width="100%" src={this.state.selectedPlace.image}/></a>
          </div>
          <div className="info">
            <p> Address: {this.state.selectedPlace.venueAddress}</p>
            <p> Description: {this.state.selectedPlace.description}</p>
          </div>

          <div className="clear">
            <Divider />
            {console.log(firebase.auth().currentUser)}
            {firebase.auth().currentUser === null ?
              <Tooltip title="Login to save event">
                  <span>
                  <Button className="buttons" disabled size="small" color="primary">
                    Save Event
                  </Button>
                  </span>
              </Tooltip>
              :
              <Button onClick={() => this.saveEvent(firebase.auth().currentUser.email, this.state.selectedPlace.key)} className="buttons" size="small" color="primary">
                Save Event
              </Button>
            }

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
