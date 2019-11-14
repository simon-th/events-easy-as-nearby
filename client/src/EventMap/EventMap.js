import React, { Component } from 'react';
import Filters from "./Filters";
import MapContainer from "./MapContainer";
import axios from 'axios'

class EventMap extends Component {
    reRender =()=>(this.forceUpdate())

    constructor(){
        super();
        this.state={
            shownEvents:[
  ],
              categories:[
              ]
        }
    }

    async componentDidMount(){
    let self=this;
    await axios.get('/api/events/categories')
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
