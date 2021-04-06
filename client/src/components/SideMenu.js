import React from 'react';
import { makeStyles, Drawer, List, ListItem } from '@material-ui/core';

const useStyles = makeStyles({
  sideMenu: {
    width: '280px',
    // backgroundColor: '#253053',
    justifyContent: 'center',
    alignItems: 'center',
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
      <List>
        <ListItem onClick={props.toggle}>Menu Item</ListItem>
        <ListItem>Menu Item 2</ListItem>
      </List>
    </Drawer>
  );
}
