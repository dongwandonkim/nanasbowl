import { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import {
  Button,
  ButtonGroup,
  CardMedia,
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
    marginTop: theme.spacing(2),
  },
  image: {
    height: '500px',
    width: '450px',
  },
  divider: {
    // height: '75%',
    width: '2px',
    fontWeight: 'bold',
  },
  ingredient: {},
  selectedIngredient: {
    backgroundColor: 'pink',
    borderRadius: '3px',
    // padding: '2px',
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
      <Grid item xs={12}>
        {productInfo[1] && (
          <CardMedia
            className={classes.image}
            image={productInfo[1]}
          ></CardMedia>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2">
          {productInfo[0] && productInfo[0].product_name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          {productInfo[0] && productInfo[0].product_description}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">Ingredients</Typography>
      </Grid>
      <Grid
        className={classes.root}
        container
        xs
        spacing={1}
        align="center"
        direction="row"
      >
        {productInfo[0] &&
          productInfo[0].ingredient_names.map((ingredient, idx) => {
            return (
              <>
                {ingredient.includes(keyword) && keyword ? (
                  <Grid item>
                    <Typography
                      className={classes.selectedIngredient}
                      key={idx}
                    >
                      {ingredient}
                    </Typography>
                  </Grid>
                ) : (
                  <Grid item>
                    <Typography key={idx}>{ingredient}</Typography>
                  </Grid>
                )}
                {/* put comma until idx gets same to the ingredient_names.length */}
                <Typography align="center">
                  {idx === productInfo[0].ingredient_names.length - 1 ? (
                    ''
                  ) : (
                    <Divider
                      className={classes.divider}
                      orientation="vertical"
                    />
                  )}
                </Typography>
              </>
            );
          })}
      </Grid>
      <Grid item xs={12}>
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
  );
};
export default ProductDetail;
