import React from 'react';
/* eslint react/prop-types: 0 */
const Product = ({ product }) => (
  <div className="col-12 col-md-2">
    <div className="card">
      <img src={product.image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">
          $
          {product.price}
        </p>
      </div>
    </div>
  </div>
);

export default Product;
