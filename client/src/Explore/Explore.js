import React, {Component} from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import "./Explore.css";
import SaveButton from "./SaveButton";
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';
import { AuthUserContext } from '../Components/Session';


class Explore extends Component {

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
      this.getEventFromDb();
  }

  getEventFromDb = () => {
      fetch('/api/events/all')
        .then((data) => data.json())
        .then((res) => {
          console.log(res.data);
          this.setState({ data: res.data})
        });
  }

  saveEvent = (email, id) => {
    axios.post('/api/savedevent', {
      email: email,
      event_id: id,
    });
  };

  render () {
    const { data } = this.state;
    return (
      <div>
        <div className="text-center">
          <h2>Events Happening Nearby</h2>
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
                          image={dat.image_url}
                          title={dat.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {dat.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                          {dat.summary}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions className="buttons">
                      <div>
                      <AuthUserContext.Consumer>
                          {authUser =>
                            authUser ?
                            <Button onClick={() => this.saveEvent(authUser.email, dat.id)} className="buttons" size="small" color="primary">
                              Save Event
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

export default Explore;
