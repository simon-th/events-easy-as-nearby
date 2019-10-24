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

export default function FilterObject() {
        const [state, setState] = React.useState({
        checkedTag1: false,
        checkedTag2: false,
        checkedTag3: false,
        checkedTag4: false,
    });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const classes = useStyles();

  return (
    <div>
    <Typography id="discrete-slider" gutterBottom>Filters</Typography>
    <FormGroup>
      <FormControlLabel
        control={
          <MyCheckbox
            checked={state.checkedTag1}
            onChange={handleChange('checkedTag1')}
            value="checkedTag1"
          />
        }
        label="Custom color"
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
        defaultValue={30}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={5}
        mark
        min={1}
        max={15}
      />
    </div>
    </div>

  );
}
