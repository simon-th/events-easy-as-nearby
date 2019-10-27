import React, { Component } from 'react';
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
import { renderComponent } from 'recompose';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { MenuItem } from '@material-ui/core';
import axios from 'axios';
import { textAlign } from '@material-ui/system';

const filters =['free'];
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
    button: {
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
    distance: 10,
    date: new Date(),
    category:"all",
    days:'999'
  });

  const classes = useStyles();
  function requestFilters(){
    let params = [];
    let distance=state.distance;
    let free=state.Free;
    let date=state.date.toISOString();
    let days=state.days;
    let category=state.category;
    console.log(state);
    /*
    params=filters.filter((param)=>{
      if(param=="distance"){
        return false;
      }
      return state[param]
    })
    .map((param)=>{return param});
    console.log(params);
    */
    console.log(free);
    console.log(date);
    console.log(category);
    console.log(distance);
    console.log(days);


    while(props.eventList.length>0){
      props.eventList.pop();
    }

    axios.get('/events/filter?category='+category
    +'&within='+days+'&distance='+distance+'&free='
    +free+'&today='+date+'&latitude=30.2669624&longitude=-97.7728593')
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

  }
  console.log(props.categories);

  return (
    <div>
      <div className={classes.root}>
          <Typography gutterBottom>Filters</Typography>
          <div>
          <FormGroup>
          <FormControl>
          <InputLabel>Categories</InputLabel>
          <Select
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
          <InputLabel htmlFor="age-simple">Date</InputLabel>
          <Select
            className={classes.select}
            value={state.days}
            onChange={(event)=>setState(
            { ...state, days : event.target.value}
            )}
            inputProps={{
              name: 'Any Day',
              id: '999',
            }}

          >
            <MenuItem value='999'>Any Day</MenuItem>
            <MenuItem value='0'>Today</MenuItem>
            <MenuItem value='1'>Tomorrow</MenuItem>
            <MenuItem value='7'>This Week</MenuItem>
            <MenuItem value='14'>Next Week</MenuItem>
          </Select>
        </FormControl>
        </FormGroup>

          <Divider />  
          </div>
          <Typography id="discrete-slider" gutterBottom>Distance (miles)</Typography>

          <Slider
          id="distanceSlider"
          defaultValue={10}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={5}
          mark
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

        <div>
          <Button className={classes.button} onClick={requestFilters}>Submit</Button>
        </div>
      </div>
    </div>

  );
}
