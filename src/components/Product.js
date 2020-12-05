import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { addFavorite, removeFavorite } from '../actions/actionsIndex';
/* eslint react/prop-types: 0 */
/* eslint-disable no-console */
const Product = ({
  product, isFav, /* user */ favorites, addFavorite, removeFavorite,
}) => {
  function findInFavorites(product) {
    const favorite = favorites.findIndex(f => f.id === product.id);
    return favorite;
  }

  function addToFavorites() {
    axios.post('http://localhost:3001/favorites', {
      product_id: product.id,
    },
    { withCredentials: true }).then(response => {
      if (response.data.status === 'created') {
        console.log('favorite', response.data.favorite);
        addFavorite(response.data.favorite);
      }
    }).catch(error => {
      console.log('create favorite error', error);
    });
  }

  function removeFromFavorites() {
    const id = findInFavorites(product);
    axios.delete(`http://localhost:3001/favorites/${id}`,
      {
        data: {
          product_id: product.id,
        },
      },
      { withCredentials: true }).then(response => {
      if (response.data.status === 'removed') {
        console.log(' favorite deleted', response);
        removeFavorite();
      }
    }).catch(error => {
      console.log('favorite delete error', error);
    });
  }

  return (
    <div className="product col-12 col-md-3 my-4">
      <div className="card">
        {isFav
          ? (
            <i
              tabIndex={0}
              role="button"
              aria-label="Mute volume"
              className="fas fa-heart"
              onClick={() => removeFromFavorites()}
              onKeyDown={() => removeFromFavorites()}
            />
          )
          : (
            <i
              tabIndex={0}
              role="button"
              aria-label="Mute volume"
              className="far fa-heart"
              onClick={() => addToFavorites()}
              onKeyDown={() => addToFavorites()}
            />
          )}
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

const mapStateToProps = state => ({
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => ({
  addToFavorites: favorite => {
    dispatch(addFavorite(favorite));
  },
  removeFavorite: favorite => {
    dispatch(removeFavorite(favorite));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Product));
