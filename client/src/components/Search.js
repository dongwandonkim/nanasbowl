import { useState, useContext, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';

import {
  AppBar,
  makeStyles,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
  Link,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import { Switch } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    color: 'black',
  },
  searchInput: {
    opacity: '0.8',
    padding: '0px 8px',
    backgroundColor: '#f2f2f2',
    borderRadius: '3px',
    '&:hover': {
      backgroundColor: 'lighgrey',
    },
    '& .MuiSvgIcon-root': {
      marginRight: '8px',
    },
  },
  switch: {
    marginRight: theme.spacing(3),
  },
}));

const Search = () => {
  const classes = useStyles();

  const history = useHistory();
  const formRef = useRef(null);

  const [searchInput, setSearchInput] = useState('');
  const [include, setInclude] = useState(true);

  const { productList, setProductList, setKeyword } = useContext(
    ProductsContext
  );

  const onSubmit = (e) => {
    e.preventDefault();
    setKeyword(searchInput);
    history.push('/products');
    getSearchedProduct();
    formRef.current.select();
  };

  const getSearchedProduct = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/search/?keyword=${searchInput}&include=${include}`
      );
      const parsedResult = await res.json();

      setProductList(parsedResult);
    } catch (error) {
      console.error(error.message);
    }
    setKeyword(searchInput);
  };
  useEffect(() => {
    // console.log(productList);
  }, [productList]);
  return (
    <AppBar position="static" className={classes.root}>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <Toolbar>
          <Grid container rows alignItems="center">
            <Grid item>
              <Link
                component="button"
                className="form-inline mx-2"
                onClick={() => history.push('/')}
              >
                Home
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Link
                component="button"
                className="form-inline mr-auto ml-2"
                onClick={() => history.push('/products/create')}
              >
                add product
              </Link>
            </Grid>
            <Grid item xs={0}></Grid>
            <Grid item className={classes.switch} xs={2}>
              <Switch
                checked={include}
                onChange={() => setInclude(!include)}
                color="primary"
              />
              {include ? 'Include' : 'Exclude'}
            </Grid>
            <Grid item xs={6} sm={6} lg={3}>
              <InputBase
                className={classes.searchInput}
                placeholder="Search by Ingredient"
                startAdornment={<SearchIcon fontSize="small" />}
                value={searchInput}
                inputRef={formRef}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Grid>

            <Grid item xs={0}></Grid>
            <Grid item xs={1}>
              <IconButton>
                <AccountCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </form>
    </AppBar>
  );
};

export default Search;
