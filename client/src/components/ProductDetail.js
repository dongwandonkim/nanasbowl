import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './styles/ProductDetail.css';

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState([]);

  const getProductDetail = async () => {
    try {
      const productDetail = await fetch(`http://localhost:5000/products/${id}`);
      const jsonData = await productDetail.json();
      setProduct(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <div className="container py-3">
      <h1 className="product-title">{product[0] && product[0].product_name}</h1>
      <p>{product[0] && product[0].product_description}</p>
      <h4>Ingredients</h4>
      <div className="ingredients-wrapper">
        {product.map((data, idx) => {
          return (
            <div className="mx-1" key={idx}>
              {data.ingredient_name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProductDetail;
