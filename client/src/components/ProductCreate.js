import { useState } from 'react';
const ProductCreate = () => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('dry');
  const [petType, setPetType] = useState('dog');
  const [productDesc, setProductDesc] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [parsingError, setParsingError] = useState('');

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

      const res = await fetch('http://localhost:5000/products/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      window.location = '/';
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="container py-3">
      <form onSubmit={(e) => onSubmitForm(e)}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="product-name">
            Product Name
          </label>
          <input
            type="text"
            id="product-name"
            className="form-control"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
          {productName}
        </div>
        <div className="form-row">
          <div className="col">
            <label className="form-label" htmlFor="pet-type">
              Pet Type
            </label>
            <select
              className="form-select form-control mb-4"
              id="pet-type"
              // defaultValue={'dog'}
              value={petType}
              onChange={(e) => {
                setPetType(e.target.value);
              }}
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </div>
          <div className="col">
            <label className="form-label" htmlFor="product-type">
              Product Type
            </label>
            <select
              className="form-select form-control mb-4"
              id="product-type"
              value={productType}
              onChange={(e) => {
                setProductType(e.target.value);
              }}
            >
              <option value="dry">Dry Food</option>
              <option value="canned">Canned Food</option>
              <option value="freeze_dried">Freeze-Dried Food</option>
              <option value="raw">Raw Food</option>
              <option value="treat">Treat</option>
            </select>
          </div>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="product-desc">
            Product Description
          </label>
          <textarea
            className="form-control"
            id="product-desc"
            rows="4"
            value={productDesc}
            onChange={(e) => {
              setProductDesc(e.target.value);
            }}
          ></textarea>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="ingredients">
            Ingredients
          </label>
          <textarea
            className="form-control"
            id="ingredients"
            rows="4"
            // value={ingredients}
            onChange={(e) => {
              parseIngredients(e.target.value);
              // setIngredients(e.target.value);
            }}
          ></textarea>
          {parsingError}
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Send
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
