const pool = require('../db');
const fs = require('fs');
const path = require('path');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const { v4: uuidv4 } = require('uuid');
const { uploadImage, getSignedUrl } = require('../s3');

//product_index, product_details, product_create_post, product_delete, product_update

const product_index = async (req, res) => {
  try {
    const response = await pool.query(
      `SELECT 
              product.id AS product_id,
              product.name AS product_name,
              product.created_at AS product_created,
              product.description AS product_desc,
              product_type.type AS product_type,
              product.img_url AS product_img_url,
              pet_type.type AS pet_type
                  FROM product, product_type, pet_type
                    WHERE product.product_type_id = product_type.id
                    AND product.pet_type_id = pet_type.id`
    );

    const result = response.rows.map((data) => {
      if (data.product_img_url == null) return data;
      return getSignedUrl(data.product_img_url).then((res) => {
        data.signedUrl = res;
        return data;
      });
    });

    Promise.all(result).then((result) => {
      res.json(result);
    });
  } catch (error) {
    console.error(error.message);
  }
};

const product_details = async (req, res) => {
  try {
    const { id } = req.params;

    const productDetail = await pool.query(
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
    console.log(productDetail.rows);

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

const product_create_post = async (req, res) => {
  try {
    const parseData = JSON.parse(req.body.product_info);
    // console.log(parseData);
    const {
      name,
      product_type,
      pet_type,
      ingredients,
      description,
    } = parseData;

    const file = req.file;

    const fileStream = fs.createReadStream(file.path);

    const id = uuidv4();
    await uploadImage(`upload/${id}`, fileStream, req.file.mimetype);

    //INSERT INTO product
    await pool.query(
      'INSERT INTO product (name, product_type_id, pet_type_id, description, img_url) VALUES ($1, $2, $3, $4, $5)',
      [name, product_type, pet_type, description, `upload/${id}`]
    );

    //delete upload/imgs after uploading to s3 is complete
    await unlinkFile(file.path);

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
    const response = await pool.query(
      'DELETE FROM product WHERE product.id = $1',
      [id]
    );
    res.status(204).json({
      status: 'success',
      data: {
        product: response.rows[0],
      },
    });
  } catch (error) {
    console.error(error.message);
  }
};

const product_update = async (req, res) => {
  try {
    const parseData = JSON.parse(req.body.product_info);

    const { name, product_type, pet_type, description } = parseData;

    const { id } = req.params;

    let updateProduct;

    if (req.file) {
      const file = req.file;
      const fileStream = fs.createReadStream(file.path);

      const imgId = uuidv4();
      await uploadImage(`upload/${imgId}`, fileStream, req.file.mimetype);

      //delete upload/imgs after uploading to s3 is complete
      await unlinkFile(file.path);

      updateProduct = await pool.query(
        `UPDATE product 
            SET name = $1, product_type_id = $2, 
                pet_type_id = $3, description = $4, 
                img_url = $5 
                WHERE product.id = $6`,
        [name, product_type, pet_type, description, `upload/${imgId}`, id]
      );
    } else {
      updateProduct = await pool.query(
        `UPDATE product 
            SET name = $1, product_type_id = $2, 
                pet_type_id = $3, description = $4  
                WHERE product.id = $5`,
        [name, product_type, pet_type, description, id]
      );
    }

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
