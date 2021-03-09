import { Route, Switch } from 'react-router-dom';
import './App.css';

import ProductUpdate from './components/ProductUpdate';
import NavBar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';

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
        <Route exact path="/products/:id">
          <ProductDetail></ProductDetail>
        </Route>
        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    </>
  );
}

export default App;
