import { useState, createContext } from 'react';

export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
  const [productInfo, setProductInfo] = useState([]);
  const [productList, setProductList] = useState([]);
  const [keyword, setKeyword] = useState('');

  return (
    <ProductsContext.Provider
      value={{
        productInfo,
        setProductInfo,
        productList,
        setProductList,
        keyword,
        setKeyword,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
