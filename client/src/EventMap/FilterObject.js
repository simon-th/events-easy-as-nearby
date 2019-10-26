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

const filters =['free'];
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

    const [values, setValues] = React.useState({
      id :'all',
      name: 'All',
    });

    const handleSelectChange = event => {
      setValues(oldValues => ({
        ...oldValues,
        [event.target.name]: event.target.value,
      }));
    };

  const [state, setState] = React.useState({
    Free: false,
    distance: 10,
    date: new Date(),
    category:"all"
  }); 

  const classes = useStyles();
  function requestFilters(){
    let params = [];
    let distance=state.distance;
    let free=state.Free;
    let date=state.date;
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
    
    while(props.eventList.length>0){
      props.eventList.pop();
    }
    
    props.eventList.push({
      id: 1,
      title: "Wood Chopping Contest",
      descr: "We're not sure why this is a thing but it is, so come out and chop wood at Gregory Gymanisum.. I guess?",
      lat: 30.2842331,
      long: -97.7386967,
      weight: 0.5
    });
    props.reRender();
    
  }
  console.log(props.categories);

  
 
 
  return (
    <div>
    
  

    <div className={classes.root}>
        <Typography id="discrete-slider" gutterBottom>Distance</Typography>
        <div>
        <FormGroup>
        <FormControl >
        <InputLabel>Categories</InputLabel>
        <Select
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
      <FormControl >
        <InputLabel htmlFor="age-simple">Date</InputLabel>
        <Select
          
          
        >
         
        </Select>
      </FormControl>
      </FormGroup>
        
        </div>
          
        
        

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
            checked={state.checkedTag1}
            onChange={handleChange('Free')}
            value="Free"
          />
        }
        label="Free Events"
      />
      
      
    </FormGroup> 

    
      <div>
        <Button onClick={requestFilters}>Submit</Button>
      </div>
    </div>
    </div>

  );
}



