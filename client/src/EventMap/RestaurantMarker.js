import React, { Component } from 'react';
import {Icon} from './restaurantIcon.png';

export default class RestaurantMarker extends Component{

    constructor(){
        super();
    }

   render(){
       return(
                <img src={Icon} alt="restaurant icon"/>
       )
   }
}