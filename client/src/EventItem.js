import React, {Component} from 'react'

class EventItem extends Component{
    render(){
    return(
        <div>
            <label>{this.props.event.title}</label>
        </div>
    )
    }
}

export default EventItem;