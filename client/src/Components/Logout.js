import React from 'react';
import { Button } from "reactstrap";
import { withFirebase } from './Firebase';

const LogoutButton = ({ firebase }) => (
  <Button color="#c1cadb" className="text-muted" margin="0" onClick={firebase.doSignOut}>
        Logout
  </Button>
);
export default withFirebase(LogoutButton);
