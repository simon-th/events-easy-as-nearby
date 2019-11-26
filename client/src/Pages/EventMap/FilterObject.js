import React, { useEffect } from "react";
//import apiKeys from '../api-keys.json';
import { withStyles } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { MenuItem } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: 20,
        width: 300,
        alignItems: 'center',
    },
    margin: {
        height: theme.spacing(10),
    },
    select: {
      margin: theme.spacing(2),
  },
    submitButton: {
      position: 'absolute',
      bottom: theme.spacing(3),
      alignItems: 'center',

  },
  resetButton: {
    position: 'absolute',
    bottom: theme.spacing(3),
    alignItems: 'center',

},
    check: {
      margin: theme.spacing(1),
    }
  }));

    function valuetext(value) {
        return `${value} miles`;
    }

const MyCheckbox = withStyles({
  root: {
    marginLeft: 20,
    color: indigo[700],
    '&$checked': {
      color: indigo[700],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export default function FilterObject(props) {
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    };

  const [state, setState] = React.useState({
    Free: false,
    distance: 15,
    date: new Date(),
    category:"all",
    days:'Future'
  });


  const classes = useStyles();
   async function requestFilters(){
    let distance=state.distance;
    let free=state.Free;
    let date=state.date.toISOString();
    let days=state.days;
    let category=state.category;
    console.log(state);

    console.log(free);
    console.log(date);
    console.log(category);
    console.log(distance);
    console.log(days);


    while(props.eventList.length>0){
      props.eventList.pop();
    }
    await axios.get(`api/events/search/?location=30.2884957,-97.7355092&within=${distance}&category=${category}&date=${days}`)
  .then(function (response) {
    console.log(response);

    response.data.forEach(element => {
      props.eventList.push(element);

    });

    console.log(props.eventList);
    props.reRender();
  })
  .catch(function (error) {
    console.log(error);
  });
  console.log(props.eventList);
  }

  useEffect(() => {

    requestFilters();

  }, []);

  return (
    <div>
      <div className={classes.root}>
          <Typography gutterBottom>Filters</Typography>
          <div>
          <FormGroup>
          <FormControl>
          <InputLabel>Categories</InputLabel>
          <Select id = "selC"
          className={classes.select}
          value={state.category}
              onChange={(event)=>setState(
              { ...state, category : event.target.value}
              )}
              inputProps={{
                name: 'All',
                id: 'all',
              }}

          >
            <MenuItem key={"all"} value={"all"}>All</MenuItem>
            {props.categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))}

          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="days">Date</InputLabel>
          <Select id = "selD"
            className={classes.select}
            value={state.days}
            onChange={(event)=>setState(
            { ...state, days : event.target.value}
            )}
            inputProps={{
              name: 'Any Day',
              id: 'Future',
            }}
          >
            <MenuItem value='Future'>Any Day</MenuItem>
            <MenuItem value='Today'>Today</MenuItem>
            <MenuItem value='This+Week'>This Week</MenuItem>
            <MenuItem value='Next+Week'>Next Week</MenuItem>
          </Select>
        </FormControl>
        </FormGroup>

          <Divider />
          </div>
          <Typography id="discrete-slider" gutterBottom>Distance (miles)</Typography>

          <Slider
          id="distanceSlider"
          defaultValue={15}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={5}
          min={1}
          max={15}
          onChange={(event, value) => {
            setState({ ...state, distance: value});
            }}
        />
        <Divider />
          <FormGroup>

        <FormControlLabel
          control={
            <MyCheckbox
              className={classes.check}
              checked={state.checkedTag1}
              onChange={handleChange('Free')}
              value="Free"
            />
          }
          label="Free Events"
        />


      </FormGroup>

        <div style={{float:'left'}}>
          <Button id = "sub" className={classes.submitButton} onClick={requestFilters}>Submit</Button>
        </div>

        <Divider/>

      </div>
    </div>

  );
}
