import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { sizing } from '@material-ui/system';
import FilterObject from '../EventMap/FilterObject'
import Fab from '@material-ui/core/Fab';
import FilterListIcon from '@material-ui/icons/FilterList';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FloatButton from './FloatButton';


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
  const theme = useTheme();
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
        <FilterObject eventList={props.eventList} categories={props.categories} reRender={props.reRender}/>
      </Drawer>
    </div>
  );
}
