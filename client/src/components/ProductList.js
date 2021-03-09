import { useState, useEffect } from 'react';

import ProductCard from './ProductCard';

const ProductList = () => {
  const [lists, setLists] = useState([]);

  const getProductLists = async () => {
    try {
      const productLists = await fetch('http://localhost:5000/products');
      const jsonData = await productLists.json();
      setLists(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getProductLists();
  }, []);
  return (
    <>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {lists.map((data) => {
          return <ProductCard data={data} key={data.product_id} />;
        })}
      </div>
    </>
  );
};

export default ProductList;
