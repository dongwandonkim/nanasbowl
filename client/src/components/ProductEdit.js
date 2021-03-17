import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { ProductsContext } from '../context/ProductsContext';

const ProductEdit = () => {
  const products = useContext(ProductsContext);
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState();
  const [petType, setPetType] = useState();
  const [productDesc, setProductDesc] = useState('');
  const [ingredients, setIngredients] = useState([]);

  let { id } = useParams();
  const baseURL = 'http://localhost:5000/products/';

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const productDetail = await fetch(baseURL + id);
        const jsonData = await productDetail.json();
        console.log(jsonData);
        setProductName(jsonData[0].product_name);
        setProductType(jsonData[0].product_type_id);
        setPetType(jsonData[0].pet_type_id);
        setProductDesc(jsonData[0].product_description);
        setIngredients(jsonData[0].ingredient_names);
      } catch (error) {
        console.error(error.message);
      }
    };
    getProductDetail();
  }, [id]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name: productName,
        product_type: productType,
        pet_type: petType,
        description: productDesc,
      };

      await fetch(`http://localhost:5000/products/${id}/edit`, {
        method: 'PUT',
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
      <form
        onSubmit={(e) => {
          onSubmitForm(e);
        }}
      >
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
        </div>
        <div className="form-row">
          <div className="col">
            <label className="form-label" htmlFor="pet-type">
              Pet Type
            </label>
            <select
              className="form-select form-control mb-4"
              id="pet-type"
              value={petType ? petType : '1'}
              onChange={(e) => {
                setPetType(e.target.value);
              }}
            >
              <option value="1">Dog</option>
              <option value="2">Cat</option>
            </select>
          </div>
          <div className="col">
            <label className="form-label" htmlFor="product-type">
              Product Type
            </label>
            <select
              className="form-select form-control mb-4"
              id="product-type"
              value={productType ? productType : '1'}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="1">Dry Food</option>
              <option value="2">Canned Food</option>
              <option value="3">Freeze-Dried Food</option>
              <option value="4">Raw Food</option>
              <option value="5">Treat</option>
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
            value={productDesc !== null ? productDesc : 'update description'}
            onChange={(e) => setProductDesc(e.target.value)}
          ></textarea>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="ingredients">
            Ingredients
          </label>
          <textarea
            className="form-control"
            id="ingredients"
            rows="6"
            value={
              ingredients !== null
                ? ingredients
                : "you can't update ingredients"
            }
            disabled={true}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Send
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
