import React, {Component} from "react";
import "./Explore.css";
import axios from 'axios';
import GridTemplate from "../GridTemplate/GridTemplate.js";
import { AuthUserContext } from '../../Components/Session';


class Explore extends Component {

  state = {
    data: [],
    name: null,
    description: null,
    url: null,
    image: [],
    id: null,
  };

  async componentDidMount() {
      console.log('mount');
      await this.getEventFromDb();
      
  }

  getEventFromDb = async () => {
      await fetch(`api/events/search/?location=30.2884957,-97.7355092&within=15&category=all&date=Future`)
        .then((data) => data.json())
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          this.setState({ data: res})
        });
  }

  saveEvent (email, id) {
    axios.post('/api/events/save', {
      email: email,
      event_id: id,
    });
  };

  render () {
    console.log('explore');
    console.log(this.state.data);
    return (
      <div>
        <div className="text-center">
          <h2>Events Happening Nearby</h2>
        </div>
        <div>
          <GridTemplate 
            properties = {this.state.data.length === 0 ? '' : this.state.data.data}
            function = {this.saveEvent}
            buttonText = "Save Event"
            />
        </div>
      </div>
    );
  }
}

export default Explore;
