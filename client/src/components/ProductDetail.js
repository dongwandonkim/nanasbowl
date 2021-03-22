import { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';

import './styles/ProductDetail.css';

const baseURL = 'http://localhost:5000/products/';

const ProductDetail = () => {
  const history = useHistory();
  let { id } = useParams();
  const { productInfo, setProductInfo } = useContext(ProductsContext);

  const deleteProduct = async () => {
    try {
      await fetch(baseURL + id, {
        method: 'DELETE',
      });
      history.push('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const productDetail = await fetch(baseURL + id);
        const jsonData = await productDetail.json();
        setProductInfo(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    };
    getProductDetail();
  }, [setProductInfo, id]);

  return (
    <div className="container py-3">
      <h1 className="product-title">
        {productInfo[0] && productInfo[0].product_name}
      </h1>
      <p>{productInfo[0] && productInfo[0].product_description}</p>
      <h4>Ingredients</h4>

      <div className="ingredients-wrapper">
        {productInfo[0] &&
          productInfo[0].ingredient_names.map((ingredient, idx) => {
            return (
              <div className="ingredient mx-1" key={idx}>
                {ingredient}
                {idx !== productInfo[0].ingredient_names.length - 1 ? ',' : '.'}
              </div>
            );
          })}
      </div>

      <button
        className="btn btn-info mx-1"
        onClick={() => history.push(`/products/${id}/edit`)}
      >
        Edit
      </button>
      <button
        className="btn btn-danger mx-1"
        onClick={() => {
          deleteProduct();
        }}
      >
        Delete
      </button>
    </div>
  );
};
export default ProductDetail;
