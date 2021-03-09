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

//product
INSERT INTO product (name, product_type_id, pet_type_id) VALUES ('Acana', 1, 1);


//product_type
INSERT INTO product_type (type) VALUES ('dry');
INSERT INTO product_type (type) VALUES ('canned');
INSERT INTO product_type (type) VALUES ('freeze_dried');
INSERT INTO product_type (type) VALUES ('raw');
INSERT INTO product_type (type) VALUES ('treat');

//pet_type
INSERT INTO pet_type (type) VALUES ('dog');
INSERT INTO pet_type (type) VALUES ('cat');

//ingredient_product
INSERT INTO ingredient_product (ingredient_id, product_id) VALUES (1, 1);
INSERT INTO ingredient_product (ingredient_id, product_id) VALUES (2, 1);
INSERT INTO ingredient_product (ingredient_id, product_id) VALUES (3, 1);
INSERT INTO ingredient_product (ingredient_id, product_id) VALUES (4, 1);
INSERT INTO ingredient_product (ingredient_id, product_id) VALUES (5, 1);
INSERT INTO ingredient_product (ingredient_id, product_id) VALUES (6, 1);
INSERT INTO ingredient_product (ingredient_id, product_id) VALUES (7, 1);



INSERT INTO ingredient (name, type) VALUES ('chicken', 'protein');
INSERT INTO ingredient (name, type) VALUES ('beef', 'protein');
INSERT INTO ingredient (name, type) VALUES ('turkey', 'protein');
INSERT INTO ingredient (name, type) VALUES ('pork', 'protein');
INSERT INTO ingredient (name, type) VALUES ('lamb', 'protein');
INSERT INTO ingredient (name, type) VALUES ('duck', 'protein');
INSERT INTO ingredient (name, type) VALUES ('salmon', 'protein');
INSERT INTO ingredient (name, type) VALUES ('bison', 'protein');