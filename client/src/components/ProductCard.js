import { useHistory } from 'react-router-dom';
import './styles/ProductCard.css';
const ProductCard = (props) => {
  let history = useHistory();

  const makeDateShort = (date) => {
    return new Date(date).toDateString();
  };

  return (
    <div className="col my-3">
      <div
        className="card shadow-sm"
        onClick={() => history.push(`/products/${props.data.product_id}`)}
      >
        <svg
          className="bd-placeholder-img card-img-top"
          width="100%"
          height="255"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: Thumbnail"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#55595c" />
          <text x="50%" y="50%" fill="#eceeef" dy=".3em">
            image
          </text>
        </svg>

        <div className="card-body">
          <h3 className="card-title">{props.data.product_name}</h3>
          <p className="card-text">Food type: {props.data.product_type}</p>
          {/* TODO: design created */}
          <p className="card-text">
            Last updated: {makeDateShort(props.data.product_created)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
