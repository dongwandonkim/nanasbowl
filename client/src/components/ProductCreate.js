import { useEffect } from 'react';
const ProductCreate = () => {
  return (
    <form>
      <div className="form-outline mb-4">
        <input type="text" id="form4Example1" className="form-control" />
        <label className="form-label" for="form4Example1">
          Product Name
        </label>
      </div>

      <div className="form-outline mb-4">
        <input type="email" id="form4Example2" className="form-control" />
        <label className="form-label" for="form4Example2">
          Email address
        </label>
      </div>

      <div className="form-outline mb-4">
        <textarea
          className="form-control"
          id="form4Example3"
          rows="4"
        ></textarea>
        <label className="form-label" for="form4Example3">
          Message
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-4">
        Send
      </button>
    </form>
  );
};

export default ProductCreate;
