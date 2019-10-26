import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Filters from "./Filters";
import MapContainer from "./MapContainer";
//import MapContain from './MapContain'
import { Button } from '@material-ui/core';
import axios from 'axios'

class EventMap extends Component {
    reRender =()=>(this.forceUpdate())

    constructor(){
        super();
        this.state={
            shownEvents:[ {
                id: 0,
                title: "Yash's Birthday",
                descr: "Come celebrate Yash's 21st birthday at Skyloft! It's a study party so bring your own books.",
                lat: 30.286358,
                long: -97.7456957,
                weight:1
              }],
              categories:[
                  {
                      id:"all",
                      name:"All"
                  }
              ]
        }
    }

    componentDidMount(){
    let self=this;
    axios.get('/events/categories')
    .then(function (response) {
    console.log(response);
    console.log(response.data);
    self.state.categories=response.data.map((category)=>(
         {id: category.id, name: category.name}))
         
     })
     .catch(function (error) {
    console.log(error);
    });
    }
    
    render() {
        return (
            <div>
                <MapContainer eventList={this.state.shownEvents} />
                <Filters eventList={this.state.shownEvents} categories={this.state.categories} reRender={this.reRender} />
            </div>
        );
    }
}

export default EventMap;
