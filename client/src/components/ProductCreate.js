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
    margin: theme.spacing(2, 0),
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

  const {
    handleChange,
    handleSubmit,
    handleImageChange,
    parsedIngredients,
    values,
    errors,
  } = useForm(onSubmit, validate);

  async function onSubmit() {
    try {
      const body = {
        name: values.productName,
        product_type: values.productType,
        pet_type: values.petType,
        ingredients: parsedIngredients,
        description: values.productDesc,
      };

      const formData = new FormData();
      formData.append('image', values.productImage[0]);
      formData.append('product_info', JSON.stringify(body));

      await apiCalls.post('/products/create', formData);

      history.push('/');
    } catch (error) {
      console.error(error.message);
    }
  }

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
              name="productImage"
              type="file"
              file={values.productImage}
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </Button>
          {values.productImage[1] && (
            <CardMedia
              className={classes.preview}
              image={values.productImage[1]}
              alt="preview"
            ></CardMedia>
          )}
          {errors.productImage && (
            <FormHelperText style={{ color: 'red' }}>
              {errors.productImage}
            </FormHelperText>
          )}

          <TextField
            name="productName"
            variant="standard"
            label="Product Name"
            value={values.productName}
            onChange={handleChange}
            // helperText={errors.productName && errors.productName}
            {...(errors.productName && {
              error: true,
              helperText: errors.productName,
            })}
          />
          <FormControl {...(errors.petType && { error: true })}>
            <InputLabel id="pet_type-label">Pet Type</InputLabel>
            <Select
              name="petType"
              label="Pet Type"
              labelId="pet_type-label"
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
          <FormControl {...(errors.productType && { error: true })}>
            <InputLabel id="product_type-label">Product Type</InputLabel>
            <Select
              name="productType"
              label="Product Type"
              labelId="product_type-label"
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
            value={values.productDesc}
            onChange={handleChange}
            {...(errors.productDesc && {
              error: true,
              helperText: errors.productDesc,
            })}
          />

          <TextField
            name="productIngredients"
            multiline
            variant="outlined"
            rows={10}
            label="Product Ingredients"
            value={values.productIngredients}
            onChange={handleChange}
            {...(errors.productIngredients && {
              error: true,
              helperText: errors.productIngredients,
            })}
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

export default ProductCreate;
