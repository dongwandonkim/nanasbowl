const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

//middleware
app.use(cors());
app.use(express.json());

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
app.post('/update', async (req, res) => {
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
    const f = await pool.query(
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
app.get('/products', async (req, res) => {
  try {
    const allProducts = await pool.query(
      'SELECT product.name AS product_name, product_type.type AS product_type, pet_type.type AS pet_type FROM product, product_type, pet_type WHERE product.product_type_id = product_type.id AND product.pet_type_id = pet_type.id'
    );

    res.json(allProducts.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ingredientTable = await pool.query(
      'SELECT product.name, ingredient.name FROM ingredient_product JOIN ingredient ON ingredient_product.ingredient_id = ingredient.id JOIN product ON ingredient_product.product_id = $1',
      [id]
    );
    res.json(ingredientTable);
  } catch (error) {
    console.error(error.message);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
