import React, {Component} from 'react'
import EventItem from './EventItem'

class Explore extends Component{
    render(){
        var events=Array.from(this.props.events);
        return(
           events.map((event) => (<EventItem event={event}/>))
        )
    }
}

export default Explore;