import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { AuthUserContext } from '../Components/Session';
import "./Explore.css";
import "../EventMap/MapContainer";

const SaveButton = () => (
    <div>
      <AuthUserContext.Consumer>
          {authUser =>
            authUser ? <SaveButtonAuth /> : <SaveButtonNonAuth />
          }
      </AuthUserContext.Consumer>
    </div>
);

const SaveButtonAuth = () => (
  <Button className="buttons" size="small" color="primary">
    Save Event
  </Button>
);

const SaveButtonNonAuth = () => (
  <Tooltip title="Login to save event">
      <span>
      <Button className="buttons" disabled size="small" color="primary">
        Save Event
      </Button>
      </span>
    </Tooltip>

);

export default SaveButton;
