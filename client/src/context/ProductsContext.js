import { useState, createContext } from 'react';

export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
  const [productInfo, setProductInfo] = useState([]);
  const [productList, setProductList] = useState([]);
  const [showFullList, setShowFullList] = useState(true);
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
        showFullList,
        setShowFullList,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
