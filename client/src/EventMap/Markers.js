import React, { Component } from 'react';
import {  Marker } from 'google-maps-react';



export default class Markers extends Component{
    
    render(){
        console.log(this.props.eventList);
        
            
        return this.props.eventList.map((element)=>(
             
            <Marker key={element.id} position={{lat: element.lat, lng: element.long}} onClick={this.props.onMarkerClick} name={element.title} />
              
                
            ));
            
            
           
    
    }
}