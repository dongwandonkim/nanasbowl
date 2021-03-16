import { useState } from 'react';
const ProductCreate = () => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [petType, setPetType] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const parseIngredients = (text) => {
    let parsedIngredients = [];
    let parsedIngredientsError = '';
    if (!text.trim().length) {
      parsedIngredients = [];
      parsedIngredientsError = '';
      return;
    }

    const list = text.replace(/\n|\r|\*/g, '').split(/\,\s*(?![^\(]*\))/);

    //console.log(list);
    parsedIngredients = [];
    parsedIngredientsError = '';
    for (const ingredient of list) {
      // console.log(ingredient);
      const textPattern = /^([\w\s\-]+)/;
      const errorPattern = /additives/i;
      // console.log(textPattern);
      if (!textPattern.test(ingredient) || errorPattern.test(ingredient)) {
        parsedIngredientsError = `parsing error: ${ingredient}`;
        break;
      } else {
        const polished = ingredient.split(textPattern)[1].toLowerCase().trim();
        if (polished.length) {
          parsedIngredients.push(polished);
        }
      }
    }
    setIngredients(parsedIngredients);
    console.log(parsedIngredients);
  };

  return (
    <div className="container py-3">
      <form>
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
            value={ingredients}
            onChange={(e) => {
              parseIngredients(e.target.value);
            }}
          ></textarea>
          {ingredients}
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Send
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
