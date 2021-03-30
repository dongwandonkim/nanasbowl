import { useState, useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import { FormCheck } from 'react-bootstrap';
import {
  AppBar,
  makeStyles,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#fff',
  },
  searchInput: {
    opacity: '0.6',
    padding: '0px 8px',
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
    '& .MuiSvgIcon-root': {
      marginRight: '8px',
    },
  },
});

const Search = () => {
  const classes = useStyles();

  const history = useHistory();
  const formRef = useRef(null);

  const [searchInput, setSearchInput] = useState('');
  const [include, setInclude] = useState(true);

  const { setProductList, setKeyword } = useContext(ProductsContext);

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

  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item>
              <InputBase
                className={classes.searchInput}
                placeholder="Search by Ingredient"
                startAdornment={<SearchIcon fontSize="small" />}
              />
            </Grid>
            <Grid item sm></Grid>
            <Grid item>
              <IconButton>
                <AccountCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className="input-group justify-content-center">
        <Link to="/" className="form-inline mx-2">
          Home
        </Link>
        <Link to="/products/create" className="form-inline mr-auto ml-2">
          add product
        </Link>
        <form
          className="form-inline my-5 my-lg-5"
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <FormCheck
            id="switchEnabled"
            type="switch"
            checked={include}
            onChange={() => setInclude(!include)}
            label={include ? 'Include' : 'Exclude'}
            className="mx-2"
          />
          <input
            className="form-control mr-sm-2 ml-auto search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchInput}
            ref={formRef}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default Search;
