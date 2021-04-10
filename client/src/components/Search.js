import { useState, useContext, useRef, useEffect } from 'react';
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
  Switch,
  Typography,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(1, 0),
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      marginBottom: theme.spacing(1),
    },
  },
  addProduct: {
    display: 'none',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
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
    marginRight: theme.spacing(1),
  },
}));

const Search = () => {
  const classes = useStyles();

  const history = useHistory();
  const formRef = useRef(null);

  const [searchInput, setSearchInput] = useState('');

  const { setProductList, setKeyword, include, setInclude } = useContext(
    ProductsContext
  );

  const handleLogo = () => {
    setSearchInput('');
    history.push('/');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setKeyword(searchInput.toLowerCase());
    history.push('/');
    // getSearchedProduct();
    formRef.current.select();
  };

  useEffect(() => {
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
    getSearchedProduct();
  }, [include, searchInput, setKeyword, setProductList]);

  return (
    <AppBar position="static">
      <Container maxWidth="lg" className={classes.content}>
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <Toolbar>
            <Grid container alignItems="center" justify="center">
              <Grid item xs={12} sm={3} md={3} lg={3}>
                <Typography
                  variant="h6"
                  noWrap
                  className={classes.title}
                  onClick={() => {
                    handleLogo();
                  }}
                >
                  Nana's Bowl
                </Typography>
              </Grid>

              <Grid item className={classes.switch} xs={4} sm={3} md={3} lg={3}>
                <Switch
                  checked={include}
                  onChange={() => {
                    setInclude(!include);
                  }}
                  color="default"
                />
                {include ? 'Include' : 'Exclude'}
              </Grid>
              <Grid item xs={7} sm={5} md={5} lg={5} className={classes.grow}>
                <InputBase
                  className={classes.searchInput}
                  placeholder="Search by Ingredient"
                  startAdornment={<SearchIcon fontSize="small" />}
                  value={searchInput}
                  inputRef={formRef}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              lg={2}
              className={classes.addProduct}
            >
              <Typography
                variant="body1"
                noWrap
                className={classes.title}
                onClick={() => {
                  history.push('/products/create');
                }}
              >
                Add Product
              </Typography>
            </Grid>
          </Toolbar>
        </form>
      </Container>
    </AppBar>
  );
};

export default Search;
