import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Filters from "./Filters";
import MapContainer from "./MapContainer";

class EventMap extends Component {
    constructor(){
        this.state={
            shownEvents:[]
        }
    }

    
    render() {
        return (
            <div>
                <MapContainer />
                <Filters eventList={shownEvents} />
            </div>
        );
    }
}

export default EventMap;
