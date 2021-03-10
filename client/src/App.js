import { Route, Switch } from 'react-router-dom';
import './App.css';

import NavBar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductCreate from './components/ProductCreate';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <div class="container py-3">
            <ProductList />
          </div>
        </Route>
        <Route exact path="/products/create">
          <div className="container py-3">
            <ProductCreate></ProductCreate>
          </div>
        </Route>
        <Route exact path="/products/:id">
          <ProductDetail></ProductDetail>
        </Route>

        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    </>
  );
}

export default App;
