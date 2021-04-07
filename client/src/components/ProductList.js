import { useEffect, useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import ProductCard from './ProductCard';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  listHeader: {
    display: 'flex',
    marginTop: theme.spacing(3),
  },
  typoSpacing: {
    marginRight: theme.spacing(1),
  },
}));

const ProductList = () => {
  const classes = useStyles();

  const { productList, keyword, include } = useContext(ProductsContext);

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
      <Grid container spacing={3} className={classes.root}>
        {productList.map((data) => {
          return <ProductCard data={data} key={data.product_id} />;
        })}
      </Grid>
    </>
  );
};

export default ProductList;
