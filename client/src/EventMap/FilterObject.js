import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const MyCheckbox = withStyles({
  root: {
    marginLeft: 10,
    color: blueGrey[400],
    '&$checked': {
      color: blueGrey[600],
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

  return (
    <div>
    <h5>Filters</h5>
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
    </div>

  );
}
