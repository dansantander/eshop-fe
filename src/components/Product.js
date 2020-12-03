import React from 'react';
import { withRouter, Link } from 'react-router-dom';

/* eslint react/prop-types: 0 */
/* eslint-disable no-console */
const Product = ({ product, isFav }) => {
  console.log('isFav', isFav);

  return (
    <div className="product col-12 col-md-3 my-4">
      <Link to={`/products/${product.id}`} id="link-product" data-testid="product_card">
        <div className="card">
          {isFav
            ? <i className="fas fa-heart" />
            : <i className="far fa-heart" />}
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
};

export default withRouter(Product);
