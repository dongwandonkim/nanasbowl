import { useContext, useEffect } from 'react';
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

const ProductList = () => {
  const classes = useStyles();

  const { productList, setProductList, keyword, include } = useContext(
    ProductsContext
  );

  // useEffect(() => {
  //   const getAllProducts = async () => {
  //     const res = await apiCalls.get(`/search/?keyword=&include=${include}`);
  //     console.log(res.data);
  //     setProductList(res.data);
  //   };
  //   getAllProducts();
  // }, [include, setProductList]);

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
  // useEffect(() => {
  //   const res = apiCalls.get('/search');
  //   console.log(res);
  // }, []);

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
        {productList.map((data) => {
          return <ProductCard data={data} key={data.product_id} />;
        })}
      </Grid>
    </>
  );
};

export default ProductList;
