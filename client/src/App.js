import { Route, Switch } from 'react-router-dom';
import './App.css';

import Search from './components/Search';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductCreate from './components/ProductCreate';
import ProductEdit from './components/ProductEdit';
import Main from './components/Main';
import SideMenu from './components/SideMenu';

import { ProductsContextProvider } from './context/ProductsContext';
import { CssBaseline, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%',
  },
});

function App() {
  const styles = useStyles();
  return (
    <ProductsContextProvider>
      <SideMenu />
      <div className={styles.appMain}>
        <Search />
      </div>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/products" component={ProductList} />
          <Route exact path="/products/create" component={ProductCreate} />
          <Route exact path="/products/:id" component={ProductDetail} />
          <Route exact path="/products/:id/edit" component={ProductEdit} />
          <Route render={() => <h1>404: page not found</h1>} />
        </Switch>
      </div>
      <CssBaseline />
    </ProductsContextProvider>
  );
}

export default App;
