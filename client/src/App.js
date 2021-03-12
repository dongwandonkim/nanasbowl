import { Route, Switch } from 'react-router-dom';
import './App.css';

import NavBar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductCreate from './components/ProductCreate';
import { ProductsContextProvider } from './context/ProductsContext';

function App() {
  return (
    <ProductsContextProvider>
      <NavBar />
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route exact path="/products/create" component={ProductCreate} />
        <Route exact path="/products/:id" component={ProductDetail} />
        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    </ProductsContextProvider>
  );
}

export default App;
