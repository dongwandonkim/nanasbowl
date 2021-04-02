import { useEffect, useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import ProductCard from './ProductCard';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    // padding: theme.spacing(2),
  },
}));

const ProductList = () => {
  const classes = useStyles();

  const {
    productList,
    setProductList,
    showFullList,
    setShowFullList,
  } = useContext(ProductsContext);

  const getAllProductLists = async () => {
    try {
      const res = await fetch('http://localhost:5000/products');
      const jsonData = await res.json();
      setProductList(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    // const test = document.querySelector('.search-input').value;
    // if (test.length <= 0) {
    //   getAllProductLists();
    // }
    // if (showFullList === true) {
    //   getAllProductLists();
    // }
  }, [showFullList]);

  return (
    <Grid container spacing={3} className={classes.root}>
      {productList.map((data) => {
        return <ProductCard data={data} key={data.product_id} />;
      })}
    </Grid>
  );
};

export default ProductList;
