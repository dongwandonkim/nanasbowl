import { Route, Switch } from 'react-router-dom';
import './App.css';

import Search from './components/Search';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductCreate from './components/ProductCreate';
import ProductEdit from './components/ProductEdit';
import Main from './components/Main';

import { ProductsContextProvider } from './context/ProductsContext';
import { CssBaseline, makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appMain: {
    maxWidth: '1280px',
    padding: theme.spacing(3, 3),
  },
}));

function App() {
  const styles = useStyles();
  return (
    <ProductsContextProvider>
      <Search />
      <Container className={styles.appMain}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/products" component={ProductList} />
          <Route exact path="/products/create" component={ProductCreate} />
          <Route exact path="/products/:id" component={ProductDetail} />
          <Route exact path="/products/:id/edit" component={ProductEdit} />
          <Route render={() => <h1>404: page not found</h1>} />
        </Switch>
      </Container>
      <CssBaseline />
    </ProductsContextProvider>
  );
}

export default App;
