import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Product = ({ product, isFav }) => (
  <div className="product col-12 col-md-4 col-lg-3 my-4">
    <div className="card">
      {isFav
        ? (
          <i
            aria-label="Mute volume"
            className="fas fa-heart"
          />
        )
        : (
          <i
            aria-label="Mute volume"
            className="far fa-heart"
          />
        )}
      <Link
        to={{
          pathname: `/products/${product.id}`,
          state: {
            isFav,
          },
        }}
        id="link-product"
        data-testid="product_card"
      >
        <img src={product.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h3 className="card-text">
            $
            {product.price}
          </h3>
          <p className="card-title">{product.name}</p>
        </div>
      </Link>
    </div>
  </div>
);

Product.propTypes = {
  isFav: PropTypes.bool.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
};

export default (withRouter(Product));
