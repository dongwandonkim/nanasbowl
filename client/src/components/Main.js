import { useContext, useState, useEffect } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import ProductCard from './ProductCard';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import apiCalls from '../apis/apiCalls';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },

  listHeader: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  typoSpacing: {
    marginRight: theme.spacing(1),
  },
}));

const Main = () => {
  const classes = useStyles();

  const { productList, setProductList, keyword, include } = useContext(
    ProductsContext
  );

  const [list, setList] = useState([]);

  useEffect(() => {
    const getAllProductList = async () => {
      try {
        const res = await apiCalls.get('/products');

        setList(res.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getAllProductList();
  }, []);

  const RenderText = () => {
    if (keyword && include) {
      return (
        <Typography variant="h5" className={classes.typoSpacing}>
          {' '}
          with{' '}
        </Typography>
      );
    } else if (keyword && !include)
      return (
        <Typography variant="h5" className={classes.typoSpacing}>
          {' '}
          without{' '}
        </Typography>
      );
    else {
      return null;
    }
  };

  return (
    <>
      <div className={classes.listHeader}>
        <Typography variant="h5" className={classes.typoSpacing}>
          Product List{' '}
        </Typography>
        <RenderText />
        <Typography variant="h5" className={classes.typoSpacing}>
          {keyword}
        </Typography>
      </div>
      <Grid container spacing={2}>
        {list.map((data) => {
          return <ProductCard data={data} key={data.product_id} />;
        })}
      </Grid>
    </>
  );
};

export default Main;
