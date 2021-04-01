import { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import { Button, ButtonGroup } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

import './styles/ProductDetail.css';

const baseURL = 'http://localhost:5000/products/';

const ProductDetail = () => {
  const history = useHistory();
  let { id } = useParams();
  const { productInfo, setProductInfo, keyword } = useContext(ProductsContext);

  const deleteProduct = async () => {
    try {
      await fetch(baseURL + id, {
        method: 'DELETE',
      });
      history.push('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const productDetail = await fetch(baseURL + id);
        const jsonData = await productDetail.json();
        setProductInfo(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    };
    getProductDetail();
  }, [setProductInfo, id, keyword]);

  return (
    <>
      {productInfo[1] && (
        <img className="product-image" src={productInfo[1]} alt="" />
      )}
      <h1 className="product-title">
        {productInfo[0] && productInfo[0].product_name}
      </h1>
      <p>{productInfo[0] && productInfo[0].product_description}</p>
      <h4>Ingredients</h4>

      <div className="ingredients-wrapper">
        {productInfo[0] &&
          productInfo[0].ingredient_names.map((ingredient, idx) => {
            return (
              <>
                {ingredient.includes(keyword) && keyword ? (
                  <div
                    className="ingredient"
                    style={{
                      backgroundColor: 'pink',
                      borderRadius: '3px',
                      padding: '2px',
                    }}
                    key={idx}
                  >
                    {ingredient}
                  </div>
                ) : (
                  <div className="ingredient" key={idx}>
                    {ingredient}
                  </div>
                )}

                {/* put comma until idx gets same to the ingredient_names.length */}
                {idx === productInfo[0].ingredient_names.length - 1 ? '.' : ','}
              </>
            );
          })}
      </div>
      <ButtonGroup variant="contained">
        <Button
          startIcon={<SaveIcon />}
          color="primary"
          onClick={() => history.push(`/products/${id}/edit`)}
        >
          Edit
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          color="secondary"
          onClick={() => {
            deleteProduct();
          }}
        >
          Delete
        </Button>
      </ButtonGroup>
    </>
  );
};
export default ProductDetail;
