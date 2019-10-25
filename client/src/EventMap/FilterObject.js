import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { renderComponent } from 'recompose';
import Button from '@material-ui/core/Button';

const filters =['Free','checkedTag2','checkedTag3','checkedTag4'];
const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: 20,
        width: 300,
    },
    margin: {
        height: theme.spacing(3),
    },
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
    [filters[0]]: false,
    [filters[1]]: false,
    [filters[2]]: false,
    [filters[3]]: false,
    distance: 10
  }); 

  const classes = useStyles();
  function requestFilters(){
    let params = [];
    let distance=state.distance;
    console.log(state);
    params=filters.filter((param)=>{
      if(param=="distance"){
        return false;
      }
      return state[param]
    })
    .map((param)=>{return param});
    console.log(params);
    console.log(distance);
    /*
    while(props.eventList.length>0){
      props.eventList.pop();
    }
    */
    props.eventList.push({
      id: 1,
      title: "Wood Chopping Contest",
      descr: "We're not sure why this is a thing but it is, so come out and chop wood at Gregory Gymanisum.. I guess?",
      lat: 30.2842331,
      long: -97.7386967
    });
    props.reRender();
    
  }

  return (
    <div>
    <Typography id="discrete-slider" gutterBottom>Filters</Typography>
    <FormGroup>
      
      <FormControlLabel
        control={
          <MyCheckbox
            checked={state.checkedTag1}
            onChange={handleChange('Free')}
            value="Free"
          />
        }
        label="Free"
      />
      <FormControlLabel
        control={
          <MyCheckbox
            checked={state.checkedTag2}
            onChange={handleChange('checkedTag2')}
            value="checkedTag2"
          />
        }
        label="Custom color"
      />
      <FormControlLabel
        control={
          <MyCheckbox
            checked={state.checkedTag3}
            onChange={handleChange('checkedTag3')}
            value="checkedTag3"
          />
        }
        label="Custom color"
      />    
      
    </FormGroup> 

    <Divider />

    <div className={classes.root}>
        <Typography id="discrete-slider" gutterBottom>Distance</Typography>
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
      <div>
        <Button onClick={requestFilters}>Submit</Button>
      </div>
    </div>
    </div>

  );
}



