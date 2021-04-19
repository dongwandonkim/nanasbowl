import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiCalls from '../apis/apiCalls';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Grid,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Typography,
  makeStyles,
  Button,
  CardMedia,
  FormHelperText,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import SaveIcon from '@material-ui/icons/Save';

const schema = yup.object().shape({
  productName: yup.string().required('Product name is required.'),
  productDesc: yup.string().required('Product Description is required'),
  productIngredients: yup
    .string()
    .required('Product Ingredients list is required'),
  // productType: yup.object().shape({
  //   value: yup.string().required('required'),
  //   text: yup.string().required('required'),
  // }),
  petType: yup.string().required('Please select a pet type'),
  productType: yup.string().required('Please select a product type'),
});
const petTypeMenu = [
  { value: `1`, text: 'Dog' },
  { value: `2`, text: 'Cat' },
];
const productTypeMenu = [
  { value: `1`, text: 'Dry' },
  { value: `2`, text: 'Canned' },
  { value: `3`, text: 'Freeze-Dried' },
  { value: `4`, text: 'Raw' },
  { value: `5`, text: 'Treat' },
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

  // const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState(1);
  const [petType, setPetType] = useState(1);
  const [productDesc, setProductDesc] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [parsingError, setParsingError] = useState('');

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

  const onSubmitForm = async (data) => {
    // e.preventDefault();
    // console.log(data);
    parseIngredients(data.productIngredients);

    data.productIngredients = ingredients;
    console.log(ingredients);
    try {
      const body = {
        name: data.productName,
        product_type: data.productType,
        pet_type: data.petType,
        ingredients,
        description: data.productDesc,
      };

      const formData = new FormData();
      formData.append('image', productImage);
      formData.append('image_name', productImageName);
      formData.append('product_info', JSON.stringify(body));

      await apiCalls.post('/products/create', formData);

      // history.push('/');
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmitForm)}>
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
            inputRef={register}
            name="productName"
            variant="standard"
            label="Product Name"
            // value={productName}
            // onChange={(e) => setProductName(e.target.value)}
            helperText={
              errors.productName && (
                <FormHelperText className={classes.errorMsg}>
                  {errors.productName.message}
                </FormHelperText>
              )
            }
          />
          <FormControl>
            <Controller
              control={control}
              name="petType"
              as={
                <>
                  <InputLabel id="pet_type-label">Pet Type</InputLabel>
                  <Select
                    label="Pet Type"
                    labelId="pet_type-label"
                    // value={getValues('petType')}
                    onChange={(e) => setValue('petType', e.target.value)}
                  >
                    {petTypeMenu.map((type) => (
                      <MenuItem value={type.value} key={type.value}>
                        {type.text}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              }
              defaultValue=""
            />
            {errors.petType && (
              <FormHelperText className={classes.errorMsg}>
                {errors.petType.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <Controller
              control={control}
              name="productType"
              as={
                <>
                  <InputLabel id="product_type-label">Product Type</InputLabel>
                  <Select
                    label="Product Type"
                    labelId="product_type-label"
                    onChange={(e) => setValue('productType', e.target.value)}
                  >
                    {productTypeMenu.map((type) => (
                      <MenuItem value={type.value} key={type.value}>
                        {type.text}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              }
              defaultValue=""
            />
            {errors.productType && (
              <FormHelperText className={classes.errorMsg}>
                {errors.productType.message}
              </FormHelperText>
            )}
          </FormControl>
          <TextField
            name="productDesc"
            inputRef={register}
            multiline
            variant="outlined"
            rows={10}
            label="Product Description"
            helperText={
              errors.productDesc && (
                <FormHelperText className={classes.errorMsg}>
                  {errors.productDesc.message}
                </FormHelperText>
              )
            }
          />

          <TextField
            name="productIngredients"
            inputRef={register}
            multiline
            variant="outlined"
            rows={10}
            label="Product Ingredients"
            onChange={(e) => setValue('productIngredients', e.target.value)}
            helperText={
              errors.productIngredients && (
                <FormHelperText className={classes.errorMsg}>
                  {errors.productIngredients.message}
                </FormHelperText>
              )
            }
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
