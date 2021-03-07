const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

//middleware
app.use(cors());
app.use(express.json());

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
    console.log(product_id.rows[0].id);

    // INSERT INTO ingredient if ingredient not exist in table
    const ingredientsToMap = ingredients;
    let ingredients_table = [];
    ingredientsToMap.map(async (item) => {
      await pool.query(
        'INSERT INTO ingredient (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
        [item]
      );
      const ids = await pool.query(
        'SELECT id FROM ingredient WHERE name = $1',
        [item]
      );
      // console.log(ids.rows[0].id);
      ingredients_table.push(ids.rows[0].id);
      // res.json('update completed');
    });
    console.log(ingredients_table);
    res.json(f);
  } catch (error) {
    console.error(error.message);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
