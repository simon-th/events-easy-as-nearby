import React, {Component} from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import "./template.css";
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';
import { AuthUserContext } from '../../Components/Session';


class GridTemplate extends Component {

  render () {
    console.log('template');
    // console.log(this.props.properties.length);
    console.log(this.props.properties);
    return (
        <div>
          <Grid container className="grid" spacing={2}>
                {this.props.properties.length <= 0
                  ? ''
                  : this.props.properties.map((dat) => (
                    <Card className="templateCard">
                      <CardActionArea target="_blank" href={dat.url}>
                        <CardMedia
                          component="img"
                          height="180"
                          image={dat.image === null ? 'https://www.se.com/us/shop-static/assets/images/brand/NoImageAvailable.png' : dat.image.medium.url}
                          title={dat.title}
                        />
                        <CardContent className="text">
                          <Typography gutterBottom variant="h5" component="h2">
                            {dat.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                          {(dat.description == null) ? "(No description available)" : dat.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions className="buttons">
                      <div>
                      <AuthUserContext.Consumer>
                          {authUser =>
                            authUser ?
                            <Button onClick={() => this.props.function(authUser.email, dat.id)} className="buttons" size="small" color="primary">
                              {this.props.buttonText}
                            </Button>
                            :
                            <Tooltip title="Login to save event">
                                <span>
                                <Button className="buttons" disabled size="small" color="primary">
                                  {this.props.buttonText}
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
    );
  }
}

export default GridTemplate;
