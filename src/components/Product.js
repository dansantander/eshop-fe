import React from 'react';
import { withRouter, Link } from 'react-router-dom';
/* eslint react/prop-types: 0 */
const Product = ({ product }) => (
  <div className="product col-12 col-md-3 my-4">
    <Link to={`/products/${product.id}`} id="link-product" data-testid="product_card">
      <div className="card">
        <img src={product.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h3 className="card-text">
            $
            {product.price}
          </h3>
          <p className="card-title">{product.name}</p>
        </div>
      </div>
    </Link>
  </div>
);

export default withRouter(Product);
