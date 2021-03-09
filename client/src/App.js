import './App.css';

import ProductUpdate from './components/ProductUpdate';
import NavBar from './components/Navbar';
import ProductList from './components/ProductList';

function App() {
  return (
    <>
      <NavBar />
      <main>
        <div class="container py-5">
          <ProductList />
        </div>
      </main>
    </>
  );
}

export default App;
