import { useState, createContext } from 'react';

export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
  const [productInfo, setProductInfo] = useState([]);
  const [productList, setProductList] = useState([]);

  const [keyword, setKeyword] = useState('');
  const [include, setInclude] = useState(true);

  return (
    <ProductsContext.Provider
      value={{
        productInfo,
        setProductInfo,
        productList,
        setProductList,
        keyword,
        setKeyword,
        include,
        setInclude,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
