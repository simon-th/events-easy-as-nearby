import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Filters from "./Filters";
import MapContainer from "./MapContainer";
//import MapContain from './MapContain'
import { Button } from '@material-ui/core';

class EventMap extends Component {
    constructor(){
        super();
        this.state={
            shownEvents:[ {
                id: 0,
                title: "Yash's Birthday",
                descr: "Come celebrate Yash's 21st birthday at Skyloft! It's a study party so bring your own books.",
                lat: 30.286358,
                long: -97.7456957
              }]
        }
    }

    
    render() {
        return (
            <div>
                <MapContainer eventList={this.state.shownEvents} />
                <Filters eventList={this.state.shownEvents} />
            </div>
        );
    }
}

export default EventMap;
