import React, {Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

class MyEvents extends Component {
  eventList = [
    {
      id: 0,
      title: "Yash's Birthday",
      descr: "Come celebrate Yash's 21st birthday at Skyloft! It's a study party so bring your own books.",
      lat: 30.286358,
      long: -97.7456957
    },
    {
      id: 1,
      title: "Wood Chopping Contest",
      descr: "We're not sure why this is a thing but it is, so come out and chop wood at Gregory Gymanisum.. I guess?",
      lat: 30.2842331,
      long: -97.7386967
    },
    {
      id: 2,
      title: "Snakes and Ladders Night",
      descr: "Join us for snakes and ladders at Angel's apartment!",
      lat: 30.2870417,
      long: -97.7461794
    },
    {
      id: 3,
      title: "Smash Tournament",
      descr: "Come play Smash at Simon's apartment!",
      lat: 30.2900117,
      long: -97.7445804
    },
    {
      id: 4,
      title: "IEEE GM #3",
      descr: "This is the third general meeting for IEEE this semester. As usual, there will be free food, and we will be joined by guests from Arm!",
      lat: 30.2884957,
      long: -97.7376979
    },
    {
      id: 5,
      title: "Spongebob Watch Party",
      descr: "We will be watching episodes with Mermaid Man and Barnacle Boy because they are our favorite characters.",
      lat: 30.2864807,
      long: -97.743338
    },
    {
      id: 6,
      title: "Gong Cha Profit Share",
      descr: "Boba. Yay.",
      lat: 30.3753425,
      long: -97.8380101
    }
  ]

  render () {
    return(
      <div>
        <div>
          <label>Events Happening Nearby</label>
        </div>
        <div>
          <Card style={{width:'100%', 'text-align':'left'}}>
            <CardBody>
              <CardTitle>{this.eventList[1].title}</CardTitle>
              <CardSubtitle>{this.eventList[1].location}</CardSubtitle>
              <CardText>{this.eventList[1].descr}</CardText>
              <Button>Save</Button>
            </CardBody>
          </Card>
          <Card style={{width:'100%', 'text-align':'left'}}>
            <CardBody>
              <CardTitle>{this.eventList[2].title}</CardTitle>
              <CardSubtitle>{this.eventList[2].location}</CardSubtitle>
              <CardText>{this.eventList[2].descr}</CardText>
              <Button>Save</Button>
            </CardBody>
          </Card>
          <Card style={{width:'100%', 'text-align':'left'}}>
            <CardBody>
              <CardTitle>{this.eventList[3].title}</CardTitle>
              <CardSubtitle>{this.eventList[3].location}</CardSubtitle>
              <CardText>{this.eventList[3].descr}</CardText>
              <Button>Save</Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default MyEvents;
