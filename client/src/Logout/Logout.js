import React from 'react';
import { Button } from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import { withFirebase } from '../Components/Firebase';

const useStyles = makeStyles(theme => ({
  // button: {
  //   margin: theme.spacing(1),
  // },
  input: {
    display: 'none',
  },
}));

const LogoutButton = ({ firebase }) => (
  <Button color="#c1cadb" className="text-muted" margin="0" onClick={firebase.doSignOut}>
        Logout
  </Button>
);
export default withFirebase(LogoutButton);
