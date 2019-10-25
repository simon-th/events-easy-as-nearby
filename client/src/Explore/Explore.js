import React, {Component} from "react";
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col
} from "reactstrap";
//import axios from "axios";


class Explore extends Component {

  state = {
    data: [],
    name: null,
    description: null,
    summary: null,
  };

  componentDidMount() {
      this.getEventFromDb();
  }

  getEventFromDb = () => {
      fetch('/api/explore/geteventlist')
        .then((data) => data.json())
        .then((res) => this.setState({ data: res.data}));
  }

  render () {
    const { data } = this.state;
    console.log(data);
    return (
      <div>
        <div className="text-center">
          <h2>Events Happening Nearby</h2>
        </div>
        <div>
            <ul>
                {data.length <= 0
                  ? ''
                  : data.map((dat) => (
                    <Row>
                      <Col sm={{ size: 8, offset: 1 }}>
                          <Card>
                            <CardBody>
                              <CardTitle>{dat.name}</CardTitle>
                              <CardSubtitle>{dat.summary}</CardSubtitle>
                              <CardText className="text-left">{dat.description}</CardText>
                              <Button color="success" className="float-right">Save</Button>
                            </CardBody>
                          </Card>
                      </Col>
                    </Row>
                  ))}
                <br />
            </ul>
        </div>
      </div>
    );
  }
}

export default Explore;
