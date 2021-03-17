import { useState, createContext } from 'react';

export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
  const [productInfo, setProductInfo] = useState([]);

  return (
    <ProductsContext.Provider value={{ productInfo, setProductInfo }}>
      {props.children}
    </ProductsContext.Provider>
  );
};
