import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/button';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import FilterObject from '../EventMap/FilterObject'
import Fab from '@material-ui/core/Fab';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 350;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  fab: {
    margin: theme.spacing(1),
    position: 'absolute',
    bottom: theme.spacing(10),
    right: theme.spacing(15),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    height: "90vh",
    marginTop: theme.spacing(8.7),
    width: drawerWidth,
  },
}));

export default function PersistentDrawerRight(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
    <CssBaseline />
      <div>
          <Fab
          color="primary"
          size="large"
          variant="extended"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.fab, open && classes.hide)}
          >
            <FilterListIcon className={classes.extendedIcon} />
            Filter
          </Fab>
      </div>
      <div style={{
    margin: 0,
    top: 'auto',
    right: 1000,
    bottom: 7,
    left: 'auto',
    position: 'fixed',
}}>
          <Fab
          color="primary"
          // size="large"
          variant="extended"
          aria-label="open drawer"
          onClick={props.reRender}
          className={clsx(classes.fab, open && classes.hide)}
          >
            Clear Food/Parking
          </Fab>
      </div>
      <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
      }}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <FilterObject eventList={props.eventList} categories={props.categories} reRender={props.reRender} />
      </Drawer>
    </div>
  );
}
