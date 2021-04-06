import { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import {
  Button,
  ButtonGroup,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

const baseURL = 'http://localhost:5000/products/';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
  },
  image: {
    height: '500px',
    width: '450px',
  },
  divider: {
    height: '100%',
    width: '2px',
    fontWeight: 'bold',
  },
  typoSpacing: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  ingredient: { marginTop: theme.spacing(2) },
  selectedIngredient: {
    backgroundColor: 'pink',
    borderRadius: '3px',
    // padding: '2px',
  },
  productName: {
    textTransform: 'uppercase',
  },
  buttonSpacing: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const ProductDetail = () => {
  const classes = useStyles();
  const history = useHistory();
  let { id } = useParams();
  const { productInfo, setProductInfo, keyword } = useContext(ProductsContext);

  const deleteProduct = async () => {
    try {
      await fetch(baseURL + id, {
        method: 'DELETE',
      });
      history.push('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const productDetail = await fetch(baseURL + id);
        const jsonData = await productDetail.json();
        setProductInfo(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    };
    getProductDetail();
  }, [setProductInfo, id, keyword]);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={6}>
        {productInfo[1] ? (
          productInfo[1] ? (
            <CardMedia
              className={classes.image}
              image={productInfo[1]}
            ></CardMedia>
          ) : (
            <CircularProgress />
          )
        ) : null}
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.productName}>
              {productInfo[0] && productInfo[0].product_name}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.typoSpacing}>
            <Typography variant="body1">
              {productInfo[0] && productInfo[0].product_description}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.typoSpacing}>
            <Typography variant="h6" className={classes.productName}>
              Ingredients
            </Typography>
          </Grid>
          <Grid container spacing={1}>
            {productInfo[0] &&
              productInfo[0].ingredient_names.map((ingredient, idx) => {
                return (
                  <>
                    {ingredient.includes(keyword) && keyword ? (
                      <Grid item key={idx}>
                        <Typography
                          className={classes.selectedIngredient}
                          key={idx}
                          variant="body1"
                        >
                          {ingredient}
                        </Typography>
                      </Grid>
                    ) : (
                      <Grid item key={idx}>
                        <Typography key={idx}>{ingredient}</Typography>
                      </Grid>
                    )}
                    {/* put divider until idx gets same to the ingredient_names.length */}

                    {idx ===
                    productInfo[0].ingredient_names.length - 1 ? null : (
                      <Grid item key={ingredient}>
                        <Divider
                          className={classes.divider}
                          orientation="vertical"
                          key={idx}
                        />
                      </Grid>
                    )}
                  </>
                );
              })}
          </Grid>
          <Grid item xs={12} className={classes.buttonSpacing}>
            <ButtonGroup variant="contained">
              <Button
                startIcon={<SaveIcon />}
                color="primary"
                onClick={() => history.push(`/products/${id}/edit`)}
              >
                Edit
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                color="secondary"
                onClick={() => {
                  deleteProduct();
                }}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ProductDetail;
