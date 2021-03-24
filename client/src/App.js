import { Route, Switch } from 'react-router-dom';
import './App.css';

import Search from './components/Search';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductCreate from './components/ProductCreate';
import ProductEdit from './components/ProductEdit';
import { ProductsContextProvider } from './context/ProductsContext';

function App() {
  return (
    <ProductsContextProvider>
      <Search />
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route exact path="/products/create" component={ProductCreate} />
        <Route exact path="/products/:id" component={ProductDetail} />
        <Route exact path="/products/:id/edit" component={ProductEdit} />
        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    </ProductsContextProvider>
  );
}

export default App;
