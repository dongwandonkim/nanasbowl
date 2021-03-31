import { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  Paper,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
      margin: theme.spacing(1),
    },
  },
}));

const ProductCreate = () => {
  const history = useHistory();
  const classes = useStyles();

  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState(1);
  const [petType, setPetType] = useState(1);
  const [productDesc, setProductDesc] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [parsingError, setParsingError] = useState('');

  const [productImage, setProductImage] = useState(null);
  const [productImageName, setProductImageName] = useState('');

  const imageSelectHandler = (e) => {
    // console.log(e.target.files[0]);
    setProductImage(e.target.files[0]);
    setProductImageName(e.target.value);
    console.log(productImage);
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

      await fetch('http://localhost:5000/products/create', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // headers: { 'Content-Type': 'multipart/form-data' },
        // body: JSON.stringify(body),
        body: formData,
      });

      history.push('/');
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Paper>
      <form className={classes.root} onSubmit={onSubmitForm}>
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
            <TextField
              variant="standard"
              label="Product Name"
              onChange={(e) => setProductName(e.target.value)}
            />
            <FormControl>
              <InputLabel id="pet_type-label">Pet Type</InputLabel>
              <Select
                labelId="pet_type-label"
                label="Pet Type"
                value={petType}
                onChange={(e) => {
                  setPetType(e.target.value);
                }}
              >
                <MenuItem value={`1`}>Dog</MenuItem>
                <MenuItem value={`2`}>Cat</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel id="product_type-label">Product Type</InputLabel>
              <Select
                labelId="product_type-label"
                label="Product Type"
                value={productType}
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
              onChange={(e) => {
                parseIngredients(e.target.value);
              }}
            />
            {parsingError}
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
          <item xs={6}></item>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProductCreate;
