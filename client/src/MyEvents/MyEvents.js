import React, {Component} from 'react';
import { withAuthorization } from '../Components/Session';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
//import Tooltip from '@material-ui/core/Tooltip';
import "../Explore/Explore.css";
import firebase from 'firebase/app';

class MyEvents extends Component {
  state = {
    eventlist: [],
    data: [],
    name: null,
    description: null,
    url: null,
    image_url: null,
    id: null,
    update: false,
  };

  componentDidMount() {
    console.log('mount');
    this.getEventList();
  }

  getEventList = () => {
    var events = [];
    var email = firebase.auth().currentUser.email;
    axios.get(`/api/myevents/savelist?email=${email}`)
    .then(function (response) {
      response.data.forEach((id) => {
        events.push(id);
      })
    })
    .then(() => {
      this.setState({data: events});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  unsaveEvent = (email, id) => {
    this.setState({update: true});
  };

  render () {
    console.log('render');
    const { data } = this.state;
    return (
      <div>
        <div className="text-center">
          <h2>My saved events</h2>
        </div>

        <div>
          <Grid container className="grid" spacing={2}>
                {data.length <= 0
                  ? ''
                  : data.map((dat) => (
                    <Card className="exploreCard">
                      <CardActionArea target="_blank" href={dat.url}>
                        <CardMedia
                          component="img"
                          alt="No image available"
                          height="180"
                          image={dat.image_url == null ? 'https://www.se.com/us/shop-static/assets/images/brand/NoImageAvailable.png' : dat.image_url}
                          title={dat.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {dat.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                          {dat.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions className="buttons">
                        <Button onClick={() => this.unsaveEvent(firebase.auth().currentUser.email, dat.id)} className="buttons" size="small" color="primary">
                          Unsave Event
                        </Button>
                        <Button size="small" color="primary" target="_blank" href={dat.url}>
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                <br />
            </Grid>
        </div>

      </div>


    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(MyEvents);
