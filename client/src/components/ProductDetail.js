import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState([]);

  const getProductDetail = async () => {
    try {
      const productDetail = await fetch(`http://localhost:5000/products/${id}`);
      const jsonData = await productDetail.json();
      setProduct(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <div className="container">
      <h3 className="product-title">{product[0] && product[0].product_name}</h3>
      {product.map((data, idx) => {
        return <div key={idx}>{data.ingredient_name}</div>;
      })}
    </div>
  );
};
export default ProductDetail;
