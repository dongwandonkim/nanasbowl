import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';

const Search = () => {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState('');
  const [include, setInclude] = useState(true);

  const { setProductList, keyword, setKeyword } = useContext(ProductsContext);

  const onSubmit = (e) => {
    e.preventDefault();
    setKeyword(searchInput);
    history.push('/products');
    getSearchedProduct();
  };

  const getSearchedProduct = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/search/?keyword=${searchInput}&include=${include}`
      );
      const parsedResult = await res.json();

      setProductList(parsedResult);
    } catch (error) {
      console.error(error.message);
    }
    setKeyword(searchInput);
  };

  return (
    <>
      <div className="container">
        <div className="input-group justify-content-center">
          <Link to="/" className="form-inline mx-2">
            Home
          </Link>
          <Link to="/products/create" className="form-inline mr-auto ml-2">
            add product
          </Link>
          <form
            className="form-inline my-5 my-lg-5"
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <input
              className="form-control mr-sm-2 ml-auto search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      {/* <ProductList /> */}
    </>
  );
};

export default Search;
