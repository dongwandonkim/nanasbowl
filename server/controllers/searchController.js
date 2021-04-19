const pool = require('../db');
const { getSignedUrl } = require('../s3');

const search_product = async (req, res) => {
  try {
    let { keyword, include } = req.query;

    if (keyword.length <= 0) include = 'true'; //if keyword is empty query all product list
    console.log(keyword);
    let response;
    if (include === 'true') {
      response = await pool.query(
        `SELECT DISTINCT product.id AS product_id, 
                          product.name AS product_name, 
                          pet_type.type AS pet_type, 
                          product_type.type AS product_type, 
                          product.img_url AS product_img_url,
                          product.description AS product_desc
                          FROM product 
                          JOIN pet_type ON pet_type.id = product.pet_type_id 
                          JOIN product_type ON product_type.id = product.product_type_id 
                          JOIN ingredient_product ON ingredient_product.product_id = product.id 
                          JOIN ingredient ON ingredient_product.ingredient_id = ingredient.id 
                          WHERE ingredient.name ILIKE $1`,
        [`%${keyword}%`]
      );
    } else {
      response = await pool.query(
        `SELECT DISTINCT
                        product.id AS product_id,
                        product.name AS product_name,
                        pet_type.type AS pet_type,
                        product_type.type AS product_type,
                        product.img_url AS product_img_url
                              FROM product 
                              JOIN pet_type ON pet_type.id = product.pet_type_id
                              JOIN product_type ON product_type.id = product.product_type_id
                              WHERE NOT EXISTS 
                                          (SELECT * FROM ingredient_product 
                                            JOIN ingredient ON ingredient_product.ingredient_id = ingredient.id 
                                            
                                            WHERE ingredient_product.product_id = product.id and ingredient.name 
                                            ILIKE $1)`,
        [`%${keyword}%`]
      );
    }

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

module.exports = {
  search_product,
};
