import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import {
  Grid,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
  makeStyles,
  Button,
  Container,
  CardMedia,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiFormControl-root': {
      width: '100%',
      margin: theme.spacing(1),
    },
  },
  image: {
    width: '200px',
    height: '200px',
  },
}));

const ProductEdit = () => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState();
  const [petType, setPetType] = useState();
  const [productDesc, setProductDesc] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [productImageName, setProductImageName] = useState('');

  const classes = useStyles();

  let { id } = useParams();
  const history = useHistory();
  const baseURL = 'http://localhost:5000/products/';

  const imageSelectHandler = (e) => {
    setProductImage(e.target.files[0]);
    setProductImageName(e.target.value);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const productDetail = await fetch(baseURL + id);
        const jsonData = await productDetail.json();
        setProductName(jsonData[0].product_name);
        setProductType(jsonData[0].product_type_id);
        setPetType(jsonData[0].pet_type_id);
        setProductDesc(jsonData[0].product_description);
        setIngredients(jsonData[0].ingredient_names);
        setOriginalImage(jsonData[1]);
      } catch (error) {
        console.error(error.message);
      }
    };
    getProductDetail();
  }, [id]);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = {
        name: productName,
        product_type: productType,
        pet_type: petType,
        description: productDesc,
      };
      let formData = new FormData();
      if (productImage !== null) {
        formData.append('image', productImage);
        formData.append('image_name', productImageName);
      }
      formData.append('product_info', JSON.stringify(body));

      await fetch(baseURL + id + '/edit', {
        method: 'PUT',
        body: formData,
      });

      history.push('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <form className={classes.form} onSubmit={onSubmitForm}>
          <Grid container>
            <Grid item xs={6}>
              <Button
                variant="contained"
                component="label"
                startIcon={<ImageIcon />}
                color="primary"
              >
                Upload Image
                <input
                  type="file"
                  file={productImage}
                  value={productImageName}
                  onChange={(e) => imageSelectHandler(e)}
                  style={{ display: 'none' }}
                />
              </Button>

              {originalImage || previewImage ? (
                previewImage ? (
                  <CardMedia
                    className={classes.image}
                    image={previewImage}
                    alt="preview"
                  ></CardMedia>
                ) : (
                  <CardMedia
                    className={classes.image}
                    image={originalImage}
                  ></CardMedia>
                )
              ) : (
                <CircularProgress />
              )}
              <TextField
                variant="standard"
                label="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <FormControl>
                <InputLabel id="pet_type-label">Pet Type</InputLabel>
                <Select
                  labelId="pet_type-label"
                  label="Pet Type"
                  value={petType}
                  defaultValue=""
                  onChange={(e) => {
                    setPetType(e.target.value);
                  }}
                >
                  <MenuItem value="1">Dog</MenuItem>
                  <MenuItem value="2">Cat</MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <FormControl>
                <InputLabel id="product_type-label">Product Type</InputLabel>
                <Select
                  labelId="product_type-label"
                  label="Product Type"
                  value={productType}
                  defaultValue=""
                  onChange={(e) => {
                    setProductType(e.target.value);
                  }}
                >
                  <MenuItem value={`1`}>Dry</MenuItem>
                  <MenuItem value={`2`}>Canned</MenuItem>
                  <MenuItem value={`3`}>Freeze-Dried</MenuItem>
                  <MenuItem value={`4`}>Raw</MenuItem>
                  <MenuItem value={`5`}>Treat</MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <TextField
                multiline
                variant="outlined"
                rows={12}
                label="Product Description"
                value={productDesc}
                onChange={(e) => {
                  setProductDesc(e.target.value);
                }}
              />
              <TextField
                multiline
                variant="outlined"
                rows={12}
                label="Product Ingredients"
                value={ingredients}
                disabled
              />

              <FormControl>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  startIcon={<SaveIcon />}
                >
                  Create
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default ProductEdit;
