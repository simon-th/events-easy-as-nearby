import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Filters from "./Filters";
import MapContainer from "./MapContainer";
import { Button } from '@material-ui/core';

class EventMap extends Component {
    constructor(){
        super();
        this.state={
            shownEvents:[]
        }
    }

    
    render() {
        return (
            <div>
                <Button onClick={()=>console.log(this.state.shownEvents)}>Test</Button>
                <MapContainer />
                <Filters eventList={this.state.shownEvents} />
            </div>
        );
    }
}

export default EventMap;
