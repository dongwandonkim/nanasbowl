import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core';

const useStyles = makeStyles({
  sideMenu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '0px',
    width: '320px',
    height: '100%',
    backgroundColor: '#253053',
  },
});

export default function SideMenu() {
  const styles = useStyles();

  return <div className={styles.sideMenu}>Side Menu</div>;
}
