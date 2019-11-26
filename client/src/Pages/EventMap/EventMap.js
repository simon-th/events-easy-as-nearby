import React, { Component } from 'react';
import Filters from "./Filters";
import MapContainer from "./MapContainer";
import axios from 'axios'

class EventMap extends Component {


    constructor(){
        super();
        this.state={
            shownEvents:[],
              categories:[],
              showRecs:true
        }
    }

    async componentDidMount(){
    let self=this;
    await axios.get('/api/events/categories')
    .then(function (response) {
    console.log(response);
    console.log(response.data);
    self.state.categories=response.data.data.map((category)=>(
         {id: category.id, name: category.name}))

     })
     .catch(function (error) {
    console.log(error);
    });
    }

    reRender =()=>{
        this.setState({
            showRecs:false
        });
        this.forceUpdate();
    };

    refresh=()=>(this.forceUpdate());

    enableRecs=()=>{
        this.setState({
            showRecs:true
        });
    };


    render() {
        return (
            <div>
                <MapContainer eventList={this.state.shownEvents} reRender={this.reRender} showRecs={this.state.showRecs} enableRecs={this.enableRecs} refresh={this.refresh}/>
                <Filters eventList={this.state.shownEvents}  categories={this.state.categories} reRender={this.reRender}/>
            </div>
        );
    }
}

export default EventMap;
