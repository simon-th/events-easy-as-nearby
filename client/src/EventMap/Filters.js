import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { sizing } from '@material-ui/system';
import FilterObject from '../EventMap/FilterObject'

const drawerWidth = 240;
const drawerTop = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
   width: `calc(100% - ${drawerWidth}px)`,
   marginRight: drawerWidth,
   height: `calc(100% - ${drawerTop}px)`,
  },
  drawer: {
    display: 'flex',
    width: drawerWidth,
    height: drawerTop
    
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function PermanentDrawerRight() {
  const classes = useStyles();
  return (
    
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
        
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <FilterObject/>
        </List>
        <Divider />
        <List>
         more filters
        </List>
      </Drawer>
    </div>
  );
}