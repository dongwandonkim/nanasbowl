import { useEffect, useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { productList, setProductList } = useContext(ProductsContext);

  const getAllProductLists = async () => {
    try {
      const productLists = await fetch('http://localhost:5000/products');
      const jsonData = await productLists.json();
      setProductList(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const test = document.querySelector('.search-input').value;

    if (test.length <= 0) {
      getAllProductLists();
    }
  }, []);

  return (
    <>
      <div className="container py-3">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {productList.map((data) => {
            return <ProductCard data={data} key={data.product_id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ProductList;
