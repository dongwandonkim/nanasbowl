/* database name : nanasbowl */

CREATE TABLE product_type (
  id    BIGSERIAL NOT NULL PRIMARY KEY,
  type  VARCHAR(50) NOT NULL
);



CREATE TABLE pet_type (
  id    BIGSERIAL NOT NULL PRIMARY KEY,
  type  VARCHAR(50) NOT NULL
);



CREATE TABLE ingredient (
   id       BIGSERIAL NOT NULL PRIMARY KEY,
   name     VARCHAR(50) NOT NULL UNIQUE
);



CREATE TABLE ingredient_product (
   id             BIGSERIAL NOT NULL PRIMARY KEY,
   ingredient_id  BIGINT REFERENCES ingredient (id),
   product_id     BIGINT REFERENCES product (id)
);
CREATE TABLE ingredient_product (
   id             BIGSERIAL NOT NULL PRIMARY KEY,
   ingredient_id  BIGINT NOT NULL REFERENCES ingredient (id)
);
ALTER TABLE ingredient_product ADD product_id BIGINT NOT NULL REFERENCES product (id);

CREATE TABLE ingredient_product (
  ingredient_id INT REFERENCES ingredient (id) ON DELETE CASCADE,
  product_id INT FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE,
  CONSTRAINT ingredient_product_pkey PRIMARY KEY (ingredient_id, product_id)
);
CREATE TABLE ingredient_product (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  ingredient_id INT REFERENCES ingredient (id),
  product_id INT,
   CONSTRAINT product_id_fK
   FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE
);
   



-- CREATE TABLE product (
--    id                     BIGSERIAL NOT NULL PRIMARY KEY,
--    name                   VARCHAR(100) NOT NULL,
--    product_type_id        BIGINT NOT NULL REFERENCES product_type(id),
--    pet_type_id            BIGINT NOT NULL REFERENCES pet_type(id),
--    ingredient_product_id  BIGINT NOT NULL REFERENCES ingredient_product(id) ON DELETE CASCADE
-- );

CREATE TABLE product (
   id                     BIGSERIAL NOT NULL PRIMARY KEY,
   name                   VARCHAR(100) NOT NULL,
   product_type_id        BIGINT NOT NULL REFERENCES product_type(id),
   pet_type_id            BIGINT NOT NULL REFERENCES pet_type(id)
);

// #1 search keyword
SELECT * FROM ingredient WHERE name LIKE '%keyword%';
//
SELECT product_id FROM ingredient_product WHERE ingredient_id = value from #1;
//
SELECT product.id, product.name, product_type.type, product.created_at FROM product, product_type WHERE product.id = value AND product.product_type_id = product_type.id;


//final
SELECT DISTINCT product.name AS product_name, pet_type.type AS pet_type, product_type.type AS product_type 
   FROM product 
   JOIN pet_type ON pet_type.id = product.pet_type_id 
   JOIN product_type ON product_type.id = product.product_type_id 
   JOIN ingredient_product ON ingredient_product.product_id = product.id 
   JOIN ingredient ON ingredient_product.ingredient_id = ingredient.id 
   WHERE ingredient.name ILIKE $1

//final keyword included
SELECT p.name AS product_name 
FROM product p
WHERE EXISTS (SELECT *
              FROM ingredient_product ip 
                JOIN ingredient i ON ip.ingredient_id = i.id 
              WHERE ip.product_id = p.id
                AND i.name ILIKE $1)

//get everything without keyword
SELECT product.name
FROM product
WHERE NOT EXISTS (SELECT * 
                  FROM ingredient_product
                  JOIN ingredient ON ingredient_product.ingredient_id = ingredient.id
                  WHERE ingredient_product.product_id = product.id
                  and ingredient.name ILIKE $1)