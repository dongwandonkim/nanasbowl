import React from 'react';
import { makeStyles, Drawer, MenuItem } from '@material-ui/core';

const useStyles = makeStyles({
  sideMenu: {
    // display: 'flex',
    // flexDirection: 'column',
    // position: 'absolute',
    // left: '0px',
    width: '320px',
    // height: '100%',
    backgroundColor: '#253053',
  },
});

export default function SideMenu(props) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.sideMenu}
      open={props.open}
      onClose={props.toggle}
    >
      <MenuItem onClick={props.toggle}>Menu Item</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
    </Drawer>
  );
}
