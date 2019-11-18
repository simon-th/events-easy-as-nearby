import React, {Component} from 'react';
import { withAuthorization, AuthUserContext } from '../Components/Session';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import "../Explore/Explore.css";
import firebase from 'firebase/app';

class MyEvents extends Component {
  state = {
    eventlist: [],
    data: [],
    name: null,
    description: null,
    url: null,
    images: null,
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
      console.log(events);
      this.setState({data: events});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  unsaveEvent = (email, id) => {
    axios.post('/api/events/unsave', {
      email: email,
      event_id: id,
    });
    window.location.reload();
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
                    dat === null
                      ? ''
                      :
                    <Card className="exploreCard">
                      <CardActionArea target="_blank" href={dat.url}>
                        <CardMedia
                          component="img"
                          height="180"
                          image={dat.images === null ? 'https://www.se.com/us/shop-static/assets/images/brand/NoImageAvailable.png' : dat.images.image[0].medium.url}
                          title={dat.name}
                        />
                        <CardContent className="text">
                          <Typography gutterBottom variant="h5" component="h2">
                            {dat.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                          {(dat.description == null  || dat.description == "<br>") ? "(No description available)" : dat.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions className="buttons">
                      <div>
                      <AuthUserContext.Consumer>
                          {authUser =>
                            authUser ?
                            <Button onClick={() => this.unsaveEvent(authUser.email, dat.id)} className="buttons" size="small" color="primary">
                              Unsave
                            </Button>
                            :
                            <Tooltip title="Login to save event">
                                <span>
                                <Button className="buttons" disabled size="small" color="primary">
                                  Save Event
                                </Button>
                                </span>
                            </Tooltip>
                          }
                      </AuthUserContext.Consumer>
                      </div>
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
