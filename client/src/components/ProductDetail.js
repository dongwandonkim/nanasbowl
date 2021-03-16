import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './styles/ProductDetail.css';

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const productDetail = await fetch(
          `http://localhost:5000/products/${id}`
        );
        const jsonData = await productDetail.json();
        setProduct(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    };

    getProductDetail();
  }, [id]);

  return (
    <div className="container py-3">
      <h1 className="product-title">{product[0] && product[0].product_name}</h1>
      <p>{product[0] && product[0].product_description}</p>
      <h4>Ingredients</h4>
      <div className="ingredients-wrapper">
        {product.map((data, idx) => {
          return (
            <>
              {data.ingredient_names.map((ingredient, idx) => {
                return (
                  <div className="ingredient mx-1" key={idx}>
                    {ingredient}
                    {idx !== data.ingredient_names.length - 1 ? ',' : '.'}
                  </div>
                );
              })}
            </>
          );
        })}
      </div>
      <button className="btn btn-info mx-1">Edit</button>
      <button className="btn btn-danger mx-1">Delete</button>
    </div>
  );
};
export default ProductDetail;
