import React, {Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';
import { withAuthorization, withAuthentication, AuthUserContext } from '../Components/Session';
import axios from 'axios';

class MyEvents extends Component {
  constructor(props) {
      super(props);
  }

  state = {
    data: [],
    name: null,
    description: null,
    summary: null,
    url: null,
    image_url: null,
    id: null,
  };

  componentDidMount() {
    this.getSavedEvent();
  }


  getSavedEvent = (email) => {
    let userEmail = email;
    axios.get('/myevents/savelist?email='+userEmail)
    .then(function (response) {
      console.log(response);
      // response.data.forEach(element => {
      //   props.eventList.push(element);
      //
      // });
      // console.log(props.eventList);
      // props.reRender();
    })
    .catch(function (error) {
      console.log(error);
    });

  }


  render () {
    return(
      <div>
        <div claseName="text-center">
          <h2>Saved Events</h2>
        </div>
        <div>
        <AuthUserContext.Consumer>
          {authUser => (
            <div>
                {this.getSavedEvent(authUser.email)}
            </div>
          )}
        </AuthUserContext.Consumer>
        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(MyEvents);
