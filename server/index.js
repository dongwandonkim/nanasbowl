const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pool = require('./db');

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

//root
app.get('/', (req, res) => {
  res.send('sites up');
});

/* create PRODUCT
{
    "name" : "acana",
    "product_type" : "dry",
    "pet_type" : "dog",
    "ingredients" : ["chicken", "beef", "turkey", "lamb"]
}
*/
app.post('/products/create', async (req, res) => {
  try {
    const { name, product_type, pet_type, ingredients } = req.body;

    //get matching product_type_id
    const product_type_id = await pool.query(
      'SELECT id FROM product_type WHERE type = $1',
      [product_type]
    );

    //get matching pet_type_id
    const pet_type_id = await pool.query(
      'SELECT id FROM pet_type WHERE type = $1',
      [pet_type]
    );

    //INSERT INTO product
    await pool.query(
      'INSERT INTO product (name, product_type_id, pet_type_id) VALUES ($1, $2, $3)',
      [name, product_type_id.rows[0].id, pet_type_id.rows[0].id]
    );

    //get saved product_id
    const product_id = await pool.query(
      'SELECT id FROM product WHERE name = $1',
      [name]
    );

    // INSERT INTO ingredient if ingredient not exist in table
    const ingredientsToMap = ingredients;

    ingredientsToMap.map(async (item) => {
      await pool.query(
        'INSERT INTO ingredient (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
        [item]
      );

      //get ids from ingredient
      const ids = await pool.query(
        'SELECT id FROM ingredient WHERE name = $1',
        [item]
      );
      //INSERT INTO JUNCTION TABLE
      await pool.query(
        'INSERT INTO ingredient_product (ingredient_id, product_id) VALUES ($1, $2)',
        [ids.rows[0].id, product_id.rows[0].id]
      );
    });

    res.json('updated');
  } catch (error) {
    console.error(error.message);
  }
});

//READ all products
//TODO: sort by date, alphabet
app.get('/products', async (req, res) => {
  try {
    const allProducts = await pool.query(
      'SELECT product.id AS product_id, product.name AS product_name, product_type.type AS product_type, pet_type.type AS pet_type FROM product, product_type, pet_type WHERE product.product_type_id = product_type.id AND product.pet_type_id = pet_type.id'
    );
    console.log(allProducts.rows);
    res.json(allProducts.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a product
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ingredientTable = await pool.query(
      'SELECT product.name, ingredient.name FROM product JOIN ingredient_product ON ingredient_product.product_id = product.id JOIN ingredient ON ingredient.id = ingredient_product.ingredient_id WHERE ingredient_product.product_id = $1',
      [id]
    );
    res.json(ingredientTable.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//DELETE a product
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await pool.query(
      'DELETE FROM product WHERE product.id = $1',
      [id]
    );
    res.json(`Product id:${id} was deleted successfully`);
  } catch (error) {
    console.error(error.message);
  }
});

/* UPDATE a product 
{
    "name" : "acana",
    "product_type" : "dry",
    "pet_type" : "dog",
    "ingredients" : ["chicken", "beef", "turkey", "lamb"]
}
TODO: see what is better solution for updating ingredients. (make new product / update-able?)
*/
app.put('/products/:id/', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, product_type, pet_type, ingredients } = req.body;

    //get matching product_type_id
    const product_type_id = await pool.query(
      'SELECT id FROM product_type WHERE type = $1',
      [product_type]
    );

    //get matching pet_type_id
    const pet_type_id = await pool.query(
      'SELECT id FROM pet_type WHERE type = $1',
      [pet_type]
    );

    const updateProduct = await pool.query(
      'UPDATE product SET name = $1, product_type_id = $2, pet_type_id = $3 WHERE product.id = $4',
      [name, product_type_id.rows[0].id, pet_type_id.rows[0].id, id]
    );
    res.json(updateProduct);
  } catch (error) {
    console.error(error.message);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
