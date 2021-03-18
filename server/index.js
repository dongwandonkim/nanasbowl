const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

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
    const { name, product_type, pet_type, ingredients, description } = req.body;

    //INSERT INTO product
    await pool.query(
      'INSERT INTO product (name, product_type_id, pet_type_id, description) VALUES ($1, $2, $3, $4)',
      [name, product_type, pet_type, description]
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
      'SELECT product.id AS product_id, product.name AS product_name, product.created_at AS product_created, product_type.type AS product_type, pet_type.type AS pet_type FROM product, product_type, pet_type WHERE product.product_type_id = product_type.id AND product.pet_type_id = pet_type.id LIMIT 12'
    );

    res.json(allProducts.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a product
//TODO: get product name from product table
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ingredientTable = await pool.query(
      // 'SELECT product.name AS product_name, product.description AS product_description, product.created_at AS product_created, ingredient.name AS ingredient_name FROM product JOIN ingredient_product ON ingredient_product.product_id = product.id JOIN ingredient ON ingredient.id = ingredient_product.ingredient_id WHERE ingredient_product.product_id = $1',
      // [id]
      'SELECT p.name AS product_name, p.product_type_id AS product_type_id, p.pet_type_id AS pet_type_id, p.description AS product_description, p.created_at AS product_created, ARRAY_AGG(i.name) AS ingredient_names FROM product p JOIN ingredient_product ip ON ip.product_id = p.id JOIN ingredient i ON i.id = ip.ingredient_id WHERE p.id = $1 GROUP BY p.id',
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
app.put('/products/:id/edit', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, product_type, pet_type, description } = req.body;
    console.log(req.body);

    const updateProduct = await pool.query(
      'UPDATE product SET name = $1, product_type_id = $2, pet_type_id = $3, description = $4 WHERE product.id = $5',
      [name, product_type, pet_type, description, id]
    );
    res.json(updateProduct);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
