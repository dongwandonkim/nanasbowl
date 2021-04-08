import { useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import apiCalls from '../apis/apiCalls';

import {
  Container,
  AppBar,
  makeStyles,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
  Switch,
  Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';

import MenuIcon from '@material-ui/icons/Menu';
import SideMenu from './SideMenu';

const useStyles = makeStyles((theme) => ({
  root: {},
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  mobileHidden: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },

  searchInput: {
    opacity: '0.8',
    padding: '0px 8px',
    backgroundColor: '#f2f2f2',
    borderRadius: '3px',
    width: '100%',
    '&:hover': {
      backgroundColor: 'lighgrey',
    },
    '& .MuiSvgIcon-root': {
      marginRight: '8px',
    },
  },
  switch: {
    marginRight: theme.spacing(2),
  },
}));

const Search = () => {
  const classes = useStyles();

  const history = useHistory();
  const formRef = useRef(null);

  const [searchInput, setSearchInput] = useState('');
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const { setProductList, setKeyword, include, setInclude } = useContext(
    ProductsContext
  );

  const handleToggle = () => {
    setToggleDrawer(!toggleDrawer);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setKeyword(searchInput.toLowerCase());
    history.push('/products');
    getSearchedProduct();
    formRef.current.select();
  };
  const getSearchedProduct = async () => {
    try {
      const res = await apiCalls.get(
        `/search/?keyword=${searchInput}&include=${include}`
      );
      setProductList(res.data);
    } catch (error) {
      console.error(error.message);
    }
    setKeyword(searchInput);
  };

  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Container maxWidth="lg">
          <form
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <Toolbar>
              <Grid container alignItems="center">
                <Grid item>
                  <IconButton
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="Menu"
                    onClick={handleToggle}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.title}
                    onClick={() => history.push('/')}
                  >
                    Nana's Bowl
                  </Typography>
                </Grid>
                <Grid item className={classes.grow} />
                <Grid item className={classes.switch} xs={3} sm={3} md={2}>
                  <Switch
                    checked={include}
                    onChange={() => {
                      setInclude(!include);
                    }}
                    color="default"
                  />
                  {include ? 'Include' : 'Exclude'}
                </Grid>
                <Grid item xs={6} sm={5} md={5} lg={5} className={classes.grow}>
                  <InputBase
                    className={classes.searchInput}
                    placeholder="Search by Ingredient"
                    startAdornment={<SearchIcon fontSize="small" />}
                    value={searchInput}
                    inputRef={formRef}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </Grid>
                <Grid className={classes.grow}></Grid>
                <Grid item className={classes.mobileHidden}>
                  <IconButton>
                    <AccountCircleIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Toolbar>
          </form>
        </Container>
      </AppBar>
      <SideMenu open={toggleDrawer} toggle={handleToggle} />
    </>
  );
};

export default Search;
