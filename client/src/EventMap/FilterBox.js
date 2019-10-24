import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

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

    export default class FilterBox extends Component{
        render(){
            return(
                <MyCheckbox />
            );
        }
      }