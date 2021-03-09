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
      console.log(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <>
      <div className="">product detail</div>
    </>
  );
};
export default ProductDetail;
