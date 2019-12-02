import React, {Component} from 'react';
import { withAuthorization, AuthUserContext } from '../../Components/Session';
import axios from 'axios';
import GridTemplate from "../GridTemplate/GridTemplate.js";
import "../Explore/Explore.css";
import firebase from 'firebase/app';

class MyEvents extends Component {
  state = {
    properties: [],
    eventlist: [],
    data: [],
    name: null,
    description: null,
    url: null,
    images: null,
    id: null,
    update: false,
  };

  async componentDidMount() {
    console.log('mount');
    await this.getEventList();
    console.log(this.state.properties);
    this.state.data.forEach(element => {
      this.state.properties.push({
        title: element.name,
        image: element.images === undefined ? null : Array.isArray(element.images.image) ? element.images.image[0] : element.images.image,
        description: element.description,
        url: element.url,
        id: element.id
      });
    });
    this.forceUpdate();
  }

  getEventList = async () => {
    var events = [];
    var email = firebase.auth().currentUser.email;
    await axios.get(`/api/events/savelist?email=${email}`)
    .then(function (response) {
      response.data.data.forEach((id) => {
        events.push(id);
      })
    })
    .then(() => {
      // console.log(events);
      this.setState({data: events});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  unsaveEvent (email, id) {
    axios.post('/api/events/unsave', {
      email: email,
      event_id: id,
    });
    window.location.reload();
  };

  render () {
    console.log('myevent');
    const { data } = this.state;
    console.log(data);
    console.log(this.state.properties);
    return (
      <div>
        <div className="text-center">
          <h2>My Saved Events</h2>
        </div>
        <div>
          <GridTemplate 
            properties = {this.state.properties}
            function = {this.unsaveEvent}
            buttonText = "Unsave Event"
            />
        </div>

      </div>


    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(MyEvents);
