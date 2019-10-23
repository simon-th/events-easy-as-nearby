import React, {Component} from "react";
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col
} from "reactstrap";


class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("/explore")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }

  componentDidMount() {
      this.callAPI();
  }

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
        <div className="text-center">
          <h2>Events Happening Nearby</h2>
        </div>
        <div>
            <Row>
              <Col sm={{ size: 8, offset: 1 }}>
                  <Card>
                    <CardBody>
                      <CardTitle>{this.eventList[0].title}</CardTitle>
                      <CardSubtitle>{this.eventList[0].location}</CardSubtitle>
                      <CardText className="text-left">{this.eventList[0].descr}</CardText>
                      <Button color="success" className="float-right">Save</Button>
                    </CardBody>
                  </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={{ size: 8, offset: 1 }}>
                  <Card>
                    <CardBody>
                      <CardTitle>{this.eventList[1].title}</CardTitle>
                      <CardSubtitle>{this.eventList[1].location}</CardSubtitle>
                      <CardText className="text-left">{this.eventList[1].descr}</CardText>
                      <Button color="success" className="float-right">Save</Button>
                    </CardBody>
                  </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={{ size: 8, offset: 1 }}>
                  <Card>
                    <CardBody>
                      <CardTitle>{this.eventList[2].title}</CardTitle>
                      <CardSubtitle>{this.eventList[2].location}</CardSubtitle>
                      <CardText className="text-left">{this.eventList[2].descr}</CardText>
                      <Button color="success" className="float-right">Save</Button>
                    </CardBody>
                  </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={{ size: 8, offset: 1 }}>
                  <Card>
                    <CardBody>
                      <CardTitle>{this.eventList[3].title}</CardTitle>
                      <CardSubtitle>{this.eventList[3].location}</CardSubtitle>
                      <CardText className="text-left">{this.eventList[3].descr}</CardText>
                      <Button color="success" className="float-right">Save</Button>
                    </CardBody>
                  </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={{ size: 8, offset: 1 }}>
                  <Card>
                    <CardBody>
                      <CardTitle>{this.eventList[4].title}</CardTitle>
                      <CardSubtitle>{this.eventList[4].location}</CardSubtitle>
                      <CardText className="text-left">{this.eventList[4].descr}</CardText>
                      <Button color="success" className="float-right">Save</Button>
                    </CardBody>
                  </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={{ size: 8, offset: 1 }}>
                  <Card>
                    <CardBody>
                      <CardTitle>{this.eventList[5].title}</CardTitle>
                      <CardSubtitle>{this.eventList[5].location}</CardSubtitle>
                      <CardText className="text-left">{this.eventList[5].descr}</CardText>
                      <Button color="success" className="float-right">Save</Button>
                    </CardBody>
                  </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={{ size: 8, offset: 1 }}>
                  <Card>
                    <CardBody>
                      <CardTitle>{this.eventList[6].title}</CardTitle>
                      <CardSubtitle>{this.eventList[6].location}</CardSubtitle>
                      <CardText className="text-left">{this.eventList[6].descr}</CardText>
                      <Button color="success" className="float-right">Save</Button>
                    </CardBody>
                  </Card>
              </Col>
            </Row>
            <br />
        </div>
      </div>
    );
  }
}

export default Explore;
