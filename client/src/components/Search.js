import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';

const Search = () => {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState('');

  const { setProductList, setKeyword } = useContext(ProductsContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/search/?keyword=${searchInput}`
      );
      const parsedResult = await res.json();
      setProductList(parsedResult);
    } catch (error) {
      console.error(error.message);
    }
    setSearchInput('');
    setKeyword(searchInput);
  };

  return (
    <div className="container">
      <div className="input-group justify-content-center">
        <div className="form-inline mr-auto">add a product</div>
        <form
          className="form-inline my-5 my-lg-5 mx-3 "
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <input
            className="form-control mr-sm-2"
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
  );
};

export default Search;
