import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiCalls from '../apis/apiCalls';
import useForm from './hooks/useForm';
import validate from './FormValidation';

import {
  Grid,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  makeStyles,
  Button,
  CardMedia,
  FormHelperText,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import SaveIcon from '@material-ui/icons/Save';

const petTypeMenu = [
  { value: '1', text: 'Dog' },
  { value: '2', text: 'Cat' },
];
const productTypeMenu = [
  { value: '1', text: 'Dry' },
  { value: '2', text: 'Canned' },
  { value: '3', text: 'Freeze-Dried' },
  { value: '4', text: 'Raw' },
  { value: '5', text: 'Treat' },
];

const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiFormControl-root': {
      width: '100%',
      margin: theme.spacing(1),
    },
  },
  preview: {
    width: '200px',
    height: '200px',
  },
  errorMsg: {
    color: 'red',
    margin: '0',
    // padding: '0',
  },
}));

const ProductCreate = () => {
  const history = useHistory();
  const classes = useStyles();

  const { handleChange, handleSubmit, values, errors } = useForm(validate);

  const [ingredients, setIngredients] = useState([]);
  const [parsingError, setParsingError] = useState('');

  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productType, setProductType] = useState('1');
  const [petType, setPetType] = useState('1');
  const [productImage, setProductImage] = useState(null);
  const [productImageName, setProductImageName] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const imageSelectHandler = (e) => {
    setProductImage(e.target.files[0]);
    setProductImageName(e.target.value);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const parseIngredients = (text) => {
    let parsedIngredients = [];

    if (!text.trim().length) {
      parsedIngredients = [];
      setParsingError('');
      // return;
    }

    const list = text.replace(/\n|\r|\*/g, '').split(/\,\s*(?![^\(]*\))/);

    parsedIngredients = [];
    setParsingError('');
    for (const ingredient of list) {
      const textPattern = /^([\w\s\-]+)/;
      const errorPattern = /additives/i;

      if (!textPattern.test(ingredient) || errorPattern.test(ingredient)) {
        setParsingError(`parsing error: ${ingredient}`);
        break;
      } else {
        const polished = ingredient.split(textPattern)[1].toLowerCase().trim();
        if (polished.length) {
          parsedIngredients.push(polished);
        }
      }
    }
    setIngredients(parsedIngredients);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    // console.log(data);

    try {
      const body = {
        name: productName,
        product_type: productType,
        pet_type: petType,
        ingredients,
        description: productDesc,
      };

      const formData = new FormData();
      formData.append('image', productImage);
      formData.append('image_name', productImageName);
      formData.append('product_info', JSON.stringify(body));

      await apiCalls.post('/products/create', formData);

      history.push('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
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
          {previewImage && (
            <CardMedia
              className={classes.preview}
              image={previewImage}
              alt="preview"
            ></CardMedia>
          )}

          <TextField
            name="productName"
            variant="standard"
            label="Product Name"
            // value={productName}
            // onChange={(e) => setProductName(e.target.value)}
            value={values.productName}
            onChange={handleChange}
            helperText={errors.productName && errors.productName}
          />
          <FormControl>
            <InputLabel id="pet_type-label">Pet Type</InputLabel>
            <Select
              name="petType"
              label="Pet Type"
              labelId="pet_type-label"
              // defaultValue={petType}
              // value={petType}
              // onChange={(e) => setPetType(e.target.value)}
              defaultValue={values.petType}
              value={values.petType}
              onChange={handleChange}
            >
              {petTypeMenu.map((type) => (
                <MenuItem value={type.value} key={type.value}>
                  {type.text}
                </MenuItem>
              ))}
            </Select>
            {errors.petType && (
              <FormHelperText>{errors.petType}</FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <InputLabel id="product_type-label">Product Type</InputLabel>
            <Select
              name="productType"
              label="Product Type"
              labelId="product_type-label"
              // defaultValue={productType}
              // value={productType}
              // onChange={(e) => setProductType(e.target.value)}
              defaultValue={values.productType}
              value={values.productType}
              onChange={handleChange}
            >
              {productTypeMenu.map((type) => (
                <MenuItem value={type.value} key={type.value}>
                  {type.text}
                </MenuItem>
              ))}
            </Select>
            {errors.productType && (
              <FormHelperText>{errors.productType}</FormHelperText>
            )}
          </FormControl>
          <TextField
            name="productDesc"
            multiline
            variant="outlined"
            rows={10}
            label="Product Description"
            // value={productDesc}
            // onChange={(e) => setProductDesc(e.target.value)}

            value={values.productDesc}
            onChange={handleChange}
            helperText={errors.productDesc && errors.productDesc}
          />

          <TextField
            name="productIngredients"
            multiline
            variant="outlined"
            rows={10}
            label="Product Ingredients"
            // onChange={(e) => parseIngredients(e.target.value)}
            value={values.productIngredients}
            onChange={handleChange}
            helperText={errors.productIngredients && errors.productIngredients}
          />
          {parsingError && parsingError}
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

export default ProductCreate;
