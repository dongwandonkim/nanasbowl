const pool = require('../db');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { uploadImage, getSignedUrl } = require('../s3');

//product_index, product_details, product_create_post, product_delete, product_update

const product_index = async (req, res) => {
  try {
    const allProducts = await pool.query(
      `SELECT product.id AS product_id, 
              product.name AS product_name, 
              product.created_at AS product_created, 
              product_type.type AS product_type, 
              pet_type.type AS pet_type FROM product, 
              product_type, pet_type 
                    WHERE product.product_type_id = product_type.id 
                    AND product.pet_type_id = pet_type.id LIMIT 12`
    );

    res.json(allProducts.rows);
  } catch (error) {
    console.error(error.message);
  }
};

const product_details = async (req, res) => {
  try {
    const { id } = req.params;

    const productDetail = await pool.query(
      // 'SELECT product.name AS product_name, product.description AS product_description, product.created_at AS product_created, ingredient.name AS ingredient_name FROM product JOIN ingredient_product ON ingredient_product.product_id = product.id JOIN ingredient ON ingredient.id = ingredient_product.ingredient_id WHERE ingredient_product.product_id = $1',
      // [id]
      `SELECT p.name AS product_name, 
              p.product_type_id AS product_type_id, 
              p.pet_type_id AS pet_type_id, 
              p.description AS product_description, 
              p.img_url AS product_img_url,
              p.created_at AS product_created,
              ARRAY_AGG(i.name) AS ingredient_names FROM product p 
              JOIN ingredient_product ip ON ip.product_id = p.id 
              JOIN ingredient i ON i.id = ip.ingredient_id 
                    WHERE p.id = $1 GROUP BY p.id`,
      [id]
    );

    if (productDetail.rows[0].product_img_url) {
      const getImageFromS3 = await getSignedUrl(
        productDetail.rows[0].product_img_url
      );

      const newData = [...productDetail.rows, getImageFromS3];
      res.json(newData);
    } else {
      res.json(productDetail.rows);
    }
  } catch (error) {
    console.error(error.message);
  }
};

// json.stringify(body)
// {
//   name: '222222',
//   product_type: 1,
//   pet_type: 1,
//   ingredients: [ '222', '222234', '423124', '6657656' ],
//   description: '22222'
// }

const product_create_post = async (req, res) => {
  try {
    // const { name, product_type, pet_type, ingredients, description } = req.body;

    const parseData = JSON.parse(req.body.product_info);

    const {
      name,
      product_type,
      pet_type,
      ingredients,
      description,
    } = parseData;

    const file = req.file;
    const fileBuffer = fs.createReadStream(file.path);

    const id = uuidv4();
    const resFromS3 = await Promise.all([
      uploadImage(`upload/${id}`, fileBuffer, req.file.mimetype),
    ]);

    // const resS3 = await uploadImage(file);
    console.log(resFromS3);

    //INSERT INTO product
    await pool.query(
      'INSERT INTO product (name, product_type_id, pet_type_id, description, img_url) VALUES ($1, $2, $3, $4, $5)',
      [name, product_type, pet_type, description, `upload/${id}`]
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

    res.status(201).json('post success');
  } catch (error) {
    console.error(error.message);
  }
};

const product_delete = async (req, res) => {
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
};

const product_update = async (req, res) => {
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
};

module.exports = {
  product_index,
  product_details,
  product_create_post,
  product_delete,
  product_update,
};
