import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

/* eslint react/prop-types: 0 */
/* eslint-disable no-console */
const Product = ({ product, isFav, user }) => {
  console.log('isFav', isFav);
  console.log('user from props', user);
  function addFavorite() {
    axios.post('http://localhost:3001/registrations', {
      favProducts: {
        product_id: product.id,
        user_id: user.id,
      },
    },
    { withCredentials: true }).then(response => {
      if (response.data.status === 'created') {
        console.log(' create favorite response', response);
      }
    }).catch(error => {
      console.log('create favorite error', error);
    });
  }

  return (
    <div className="product col-12 col-md-3 my-4">
      <div className="card">
        {isFav
          ? <i tabIndex={0} role="button" aria-label="Mute volume" className="fas fa-heart" onClick={() => addFavorite()} onKeyDown={() => addFavorite()} />
          : <i className="far fa-heart" />}
        <Link to={`/products/${product.id}`} id="link-product" data-testid="product_card">
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
};

export default withRouter(Product);
