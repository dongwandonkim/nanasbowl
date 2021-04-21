import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import useForm from './hooks/useForm';
import validate from './FormValidation';
import apiCalls from '../apis/apiCalls';
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
  CardMedia,
  Card,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiFormControl-root': {
      width: '100%',
      margin: theme.spacing(1),
    },
  },
  imgContainer: {
    width: '400px',
    height: '400px',
    margin: '24px 0',
  },

  image: {
    height: '100%',
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

  const imageSelectHandler = (e) => {
    setProductImage(e.target.files[0]);
    setProductImageName(e.target.value);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const res = await apiCalls.get('/products/' + id);

        setProductName(res.data[0].product_name);
        setProductType(res.data[0].product_type_id);
        setPetType(res.data[0].pet_type_id);
        setProductDesc(res.data[0].product_description);
        setIngredients(res.data[0].ingredient_names);
        setOriginalImage(res.data[1]);
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

      await apiCalls.put('/products/' + id + '/edit', formData);
      history.push('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmitForm}>
      <Grid container justify="center">
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
          <Card className={classes.imgContainer}>
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
            ) : null}
          </Card>
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
              value={petType ? petType : ''}
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
              value={productType ? productType : ''}
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
  );
};

export default ProductEdit;
