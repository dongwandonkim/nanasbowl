import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            Nana's Bowl
          </a>
          <form className="form-inline">
            <div className="btn-group mx-3">
              <button className="btn btn-outline-success" type="button">
                My Dog
              </button>
              <button className="btn btn-outline-success" type="button">
                My Cat
              </button>
            </div>
            <h3>want</h3>
            <input
              className="form-control mx-3"
              type="search"
              placeholder="Ingredients here..."
              aria-label="Search"
            />

            <div className="btn-group mx-3">
              <button className="btn btn-outline-warning" type="button">
                Included
              </button>
              <button className="btn btn-outline-warning" type="button">
                Excluded
              </button>
            </div>
            <button
              className="btn btn-outline-primary my-2 my-sm-0"
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
