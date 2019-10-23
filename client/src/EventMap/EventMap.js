import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Filters from "./Filters";
import MapContainer from "./MapContainer";

class EventMap extends Component {
    render() {
        return (
            <div>
                <MapContainer />
                <Filters />
            </div>
        );
    }
}

export default EventMap;