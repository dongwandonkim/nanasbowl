import './styles/Navbar.css';
import { useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';

const NavBar = () => {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState('');

  const { setProductList } = useContext(ProductsContext);

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
    history.push('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Nana's Bowl
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => history.push('/products/create')}
              >
                Create
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
          </ul>
          <form
            className="form-inline my-2 my-lg-0"
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
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
